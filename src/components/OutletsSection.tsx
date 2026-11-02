import React, { useState } from 'react';
import type { Outlet, OutletFacility } from '../types';
import { useLanguage } from '../lib/i18n';
import {
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
  const { language, t, getLocalizedText } = useLanguage();
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedOutletForModal, setSelectedOutletForModal] = useState<Outlet | null>(null);

  // Extract unique cities
  const cities = ['ALL', ...Array.from(new Set(outlets.map((o) => o.city || (language === 'en' ? 'Others' : 'Lainnya'))))];

  const filteredOutlets =
    selectedCity === 'ALL'
      ? outlets
      : outlets.filter((o) => (o.city || (language === 'en' ? 'Others' : 'Lainnya')) === selectedCity);

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
    <section id="outlet" className="py-24 sm:py-32 bg-[#F8F5F1] relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            {t.outlets.badge}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            {t.outlets.title}
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            {t.outlets.subtitle}
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {cities.map((city) => {
            const isAll = city === 'ALL';
            const label = isAll ? t.outlets.filterAll : city;
            const active = selectedCity === city;

            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-[#889D35] text-white shadow-md'
                    : 'bg-white text-[#717163] hover:text-[#3C3C32] hover:bg-[#F4EFEB] border border-[#E5DACB]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Loading State Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E5DACB] space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-16 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          /* Outlets Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOutlets.map((outlet) => {
              const displayTelp = outlet.no_telp || '022-2003788';
              const displayWa = outlet.no_wa || '0812-2000-0168';

              let mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${outlet.name_outlet} ${outlet.alamat || ''}`
              )}`;

              if (outlet.location) {
                if (typeof outlet.location === 'object' && outlet.location.maps_url) {
                  mapsUrl = outlet.location.maps_url;
                } else if (typeof outlet.location === 'string') {
                  try {
                    const parsed = JSON.parse(outlet.location);
                    if (parsed.maps_url) mapsUrl = parsed.maps_url;
                  } catch (e) {}
                }
              }

              return (
                <div
                  key={outlet.kode_outlet}
                  className="bg-white rounded-2xl p-7 border border-[#E5DACB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-[#889D35]/50"
                >
                  <div>
                    {/* Header: Outlet Code & City */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold tracking-widest text-[#889D35] uppercase bg-[#889D35]/10 px-3 py-1 rounded-full">
                        {outlet.kode_outlet} • {outlet.city || (language === 'en' ? 'Indonesia' : 'Indonesia')}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#717163]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#889D35]" />
                        <span>{language === 'en' ? 'Official' : 'Resmi'}</span>
                      </span>
                    </div>

                    {/* Outlet Name */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3C3C32] mb-3 group-hover:text-[#889D35] transition">
                      {outlet.name_outlet}
                    </h3>

                    {/* Address */}
                    <p className="text-xs sm:text-sm text-[#717163] leading-relaxed mb-5 min-h-[40px]">
                      {outlet.alamat || (language === 'en' ? 'Official branch address of Zen Family Spa & Reflexology' : 'Alamat resmi cabang Zen Family Spa & Reflexology')}
                    </p>

                    {/* Operating Details */}
                    <div className="space-y-2.5 pt-4 border-t border-[#E5DACB]/60 text-xs text-[#3C3C32] mb-6">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#889D35] shrink-0" />
                        <span>{t.outlets.operatingHours}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#889D35] shrink-0" />
                        <span>Telp: {displayTelp}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="w-4 h-4 text-[#889D35] shrink-0" />
                        <span>WhatsApp: {displayWa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-2.5 pt-2">
                    {/* Direction Maps Link */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#F8F5F1] hover:bg-[#EAE4DC] text-[#3C3C32] py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 border border-[#D2C0A7]"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#889D35]" />
                      <span>{t.outlets.getDirections}</span>
                    </a>

                    {/* View Facilities Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedOutletForModal(outlet)}
                      className="w-full bg-white hover:bg-[#889D35] text-[#889D35] hover:text-white py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 border border-[#889D35] shadow-xs cursor-pointer group/fac"
                    >
                      <Sparkles className="w-3.5 h-3.5 group-hover/fac:rotate-12 transition-transform" />
                      <span>{t.outlets.viewFacilities}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: View Facilities for Outlet */}
        {selectedOutletForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-[#D2C0A7] shadow-2xl relative">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedOutletForModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F8F5F1] text-[#717163] hover:text-[#3C3C32] transition cursor-pointer"
                aria-label={t.outlets.close}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <span className="text-[11px] font-bold tracking-widest text-[#889D35] uppercase bg-[#889D35]/10 px-3 py-1 rounded-full inline-block mb-2">
                  {language === 'en' ? 'Branch' : 'Cabang'} {selectedOutletForModal.kode_outlet} • {selectedOutletForModal.city || 'Indonesia'}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3C3C32]">
                  {t.outlets.facilitiesTitle} {selectedOutletForModal.name_outlet}
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

                    const facName = getLocalizedText(fac.name, fac.name_en);
                    const facDesc = getLocalizedText(fac.description, fac.description_en);
                    const facCat = getLocalizedText(fac.category, fac.category_en);

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
                              alt={facName}
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
                              alt={`${facName} 2`}
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
                                {facName}
                              </h4>
                              <span className="text-[10px] text-[#889D35] font-semibold uppercase tracking-wider block">
                                {facCat}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-[#717163] leading-relaxed pt-1">
                            {facDesc}
                          </p>

                          {of.custom_notes && (
                            <div className="mt-2 p-2.5 rounded-lg bg-white border border-[#E5DACB]/80 text-xs text-[#3C3C32]">
                              <span className="font-semibold text-[#889D35] mr-1">
                                {language === 'en' ? 'Special for this branch:' : 'Khusus Cabang Ini:'}
                              </span>
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
                    <p className="text-sm font-medium">
                      {language === 'en'
                        ? 'This branch features standard Zen luxury amenities:'
                        : 'Cabang ini menyediakan fasilitas standar kenyamanan Zen:'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Couple VIP Suite Room, Hot Water Rain Shower, Serene Zen Lounge, & Complimentary Hot Ginger Tea.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-[#E5DACB] flex justify-end">
                <button
                  onClick={() => setSelectedOutletForModal(null)}
                  className="bg-[#3C3C32] hover:bg-black text-[#D2C0A7] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                >
                  {t.outlets.close}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
