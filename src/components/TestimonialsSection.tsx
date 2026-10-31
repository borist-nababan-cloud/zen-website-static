import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'dr. Sarah Amanda',
      role: 'Dokter Umum & Tamu Setia Cabang Sukajadi',
      comment:
        'Setelah jam dinas yang padat, Zen adalah tempat pelarian favorit saya. Pijatan The Royal Touch sangat presisi mengenai titik otot yang tegang, aromaterapinya luar biasa menenangkan, dan protokol kebersihannya sangat meyakinkan.',
      rating: 5,
      date: 'Oktober 2026',
    },
    {
      name: 'Bpk. Hendra Gunawan',
      role: 'Managing Director, Jakarta Selatan',
      comment:
        'Cabang Gunawarman memiliki ambience yang sangat privat dan tenang. Parkirnya mudah, terapisnya terlatih dan sangat sopan. Sangat merekomendasikan Hot Stone Therapy untuk melepaskan penat akhir pekan bersama istri.',
      rating: 5,
      date: 'September 2026',
    },
    {
      name: 'Maya Lestari',
      role: 'Content Creator & Traveler, Bali',
      comment:
        'Sebagai penikmat spa, Zen Bali di Sunset Road memberikan pengalaman reflexology terbaik. Kursinya sangat empuk, teh jahenya segar, dan ruangan wangi serai alami. Pelayanan bintang lima dengan harga yang sangat masuk akal.',
      rating: 5,
      date: 'Oktober 2026',
    },
  ];

  return (
    <section id="ulasan" className="py-24 sm:py-32 bg-[#F4EFEB] border-t border-[#E5DACB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            Ulasan Tamu Kami
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            Kisah Relaksasi Dari Hati
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed">
            Kepercayaan ribuan keluarga Indonesia selama lebih dari 15 tahun menjadi motivasi kami untuk selalu menjaga kualitas pelayanan terbaik.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-[#E5DACB] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-[#889D35] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#D2C0A7]/50 mb-3" />

                <p className="text-xs sm:text-sm text-[#3C3C32] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DACB]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#3C3C32]">{rev.name}</h4>
                  <p className="text-[11px] text-[#717163]">{rev.role}</p>
                </div>
                <span className="text-[10px] text-[#889D35] font-medium bg-[#889D35]/10 px-2.5 py-1 rounded-full">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

