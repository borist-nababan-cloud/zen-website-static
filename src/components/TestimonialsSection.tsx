import React, { useState, useEffect } from 'react';
import type { WebTestimonial } from '../types';
import type { User } from '@supabase/supabase-js';
import { fetchPublicTestimonials } from '../lib/supabaseClient';
import {
  Quote,
  MapPin,
  Calendar,
  Angry,
  Frown,
  Meh,
  Smile,
  Laugh,
  MessageSquarePlus,
  X,
  ExternalLink
} from 'lucide-react';

interface TestimonialsSectionProps {
  currentUser: User | null;
  onOpenTestimonial: () => void;
  onLoginGoogle: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  currentUser,
  onOpenTestimonial,
  onLoginGoogle
}) => {
  const [testimonials, setTestimonials] = useState<WebTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      setIsLoading(true);
      const data = await fetchPublicTestimonials(6);
      setTestimonials(data);
      setIsLoading(false);
    }
    loadTestimonials();
  }, []);

  const renderSmileRating = (rating: number) => {
    const smiles = [
      { score: 1, label: 'Sangat Kecewa', icon: Angry, color: 'text-red-500' },
      { score: 2, label: 'Kurang Puas', icon: Frown, color: 'text-amber-500' },
      { score: 3, label: 'Cukup', icon: Meh, color: 'text-yellow-600' },
      { score: 4, label: 'Puas', icon: Smile, color: 'text-[#889D35]' },
      { score: 5, label: 'Sangat Puas', icon: Laugh, color: 'text-[#6E8027]' }
    ];

    const current = smiles.find((s) => s.score === rating) || smiles[4];

    return (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1">
          {smiles.map((s) => {
            const SIcon = s.icon;
            const isMatch = s.score === rating;
            return (
              <span
                key={s.score}
                className={`transition-transform ${
                  isMatch ? `${s.color} scale-110` : 'text-neutral-300 opacity-40'
                }`}
                title={s.label}
              >
                <SIcon className="w-4 h-4" />
              </span>
            );
          })}
        </div>
        <span className="text-[11px] font-semibold text-[#717163] ml-1">
          {current.label}
        </span>
      </div>
    );
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '-';
    }
  };

  return (
    <section id="ulasan" className="py-24 sm:py-32 bg-[#F4EFEB] border-t border-[#E5DACB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest text-[#889D35] font-semibold mb-3">
            Ulasan Tamu Kami
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3C3C32] font-normal leading-tight mb-4">
            Kisah Relaksasi Dari Hati
          </h2>
          <div className="w-16 h-[2px] bg-[#889D35] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#717163] leading-relaxed mb-6">
            Kepercayaan ribuan keluarga Indonesia selama lebih dari 15 tahun menjadi motivasi kami
            untuk selalu menjaga sentuhan relaksasi dan kehangatan pelayanan terbaik.
          </p>

          {/* Write Review Trigger Button */}
          <div className="inline-block">
            {currentUser ? (
              <button
                type="button"
                onClick={onOpenTestimonial}
                className="inline-flex items-center gap-2 bg-[#889D35] hover:bg-[#6E8027] text-white text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition transform active:scale-95 cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Tulis Ulasan Pengalaman Anda</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onLoginGoogle}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-50 text-[#3C3C32] border border-[#D2C0A7] hover:border-[#889D35] text-xs font-semibold px-6 py-3 rounded-full shadow-sm hover:shadow transition transform active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Masuk Member untuk Tulis Ulasan</span>
              </button>
            )}
          </div>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white/60 rounded-3xl p-8 border border-[#E5DACB]/50 animate-pulse space-y-4"
              >
                <div className="w-24 h-4 bg-neutral-200 rounded" />
                <div className="w-full h-16 bg-neutral-200 rounded" />
                <div className="w-32 h-4 bg-neutral-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DACB] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Smile Rating & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    {renderSmileRating(rev.rating)}
                    <Quote className="w-6 h-6 text-[#D2C0A7]/40" />
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-[#3C3C32] leading-relaxed italic mb-5 line-clamp-6">
                    "{rev.comment}"
                  </p>

                  {/* Photo Thumbnail if provided */}
                  {rev.photo_url && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setSelectedPhoto(rev.photo_url || null)}
                        className="relative group rounded-2xl overflow-hidden border border-[#E5DACB] block focus:outline-none"
                      >
                        <img
                          src={rev.photo_url}
                          alt={`Foto kunjungan oleh ${rev.customer_name}`}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs gap-1 font-medium">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Perbesar Foto</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer: User Identity & Outlet Visited */}
                <div className="pt-4 border-t border-[#E5DACB]/60 space-y-2">
                  <div className="flex items-center gap-3">
                    {rev.customer_avatar ? (
                      <img
                        src={rev.customer_avatar}
                        alt={rev.customer_name}
                        className="w-9 h-9 rounded-full object-cover border border-[#D2C0A7]"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#889D35] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {rev.customer_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#3C3C32] truncate">
                        {rev.customer_name}
                      </h4>
                      <p className="text-[10px] text-[#889D35] font-semibold">
                        Tamu Terverifikasi
                      </p>
                    </div>
                  </div>

                  {/* Outlet & Date Metadata */}
                  <div className="flex items-center justify-between text-[10px] text-[#717163] pt-1">
                    <span className="flex items-center gap-1 truncate max-w-[60%]">
                      <MapPin className="w-3 h-3 text-[#889D35] shrink-0" />
                      <span className="truncate">
                        {rev.master_outlet?.name_outlet || 'Zen Family Spa'}
                        {rev.master_outlet?.city ? ` (${rev.master_outlet.city})` : ''}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(rev.created_at)}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-2xl max-h-[85vh] bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-full backdrop-blur-md transition"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPhoto}
                alt="Foto Ulasan Tamu Zen"
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
