import React, { useState, useEffect } from 'react';
import type { WebMember } from '../types';
import {
  updateMemberProfile,
  normalizePhoneWa,
  checkMemberPhoneWaAvailable
} from '../lib/supabaseClient';
import {
  User,
  CheckCircle2,
  Loader2,
  X,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface MemberProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: WebMember | null;
  onProfileUpdated: (updated: WebMember) => void;
}

export const MemberProfileModal: React.FC<MemberProfileModalProps> = ({
  isOpen,
  onClose,
  member,
  onProfileUpdated,
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_wa: '',
    fixline: '',
    shipping_address: '',
    city: '',
    province: '',
    zip_code: '',
    birth_date: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [phoneAvailable, setPhoneAvailable] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (member) {
      setFormData({
        full_name: member.full_name || '',
        phone_wa: member.phone_wa || '',
        fixline: member.fixline || '',
        shipping_address: member.shipping_address || '',
        city: member.city || '',
        province: member.province || '',
        zip_code: member.zip_code || '',
        birth_date: member.birth_date ? member.birth_date.split('T')[0] : '',
      });
      setSuccessMsg('');
      setErrorMsg('');
      setPhoneError('');
      setPhoneAvailable(false);
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const handlePhoneBlur = async () => {
    const rawPhone = formData.phone_wa.trim();
    if (!rawPhone) {
      setPhoneError('');
      setPhoneAvailable(false);
      return;
    }

    const normalized = normalizePhoneWa(rawPhone);
    if (normalized.length < 9) {
      setPhoneError('Nomor WhatsApp minimal 9 digit angka.');
      setPhoneAvailable(false);
      return;
    }

    const currentNormalized = member.phone_wa ? normalizePhoneWa(member.phone_wa) : '';
    // If phone is same as current member profile, it's valid
    if (normalized === currentNormalized) {
      setPhoneError('');
      setPhoneAvailable(false);
      return;
    }

    setIsCheckingPhone(true);
    setPhoneError('');
    setPhoneAvailable(false);

    const checkRes = await checkMemberPhoneWaAvailable(rawPhone, member.id);
    setIsCheckingPhone(false);

    if (!checkRes.available) {
      setPhoneError(
        checkRes.error ||
          'Nomor WhatsApp ini sudah digunakan oleh member lain. Silakan gunakan nomor yang berbeda.'
      );
      setPhoneAvailable(false);
    } else {
      setPhoneError('');
      setPhoneAvailable(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name.trim()) {
      setErrorMsg('Nama lengkap wajib diisi.');
      return;
    }

    const rawPhone = formData.phone_wa.trim();
    let cleanedPhone: string | null = null;

    if (rawPhone) {
      cleanedPhone = normalizePhoneWa(rawPhone);
      if (cleanedPhone.length < 9) {
        setErrorMsg('Nomor WhatsApp tidak valid (minimal 9 digit angka).');
        return;
      }

      // Check if phone was changed compared to current profile
      const currentNormalized = member.phone_wa ? normalizePhoneWa(member.phone_wa) : '';
      if (cleanedPhone !== currentNormalized) {
        setIsSaving(true);
        setErrorMsg('');
        const checkRes = await checkMemberPhoneWaAvailable(rawPhone, member.id);
        if (!checkRes.available) {
          setIsSaving(false);
          const msg =
            checkRes.error ||
            'Nomor WhatsApp ini sudah digunakan oleh member lain. Silakan gunakan nomor yang berbeda.';
          setErrorMsg(msg);
          setPhoneError(msg);
          return;
        }
      }
    }

    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    const res = await updateMemberProfile(member.id, {
      full_name: formData.full_name.trim(),
      phone_wa: cleanedPhone,
      fixline: formData.fixline.trim() || null,
      shipping_address: formData.shipping_address.trim() || null,
      city: formData.city.trim() || null,
      province: formData.province.trim() || null,
      zip_code: formData.zip_code.trim() || null,
      birth_date: formData.birth_date || null,
    });

    setIsSaving(false);
    if (res.success && res.data) {
      setSuccessMsg('Profil member berhasil diperbarui!');
      setPhoneError('');
      setPhoneAvailable(false);
      onProfileUpdated(res.data);
      setTimeout(() => {
        setSuccessMsg('');
      }, 3000);
    } else {
      setErrorMsg(res.error || 'Terjadi kesalahan saat menyimpan profil.');
    }
  };

  const registerDateFormatted = member.register_date
    ? new Date(member.register_date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '-';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DACB] shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 my-8 animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E5DACB] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#889D35]/15 border border-[#889D35]/30 flex items-center justify-center text-[#889D35] shrink-0">
              {member.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3C3C32]">
                  Profil Keanggotaan Zen
                </h3>
                <span className="bg-[#889D35]/15 text-[#6E8027] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#889D35]/25">
                  <ShieldCheck className="w-3 h-3" /> Member Aktif
                </span>
              </div>
              <p className="text-xs text-[#717163] mt-0.5">
                Terdaftar sejak {registerDateFormatted}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#717163] hover:text-[#3C3C32] hover:bg-[#E5DACB]/40 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Read-Only Account Info */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#E5DACB]/80 space-y-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#889D35] block">
              Identitas Akun Google
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#717163]">
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase font-medium">Email Akun:</span>
                <span className="font-medium text-[#3C3C32] break-all">{member.email}</span>
              </div>
              <div>
                <span className="block text-[10px] text-muted-foreground uppercase font-medium">Status Akun:</span>
                <span className="font-medium text-emerald-700">Aktif & Terverifikasi</span>
              </div>
            </div>
          </div>

          {/* Full Name & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3C3C32]">
                Nama Lengkap *
              </label>
              <input
                required
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Nama sesuai identitas"
                className="w-full h-10 px-3.5 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3C3C32] flex items-center justify-between">
                <span>Nomor WhatsApp Aktif</span>
                {isCheckingPhone && (
                  <span className="text-[10px] text-[#889D35] flex items-center gap-1 font-normal">
                    <Loader2 className="w-3 h-3 animate-spin" /> Memeriksa...
                  </span>
                )}
              </label>
              <input
                type="tel"
                value={formData.phone_wa}
                onChange={(e) => {
                  setFormData({ ...formData, phone_wa: e.target.value });
                  if (phoneError) setPhoneError('');
                  if (phoneAvailable) setPhoneAvailable(false);
                }}
                onBlur={handlePhoneBlur}
                placeholder="Contoh: 081234567890"
                className={`w-full h-10 px-3.5 rounded-xl border bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 ${
                  phoneError
                    ? 'border-red-400 focus:ring-red-300'
                    : phoneAvailable
                    ? 'border-emerald-400 focus:ring-emerald-300'
                    : 'border-[#D2C0A7] focus:ring-[#889D35]'
                }`}
              />
              {phoneError ? (
                <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{phoneError}</span>
                </p>
              ) : phoneAvailable ? (
                <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Nomor WhatsApp tersedia.</span>
                </p>
              ) : (
                <p className="text-[10px] text-[#A8A89A] mt-1">
                  Nomor WhatsApp unik digunakan untuk identifikasi member Zen.
                </p>
              )}
            </div>
          </div>

          {/* Fixline & Birth Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3C3C32]">
                Telepon Rumah / Fixline (Opsional)
              </label>
              <input
                type="tel"
                value={formData.fixline}
                onChange={(e) => setFormData({ ...formData, fixline: e.target.value })}
                placeholder="Contoh: 022-2003788"
                className="w-full h-10 px-3.5 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3C3C32]">
                Tanggal Lahir (Untuk Promo Ultah Member)
              </label>
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                className="w-full h-10 px-3.5 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#3C3C32] flex items-center justify-between">
              <span>Alamat Pengiriman (Kartu Pos / Gift Card)</span>
              <span className="text-[10px] text-[#717163] font-normal">Opsional</span>
            </label>
            <textarea
              rows={2}
              value={formData.shipping_address}
              onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
              placeholder="Jalan, Kompleks, Nomor Rumah, RT/RW, Kelurahan, Kecamatan"
              className="w-full p-3 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
            />
          </div>

          {/* City, Province, Zip Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#3C3C32]">Kota / Kabupaten</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Contoh: Bandung"
                className="w-full h-9 px-3 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#3C3C32]">Provinsi</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                placeholder="Contoh: Jawa Barat"
                className="w-full h-9 px-3 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#3C3C32]">Kode Pos</label>
              <input
                type="text"
                value={formData.zip_code}
                onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                placeholder="40163"
                className="w-full h-9 px-3 rounded-xl border border-[#D2C0A7] bg-white text-xs text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5DACB]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#717163] hover:text-[#3C3C32] hover:bg-[#E5DACB]/30 transition cursor-pointer"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={isSaving || isCheckingPhone || !!phoneError}
              className="bg-[#889D35] hover:bg-[#73852C] text-white px-7 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
