import React, { createContext, useContext, useState } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    philosophy: string;
    services: string;
    outlets: string;
    gallery: string;
    testimonials: string;
    memberLogin: string;
    myProfile: string;
    writeReview: string;
    logout: string;
    bookNow: string;
    openHours: string;
    nationwide: string;
    contactUs: string;
  };
  // Hero
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaServices: string;
    ctaOutlets: string;
    trustOutlets: string;
    trustTherapists: string;
    trustOils: string;
    trustSuites: string;
  };
  // Philosophy
  philosophy: {
    badge: string;
    title: string;
    subtitle: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
  };
  // Services
  services: {
    badge: string;
    title: string;
    subtitle: string;
    catAll: string;
    catBody: string;
    catReflex: string;
    catAddition: string;
    duration: string;
    minutes: string;
    benefitsTitle: string;
    availableAt: string;
    hideBranches: string;
    inquireWa: string;
    noBranches: string;
  };
  // Outlets
  outlets: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    operatingHours: string;
    getDirections: string;
    viewFacilities: string;
    chatReception: string;
    facilitiesTitle: string;
    noFacilities: string;
    close: string;
  };
  // Gallery
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
  };
  // Testimonials
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    writeReviewBtn: string;
    guestReview: string;
    verifiedGuest: string;
  };
  // Footer
  footer: {
    aboutText: string;
    headOffice: string;
    allBranches: string;
    quickLinks: string;
    operatingNotice: string;
    rights: string;
  };
  // Chat Widget
  chat: {
    title: string;
    subtitleOnline: string;
    loginRequiredTitle: string;
    loginRequiredDesc: string;
    loginGoogleBtn: string;
    chatViaWa: string;
    greetingTitle: string;
    greetingDesc: string;
    quickReservation: string;
    quickFaq: string;
    quickHolding: string;
    selectOutletPlaceholder: string;
    confirmOutletBtn: string;
    inputPlaceholder: string;
    sendBtn: string;
    botBadge: string;
    outletStaffBadge: string;
    holdingStaffBadge: string;
    statusWaiting: string;
    statusActive: string;
    statusResolved: string;
    startNewChat: string;
    backToMenu: string;
    faqTitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      philosophy: 'Filosofi',
      services: 'Layanan',
      outlets: 'Cabang',
      gallery: 'Galeri',
      testimonials: 'Ulasan',
      memberLogin: 'Masuk Member',
      myProfile: 'Profil Saya',
      writeReview: 'Tulis Ulasan Tamu',
      logout: 'Keluar',
      bookNow: 'Reservasi',
      openHours: 'Buka Setiap Hari: 10:00 - 23:00 WIB/WITA',
      nationwide: 'Jaringan 10+ Cabang di Indonesia',
      contactUs: 'Hubungi Hotline'
    },
    hero: {
      badge: 'Rumah Relaksasi Spa Keluarga Otentik',
      titleLine1: 'Kembali ke Titik Nol,',
      titleLine2: 'Rasakan Kedamaian Hakiki.',
      subtitle: 'Rasakan sentuhan penyembuhan otentik Nusantara dan refleksi holistik dalam keheningan alami. Perjalanan relaksasi murni untuk memulihkan keharmonisan tubuh, pikiran, dan jiwa.',
      ctaServices: 'Eksplorasi Perawatan',
      ctaOutlets: 'Cari Cabang Terdekat',
      trustOutlets: '10+ Cabang di Indonesia',
      trustTherapists: '100% Terapis Tersertifikasi',
      trustOils: 'Minyak Esensial Alami',
      trustSuites: 'Suasana Privat & Nyaman'
    },
    philosophy: {
      badge: 'Filosofi Penyembuhan',
      title: 'Tiga Pilar Keheningan Zen',
      subtitle: 'Dedikasi kami menyajikan ruang kedamaian keluarga dengan teknik warisan leluhur dan bahan-bahan botani alami murni.',
      pillar1Title: 'Sentuhan Penuh Kesadaran',
      pillar1Desc: 'Setiap gerakan pijat diresapi perhatian penuh kesadaran dan niat tulus untuk mengurai ketegangan fisik serta menyelaraskan energi meridian.',
      pillar2Title: 'Kekayaan Rempah Alami',
      pillar2Desc: 'Menggunakan racikan minyak esensial tumbuhan murni, garam mineral laut dalam, serta lulur herbal segar tanpa bahan kimia buatan.',
      pillar3Title: 'Rumah Kedamaian Keluarga',
      pillar3Desc: 'Suasana tenang dengan pencahayaan hangat temaram, alunan musik meditatif, dan aromaterapi menenangkan yang ramah untuk seluruh anggota keluarga.'
    },
    services: {
      badge: 'Katalog Perawatan',
      title: 'Ritual Relaksasi Holistik',
      subtitle: 'Temukan pilihan perawatan tubuh dan refleksi kaki yang dirancang khusus untuk memulihkan vitalitas Anda.',
      catAll: 'Semua Perawatan',
      catBody: 'Pijat Tubuh (Body)',
      catReflex: 'Refleksi Kaki (Reflexology)',
      catAddition: 'Perawatan Tambahan',
      duration: 'Durasi',
      minutes: 'Menit',
      benefitsTitle: 'Manfaat Utama Perawatan:',
      availableAt: 'Cek Ketersediaan Cabang',
      hideBranches: 'Tutup Daftar Cabang',
      inquireWa: 'Tanya Tarif & Booking via WA',
      noBranches: 'Layanan tersedia di seluruh cabang reguler.'
    },
    outlets: {
      badge: 'Jaringan Cabang',
      title: 'Temukan Cabang Zen Terdekat',
      subtitle: 'Hadir di berbagai kota utama Indonesia dengan standar kenyamanan, privasi, dan kebersihan yang konsisten.',
      filterAll: 'Semua Kota',
      operatingHours: 'Buka Setiap Hari: 10:00 - 23:00',
      getDirections: 'Petunjuk Arah Google Maps',
      viewFacilities: 'Lihat Fasilitas Cabang',
      chatReception: 'Chat Resepsionis Cabang',
      facilitiesTitle: 'Fasilitas Cabang:',
      noFacilities: 'Informasi fasilitas cabang sedang diperbarui.',
      close: 'Tutup'
    },
    gallery: {
      badge: 'Suasana & Keheningan',
      title: 'Galeri Momen Kedamaian',
      subtitle: 'Sekilas ruang relaksasi, kemewahan alami bebatuan basal, dan kehangatan sambutan di Zen Family Spa.'
    },
    testimonials: {
      badge: 'Cerita Tamu',
      title: 'Pengalaman & Kepercayaan Tamu',
      subtitle: 'Ulasan jujur dari para tamu yang telah merasakan ketenangan dan pemulihan tubuh di Zen Family Spa.',
      writeReviewBtn: 'Tulis Ulasan Kunjungan Anda',
      guestReview: 'Ulasan Tamu',
      verifiedGuest: 'Tamu Terverifikasi'
    },
    footer: {
      aboutText: 'Zen Family Spa & Reflexology adalah pelopor spa keluarga premium dengan perpaduan tradisi penyembuhan Nusantara dan kenyamanan modern bintang lima.',
      headOffice: 'Kantor Pusat',
      allBranches: 'Cabang Kami di Indonesia',
      quickLinks: 'Tautan Cepat',
      operatingNotice: 'Buka setiap hari mulai pukul 10:00 hingga 22:00 waktu setempat.',
      rights: 'Hak Cipta Dilindungi Undang-Undang.'
    },
    chat: {
      title: 'Zen Concierge',
      subtitleOnline: 'Resepsionis Cabang & Live Support',
      loginRequiredTitle: 'Masuk Member untuk Mulai Chat',
      loginRequiredDesc: 'Untuk terhubung langsung dengan staf resepsionis cabang dan menyimpan riwayat percakapan Anda, silakan masuk dengan akun Google Member Anda.',
      loginGoogleBtn: 'Masuk dengan Google',
      chatViaWa: 'Atau Hubungi WhatsApp Hotline',
      greetingTitle: 'Selamat Datang di Zen Family Spa!',
      greetingDesc: 'Halo Kak! Kami siap membantu kebutuhan relaksasi Anda hari ini. Silakan pilih menu di bawah ini:',
      quickReservation: '📅 Reservasi Jadwal Cabang',
      quickFaq: '💬 Tanya Layanan & Info Spa',
      quickHolding: '👤 Hubungi CS Pusat',
      selectOutletPlaceholder: 'Pilih Cabang Zen Tujuan...',
      confirmOutletBtn: 'Hubungkan ke Resepsionis Cabang Ini',
      inputPlaceholder: 'Ketik pesan Anda di sini...',
      sendBtn: 'Kirim',
      botBadge: 'HAI ZEN',
      outletStaffBadge: 'Resepsionis Cabang',
      holdingStaffBadge: 'Customer Care',
      statusWaiting: 'Menghubungkan ke Staf...',
      statusActive: 'Sedang Terhubung',
      statusResolved: 'Percakapan Selesai',
      startNewChat: 'Mulai Percakapan Baru',
      backToMenu: 'Kembali ke Menu Utama',
      faqTitle: 'Pertanyaan yang Sering Diajukan (FAQ)'
    }
  },
  en: {
    nav: {
      home: 'Home',
      philosophy: 'Philosophy',
      services: 'Treatments',
      outlets: 'Branches',
      gallery: 'Gallery',
      testimonials: 'Reviews',
      memberLogin: 'Member Sign In',
      myProfile: 'My Profile',
      writeReview: 'Write a Review',
      logout: 'Sign Out',
      bookNow: 'Book Treatment',
      openHours: 'Open Daily: 10:00 AM - 11:00 PM (Local Time)',
      nationwide: '10+ Branches Across Indonesia',
      contactUs: 'Hotline Contact'
    },
    hero: {
      badge: 'Authentic Family Wellness',
      titleLine1: 'Return to Serenity,',
      titleLine2: 'Discover Pure Peace.',
      subtitle: 'Experience authentic healing traditions and holistic reflexology in pure natural tranquility. A revitalizing journey to restore perfect harmony across body, mind, and spirit.',
      ctaServices: 'Explore Treatments',
      ctaOutlets: 'Find Nearby Branches',
      trustOutlets: '10+ Branches in Indonesia',
      trustTherapists: '100% Certified Therapists',
      trustOils: 'Pure Botanical Essential Oils',
      trustSuites: 'Private & Serene Suites'
    },
    philosophy: {
      badge: 'Healing Philosophy',
      title: 'The Three Pillars of Zen Stillness',
      subtitle: 'Our dedicated commitment to crafting a tranquil family retreat through time-honored techniques and pure botanical ingredients.',
      pillar1Title: 'Mindful Touch',
      pillar1Desc: 'Every massage movement is delivered with mindful presence and dedicated intent to dissolve physical tension and rebalance energetic meridians.',
      pillar2Title: 'Pure Botanical Botanicals',
      pillar2Desc: 'Utilizing pure botanical essential oils, deep sea mineral salts, and fresh herbal body polishes crafted free of harsh artificial additives.',
      pillar3Title: 'Peaceful Family Place',
      pillar3Desc: 'A serene ambiance with warm ambient illumination, soothing meditative soundscapes, and calming aromatherapy suitable for all family members.'
    },
    services: {
      badge: 'Treatment Catalog',
      title: 'Holistic Wellness Rituals',
      subtitle: 'Discover our curated selection of body massages and reflexology therapies tailored to rejuvenate your vitality.',
      catAll: 'All Treatments',
      catBody: 'Body Massage',
      catReflex: 'Foot Reflexology',
      catAddition: 'Add-on Treatments',
      duration: 'Duration',
      minutes: 'Mins',
      benefitsTitle: 'Key Treatment Benefits:',
      availableAt: 'Check Branch Availability',
      hideBranches: 'Hide Branch List',
      inquireWa: 'Inquire Rate & Book via WhatsApp',
      noBranches: 'Available across all regular branches.'
    },
    outlets: {
      badge: 'Branch Network',
      title: 'Find Your Nearest Zen Branch',
      subtitle: 'Serving major destinations across Indonesia with consistent standards of luxury, privacy, and hygiene.',
      filterAll: 'All Cities',
      operatingHours: 'Open Daily: 10:00 AM - 11:00 PM',
      getDirections: 'Google Maps Directions',
      viewFacilities: 'View Branch Amenities',
      chatReception: 'Chat Branch Reception',
      facilitiesTitle: 'Branch Amenities:',
      noFacilities: 'Facility details are currently being updated.',
      close: 'Close'
    },
    gallery: {
      badge: 'Ambiance & Serenity',
      title: 'Moments of Pure Stillness',
      subtitle: 'A glimpse into our serene relaxation suites, warm basalt stones, and welcoming hospitality at Zen Family Spa.'
    },
    testimonials: {
      badge: 'Guest Stories',
      title: 'Cherished Guest Experiences',
      subtitle: 'Genuine reviews from guests who have found deep physical renewal and peace of mind at Zen Family Spa.',
      writeReviewBtn: 'Write a Guest Review',
      guestReview: 'Guest Review',
      verifiedGuest: 'Verified Guest'
    },
    footer: {
      aboutText: 'Zen Family Spa & Reflexology is Indonesia’s premier family spa combining time-honored healing heritage with refined five-star comfort.',
      headOffice: 'Headquarters',
      allBranches: 'Our Branches in Indonesia',
      quickLinks: 'Quick Links',
      operatingNotice: 'Open daily from 10:00 AM to 10:00 PM local time.',
      rights: 'All Rights Reserved.'
    },
    chat: {
      title: 'Zen Concierge',
      subtitleOnline: 'Branch Reception & Live Support',
      loginRequiredTitle: 'Member Sign-In Required',
      loginRequiredDesc: 'To chat directly with our branch receptionists and save your message history, please sign in with your Google Member account.',
      loginGoogleBtn: 'Sign in with Google',
      chatViaWa: 'Or Contact WhatsApp Hotline',
      greetingTitle: 'Welcome to Zen Family Spa!',
      greetingDesc: 'Hello! We are delighted to assist your wellness journey today. Please select an option below:',
      quickReservation: '📅 Branch Appointment Reservation',
      quickFaq: '💬 Treatment FAQs & Info',
      quickHolding: '👤 Contact Central Customer Care',
      selectOutletPlaceholder: 'Select your target Zen branch...',
      confirmOutletBtn: 'Connect to this Branch Reception',
      inputPlaceholder: 'Type your message here...',
      sendBtn: 'Send',
      botBadge: 'HAI ZEN',
      outletStaffBadge: 'Branch Reception Staff',
      holdingStaffBadge: 'Central Customer Care',
      statusWaiting: 'Connecting to Staff...',
      statusActive: 'Currently Connected',
      statusResolved: 'Conversation Resolved',
      startNewChat: 'Start a New Chat',
      backToMenu: 'Back to Main Menu',
      faqTitle: 'Frequently Asked Questions (FAQ)'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  getLocalizedText: (idText?: string | null, enText?: string | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('zen_language');
    return saved === 'en' ? 'en' : 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('zen_language', lang);
  };

  const getLocalizedText = (idText?: string | null, enText?: string | null): string => {
    if (language === 'en' && enText && enText.trim().length > 0) {
      return enText;
    }
    return idText || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        getLocalizedText
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
