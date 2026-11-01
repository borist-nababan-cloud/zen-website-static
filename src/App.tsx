import { useState, useEffect } from 'react';
import type { Outlet, Service, OutletFacility } from './types';
import {
  fetchPublicOutlets,
  fetchPublicServices,
  fetchHoldingContact,
  fetchOutletFacilities
} from './lib/supabaseClient';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection } from './components/ServicesSection';
import { OutletsSection } from './components/OutletsSection';
// import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [holdingContact, setHoldingContact] = useState<Outlet | null>(null);
  const [outletFacilities, setOutletFacilities] = useState<OutletFacility[]>([]);
  const [isLoadingOutlets, setIsLoadingOutlets] = useState<boolean>(true);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      // 1. Fetch holding contact (kode_outlet = '111') for Header, Footer, and Floating WhatsApp
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

  const scrollToOutlets = () => {
    const el = document.getElementById('outlet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#3C3C32] font-sans flex flex-col selection:bg-[#889D35] selection:text-white">
      {/* Navigation with dynamic Holding Contact (Kode 111) */}
      <Navbar onBookClick={scrollToOutlets} holdingContact={holdingContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onBookClick={scrollToOutlets} />

        {/* 2. Philosophy & Heritage Section */}
        <PhilosophySection />

        {/* 3. Services & Treatment Menu */}
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

        {/* 5. Online Reservation Form (Temporarily hidden per client request) */}
        {/* <ReservationSection
          outlets={outlets}
          services={services}
          preselectedOutlet={preselectedOutlet}
          preselectedService={preselectedService}
        /> */}

        {/* 6. Gallery Section */}
        <GallerySection />

        {/* 7. Guest Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer with dynamic Holding Contact (Kode 111) */}
      <Footer holdingContact={holdingContact} />

      {/* Sticky Concierge Floating Button with dynamic Holding WhatsApp */}
      <FloatingWhatsApp holdingContact={holdingContact} />
    </div>
  );
}

export default App;
