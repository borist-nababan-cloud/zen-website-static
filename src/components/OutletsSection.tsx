import React, { useState } from 'react';
import type { Outlet, OutletFacility } from '../types';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Navigation,
  CheckCircle,
  Sparkles,
  X,
  Bath,
  Zap,
  ShowerHead,
  Armchair,
  Coffee,
  Wifi,
  Car,
  Heart,
  Image as ImageIcon
} from 'lucide-react';

interface OutletsSectionProps {
  outlets: Outlet[];
  outletFacilities?: OutletFacility[];
  isLoading: boolean;
  onSelectOutlet?: (kodeOutlet: string) => void;
}

export const OutletsSection: React.FC<OutletsSectionProps> = ({
  outlets,
  outletFacilities = [],
  isLoading,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedOutletForModal, setSelectedOutletForModal] = useState<Outlet | null>(null);

  // Extract unique cities
  const cities = ['ALL', ...Array.from(new Set(outlets.map((o) => o.city || 'Lainnya')))];

  const filteredOutlets =
    selectedCity === 'ALL'
      ? outlets
      : outlets.filter((o) => (o.city || 'Lainnya') === selectedCity);

  // Helper to render matching Lucide icon
  const renderFacilityIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'Bath':
        return <Bath className="w-5 h-5 text-[#889D35]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#889D35]" />;
      case 'ShowerHead':
        return <ShowerHead className="w-5 h-5 text-[#889D35]" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5 text-[#889D35]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#889D35]" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5 text-[#889D35]" />;
      case 'Car':
        return <Car className="w-5 h-5 text-[#889D35]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#889D35]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#889D35]" />;
    }
  };

  // Get active facilities for modal
  const currentModalFacilities = selectedOutletForModal
    ? outletFacilities.filter(
        (of) => of.kode_outlet === selectedOutletForModal.kode_outlet && of.is_available && of.facility
      )
    : [];

  return (
    <section id="outlet" className="py-24 sm:py-32 bg-[#F8F5F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            Jaringan Cabang Resmi
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            Temukan Oase Zen Terdekat
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            Hadir di 10+ lokasi strategis di berbagai kota besar Indonesia, setiap cabang Zen Family Spa 
            memberikan kenyamanan fasilitas VIP, ruang refleksi eksklusif, dan parkir luas.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {cities.map((city) => {
            const isAll = city === 'ALL';
            const label = isAll ? 'Semua Kota' : city;
            const active = selectedCity === city;

            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  active
                    ? 'bg-[#3C3C32] text-[#D2C0A7] shadow-md'
                    : 'bg-white text-[#717163] hover:text-[#3C3C32] border border-[#E5DACB]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E5DACB] animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          /* Outlets Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOutlets.map((outlet) => {
              const waNumber = outlet.no_wa || '08122000168';
              const cleanWa = waNumber.replace(/[^0-9]/g, '').replace(/^0/, '62');
              const waLink = `https://wa.me/${cleanWa}?text=Halo%20${encodeURIComponent(
                outlet.name_outlet
              )},%20saya%20ingin%20reservasi%20perawatan%20spa`;
              const mapsQuery = encodeURIComponent(
                `${outlet.name_outlet} ${outlet.alamat || ''} ${outlet.city || ''}`
              );
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

              return (
                <div
                  key={outlet.kode_outlet}
                  className="bg-white rounded-2xl p-7 border border-[#E5DACB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Outlet Code Badge & Name */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold tracking-widest text-[#889D35] bg-[#889D35]/10 px-2.5 py-1 rounded-md">
                        CABANG {outlet.kode_outlet}
                      </span>
                      <span className="text-xs font-medium text-[#717163] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-[#889D35]" /> Buka Hari Ini
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#3C3C32] mb-3">
                      {outlet.name_outlet}
                    </h3>

                    {/* Address */}
                    <div className="flex items-start gap-3 text-xs sm:text-sm text-[#717163] mb-4">
                      <MapPin className="w-4 h-4 text-[#889D35] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        {outlet.alamat || 'Alamat cabang resmi Zen Family Spa & Reflexology'}
                        {outlet.city && <span className="block font-medium text-[#3C3C32] mt-0.5">{outlet.city}, {outlet.province || ''}</span>}
                      </p>
                    </div>

                    {/* Operating Hours */}
                    <div className="flex items-center gap-3 text-xs text-[#717163] mb-4 bg-[#F8F5F1] p-3 rounded-xl border border-[#E5DACB]/50">
                      <Clock className="w-4 h-4 text-[#889D35] shrink-0" />
                      <span>Setiap Hari: 10:00 - 22:00 WIB/WITA</span>
                    </div>

                    {/* Telephone */}
                    {outlet.no_telp && (
                      <div className="flex items-center gap-3 text-xs text-[#717163] mb-6">
                        <Phone className="w-4 h-4 text-[#889D35] shrink-0" />
                        <a href={`tel:${outlet.no_telp}`} className="hover:text-[#889D35] transition">
                          {outlet.no_telp}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-4 border-t border-[#E5DACB]/60">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#F8F5F1] hover:bg-[#3C3C32] text-[#3C3C32] hover:text-white border border-[#D2C0A7] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition text-center"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Petunjuk Arah</span>
                      </a>
                    </div>

                    {/* Button "Lihat Fasilitas" */}
                    <button
                      onClick={() => setSelectedOutletForModal(outlet)}
                      className="w-full bg-[#889D35] hover:bg-[#6E8027] text-white py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition shadow-sm hover:shadow flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Lihat Fasilitas Cabang</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Dialog: Detail Fasilitas Cabang */}
        {selectedOutletForModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E5DACB] animate-fadeIn max-h-[90vh] overflow-y-auto relative">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedOutletForModal(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <span className="text-[11px] font-bold tracking-widest text-[#889D35] uppercase bg-[#889D35]/10 px-3 py-1 rounded-full inline-block mb-2">
                  Cabang {selectedOutletForModal.kode_outlet} • {selectedOutletForModal.city || 'Indonesia'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3C3C32]">
                  Fasilitas {selectedOutletForModal.name_outlet}
                </h3>
                <p className="text-xs sm:text-sm text-[#717163] mt-1">
                  {selectedOutletForModal.alamat || 'Alamat cabang resmi Zen Family Spa & Reflexology'}
                </p>
              </div>

              {/* Facilities Grid */}
              <div className="space-y-4">
                {currentModalFacilities.length > 0 ? (
                  currentModalFacilities.map((of) => {
                    const fac = of.facility!;
                    const img1 = of.custom_image_url_1 || fac.image_url_1;
                    const img2 = of.custom_image_url_2 || fac.image_url_2;

                    return (
                      <div
                        key={of.id}
                        className="p-4 sm:p-5 rounded-2xl border border-[#E5DACB] bg-[#F8F5F1] flex flex-col sm:flex-row gap-4 items-start"
                      >
                        {/* Facility Images (up to 2) */}
                        <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-36">
                          {img1 ? (
                            <img
                              src={img1}
                              alt={fac.name}
                              className="w-1/2 sm:w-full h-24 object-cover rounded-xl border border-white shadow-sm"
                            />
                          ) : (
                            <div className="w-1/2 sm:w-full h-24 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                              <ImageIcon className="w-6 h-6 opacity-40" />
                            </div>
                          )}

                          {img2 ? (
                            <img
                              src={img2}
                              alt={`${fac.name} 2`}
                              className="w-1/2 sm:w-full h-24 object-cover rounded-xl border border-white shadow-sm"
                            />
                          ) : null}
                        </div>

                        {/* Facility Details */}
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#889D35]/15 flex items-center justify-center shrink-0">
                              {renderFacilityIcon(fac.icon_name)}
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-base text-[#3C3C32]">
                                {fac.name}
                              </h4>
                              <span className="text-[10px] text-[#889D35] font-semibold uppercase tracking-wider block">
                                {fac.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#717163] leading-relaxed pt-1">
                            {fac.description}
                          </p>

                          {of.custom_notes && (
                            <div className="mt-2 p-2.5 rounded-lg bg-white border border-[#E5DACB]/80 text-xs text-[#3C3C32]">
                              <span className="font-semibold text-[#889D35] mr-1">Khusus Cabang Ini:</span>
                              {of.custom_notes}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500 space-y-2">
                    <Sparkles className="w-8 h-8 text-[#889D35] mx-auto opacity-50" />
                    <p className="text-sm">Cabang ini menyediakan fasilitas standar kenyamanan Zen:</p>
                    <p className="text-xs text-gray-400">
                      Couple VIP Suite Room, Hot Water Rain Shower, Serene Zen Lounge, dan Free Flow Wedang Jahe Merah Hangat.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-[#E5DACB] flex justify-end">
                <button
                  onClick={() => setSelectedOutletForModal(null)}
                  className="bg-[#3C3C32] hover:bg-black text-[#D2C0A7] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
