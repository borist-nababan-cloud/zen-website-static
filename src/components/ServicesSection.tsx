import React, { useState } from 'react';
import type { Service } from '../types';
import { useLanguage } from '../lib/i18n';
import { Clock, Check, MapPin, ChevronDown, ChevronUp, MessageCircle, Info } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  isLoading: boolean;
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  isLoading,
}) => {
  const { language, t, getLocalizedText } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories = [
    { id: 'ALL', label: t.services.catAll },
    { id: 'Body Massage', label: t.services.catBody },
    { id: 'Foot Reflexology', label: t.services.catReflex },
    { id: 'Addition', label: t.services.catAddition },
  ] as const;

  const toggleOutletAccordion = (serviceId: string) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  const filteredServices =
    selectedCategory === 'ALL'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="layanan" className="py-24 sm:py-32 bg-[#F4EFEB] border-y border-[#E5DACB]/50 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            {t.services.badge}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            {t.services.title}
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Category Filter Pills (3 Categories + Semua) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-[#889D35] text-white shadow-md'
                    : 'bg-white text-[#717163] hover:text-[#3C3C32] hover:bg-[#F8F5F1] border border-[#E5DACB]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Notice on Branch Pricing Policy */}
        <div className="max-w-3xl mx-auto mb-12 p-3.5 rounded-xl border border-[#D2C0A7]/80 bg-white/70 text-[#717163] text-xs flex items-center justify-center gap-2 text-center shadow-xs">
          <Info className="w-4 h-4 text-[#889D35] shrink-0" />
          <span>
            {language === 'en'
              ? 'Treatment rates may vary across individual branches and cities. Please inspect the available branch list on each card for rate inquiries and bookings.'
              : 'Tarif perawatan dapat berbeda di masing-masing kota/cabang. Silakan periksa cabang penyedia pada kartu layanan untuk reservasi dan informasi tarif terkini.'}
          </span>
        </div>

        {/* Loading State Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5DACB] animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-14 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Services Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {filteredServices.map((service) => {
              const serviceKey = service.id || service.service_code;
              const isExpanded = expandedServiceId === serviceKey;
              const availableOutlets = service.available_outlets || [];
              const outletCount = availableOutlets.length;

              const title = getLocalizedText(service.name, service.name_en);
              const description = getLocalizedText(service.description, service.description_en);

              let benefitsText = service.benefits || '';
              if (language === 'en' && service.benefits_en && service.benefits_en.length > 0) {
                benefitsText = service.benefits_en.join(', ');
              }

              const categoryBadge =
                language === 'en' && service.category_en ? service.category_en : service.category;

              return (
                <div
                  key={serviceKey}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5DACB] flex flex-col justify-between"
                >
                  <div>
                    {/* Service Image with Category Pill & Duration */}
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={service.image_url || './assets/gallery/carousel(1).jpg'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = './assets/gallery/carousel(2).jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Top Category Badge */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="bg-[#25251F]/85 backdrop-blur-md text-[#D2C0A7] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-[#D2C0A7]/30">
                          {categoryBadge}
                        </span>
                      </div>

                      {/* Duration badge at bottom left of image */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/65 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-[#889D35]" />
                        <span>{service.duration_minutes} {t.services.minutes}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-[#3C3C32] group-hover:text-[#889D35] transition leading-snug mb-3">
                        {title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#717163] leading-relaxed mb-4">
                        {description}
                      </p>

                      {/* Key Benefits */}
                      {benefitsText && (
                        <div className="pt-3 border-t border-[#E5DACB]/60 mb-2">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#3C3C32] mb-1 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#889D35]" /> {t.services.benefitsTitle}
                          </p>
                          <p className="text-xs text-[#717163] italic">
                            "{benefitsText}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Multi-Branch Accordion Toggle */}
                  <div className="p-6 pt-0 border-t border-[#E5DACB]/50 mt-2">
                    <button
                      type="button"
                      onClick={() => toggleOutletAccordion(serviceKey)}
                      className="w-full bg-[#F8F5F1] hover:bg-[#889D35] text-[#3C3C32] hover:text-white border border-[#D2C0A7] hover:border-[#889D35] py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#889D35] group-hover/btn:text-white" />
                        <span>{language === 'en' ? `Available Branches (${outletCount})` : `Cabang Penyedia (${outletCount})`}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Collapsible Outlets List */}
                    {isExpanded && (
                      <div className="mt-3 p-3 bg-[#F8F5F1] rounded-xl border border-[#E5DACB] space-y-2.5 animate-fadeIn">
                        {outletCount === 0 ? (
                          <p className="text-xs text-[#717163] italic text-center py-2">
                            {t.services.noBranches}
                          </p>
                        ) : (
                          <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                            {availableOutlets.map((outlet) => {
                              const cleanWa = (outlet.no_wa || '08122000168').replace(/\D/g, '');
                              const waUrl = `https://wa.me/${cleanWa}?text=Halo%20${encodeURIComponent(
                                outlet.name_outlet
                              )},%20saya%20ingin%20tanya%20jadwal%20dan%20reservasi%20layanan%20${encodeURIComponent(
                                title
                              )}`;

                              return (
                                <div
                                  key={outlet.kode_outlet}
                                  className="p-2.5 bg-white rounded-lg border border-[#E5DACB]/70 flex items-center justify-between gap-2 shadow-2xs"
                                >
                                  <div className="truncate">
                                    <div className="font-semibold text-xs text-[#3C3C32] truncate">
                                      {outlet.name_outlet}
                                    </div>
                                    <div className="text-[11px] text-[#717163] flex items-center gap-1">
                                      <span>{outlet.city || 'Indonesia'}</span>
                                      {outlet.custom_notes && (
                                        <>
                                          <span>•</span>
                                          <span className="text-[#889D35] italic truncate max-w-[120px]">
                                            {outlet.custom_notes}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white rounded-md text-[11px] font-medium transition cursor-pointer"
                                    title="Hubungi WhatsApp Cabang Ini"
                                  >
                                    <MessageCircle className="w-3 h-3" />
                                    <span>{language === 'en' ? 'Inquire' : 'Tanya Tarif'}</span>
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <p className="text-[10px] text-[#717163] text-center pt-1 border-t border-[#E5DACB]/50">
                          {language === 'en'
                            ? 'Click "Inquire" to connect directly with the branch reception via WhatsApp.'
                            : 'Klik "Tanya Tarif" untuk langsung terhubung ke WhatsApp resepsionis cabang.'}
                        </p>
                      </div>
                    )}
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
