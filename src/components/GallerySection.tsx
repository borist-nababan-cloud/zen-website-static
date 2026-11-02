import React, { useState, useEffect } from 'react';
import type { WebGalleryItem } from '../types';
import { fetchPublicGalleries, fallbackGalleries } from '../lib/supabaseClient';
import { useLanguage } from '../lib/i18n';
import { Camera, Sparkles, Loader2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { language, getLocalizedText } = useLanguage();
  const [galleries, setGalleries] = useState<WebGalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadGallery() {
      try {
        const data = await fetchPublicGalleries();
        if (isMounted) {
          setGalleries(data);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setGalleries(fallbackGalleries);
          setIsLoading(false);
        }
      }
    }
    loadGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="galeri" className="py-24 sm:py-32 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3 flex items-center justify-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Ambience & Interior' : 'Suasana & Interior'}</span>
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            {language === 'en' ? 'Serenity Welcoming You' : 'Keheningan Yang Menyambut Anda'}
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            {language === 'en'
              ? 'Every corner of Zen is designed to distance you from the urban rush, offering a private haven of silence and profound restoration.'
              : 'Setiap sudut ruangan di Zen dirancang untuk memisahkan Anda dari kebisingan kota, menghadirkan ruang santai yang tenang dan sarat privasi.'}
          </p>
        </div>

        {/* Gallery Grid */}
        {isLoading && galleries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#889D35] mb-2" />
            <p className="text-sm">{language === 'en' ? 'Loading Zen gallery...' : 'Memuat galeri resmi Zen...'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((item) => {
              const displayTitle = getLocalizedText(item.title, item.title_en);
              const displayCategory = getLocalizedText(item.category, item.category_en) || 'Zen Experience';
              const displayDesc = getLocalizedText(item.description, item.description_en);

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-gray-100 aspect-[4/3]"
                >
                  <img
                    src={item.image_url}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = './assets/gallery/carousel(1).jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-[#D2C0A7] font-semibold tracking-wider uppercase mb-1">
                      <Sparkles className="w-3 h-3 text-[#889D35]" />
                      <span>{displayCategory}</span>
                    </div>
                    <h4 className="font-serif text-xl font-bold mb-1">{displayTitle}</h4>
                    {displayDesc && (
                      <p className="text-xs text-gray-200 line-clamp-2">{displayDesc}</p>
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
