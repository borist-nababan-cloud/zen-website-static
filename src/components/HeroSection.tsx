import React from 'react';
import { useLanguage } from '../lib/i18n';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

interface HeroSectionProps {
  onBookClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#25251F] font-sans">
      {/* Background Image with Slow Subtle Ambient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/gallery/carousel(1).jpg"
          alt="Suasana Tenang Zen Family Spa"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Multilayer Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#25251F]/85 via-[#25251F]/70 to-[#25251F]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#25251F] via-transparent to-[#25251F]/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-[#F8F5F1]">
        {/* Subtle Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#889D35]/25 border border-[#889D35]/40 text-[#D2C0A7] text-xs uppercase tracking-widest font-semibold mb-6 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-[#889D35]" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] text-[#F8F5F1] mb-6 tracking-tight">
          Reset Your Rhythm<br />
          <span className="italic font-light text-[#D2C0A7]">
            Find your ZEN
          </span>
        </h1>

        {/* Tagline / Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#E5DACB]/90 font-light leading-relaxed mb-10">
          {t.hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <a
            href="#layanan"
            className="w-full sm:w-auto bg-[#889D35] hover:bg-[#6E8027] text-white px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 text-center cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.hero.ctaServices}</span>
          </a>
          <a
            href="#outlet"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-[#F8F5F1] border border-[#D2C0A7]/40 px-8 py-4 rounded-full text-xs sm:text-sm uppercase tracking-widest font-semibold backdrop-blur-sm transition-all duration-300 text-center cursor-pointer"
          >
            {t.hero.ctaOutlets}
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/15 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#889D35]/20 flex items-center justify-center shrink-0 border border-[#889D35]/30">
              <ShieldCheck className="w-5 h-5 text-[#889D35]" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-[#F8F5F1] tracking-wider">{t.hero.trustOutlets}</p>
              <p className="text-[11px] text-[#D2C0A7]/80">Bandung, Jakarta, Bali & Others</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#889D35]/20 flex items-center justify-center shrink-0 border border-[#889D35]/30">
              <Award className="w-5 h-5 text-[#889D35]" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-[#F8F5F1] tracking-wider">{t.hero.trustTherapists}</p>
              <p className="text-[11px] text-[#D2C0A7]/80">{language === 'en' ? 'Professional Masters' : 'Terapis Terlatih Profesional'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#889D35]/20 flex items-center justify-center shrink-0 border border-[#889D35]/30">
              <Heart className="w-5 h-5 text-[#889D35]" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-[#F8F5F1] tracking-wider">{t.hero.trustOils}</p>
              <p className="text-[11px] text-[#D2C0A7]/80">{language === 'en' ? '100% Pure Botanical' : 'Aromaterapi Organik Alami'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#889D35]/20 flex items-center justify-center shrink-0 border border-[#889D35]/30">
              <Sparkles className="w-5 h-5 text-[#889D35]" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-[#F8F5F1] tracking-wider">{t.hero.trustSuites}</p>
              <p className="text-[11px] text-[#D2C0A7]/80">{language === 'en' ? 'Serene & Clean Sanctuary' : 'Higienis, Tenang & Elegan'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
