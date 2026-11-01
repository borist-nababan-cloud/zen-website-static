import React, { useState, useEffect } from 'react';
import type { Outlet, Service, ReservationFormData } from '../types';
import { submitReservationLead } from '../lib/supabaseClient';
import { Calendar, User, Phone, MapPin, Sparkles, Users, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ReservationSectionProps {
  outlets: Outlet[];
  services: Service[];
  preselectedOutlet?: string;
  preselectedService?: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  outlets,
  services,
  preselectedOutlet,
  preselectedService,
}) => {
  // Today's date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    customer_name: '',
    phone: '',
    kode_outlet: preselectedOutlet || (outlets[0]?.kode_outlet || '101'),
    service_name: preselectedService || (services[0]?.name || 'The Royal Touch Ritual'),
    reservation_date: todayStr,
    reservation_time: '14:00',
    guest_count: 1,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync props if changed from clicking cards in other sections
  useEffect(() => {
    if (preselectedOutlet) {
      setFormData((prev) => ({ ...prev, kode_outlet: preselectedOutlet }));
    }
  }, [preselectedOutlet]);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_name: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.customer_name.trim()) {
      setErrorMessage('Mohon lengkapi Nama Lengkap Anda.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Mohon cantumkan Nomor WhatsApp / Telepon yang valid.');
      return;
    }
    if (!formData.kode_outlet) {
      setErrorMessage('Mohon pilih Cabang Zen Spa yang dituju.');
      return;
    }
    if (!formData.reservation_date) {
      setErrorMessage('Mohon pilih tanggal rencana kedatangan Anda.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitReservationLead(formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
    } else {
      setErrorMessage(result.error || 'Terjadi kendala saat mengirim data. Silakan coba kembali.');
    }
  };

  const selectedOutletObj = outlets.find((o) => o.kode_outlet === formData.kode_outlet);
  const outletName = selectedOutletObj?.name_outlet || 'Zen Family Spa';
  const targetWa = selectedOutletObj?.no_wa || '628122000168';
  const cleanTargetWa = targetWa.replace(/[^0-9]/g, '');

  const waConfirmText = encodeURIComponent(
    `Halo ${outletName},\nSaya telah mengisi form reservasi di website resmi Zen Family Spa:\n\n• Nama: ${formData.customer_name}\n• No. HP: ${formData.phone}\n• Perawatan: ${formData.service_name}\n• Tanggal: ${formData.reservation_date}\n• Waktu: ${formData.reservation_time} WIB/WITA\n• Tamu: ${formData.guest_count} Orang\n${formData.notes ? `• Catatan: ${formData.notes}\n` : ''}\nMohon konfirmasi ketersediaan slot therapist dan ruangan. Terima kasih!`
  );

  return (
    <section id="reservasi" className="py-24 sm:py-32 bg-[#F4EFEB] border-t border-[#E5DACB]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pemesanan Mudah & Cepat</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            Reservasi Pengalaman Relaksasi Anda
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            Nikmati kemudahan mengatur jadwal perawatan Anda. Tim concierge kami akan segera 
            menghubungi Anda via WhatsApp untuk mengonfirmasi ketersediaan kamar dan terapis.
          </p>
        </div>

        {/* Card Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-[#E5DACB] relative">
          
          {submitSuccess ? (
            /* Success State */
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-[#889D35]/15 text-[#889D35] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#3C3C32] font-bold">
                  Reservasi Anda Telah Kami Terima!
                </h3>
                <p className="text-sm text-[#717163] max-w-lg mx-auto">
                  Terima kasih, <span className="font-semibold text-[#3C3C32]">{formData.customer_name}</span>. Data kunjungan Anda untuk <span className="font-semibold text-[#3C3C32]">{formData.service_name}</span> di <span className="font-semibold text-[#3C3C32]">{outletName}</span> telah tersimpan di sistem kami.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#F8F5F1] p-6 rounded-2xl border border-[#E5DACB] max-w-md mx-auto text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between border-b border-[#E5DACB]/50 pb-2">
                  <span className="text-[#717163]">Cabang:</span>
                  <span className="font-semibold text-[#3C3C32]">{outletName}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5DACB]/50 pb-2">
                  <span className="text-[#717163]">Perawatan:</span>
                  <span className="font-semibold text-[#3C3C32]">{formData.service_name}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5DACB]/50 pb-2">
                  <span className="text-[#717163]">Jadwal Kunjungan:</span>
                  <span className="font-semibold text-[#3C3C32]">{formData.reservation_date} • {formData.reservation_time} WIB/WITA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#717163]">Jumlah Tamu:</span>
                  <span className="font-semibold text-[#3C3C32]">{formData.guest_count} Orang</span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <a
                  href={`https://wa.me/${cleanTargetWa}?text=${waConfirmText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konfirmasi Cepat via WhatsApp</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFormData({
                      customer_name: '',
                      phone: '',
                      kode_outlet: outlets[0]?.kode_outlet || '101',
                      service_name: services[0]?.name || 'The Royal Touch Ritual',
                      reservation_date: todayStr,
                      reservation_time: '14:00',
                      guest_count: 1,
                      notes: '',
                    });
                  }}
                  className="w-full sm:w-auto bg-[#F8F5F1] hover:bg-[#E5DACB] text-[#3C3C32] py-3.5 px-6 rounded-full text-xs font-semibold border border-[#D2C0A7] transition"
                >
                  Buat Reservasi Baru
                </button>
              </div>
            </div>
          ) : (
            /* Form Fields */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#889D35]" /> Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    placeholder="Contoh: Ibu Rania Wijaya"
                    className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#889D35]" /> Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Contoh: 081234567890"
                    className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                  />
                </div>

                {/* Outlet Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#889D35]" /> Pilih Cabang Zen *
                  </label>
                  <select
                    name="kode_outlet"
                    value={formData.kode_outlet}
                    onChange={handleChange}
                    className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                  >
                    {outlets.map((outlet) => (
                      <option key={outlet.kode_outlet} value={outlet.kode_outlet}>
                        {outlet.name_outlet} ({outlet.city || 'Indonesia'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#889D35]" /> Pilihan Perawatan *
                  </label>
                  <select
                    name="service_name"
                    value={formData.service_name}
                    onChange={handleChange}
                    className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                  >
                    {services.map((service) => (
                      <option key={service.id || service.service_code} value={service.name}>
                        {service.name} ({service.duration_minutes} Min{service.price ? ` - Rp ${service.price.toLocaleString('id-ID')}` : ''})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#889D35]" /> Tanggal Rencana Kunjungan *
                  </label>
                  <input
                    type="date"
                    name="reservation_date"
                    min={todayStr}
                    required
                    value={formData.reservation_date}
                    onChange={handleChange}
                    className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                  />
                </div>

                {/* Time & Guest Count */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2">
                      Jam Kedatangan *
                    </label>
                    <select
                      name="reservation_time"
                      value={formData.reservation_time}
                      onChange={handleChange}
                      className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                    >
                      {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map(
                        (time) => (
                          <option key={time} value={time}>
                            {time} WIB
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#889D35]" /> Jumlah Tamu
                    </label>
                    <select
                      name="guest_count"
                      value={formData.guest_count}
                      onChange={handleChange}
                      className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                    >
                      <option value={1}>1 Orang (Single)</option>
                      <option value={2}>2 Orang (Couple)</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4+ Orang (Keluarga)</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Special Requests / Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3C3C32] mb-2">
                  Catatan Khusus / Preferensi Ruangan (Opsional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes || ''}
                  onChange={handleChange}
                  placeholder="Contoh: Ingin ruangan VIP berdua, preferensi terapis wanita, atau fokus pada pundak yang kaku."
                  className="w-full bg-[#F8F5F1] border border-[#E5DACB] rounded-xl px-4 py-3 text-sm text-[#3C3C32] focus:outline-none focus:ring-2 focus:ring-[#889D35] focus:bg-white transition"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#889D35] hover:bg-[#6E8027] text-white px-10 py-4 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memproses Reservasi...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Kirim Reservasi Sekarang</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-[#717163] mt-3">
                  Tidak ada biaya pembatalan. Pembayaran dilakukan langsung di meja kasir outlet setelah perawatan selesai.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

