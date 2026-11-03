import { useState, useEffect } from 'react';
import type { Outlet, Service, OutletFacility, WebMember } from './types';
import type { User } from '@supabase/supabase-js';
import {
  supabase,
  fetchPublicOutlets,
  fetchPublicServices,
  fetchHoldingContact,
  fetchOutletFacilities,
  fetchMemberProfile
} from './lib/supabaseClient';
import { LanguageProvider } from './lib/i18n';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewsPromoSection } from './components/NewsPromoSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection } from './components/ServicesSection';
import { OutletsSection } from './components/OutletsSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MemberProfileModal } from './components/MemberProfileModal';
import { TestimonialModal } from './components/TestimonialModal';
import { Footer } from './components/Footer';
import { FloatingChatWidget } from './components/FloatingChatWidget';

export function App() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [holdingContact, setHoldingContact] = useState<Outlet | null>(null);
  const [outletFacilities, setOutletFacilities] = useState<OutletFacility[]>([]);
  const [isLoadingOutlets, setIsLoadingOutlets] = useState<boolean>(true);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);

  // Authentication & Member Profile state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [memberProfile, setMemberProfile] = useState<WebMember | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState<boolean>(false);

  const syncMember = async (user: User) => {
    try {
      const profile = await fetchMemberProfile(
        user.id,
        user.email,
        user.user_metadata?.full_name,
        user.user_metadata?.avatar_url
      );
      setMemberProfile(profile);
    } catch (err) {
      console.warn('Gagal sinkronisasi data member:', err);
    }
  };

  useEffect(() => {
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        syncMember(user);
      }
    });

    // 2. Auth State Change Listener
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      if (user) {
        syncMember(user);
      } else {
        setMemberProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      // 1. Fetch holding contact (kode_outlet = '111') for Header, Footer, and Floating Concierge
      fetchHoldingContact().then(setHoldingContact);

      // 2. Fetch public outlets strictly querying public columns
      setIsLoadingOutlets(true);
      const outletsData = await fetchPublicOutlets();
      setOutlets(outletsData);
      setIsLoadingOutlets(false);

      // 3. Fetch public services
      setIsLoadingServices(true);
      const servicesData = await fetchPublicServices();
      setServices(servicesData);
      setIsLoadingServices(false);

      // 4. Fetch outlet facilities mappings
      fetchOutletFacilities().then(setOutletFacilities);
    }

    loadData();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Dapatkan URL redirect absolut yang presisi untuk Safari/iOS & Chromium
      const redirectUrl = window.location.origin.replace(/\/$/, '') + (window.location.pathname || '/');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) {
        console.error('Login Google Error:', error.message);
        alert(`Gagal login dengan Google: ${error.message}`);
      }
    } catch (err: any) {
      console.error('OAuth Exception:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      setMemberProfile(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleOpenTestimonial = () => {
    if (!currentUser) {
      handleGoogleLogin();
    } else {
      setIsTestimonialModalOpen(true);
    }
  };

  const scrollToOutlets = () => {
    const el = document.getElementById('outlet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F8F5F1] text-[#3C3C32] font-sans flex flex-col selection:bg-[#889D35] selection:text-white">
        {/* Navigation with dynamic Holding Contact (Kode 111), Member Auth & Language Switcher */}
        <Navbar
          onBookClick={scrollToOutlets}
          holdingContact={holdingContact}
          currentUser={currentUser}
          memberProfile={memberProfile}
          onLoginGoogle={handleGoogleLogin}
          onLogout={handleLogout}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenTestimonial={handleOpenTestimonial}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection onBookClick={scrollToOutlets} />

          {/* 1.5. News & Promotions Carousel */}
          <NewsPromoSection />

          {/* 2. Philosophy & Heritage Section */}
          <PhilosophySection />

          {/* 3. Services & Treatment Menu with bilingual fallback */}
          <ServicesSection
            services={services}
            isLoading={isLoadingServices}
          />

          {/* 4. Outlets Directory & Locator with "Lihat Fasilitas" Modal */}
          <OutletsSection
            outlets={outlets}
            outletFacilities={outletFacilities}
            isLoading={isLoadingOutlets}
            onSelectOutlet={scrollToOutlets}
          />

          {/* 5. Gallery Section */}
          <GallerySection />

          {/* 6. Guest Testimonials with 5 Smile Ratings & Member submission */}
          <TestimonialsSection
            currentUser={currentUser}
            onOpenTestimonial={handleOpenTestimonial}
            onLoginGoogle={handleGoogleLogin}
          />
        </main>

        {/* Footer with dynamic Holding Contact (Kode 111) */}
        <Footer holdingContact={holdingContact} />

        {/* Interactive Floating CRM Chat Widget (Realtime Chat & WhatsApp Fallback) */}
        <FloatingChatWidget
          currentUser={currentUser}
          memberProfile={memberProfile}
          outlets={outlets}
          holdingContact={holdingContact}
          onLoginGoogle={handleGoogleLogin}
        />

        {/* Member Profile Modal */}
        {memberProfile && (
          <MemberProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            member={memberProfile}
            onProfileUpdated={(updated) => setMemberProfile(updated)}
          />
        )}

        {/* Write Testimonial Modal */}
        {memberProfile && (
          <TestimonialModal
            isOpen={isTestimonialModalOpen}
            onClose={() => setIsTestimonialModalOpen(false)}
            member={memberProfile}
            outlets={outlets}
            onSubmitted={() => {
              // Testimonial submitted successfully
            }}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;
