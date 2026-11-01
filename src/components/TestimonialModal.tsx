import React, { useState, useRef } from 'react';
import type { WebMember, Outlet } from '../types';
import { uploadTestimonialPhoto, submitTestimonial } from '../lib/supabaseClient';
import {
  X,
  Camera,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Angry,
  Frown,
  Meh,
  Smile,
  Laugh,
  MapPin,
  MessageSquare
} from 'lucide-react';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: WebMember;
  outlets: Outlet[];
  onSubmitted: () => void;
}

const RATING_LEVELS = [
  {
    score: 1,
    label: 'Sangat Kecewa',
    icon: Angry,
    activeColor: 'text-red-500 bg-red-50 border-red-200'
  },
  {
    score: 2,
    label: 'Kurang Puas',
    icon: Frown,
    activeColor: 'text-amber-500 bg-amber-50 border-amber-200'
  },
  {
    score: 3,
    label: 'Cukup / Netral',
    icon: Meh,
    activeColor: 'text-yellow-600 bg-yellow-50 border-yellow-200'
  },
  {
    score: 4,
    label: 'Puas',
    icon: Smile,
    activeColor: 'text-[#889D35] bg-[#889D35]/10 border-[#889D35]/30'
  },
  {
    score: 5,
    label: 'Sangat Puas',
    icon: Laugh,
    activeColor: 'text-[#6E8027] bg-[#889D35]/20 border-[#889D35]'
  }
];

export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onClose,
  member,
  outlets,
  onSubmitted
}) => {
  const [selectedOutlet, setSelectedOutlet] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Filter regular branch outlets (skip holding code 111 if desired or keep all operational)
  const branchOutlets = outlets.filter((o) => o.kode_outlet !== '111');

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('Ukuran foto maksimal 5 MB.');
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setErrorMsg('');
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setErrorMsg('Mohon tuliskan ulasan atau pengalaman perawatan Anda.');
      return;
    }
    if (comment.trim().length < 10) {
      setErrorMsg('Ulasan minimal 10 karakter agar bermanfaat bagi tamu lainnya.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      let photoUrl: string | null = null;
      if (photoFile) {
        photoUrl = await uploadTestimonialPhoto(photoFile, member.full_name || 'member');
      }

      const res = await submitTestimonial({
        auth_user_id: member.auth_user_id,
        member_id: member.id,
        customer_name: member.full_name || 'Member Zen',
        customer_avatar: member.avatar_url || null,
        kode_outlet: selectedOutlet || null,
        rating,
        comment: comment.trim(),
        photo_url: photoUrl
      });

      setIsSubmitting(false);

      if (res.success) {
        setIsSuccess(true);
        onSubmitted();
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        setErrorMsg(res.error || 'Gagal mengirim testimoni. Silakan coba lagi.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Terjadi kesalahan sistem saat mengirim ulasan.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E5DACB] shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 my-8 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5DACB] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#889D35]/15 text-[#889D35] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#3C3C32]">
                Tulis Ulasan Kunjungan
              </h3>
              <p className="text-xs text-[#717163]">
                Bagikan pengalaman rileks Anda di Zen Family Spa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#717163] hover:text-[#3C3C32] hover:bg-[#E5DACB]/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#3C3C32]">
              Terima Kasih Banyak!
            </h4>
            <p className="text-sm text-[#717163] leading-relaxed max-w-md mx-auto">
              Ulasan Anda telah kami terima dengan baik. Demi menjaga kenyamanan bersama,
              ulasan akan ditinjau oleh tim Zen sebelum ditayangkan di website.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Member Identity Preview */}
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E5DACB]/70 shadow-2xs">
              {member.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.full_name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D2C0A7]"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#889D35] text-white flex items-center justify-center font-bold text-sm">
                  {member.full_name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-xs">
                <p className="font-semibold text-[#3C3C32]">{member.full_name}</p>
                <p className="text-[#717163]">{member.email}</p>
              </div>
              <span className="ml-auto text-[10px] bg-[#889D35]/15 text-[#6E8027] font-semibold px-2 py-0.5 rounded-full">
                Member Resmi
              </span>
            </div>

            {/* Outlet Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#3C3C32] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#889D35]" /> Cabang yang Dikunjungi
              </label>
              <select
                value={selectedOutlet}
                onChange={(e) => setSelectedOutlet(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5DACB] rounded-xl text-xs sm:text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35]/30 focus:border-[#889D35]"
              >
                <option value="">Pilih Cabang Zen (Opsional / Global)</option>
                {branchOutlets.map((outlet) => (
                  <option key={outlet.kode_outlet} value={outlet.kode_outlet}>
                    {outlet.name_outlet} {outlet.city ? `(${outlet.city})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 5-Smile Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#3C3C32] uppercase tracking-wider mb-2">
                Tingkat Kepuasan Pelayanan
              </label>
              <div className="grid grid-cols-5 gap-2">
                {RATING_LEVELS.map((lvl) => {
                  const Icon = lvl.icon;
                  const isSelected = rating === lvl.score;
                  return (
                    <button
                      key={lvl.score}
                      type="button"
                      onClick={() => setRating(lvl.score)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? `${lvl.activeColor} ring-2 ring-[#889D35] shadow-xs scale-102`
                          : 'bg-white border-[#E5DACB] text-[#717163] hover:border-[#889D35]/60 hover:text-[#3C3C32]'
                      }`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
                      <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">
                        {lvl.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-xs font-semibold text-[#3C3C32] uppercase tracking-wider mb-1.5">
                Ulasan / Komentar <span className="text-red-500">*</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Ceritakan pengalaman perawatan, terapis, suasana outlet, dan kenyamanan Anda di Zen Family Spa..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#E5DACB] rounded-xl text-xs sm:text-sm text-[#3C3C32] placeholder:text-[#A8A89A] focus:outline-none focus:ring-2 focus:ring-[#889D35]/30 focus:border-[#889D35]"
                required
              />
              <p className="text-[11px] text-[#A8A89A] mt-1 text-right">
                {comment.length} karakter
              </p>
            </div>

            {/* Photo Attachment (Camera or Storage) */}
            <div>
              <label className="block text-xs font-semibold text-[#3C3C32] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#889D35]" /> Foto Suasana / Kunjungan (Opsional)
              </label>

              {photoPreview ? (
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-[#889D35] shadow-md group">
                  <img
                    src={photoPreview}
                    alt="Pratinjau Foto"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700 transition"
                    title="Hapus Foto"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <input
                    type="file"
                    ref={cameraInputRef}
                    onChange={handlePhotoSelect}
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                  />

                  {/* Ambil Kamera Button */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5DACB] hover:border-[#889D35] rounded-xl text-xs text-[#3C3C32] font-medium transition shadow-2xs hover:bg-[#889D35]/5"
                  >
                    <Camera className="w-4 h-4 text-[#889D35]" />
                    <span>Ambil Foto (Kamera)</span>
                  </button>

                  {/* Pilih Dari Galeri Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E5DACB] hover:border-[#889D35] rounded-xl text-xs text-[#3C3C32] font-medium transition shadow-2xs hover:bg-[#889D35]/5"
                  >
                    <Upload className="w-4 h-4 text-[#889D35]" />
                    <span>Pilih Foto dari Galeri</span>
                  </button>
                </div>
              )}
              <p className="text-[10px] text-[#A8A89A] mt-1">
                Format JPG/PNG, ukuran file maksimal 5 MB.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#E5DACB] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-full border border-[#D2C0A7] text-[#717163] hover:text-[#3C3C32] text-xs font-semibold transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-[#889D35] hover:bg-[#6E8027] text-white text-xs uppercase tracking-wider font-semibold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition transform active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <span>Kirim Ulasan</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
