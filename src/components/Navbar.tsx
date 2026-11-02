import React, { useState, useEffect, useRef } from 'react';
import type { Outlet, WebMember } from '../types';
import type { User } from '@supabase/supabase-js';
import { useLanguage } from '../lib/i18n';
import {
  Menu,
  X,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  User as UserIcon,
  MessageSquareQuote,
  LogOut,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onBookClick?: () => void;
  holdingContact?: Outlet | null;
  currentUser: User | null;
  memberProfile: WebMember | null;
  onLoginGoogle: () => void;
  onLogout: () => void;
  onOpenProfile: () => void;
  onOpenTestimonial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  holdingContact,
  currentUser,
  memberProfile,
  onLoginGoogle,
  onLogout,
  onOpenProfile,
  onOpenTestimonial
}) => {
  const { language, setLanguage, t } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

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

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t.nav.philosophy, href: '#filosofi' },
    { label: t.nav.services, href: '#layanan' },
    { label: t.nav.outlets, href: '#outlet' },
    { label: t.nav.gallery, href: '#galeri' },
    { label: t.nav.testimonials, href: '#ulasan' },
  ];

  const displayName =
    memberProfile?.full_name ||
    currentUser?.user_metadata?.full_name ||
    currentUser?.email?.split('@')[0] ||
    'Member';

  const avatarUrl =
    memberProfile?.avatar_url || currentUser?.user_metadata?.avatar_url || null;

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#3C3C32] text-[#D2C0A7] text-xs py-2 px-4 border-b border-[#4A4A3E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#889D35]" /> {t.nav.openHours}
            </span>
            <span className="hidden md:inline text-[#606050]">•</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#889D35]" /> {t.nav.nationwide}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={`https://wa.me/${cleanWa}?text=Halo%20Zen%20Family%20Spa,%20saya%20ingin%20konsultasi%20perawatan`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1 text-[#889D35]"
            >
              <Phone className="w-3.5 h-3.5" /> {t.nav.contactUs}: {displayWa}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
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

          {/* Action CTAs, Language Switcher & Auth Section */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-[#E5DACB]/50 p-0.5 rounded-full border border-[#D2C0A7]/60 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#889D35] text-white shadow-xs'
                    : 'text-[#717163] hover:text-[#3C3C32]'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#889D35] text-white shadow-xs'
                    : 'text-[#717163] hover:text-[#3C3C32]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            <a
              href="#outlet"
              className="bg-[#889D35] hover:bg-[#6E8027] text-white text-xs uppercase tracking-widest font-semibold px-4 py-2.5 rounded-full shadow-xs hover:shadow transition flex items-center gap-1.5 transform active:scale-95 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Find Branches' : 'Cari Cabang'}</span>
            </a>

            {/* Google Login / Member Accordion Dropdown */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#D2C0A7] hover:border-[#889D35] rounded-full shadow-xs transition cursor-pointer"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-7 h-7 rounded-full object-cover border border-[#889D35]/50"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#889D35] text-white flex items-center justify-center font-bold text-xs">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-[#3C3C32] max-w-[110px] truncate">
                    {displayName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#717163] transition-transform duration-200 ${
                      isUserMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] border border-[#E5DACB] rounded-2xl shadow-xl py-2 z-50 animate-fadeIn divide-y divide-[#E5DACB]/50">
                    {/* User Header */}
                    <div className="px-4 py-3 flex items-center gap-3">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-10 h-10 rounded-full object-cover border border-[#889D35]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#889D35] text-white flex items-center justify-center font-bold text-sm">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-[#3C3C32] truncate">
                          {displayName}
                        </p>
                        <p className="text-[10px] text-[#717163] truncate">
                          {currentUser.email}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-semibold text-[#6E8027] bg-[#889D35]/15 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> Zen Member
                        </span>
                      </div>
                    </div>

                    {/* Menu Links */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#3C3C32] hover:bg-[#889D35]/10 hover:text-[#889D35] transition text-left cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-[#889D35]" />
                        <span>{t.nav.myProfile}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenTestimonial();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#3C3C32] hover:bg-[#889D35]/10 hover:text-[#889D35] transition text-left cursor-pointer"
                      >
                        <MessageSquareQuote className="w-4 h-4 text-[#889D35]" />
                        <span>{t.nav.writeReview}</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t.nav.logout}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onLoginGoogle}
                className="flex items-center gap-2 bg-white border border-[#D2C0A7] hover:border-[#889D35] text-[#3C3C32] text-xs font-semibold px-4 py-2 rounded-full shadow-2xs hover:shadow-xs transition transform active:scale-95 cursor-pointer"
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
                <span>{t.nav.memberLogin}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu & Language Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex items-center bg-[#E5DACB]/50 p-0.5 rounded-full border border-[#D2C0A7]/60 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'id' ? 'bg-[#889D35] text-white' : 'text-[#717163]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'en' ? 'bg-[#889D35] text-white' : 'text-[#717163]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#3C3C32] hover:text-[#889D35] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F5F1] border-b border-[#E5DACB] px-6 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
            {/* User Info / Login in Mobile */}
            <div className="pb-3 border-b border-[#E5DACB]/50">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover border border-[#889D35]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#889D35] text-white flex items-center justify-center font-bold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#3C3C32]">{displayName}</p>
                      <p className="text-xs text-[#717163]">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenProfile();
                      }}
                      className="px-3 py-2 bg-white border border-[#D2C0A7] rounded-xl text-xs font-medium text-[#3C3C32] text-center"
                    >
                      {t.nav.myProfile}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenTestimonial();
                      }}
                      className="px-3 py-2 bg-[#889D35]/15 border border-[#889D35]/30 rounded-xl text-xs font-medium text-[#6E8027] text-center"
                    >
                      {t.nav.writeReview}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 text-xs text-red-600 bg-red-50 rounded-xl"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.nav.logout}</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLoginGoogle();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white border border-[#D2C0A7] text-[#3C3C32] py-2.5 rounded-full text-xs font-semibold shadow-xs"
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
                  <span>{t.nav.memberLogin}</span>
                </button>
              )}
            </div>

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
                className="w-full bg-[#889D35] text-white text-sm font-medium py-3 rounded-full flex items-center justify-center gap-2 shadow"
              >
                <MapPin className="w-4 h-4" />
                <span>{language === 'en' ? 'Find Nearest Branches' : 'Cari Lokasi Cabang Terdekat'}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
