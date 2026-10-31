import React from 'react';
import { Phone, Mail, MapPin, Clock, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#25251F] text-[#D2C0A7] pt-20 pb-12 border-t border-[#3C3C32]">
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
              Oase relaksasi keluarga terbaik di Indonesia dengan perpaduan tradisi pijat Nusantara, 
              teknik akupresur modern, dan minyak esensial alami. Memberikan kenyamanan holistik sejak 2010.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#889D35]">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Standar Kebersihan & Kenyamanan Bersertifikasi</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#F8F5F1]">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-[#A0A090]">
              <li>
                <a href="#filosofi" className="hover:text-white transition">Filosofi Zen</a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-white transition">Menu Perawatan</a>
              </li>
              <li>
                <a href="#outlet" className="hover:text-white transition">Lokasi Cabang</a>
              </li>
              <li>
                <a href="#reservasi" className="hover:text-white transition">Reservasi Online</a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-white transition">Galeri Suasana</a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-white transition">Ulasan Tamu</a>
              </li>
            </ul>
          </div>

          {/* Active Branches */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#F8F5F1]">
              Kota Cabang Kami
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
              Kontak & Operasional
            </h4>
            <div className="space-y-3 text-xs text-[#A0A090]">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#889D35] shrink-0 mt-0.5" />
                <span>Buka Setiap Hari:<br />10:00 - 22:00 WIB/WITA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#889D35] shrink-0" />
                <a href="https://wa.me/628122000168" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp: +62 812-2000-168
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#889D35] shrink-0" />
                <a href="mailto:info@zenfamilyspa.id" className="hover:text-white transition">
                  info@zenfamilyspa.id
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#889D35] shrink-0 mt-0.5" />
                <span>Kantor Pusat: Jl. Sukajadi No. 168, Bandung, Jawa Barat</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#717163]">
          <p>© {new Date().getFullYear()} Zen Family Spa & Reflexology. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1 text-[#889D35]">
            <span>Didedikasikan untuk Relaksasi Keluarga Indonesia</span>
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};

