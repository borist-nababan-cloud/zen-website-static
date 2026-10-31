import { useState, useEffect } from 'react';
import type { Outlet, Service } from './types';
import { fetchPublicOutlets, fetchPublicServices } from './lib/supabaseClient';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection } from './components/ServicesSection';
import { OutletsSection } from './components/OutletsSection';
import { ReservationSection } from './components/ReservationSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoadingOutlets, setIsLoadingOutlets] = useState<boolean>(true);
  const [isLoadingServices, setIsLoadingServices] = useState<boolean>(true);

  // Selected state for form pre-population
  const [preselectedOutlet, setPreselectedOutlet] = useState<string | undefined>(undefined);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function loadData() {
      // 1. Fetch public outlets strictly querying public columns
      setIsLoadingOutlets(true);
      const outletsData = await fetchPublicOutlets();
      setOutlets(outletsData);
      setIsLoadingOutlets(false);

      // 2. Fetch public services
      setIsLoadingServices(true);
      const servicesData = await fetchPublicServices();
      setServices(servicesData);
      setIsLoadingServices(false);
    }

    loadData();
  }, []);

  const scrollToReservation = () => {
    const el = document.getElementById('reservasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToReservation();
  };

  const handleSelectOutlet = (kodeOutlet: string) => {
    setPreselectedOutlet(kodeOutlet);
    scrollToReservation();
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] text-[#3C3C32] font-sans flex flex-col selection:bg-[#889D35] selection:text-white">
      {/* Navigation */}
      <Navbar onBookClick={scrollToReservation} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onBookClick={scrollToReservation} />

        {/* 2. Philosophy & Heritage Section */}
        <PhilosophySection />

        {/* 3. Services & Treatment Menu */}
        <ServicesSection
          services={services}
          isLoading={isLoadingServices}
          onSelectService={handleSelectService}
        />

        {/* 4. Outlets Directory & Locator */}
        <OutletsSection
          outlets={outlets}
          isLoading={isLoadingOutlets}
          onSelectOutlet={handleSelectOutlet}
        />

        {/* 5. Online Reservation Form */}
        <ReservationSection
          outlets={outlets}
          services={services}
          preselectedOutlet={preselectedOutlet}
          preselectedService={preselectedService}
        />

        {/* 6. Gallery Section */}
        <GallerySection />

        {/* 7. Guest Testimonials */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Concierge Floating Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

