import React, { useState, useEffect } from 'react';
import type { Outlet } from '../types';
import { Calendar, Menu, X, Phone, Clock, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  onBookClick: () => void;
  holdingContact?: Outlet | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick, holdingContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const rawWa = holdingContact?.no_wa || '082367867000';
  const cleanWa = rawWa.replace(/[^0-9]/g, '').replace(/^0/, '62');
  const displayWa = holdingContact?.no_wa || '+62 823-6786-7000';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Filosofi', href: '#filosofi' },
    { label: 'Menu Layanan', href: '#layanan' },
    { label: 'Lokasi Cabang', href: '#outlet' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Ulasan Tamu', href: '#ulasan' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#3C3C32] text-[#D2C0A7] text-xs py-2 px-4 border-b border-[#4A4A3E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#889D35]" /> Buka Setiap Hari: 10:00 - 22:00 WIB / WITA
            </span>
            <span className="hidden md:inline text-[#606050]">•</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#889D35]" /> 10+ Cabang Resmi di Seluruh Indonesia
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href={`https://wa.me/${cleanWa}?text=Halo%20Zen%20Family%20Spa,%20saya%20ingin%20konsultasi%20perawatan`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition flex items-center gap-1 text-[#889D35]"
            >
              <Phone className="w-3.5 h-3.5" /> Hotline WhatsApp: {displayWa}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F5F1]/95 backdrop-blur-md shadow-sm border-b border-[#E5DACB]/60 py-3'
            : 'bg-[#F8F5F1] py-4 border-b border-[#E5DACB]/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="./assets/logo.png" 
              alt="Zen Family Spa Logo" 
              className="w-10 h-10 object-contain rounded-full border border-[#D2C0A7]/50 shadow-sm"
              onError={(e) => {
                // Fallback to favicon or styled placeholder
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#3C3C32] group-hover:text-[#889D35] transition">
                ZEN
              </span>
              <span className="text-[10px] tracking-widest text-[#717163] uppercase -mt-1 font-medium">
                Family Spa & Reflexology
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#3C3C32] hover:text-[#889D35] transition tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#889D35] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#outlet"
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 text-[#3C3C32] hover:text-[#889D35] transition"
            >
              Cari Cabang
            </a>
            <button
              onClick={onBookClick}
              className="bg-[#889D35] hover:bg-[#6E8027] text-white text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition flex items-center gap-2 transform active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservasi</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onBookClick}
              className="bg-[#889D35] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reservasi</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#3C3C32] hover:text-[#889D35] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F5F1] border-b border-[#E5DACB] px-6 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base font-serif text-[#3C3C32] hover:text-[#889D35] py-2 border-b border-[#E5DACB]/40"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#outlet"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center text-sm font-medium text-[#717163] py-2"
              >
                Cari Lokasi Cabang Terdekat
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full bg-[#889D35] text-white text-sm font-medium py-3 rounded-full flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-4 h-4" />
                <span>Buat Reservasi Online</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

