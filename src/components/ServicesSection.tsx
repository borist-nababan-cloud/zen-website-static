import React, { useState } from 'react';
import type { Service } from '../types';
import { Clock, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  isLoading: boolean;
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  isLoading,
  onSelectService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Extract unique categories
  const categories = ['ALL', ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices =
    selectedCategory === 'ALL'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="layanan" className="py-24 sm:py-32 bg-[#F4EFEB] border-y border-[#E5DACB]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            Menu Perawatan Eksklusif
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            Harmoni Raga & Relaksasi Sempurna
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            Pilihlah rangkaian ritual pemulihan energi yang dikurasi khusus oleh master terapis kami 
            untuk meremajakan sel tubuh dan mengembalikan keseimbangan batin Anda.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((category) => {
            const isAll = category === 'ALL';
            const label = isAll ? 'Semua Perawatan' : category;
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 ${
                  active
                    ? 'bg-[#889D35] text-white shadow-md'
                    : 'bg-white text-[#717163] hover:text-[#3C3C32] hover:bg-[#F8F5F1] border border-[#E5DACB]'
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id || service.service_code}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E5DACB] flex flex-col justify-between"
              >
                <div>
                  {/* Service Image with Category Pill & Duration */}
                  <div className="relative h-60 overflow-hidden bg-gray-100">
                    <img
                      src={service.image_url || './assets/gallery/carousel(1).jpg'}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = './assets/gallery/carousel(2).jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-[#25251F]/80 backdrop-blur-md text-[#D2C0A7] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border border-[#D2C0A7]/30">
                        {service.category}
                      </span>
                      {service.is_featured && (
                        <span className="bg-[#889D35] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Pilihan Utama
                        </span>
                      )}
                    </div>

                    {/* Duration badge at bottom left of image */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-[#889D35]" />
                      <span>{service.duration_minutes} Menit</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-serif text-xl font-bold text-[#3C3C32] group-hover:text-[#889D35] transition leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    {/* Price Tag */}
                    <div className="mb-4">
                      <span className="text-xs text-[#717163] uppercase tracking-wider block">Investasi Kenyamanan</span>
                      <span className="font-serif text-2xl font-bold text-[#6E8027]">
                        {formatIDR(service.price)}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#717163] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Key Benefits */}
                    {service.benefits && (
                      <div className="pt-3 border-t border-[#E5DACB]/60 mb-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#3C3C32] mb-1.5 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#889D35]" /> Manfaat Utama:
                        </p>
                        <p className="text-xs text-[#717163] italic">
                          "{service.benefits}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectService(service.name)}
                    className="w-full bg-[#F8F5F1] hover:bg-[#889D35] text-[#3C3C32] hover:text-white border border-[#D2C0A7] hover:border-[#889D35] py-3 px-4 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Pilih Layanan Ini</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

