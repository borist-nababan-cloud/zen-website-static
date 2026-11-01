import React from 'react';
import { Feather, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="filosofi" className="py-24 sm:py-32 bg-[#F8F5F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            Filosofi & Nilai Zen
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-6">
            Ketenangan di Tengah <br />
            <span className="italic font-light text-[#6E8027]">Kehidupan Modern</span>
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            Terinspirasi dari harmoni alam dan kearifan tradisional Nusantara, Zen Family Spa menghadirkan
            tempat perlindungan batin untuk memulihkan energi, melepaskan lelah, dan memperbarui vitalitas tubuh Anda.
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
                  Pengalaman Sensorik Holistik
                </p>
                <p className="font-serif text-lg italic text-[#F8F5F1]">
                  "Tubuh yang tenang adalah rumah bagi pikiran yang damai."
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
                  <h4 className="text-xs uppercase font-bold text-[#3C3C32] tracking-wider">Warisan Asli</h4>
                  <p className="text-[11px] text-[#717163]">100% Bahan Alami</p>
                </div>
              </div>
              <p className="text-xs text-[#717163] leading-relaxed">
                Ramuan minyak kelapa murni dipadukan ekstrak bunga kenanga, melati, dan rempah Nusantara.
              </p>
            </div>
          </div>

          {/* Right Column: Three Core Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#889D35]">
                <Compass className="w-3.5 h-3.5" />
                <span>Prinsip Perawatan Kami</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#3C3C32]">
                Tiga Pilar Keseimbangan Zen
              </h3>
              <p className="text-sm text-[#717163] leading-relaxed">
                Setiap detik kunjungan Anda di Zen dirancang untuk memberikan kenyamanan tanpa kompromi,
                mulai dari tegukan pertama teh jahe hangat hingga akhir sesi perawatan.
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
                    1. Sentuhan Terapis Berjiwa (Mindful Touch)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717163] leading-relaxed">
                    Terapis kami menjalani pelatihan berkala berstandar nasional, menguasai anatomi otot dan
                    titik akupresur untuk melancarkan sumbatan energi dengan tekanan yang tepat sesuai preferensi Anda.
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
                    2. Ramuan Herbal Murni Tanpa Kimia Sintetis
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717163] leading-relaxed">
                    Kami hanya menggunakan minyak pijat berbahan dasar tumbuhan nabati murni dan lulur beras tradisional
                    yang menutrisi kulit secara mendalam serta aman untuk kulit sensitif.
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
                    3. Suasana Hening & Standar Higienitas Prima
                  </h4>
                  <p className="text-xs sm:text-sm text-[#717163] leading-relaxed">
                    Sprei, kain sarung, dan handuk disterilisasi setiap kali selesai digunakan. Ruangan privat dengan
                    aroma serai yang menenangkan dan alunan musik meditatif menciptakan atmosfer ketenangan mutlak.
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

