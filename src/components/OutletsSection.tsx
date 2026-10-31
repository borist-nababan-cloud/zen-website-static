import React, { useState } from 'react';
import type { Outlet } from '../types';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle } from 'lucide-react';

interface OutletsSectionProps {
  outlets: Outlet[];
  isLoading: boolean;
  onSelectOutlet: (kodeOutlet: string) => void;
}

export const OutletsSection: React.FC<OutletsSectionProps> = ({
  outlets,
  isLoading,
  onSelectOutlet,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');

  // Extract unique cities
  const cities = ['ALL', ...Array.from(new Set(outlets.map((o) => o.city || 'Lainnya')))];

  const filteredOutlets =
    selectedCity === 'ALL'
      ? outlets
      : outlets.filter((o) => (o.city || 'Lainnya') === selectedCity);

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
            const label = isAll ? 'Semua Kota (10 Cabang)' : city;
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
              const waNumber = outlet.no_wa || '628122000168';
              const cleanWa = waNumber.replace(/[^0-9]/g, '');
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

                    <button
                      onClick={() => onSelectOutlet(outlet.kode_outlet)}
                      className="w-full bg-[#889D35] hover:bg-[#6E8027] text-white py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition shadow-sm hover:shadow"
                    >
                      Pilih & Reservasi di Cabang Ini
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

