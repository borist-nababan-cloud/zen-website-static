# Zen Family Spa Official Website - Project Summary (Updated Nov 3, 2026)

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
2. **Dynamic Treatment Menu (`web_services` & `web_outlet_services`)**:
   - Fetches active services ordered by `sort_order` strictly under 3 categories: `Body Massage`, `Foot Reflexology`, `Addition`.
   - **Zero-Price Standard**: In accordance with executive policy, prices are omitted from the public static site and branch settings to eliminate customer misperceptions due to city-by-city rate variations across Zen's 10 branches.
   - **Multi-Branch Availability Accordion**: Each service card features an expandable list showing all active branches that offer the treatment, along with branch-specific notes and a direct WhatsApp inquiry button (`Tanya Tarif`).
3. **Reservation Section Status**:
   - Temporarily hidden from the static website view per management directive. "Reservasi" buttons in Header and Hero sections have been replaced with direct branch discovery actions ("Cari Cabang" / "Eksplorasi Perawatan").

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



---

## 5. Website Facilities & Multi-Branch Contact Sync (Updated Nov 01, 2026)
- **Central Contact Synchronization (Kode Outlet '111')**:
  - Top header hotline, footer operational contacts, and floating WhatsApp concierge dynamically ingest verified contact details (`no_wa: 082367867000`, `no_telp: 022-2003788`, and head office address) directly from `master_outlet` where `kode_outlet = '111'` (Zen Holding).
- **Branch Facilities Integration (`web_facilities` & `web_outlet_facilities`)**:
  - Public static web features an interactive **"Lihat Fasilitas Cabang"** modal on each outlet card in `OutletsSection.tsx`.
  - Displays rich facility cards with matching Lucide icons (`Bath`, `Sparkles`, `Zap`, `ShowerHead`, `Armchair`, `Coffee`, `Wifi`, `Car`), category badges, custom branch notes (e.g. unit counts), and up to 2 high-resolution photos per facility.
  - Temporary action button "Pilih & Reservasi di Cabang Ini" on the outlet cards is cleanly hidden as requested.
- **WHM Admin Panel Integration**:
  - Menu group "Web Data" and submenu "Master Fasilitas" (`/web/facilities`) in `frontend\warehousemanagement` allows admin roles `[5, 8, 18, 13]` to manage the master catalog.
  - Outlet admins (Role 6) manage active branch facilities via `OutletInfoPage.tsx`.

---

## 6. Dynamic Gallery & Storage Integration (`web_galleries` & `web-gallery`)
- **Supabase Storage Bucket (`web-gallery`)**: Public bucket (5 MB limit, JPG/PNG/WebP) storing authentic Zen ambiance photos.
- **Dynamic Ambiance Grid (`GallerySection.tsx`)**: Queries `public.web_galleries` where `active = true` ordered by `sort_order ASC`.
- **WHM Management (`/web/gallery`)**: Admin roles `[5, 8, 18, 13]` can upload photos directly from devices to Supabase Storage, edit captions, and perform one-click instant toggling between `active = true` (ON) and `active = false` (OFF).

## 7. Operational Environment Standard (Staging Mode)
- **Current Active Mode**: **STAGING** (`https://okchlapizmhoueeeldrh.supabase.co`).
- Both the Static Website (`frontend\website`) and WHM App (`frontend\warehousemanagement`) are deliberately configured to **Staging Mode** during current testing and quality assurance.
- Production environment (`https://ihdlwogvjfgawgsalgng.supabase.co`) will be switched to only when the user explicitly instructs deployment readiness.

---

## 8. Bilingual Support (ID/EN) & Interactive Floating CRM Chat Widget (Nov 02, 2026)
- **Sistem Bilingual Hybrid i18n (`lib/i18n.tsx`)**:
  - Menyediakan dukungan dua bahasa penuh: **Bahasa Indonesia (`id`, default)** dan **English (`en`)** dengan persistensi `localStorage` (`zen_language`).
  - Dilengkapi tombol pengalih bahasa minimalis dan elegan `[ ID | EN ]` pada Navbar desktop dan drawer mobile.
  - Melokalisasi seluruh menu navigasi, hero headline, 3 pilar filosofi, katalog layanan, kontak, dan antarmuka chat widget.
- **Dual Fields dengan Fallback Otomatis di Database Supabase (`20261102165000_add_english_columns_to_web_tables.sql`)**:
  - Menambahkan kolom terjemahan bahasa Inggris pada `web_services` (`name_en`, `description_en`, `benefits_en`, `category_en`), `web_facilities` (`name_en`, `description_en`, `category_en`), dan `web_chat_knowledge` (`question_en`, `answer_en`, `keyword_en`).
  - Diterapkan ke **Staging** dan **Production**.
  - Mengimplementasikan helper `getLocalizedText()`: jika teks bahasa Inggris belum tersedia, antarmuka otomatis kembali (*fallback*) ke teks default Bahasa Indonesia tanpa error.
- **Interactive Floating CRM Chat Widget (`FloatingChatWidget.tsx`)**:
  - Menggantikan tombol WhatsApp statis dengan widget CRM cerdas terpadu di pojok kanan bawah.
  - **Tamu Belum Login (Guest):** Menampilkan sapaan ramah dan ajakan masuk member Google OAuth ("Masuk dengan Google (Member)") atau opsi darurat WhatsApp hotline holding.
  - **Tamu Sudah Login (Member):**
    - Otomatis memuat atau membuat chat room aktif di `web_chat_rooms`.
    - **Menu Aksi Cepat (Quick Actions):**
      1. 📅 **Reservasi Jadwal Cabang:** Dropdown memilih cabang dari `master_outlet`, mengarahkan room (`category = 'RESERVASI'`, `kode_outlet = :outlet`, `unread_by_outlet = true`, `status = 'WAITING_STAFF'`). Seketika memicu alarm notifikasi di aplikasi kasir desktop Delphi ZenSystem cabang terkait dan memunculkan tiket di WHM Inbox Outlet!
      2. 💬 **Tanya Jawab Layanan (FAQ):** Pencarian instan dan tampilan interaktif basis pengetahuan bot dari `web_chat_knowledge` (bilingual ID/EN).
      3. 👤 **Hubungi CS Pusat (Holding):** Menghubungkan chat ke Holding (`category = 'HOLDING'`, `unread_by_admin = true`, `status = 'WAITING_STAFF'`) untuk dibalas tim holding di WHM Inbox Holding.
    - **Realtime WebSocket:** Berlangganan Supabase Realtime channel `web_chat_messages` dengan filter `room_id` untuk streaming pesan dua arah instan.
    - Dilengkapi badge pengirim khusus (Member, Zen Bot, Resepsionis Cabang, Customer Care Holding) dan opsi direct link WhatsApp.
- **Build Status:** Terverifikasi 100% lulus build produksi `tsc && vite build` (0 error, exit code 0).

---

## 9. Safari iOS OAuth Redirect Sanitization & Git Push (Nov 03, 2026)
- **Safari iOS Google OAuth Resolution (`App.tsx`):**
  - **RCA:** Investigasi menemukan bahwa Safari di iPhone melempar pengalihan login ke Internal App akibat ketidakcocokan format URL pengalihan dengan daftar putih di Supabase, yang memicu mekanisme *fallback* ke default `Site URL` proyek.
  - **Perbaikan Kode:** Memperbarui fungsi `handleGoogleLogin` di `src/App.tsx` dengan sanitasi URL pengalihan absolut:
    ```tsx
    const redirectUrl = window.location.origin.replace(/\/$/, '') + (window.location.pathname || '/');
    ```
    Mencegah terjadinya inkonsistensi *trailing-slash* saat diakses dari peramban Safari di perangkat iOS.
- **Standarisasi Supabase Authentication Multi-App:**
  - `Site URL` proyek Supabase diarahkan ke `https://zenfamilyspa.com`.
  - Mendaftarkan seluruh domain ekosistem (`https://zenfamilyspa.com/**`, `https://internalapp.zenfamilyspa.id/**`, `https://whmapp.zenfamilyspa.id/**`) ke dalam daftar **Redirect URLs (Allow List)** Supabase Studio.
- **Verifikasi Build Produksi & Git Push:**
  - Berhasil di-build ulang (`npm run build` menghasilkan bundle teroptimasi di `dist/`).
  - Berhasil di-commit dan di-push ke repositori GitHub `zen-website-static` pada branch `main` (Commit `b415913`).
  - Siap di-deploy ke hosting cPanel / File Manager Niagahoster.

---

## 10. Coolify Healthcheck & Nginx Containerization Resolution (Nov 03, 2026)
- **RCA Error Deployment Coolify (`wget: can't connect to remote host: Connection refused`):**
  - Pada `Dockerfile`, healthcheck sebelumnya menggunakan `wget --quiet --tries=1 --spider http://localhost/ || exit 1`.
  - Pada Alpine Linux (musl libc), nama host `localhost` di-resolve ke alamat IPv6 loopback (`::1`) terlebih dahulu.
  - Sementara itu, `nginx.conf` hanya mengonfigurasi `listen 80;` (hanya binding ke IPv4 `0.0.0.0:80`) tanpa binding IPv6 (`listen [::]:80;`), dan belum menginstal paket utilitas `curl` & `wget` lengkap di stage runner Nginx Alpine.
  - Akibatnya, pemanggilan `wget` internal container ke `localhost` langsung ditolak (`Connection refused`), memicu status container *unhealthy* dan menyebabkan Coolify melakukan *rolling back* ke container lama.
- **Penyelarasan Standar Produksi Coolify:**
  1. **Dual Stack IPv4 & IPv6 + Endpoint `/healthz` pada `nginx.conf`:**
     - Menambahkan arahan `listen [::]:80;`.
     - Menambahkan endpoint ringan khusus healthcheck:
       ```nginx
       location = /healthz {
           access_log off;
           add_header Content-Type text/plain;
           return 200 'OK';
       }
       ```
  2. **Instalasi Paket Utilitas & Healthcheck IPv4 Eksplisit pada `Dockerfile`:**
     - Menambahkan perintah `RUN apk add --no-cache curl wget` pada stage runner `nginx:alpine`.
     - Menstandarisasi arahan `HEALTHCHECK` menggunakan loopback IPv4 eksplisit `127.0.0.1:80/healthz` yang identik dengan arsitektur `internalapp`, `warehousemanagement`, dan `dashboard`:
       ```dockerfile
       HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
         CMD curl -fs http://127.0.0.1:80/healthz || wget -q -O - http://127.0.0.1:80/healthz || exit 1
       ```
- **Verifikasi:**
  - Lulus uji kompilasi `tsc && vite build` (15.55s, 0 error).
  - Siap di-commit dan di-push ke branch `main` agar Coolify dapat melakukan auto-deployment secara mulus.

---

## 11. News & Promo Carousel Section & Multi-Environment Rules (Nov 04, 2026)
- **Aturan Hosting & Database Ekosistem Web:**
  - **Staging / QA:** `https://home.zenfamilyspa.id/` menggunakan Supabase Staging (`okchlapizmhoueeeldrh`) dan di-deploy via Coolify.
  - **Production:** `https://zenfamilyspa.com/` menggunakan Supabase Production (`ihdlwogvjfgawgsalgng`) dan di-deploy via standar web hosting (Niagahoster / Hostinger).
- **Bagian Baru: Carousel Berita & Promo (`NewsPromoSection.tsx`):**
  - Ditempatkan tepat di bawah `HeroSection` dan di atas `PhilosophySection`.
  - Mengambil data promosi aktif dari tabel `web_news_promo` di Supabase (`fetchActiveNewsPromos(5)`) dengan limit 5 entitas terbaru.
  - Fitur interaktif:
    - Autoplay otomatis setiap 6 detik dengan jeda (*pause*) saat kursor berada di atas slide (*hover*) atau saat layar disentuh (*touch*).
    - Navigasi tombol panah anggun (`ChevronLeft`, `ChevronRight`) dan indikator titik (*pagination dots*).
    - Dukungan gestur sentuh geser (*touch swipe*) pada perangkat seluler.
    - Tampilan bilingual otomatis (`useLanguage()`, `getLocalizedText()`) untuk judul, subjudul, dan deskripsi promo.
    - Menampilkan lencana promosi (`badge_text`), batas waktu berlaku (`end_date`), gambar promosi dari storage bucket `web-news-promo`, dan tombol Call-to-Action langsung.
    - Mekanisme *self-collapsing*: jika tidak ada promosi yang aktif, komponen tidak memakan ruang kosong.
- **Verifikasi Build:**
  - Lulus kompilasi `tsc && vite build` (7.39s, exit code 0, 0 error).
