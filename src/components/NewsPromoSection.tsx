import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { WebNewsPromo } from '../types';
import { fetchActiveNewsPromos } from '../lib/supabaseClient';
import { useLanguage } from '../lib/i18n';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  ArrowRight,
  Megaphone
} from 'lucide-react';

export const NewsPromoSection: React.FC = () => {
  const { language, getLocalizedText } = useLanguage();
  const [promos, setPromos] = useState<WebNewsPromo[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Touch gesture state for mobile swiping
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadPromos = async () => {
      try {
        const data = await fetchActiveNewsPromos(5);
        if (isMounted) {
          setPromos(data || []);
        }
      } catch (err) {
        console.warn('Failed to load news & promo:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPromos();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = promos.length;

  const goToNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay handler (advances every 6 seconds if not paused)
  useEffect(() => {
    if (total <= 1 || isPaused) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNext();
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [total, isPaused, goToNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (isLoading) {
    return null; // Silent load
  }

  if (promos.length === 0) {
    return null; // Clean fallback if no active promos
  }

  const activePromo = promos[currentIndex];
  const localizedTitle = getLocalizedText(activePromo.title, activePromo.title_en);
  const localizedSubtitle = getLocalizedText(activePromo.subtitle, activePromo.subtitle_en);
  const localizedDesc = getLocalizedText(activePromo.description, activePromo.description_en);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return null;
    }
  };

  const formattedEndDate = formatDate(activePromo.end_date);

  return (
    <section 
      id="news-promo" 
      className="relative py-12 md:py-16 bg-gradient-to-b from-[#25251F] via-[#2D2D24] to-[#1E1E19] text-[#F8F5F1] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Zen background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#889D35_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#889D35]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D2C0A7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#F8F5F1]/10 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#889D35]/20 border border-[#889D35]/40 text-[#D2C0A7] text-xs uppercase tracking-widest font-semibold mb-2">
              <Megaphone className="w-3.5 h-3.5 text-[#889D35]" />
              <span>{language === 'en' ? 'News & Promotions' : 'Warta & Penawaran Istimewa'}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#F8F5F1] tracking-tight">
              {language === 'en' ? 'Exclusive Seasonal Highlights' : 'Penawaran Eksklusif Zen'}
            </h2>
          </div>

          {/* Controls: Prev/Next & Indicators */}
          {total > 1 && (
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 mr-2">
                {promos.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex 
                        ? 'w-7 bg-[#889D35]' 
                        : 'w-2 bg-[#F8F5F1]/30 hover:bg-[#F8F5F1]/60'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Previous promo"
                className="w-9 h-9 rounded-full bg-[#1E1E19]/80 border border-[#F8F5F1]/20 hover:border-[#889D35] hover:text-[#889D35] flex items-center justify-center text-[#F8F5F1] transition shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next promo"
                className="w-9 h-9 rounded-full bg-[#1E1E19]/80 border border-[#F8F5F1]/20 hover:border-[#889D35] hover:text-[#889D35] flex items-center justify-center text-[#F8F5F1] transition shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Card */}
        <div 
          className="relative bg-[#25251F]/90 border border-[#F8F5F1]/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px] sm:min-h-[420px]">
            {/* Promo Image Container */}
            <div className="lg:col-span-7 relative overflow-hidden group min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]">
              <img
                src={activePromo.image_url}
                alt={localizedTitle}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/gallery/carousel(1).jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25251F] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#25251F]/40 lg:to-[#25251F]" />

              {/* Badge Overlay */}
              {activePromo.badge_text && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#889D35] text-white text-xs font-semibold uppercase tracking-wider shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activePromo.badge_text}</span>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Validity Period */}
                {formattedEndDate && (
                  <div className="flex items-center gap-1.5 text-xs text-[#D2C0A7] mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#889D35]" />
                    <span>
                      {language === 'en' ? 'Valid until ' : 'Berlaku hingga '}
                      <strong className="text-[#F8F5F1] font-medium">{formattedEndDate}</strong>
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5F1] font-normal leading-snug mb-3 tracking-tight">
                  {localizedTitle}
                </h3>

                {/* Subtitle */}
                {localizedSubtitle && (
                  <p className="text-sm sm:text-base font-medium text-[#889D35] mb-4">
                    {localizedSubtitle}
                  </p>
                )}

                {/* Description */}
                {localizedDesc && (
                  <p className="text-sm text-[#E5DACB]/80 font-light leading-relaxed line-clamp-4 mb-6">
                    {localizedDesc}
                  </p>
                )}
              </div>

              {/* CTA Action */}
              <div className="pt-4 border-t border-[#F8F5F1]/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={activePromo.cta_url || '#outlet'}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#889D35] hover:bg-[#728528] text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition shadow-md hover:shadow-lg"
                >
                  <span>{language === 'en' ? 'Claim Promo' : 'Dapatkan Promo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {total > 1 && (
                  <span className="text-xs text-[#E5DACB]/60 font-mono">
                    0{currentIndex + 1} / 0{total}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
