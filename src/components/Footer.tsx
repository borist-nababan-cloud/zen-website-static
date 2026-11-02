import React from 'react';
import type { Outlet } from '../types';
import { useLanguage } from '../lib/i18n';
import { Phone, Mail, MapPin, Clock, Heart, Shield, MessageSquare } from 'lucide-react';

interface FooterProps {
  holdingContact?: Outlet | null;
}

export const Footer: React.FC<FooterProps> = ({ holdingContact }) => {
  const { language, t } = useLanguage();

  const displayWa = holdingContact?.no_wa || '+62 823-6786-7000';
  const displayPhone = holdingContact?.no_telp || '022-2003788';
  const displayAddress = holdingContact?.alamat || 'Jl. Surya Sumantri No. 182, Bandung, Jawa Barat';
  const displayEmail = holdingContact?.email || 'info@zenfamilyspa.id';

  return (
    <footer className="bg-[#25251F] text-[#D2C0A7] pt-20 pb-12 border-t border-[#3C3C32] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-[#3C3C32]">
          
          {/* Brand Info (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="./assets/logo.png"
                alt="Zen Family Spa Logo"
                className="w-12 h-12 object-contain rounded-full border border-[#D2C0A7]/30"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#F8F5F1] block">
                  ZEN
                </span>
                <span className="text-[10px] tracking-widest text-[#D2C0A7] uppercase block -mt-1 font-semibold">
                  Family Spa & Reflexology
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#A0A090] leading-relaxed max-w-sm">
              {t.footer.aboutText}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#889D35]">
              <Shield className="w-4 h-4 shrink-0" />
              <span>
                {language === 'en'
                  ? 'Certified Five-Star Hygiene & Comfort Standards'
                  : 'Standar Kebersihan & Kenyamanan Bersertifikasi'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#F8F5F1]">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-[#A0A090]">
              <li>
                <a href="#filosofi" className="hover:text-white transition">{t.nav.philosophy}</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">{t.nav.services}</a>
              </li>
              <li>
                <a href="#outlet" className="hover:text-white transition">{t.nav.outlets}</a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition">{t.nav.gallery}</a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-white transition">{t.nav.testimonials}</a>
              </li>
            </ul>
          </div>

          {/* Active Branches */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#F8F5F1]">
              {t.footer.allBranches}
            </h4>
            <ul className="space-y-2 text-xs text-[#A0A090]">
              <li>Bandung (Sukajadi, Surya Sumantri, Mekarwangi, KBP)</li>
              <li>Jakarta Selatan (Gunawarman, Pakubuwono)</li>
              <li>Bali (Seminyak / Sunset Road)</li>
              <li>Depok (Margonda Raya)</li>
              <li>Makassar (Pelita Raya, Panakkukang)</li>
              <li>Palu (Moh. Hatta, Palu Timur)</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#F8F5F1]">
              {t.footer.headOffice}
            </h4>
            <div className="space-y-2.5 text-xs text-[#A0A090]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#889D35] shrink-0 mt-0.5" />
                <span>{displayAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#889D35] shrink-0" />
                <span>{t.nav.openHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#889D35] shrink-0" />
                <span>Hotline: {displayPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#889D35] shrink-0" />
                <span>WhatsApp: {displayWa}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#889D35] shrink-0" />
                <span>Email: {displayEmail}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717163]">
          <p>© {new Date().getFullYear()} Zen Family Spa & Reflexology. {t.footer.rights}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#889D35] fill-current" /> for Authentic Family Wellness
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
