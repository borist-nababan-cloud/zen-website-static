# Zen Family Spa Official Website - Project Summary (Updated Oct 31, 2026)

## 1. Overview & Architecture
The **Zen Family Spa & Reflexology Official Website** (`frontend\website`) is a luxury, high-performance static web application built to showcase the brand's authentic healing heritage, treatment catalog, and 10+ branch network across Indonesia.

### Core Stack:
- **Framework**: React 18 + Vite 6 + TypeScript (Strict Mode).
- **Styling**: Tailwind CSS v3 with Zen Luxury Design System tokens (`#F8F5F1` Linen Base, `#889D35` Bamboo Green/Matcha, `#D2C0A7` Warm Sand, `#3C3C32` River Stone Charcoal).
- **Typography**: Google Fonts `Playfair Display` (editorial serif headings) and `Plus Jakarta Sans` (refined clean sans-serif body).
- **Data Layer**: Direct integration with Supabase Cloud (`master_outlet`, `master_services`, `crm_leads`) via public `anon` key.
- **Icons**: Lucide React (`lucide-react`).
- **Build Target**: Fully optimized static distribution (`dist/`) with relative asset paths (`./`) ready for immediate zero-config deployment on shared hosting (cPanel/FTP), CDN, or Coolify.

---

## 2. Supabase Integration & RLS Public Protocol
The website connects directly to Supabase Cloud using the client publishable/anon key:
1. **Public Outlets (`master_outlet`)**:
   - Queries `active = true` records ordered by `kode_outlet`.
   - **Strict Data Minimization**: Selects only public-safe fields:
     `kode_outlet, name_outlet, alamat, city, province, no_telp, no_wa, email, location`.
   - Internal credentials, audit IDs, and operational keys are completely omitted from the query.
2. **Dynamic Treatment Menu (`master_services`)**:
   - Fetches active services ordered by `sort_order`.
   - Retrieves duration, pricing, categories (Signature Body Massage, Reflexology, Body Glow & Scrub, Hot Stone Therapy), and holistic benefits.
3. **Reservation & Lead Capture (`crm_leads`)**:
   - Direct client submission with RLS policy `Allow public insert crm_leads`.
   - Automatically stores customer name, phone number, chosen outlet, treatment name, visit date, visit time, guest count, special notes, and attribution source (`source = 'WEBSITE'`).
   - Includes instant WhatsApp confirmation bridge to the selected branch.

---

## 3. Visual Styling & Page Modules
Inspired by top-tier wellness retreats (`gayaspawellness.com` & `ame-spa.com`):
1. **Top Notice Bar**: Operating hours (`10:00 - 22:00 WIB/WITA`), nationwide presence notice, and WhatsApp direct hotline.
2. **Sticky Navigation (`Navbar.tsx`)**: Translucent blurred backdrop on scroll, Zen logo badge, smooth section anchors, and prominent "Reservasi" action.
3. **Hero Section (`HeroSection.tsx`)**: Full-bleed background with atmospheric gradient overlay, Zen philosophy headline ("Kembali ke Titik Nol, Rasakan Kedamaian Hakiki"), 4 trust pillars (10+ Outlets, 100% Certified Therapists, Pure Essential Oils, Private Suites), and interactive CTAs.
4. **Philosophy & Heritage (`PhilosophySection.tsx`)**: The 3 Core Pillars of Zen (Mindful Touch, Natural Ingredients, Peaceful Sanctuary) paired with sensory imagery.
5. **Services Section (`ServicesSection.tsx`)**: Dynamic category filter tabs, luxury cards with duration badges, IDR currency formatting, benefit highlights, and "Pilih Layanan Ini" auto-filling action.
6. **Outlets Section (`OutletsSection.tsx`)**: Interactive city filtering (Bandung, Jakarta, Bali, Depok, Palu, Makassar), detailed branch addresses, Google Maps directions, direct WhatsApp concierge, and 1-click branch selection.
7. **Reservation Section (`ReservationSection.tsx`)**: Premium booking form with date validation, instant feedback, and one-click WhatsApp confirmation dispatcher.
8. **Gallery Section (`GallerySection.tsx`)**: Curated ambiance showcase displaying treatment suites, volcanic basalt stones, and reflexology lounge.
9. **Testimonials Section (`TestimonialsSection.tsx`)**: Authentic 5-star customer reviews from doctors, business directors, and travelers.
10. **Footer (`Footer.tsx`)**: Comprehensive branch listings, corporate contact, operating hours, and copyright.
11. **Floating WhatsApp Concierge (`FloatingWhatsApp.tsx`)**: Accessible chat assistant for instant guest inquiries.

---

## 4. SEO & Shared Hosting Deployment Readiness
- **Vite Relative Paths**: Configured `base: './'` in `vite.config.ts` ensuring all scripts and stylesheets load properly regardless of subdirectory or domain nesting on shared hosting.
- **Search Engine Optimization**: Full `<title>`, description, keywords, Open Graph (`og:image`, `og:title`), Twitter card tags, and favicon suite.
- **Structured Data (JSON-LD)**: Schema.org `DaySpa` and `LocalBusiness` microdata embedded for rich snippets in Google search results.
- **Build Verification**: Compiles with zero TypeScript or bundler errors via `npm run build` (`dist/index.html` ~4.7KB, optimized chunks for vendor, icons, and supabase).

