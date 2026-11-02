import React from 'react';
import { useLanguage } from '../lib/i18n';
import { Feather, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section id="filosofi" className="py-24 sm:py-32 bg-[#F8F5F1] relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            {t.philosophy.badge}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-6">
            {t.philosophy.title}
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            {t.philosophy.subtitle}
          </p>
        </div>

        {/* 2-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">

          {/* Left Column: Visual Composition with overlapping luxury cards */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <img
                src="./assets/gallery/carousel(2).jpg"
                alt="Perawatan Tradisional Zen"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25251F]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs uppercase tracking-widest text-[#D2C0A7] font-semibold mb-1">
                  {language === 'en' ? 'Holistic Sensory Journey' : 'Pengalaman Sensorik Holistik'}
                </p>
                <p className="font-serif text-lg italic text-[#F8F5F1]">
                  {language === 'en'
                    ? '"A peaceful body is the true sanctuary of a calm mind."'
                    : '"Tubuh yang tenang adalah rumah bagi pikiran yang damai."'}
                </p>
              </div>
            </div>

            {/* Floating Mini Accent Card */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 lg:-right-8 bg-white p-5 rounded-xl shadow-2xl border border-[#E5DACB] max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#889D35]/15 flex items-center justify-center text-[#889D35]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#3C3C32] tracking-wider">
                    {language === 'en' ? 'Authentic Heritage' : 'Warisan Asli'}
                  </h4>
                  <p className="text-[11px] text-[#717163]">
                    {language === 'en' ? '100% Pure Botanicals' : '100% Bahan Alami'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#717163] leading-relaxed">
                {language === 'en'
                  ? 'Pure cold-pressed virgin coconut oil blended with authentic floral extracts and botanical roots.'
                  : 'Ramuan minyak kelapa murni dipadukan ekstrak bunga kenanga, melati, dan rempah Nusantara.'}
              </p>
            </div>
          </div>

          {/* Right Column: Three Core Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#889D35]">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Our Treatment Pillars' : 'Prinsip Perawatan Kami'}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#3C3C32]">
                {t.philosophy.title}
              </h3>
              <p className="text-sm text-[#717163] leading-relaxed">
                {language === 'en'
                  ? 'Every single moment of your visit is crafted for uncompromised peace, from the first sip of warm herbal ginger tea to the conclusion of your treatment.'
                  : 'Setiap detik kunjungan Anda di Zen dirancang untuk memberikan kenyamanan tanpa kompromi, mulai dari tegukan pertama teh jahe hangat hingga akhir sesi perawatan.'}
              </p>
            </div>

            <div className="space-y-6 pt-2">
              {/* Pillar 1 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/70 transition border border-transparent hover:border-[#E5DACB]">
                <div className="w-12 h-12 rounded-xl bg-[#889D35]/15 text-[#889D35] flex items-center justify-center shrink-0 mt-0.5">
                  <Feather className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#3C3C32] mb-1 font-serif">
                    1. {t.philosophy.pillar1Title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717163] leading-relaxed">
                    {t.philosophy.pillar1Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/70 transition border border-transparent hover:border-[#E5DACB]">
                <div className="w-12 h-12 rounded-xl bg-[#889D35]/15 text-[#889D35] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#3C3C32] mb-1 font-serif">
                    2. {t.philosophy.pillar2Title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717163] leading-relaxed">
                    {t.philosophy.pillar2Desc}
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/70 transition border border-transparent hover:border-[#E5DACB]">
                <div className="w-12 h-12 rounded-xl bg-[#889D35]/15 text-[#889D35] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-[#3C3C32] mb-1 font-serif">
                    3. {t.philosophy.pillar3Title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717163] leading-relaxed">
                    {t.philosophy.pillar3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
