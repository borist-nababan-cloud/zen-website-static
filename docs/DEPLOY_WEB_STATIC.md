# Panduan Deployment Website Statis Zen Family Spa & Reflexology
**Dokumen Panduan Operasional Produksi & Deployment**  
*Target Deployment: 1) Standar Web Hosting (cPanel / Apache / Shared Hosting) & 2) Coolify (Self-Hosted PaaS / Docker / Nginx)*

---

## 1. Ikhtisar Arsitektur Aplikasi

| Parameter | Spesifikasi |
| :--- | :--- |
| **Framework & Engine** | React 18 + TypeScript + Vite 6 + Tailwind CSS |
| **Model Aplikasi** | Single Page Application (SPA) - Client-side Routing |
| **Backend / DB / Auth** | Supabase Cloud (PostgreSQL, Supabase Auth via Google OAuth, Supabase Storage) |
| **Storage Buckets** | `web-facilities`, `web-galleries`, `web-services`, `web-testimonials` (Public Read) |
| **Repositori Git** | `https://github.com/borist-nababan-cloud/zen-website-static.git` |
| **Output Build** | Direktori `dist/` (HTML, JS, CSS, Media, `.htaccess`, `robots.txt`, `sitemap.xml`) |

---

## 2. Kredensial & Environment Variables

Variabel lingkungan dibaca oleh Vite saat proses build (**Build-Time Injected**). Pastikan variabel ini telah dikonfigurasi sebelum menjalankan perintah `npm run build` atau pada dashboard penyedia hosting.

### A. Konfigurasi Lingkungan Staging (Pengujian Saat Ini)
```bash
VITE_SUPABASE_URL=https://okchlapizmhoueeeldrh.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_UWMj_yrx7u157kklx62Tzg_Kzy787QN
VITE_SITE_NAME="Zen Family Spa & Reflexology"
VITE_SITE_URL="https://zenfamilyspa.com"
VITE_WHATSAPP_CENTRAL="628122000168"
```

### B. Konfigurasi Lingkungan Produksi (Saat Siap Rilis Publik)
```bash
VITE_SUPABASE_URL=https://ihdlwogvjfgawgsalgng.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_KobV2o95Ymfem77b4zVBJg_E_onldRD
VITE_SITE_NAME="Zen Family Spa & Reflexology"
VITE_SITE_URL="https://zenfamilyspa.com"
VITE_WHATSAPP_CENTRAL="628122000168"
```

> [!IMPORTANT]
> Karena Vite membundel variabel `VITE_*` langsung ke dalam file JavaScript klien pada saat proses build, setiap kali mengubah isi `.env`, **wajib menjalankan ulang `npm run build`** atau men-trigger rebuild container agar nilai baru diterapkan.

---

## 3. METODE 1: Panduan Deploy ke Standar Web Hosting (cPanel / DirectAdmin / Shared Hosting)

Metode ini cocok untuk shared hosting tradisional (misal: Niagahoster, Hostinger, DomaiNesia, IDCloudHost, cPanel, Apache, LiteSpeed).

### Langkah 1: Persiapan File Lingkungan
Buka file `.env` di folder root `frontend/website/`. Sesuaikan kredensial dengan target database (Staging atau Production).

### Langkah 2: Build Aset Produksi
Jalankan perintah berikut di terminal komputer lokal atau CI/CD pipeline:
```bash
# 1. Masuk ke direktori web statis
cd frontend/website

# 2. Pastikan dependensi terpasang bersih
npm install

# 3. Jalankan kompilasi TypeScript dan bundler Vite
npm run build
```
Setelah proses selesai, akan tercipta folder `dist/` yang berisi:
- `index.html` (Entry point aplikasi)
- `assets/` (Kompilasi CSS, JS, dan font yang telah di-hash & minified)
- `.htaccess` (Konfigurasi routing rewrite SPA Apache, kompresi Gzip, & caching)
- `_redirects` (Alternatif fallback routing)
- `robots.txt` & `sitemap.xml` (Optimasi SEO untuk Google & Bing)
- `favicon.ico`

### Langkah 3: Konfigurasi File `.htaccess` (Sudah Terpasang Otomatis)
File `.htaccess` sudah secara otomatis disalin dari `public/.htaccess` ke folder `dist/.htaccess` saat build. File ini berisi aturan krusial agar halaman tidak mengembalikan error 404 saat pengguna me-refresh halaman:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Langkah 4: Upload ke Web Hosting
1. Buka **cPanel** akun hosting Anda.
2. Masuk ke menu **File Manager** (atau gunakan FTP Client seperti FileZilla).
3. Masuk ke folder root domain tujuan:
   - Jika domain utama: folder `public_html/`.
   - Jika subdomain (misal `web.zenfamilyspa.com`): folder dokumen root subdomain tersebut.
4. **Hapus atau cadangkan** file lama di folder tersebut (jika ada).
5. Kompres seluruh isi di dalam folder `dist/` menjadi `dist.zip` (pastikan file tersembunyi `.` seperti `.htaccess` ikut terkompres).
6. Upload file `dist.zip` ke folder `public_html/`, lalu pilih **Extract**.
7. Pastikan file `index.html`, `.htaccess`, `robots.txt`, dan folder `assets/` berada langsung di dalam `public_html/`, bukan di subfolder `dist/`.

### Langkah 5: Pasang SSL / HTTPS
1. Pada cPanel, buka menu **SSL/TLS Status** atau **Let's Encrypt SSL**.
2. Centang domain Anda dan klik **Run AutoSSL** / **Issue**.
3. Pastikan HTTPS telah aktif dengan ikon gembok hijau di browser.

---

## 4. METODE 2: Panduan Deploy ke Coolify (Self-Hosted PaaS)

Coolify adalah platform PaaS open-source (alternatif Heroku/Vercel) yang menjalankan aplikasi di atas Docker container dengan integrasi Git otomatis dan reverse proxy SSL (Traefik/Caddy).

Repository sudah dilengkapi dengan file produksi:
- `frontend/website/Dockerfile` (Multi-stage build Node.js + Nginx Alpine)
- `frontend/website/nginx.conf` (Nginx dengan kompresi Gzip, caching header, dan SPA fallback)
- `frontend/website/.dockerignore`

### Pilihan A: Menggunakan Dockerfile (Sangat Direkomendasikan)

#### Langkah 1: Tambahkan Aplikasi Baru di Dashboard Coolify
1. Buka dashboard Coolify Anda (misal `https://coolify.yourdomain.com`).
2. Masuk ke **Projects** ➔ Pilih Environment (misal: `Production` atau `Staging`).
3. Klik **+ Add Resource** ➔ Pilih **Public Repository** atau **Private Repository (GitHub App)**.
4. Masukkan URL repositori:
   ```text
   https://github.com/borist-nababan-cloud/zen-website-static.git
   ```
5. Pilih branch: `main`.
6. Pada pilihan **Build Pack**, pilih: **Dockerfile**.

#### Langkah 2: Konfigurasi Path dan Port
Di pengaturan aplikasi Coolify:
- **Base Directory**: `/` (karena repositori `zen-website-static` berakar langsung pada kode website).
- **Dockerfile Location**: `/Dockerfile`
- **Exposed Port**: `80`

#### Langkah 3: Tambahkan Environment Variables di Coolify
Buka tab **Environment Variables** di Coolify, tambahkan variabel berikut (pastikan dicentang pilihan **Build Time Variable**):

| Nama Variabel | Nilai (Staging) | Nilai (Production) | Build-Time |
| :--- | :--- | :--- | :---: |
| `VITE_SUPABASE_URL` | `https://okchlapizmhoueeeldrh.supabase.co` | `https://ihdlwogvjfgawgsalgng.supabase.co` | Ya |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_UWMj_yrx7u157kklx62Tzg_Kzy787QN` | `sb_publishable_KobV2o95Ymfem77b4zVBJg_E_onldRD` | Ya |
| `VITE_SITE_NAME` | `Zen Family Spa & Reflexology` | `Zen Family Spa & Reflexology` | Ya |
| `VITE_SITE_URL` | `https://zenfamilyspa.com` | `https://zenfamilyspa.com` | Ya |
| `VITE_WHATSAPP_CENTRAL` | `628122000168` | `628122000168` | Ya |

#### Langkah 4: Tentukan Custom Domain & SSL
1. Pada tab **General**, isi kolom **Domains**:
   ```text
   https://zenfamilyspa.com, https://www.zenfamilyspa.com
   ```
   *(Atau domain staging Anda, misal: `https://staging.zenfamilyspa.com`)*
2. Coolify secara otomatis akan menerbitkan sertifikat SSL gratis dari Let's Encrypt dan mengonfigurasi Traefik reverse proxy.
3. Pastikan DNS A-Record domain Anda di Cloudflare / registrar sudah diarahkan ke IP Server Coolify Anda.

#### Langkah 5: Deploy Aplikasi
1. Klik tombol **Deploy** di pojok kanan atas dashboard Coolify.
2. Periksa **Build Logs**. Docker akan menjalankan:
   - Tahap 1 (Builder): Menjalankan `npm ci` dan `npm run build`.
   - Tahap 2 (Nginx): Menyalin file `dist/` ke `/usr/share/nginx/html/` dan mengaktifkan `nginx.conf`.
3. Setelah status berubah menjadi **Running (Healthy)**, website Anda sudah aktif secara global!

---

### Pilihan B: Menggunakan Nixpacks / Static Buildpack di Coolify

Jika tidak ingin menggunakan Dockerfile, Coolify mendukung mode **Static / Nixpacks**:
1. Pilih Build Pack: **Nixpacks** atau **Static**.
2. **Install Command**: `npm install`
3. **Build Command**: `npm run build`
4. **Publish Directory**: `dist`
5. Pada Static Site settings, aktifkan opsi **Is it a SPA?** menjadi **Yes / True** (ini otomatis menerapkan rewrite ke `index.html`).

---

## 5. Otomasi CI/CD: Auto-Deploy Saat Git Push

Baik di Standar Hosting (cPanel Git Deployment) maupun Coolify, Anda dapat mengaktifkan webhook otomatis:

1. Di dashboard Coolify: Masuk ke tab **Webhooks** ➔ Salin **Deploy Webhook URL**.
2. Buka repository GitHub: `https://github.com/borist-nababan-cloud/zen-website-static/settings/hooks`.
3. Klik **Add Webhook**:
   - **Payload URL**: Tempel URL dari Coolify.
   - **Content type**: `application/json`.
   - **Which events**: `Just the push event`.
4. Setiap kali Anda menjalankan `git push origin main`, Coolify akan langsung otomatis membangun dan memperbarui website tanpa downtime.

---

## 6. Konfigurasi Wajib Google OAuth & Supabase Auth

Agar fitur **Masuk Member dengan Google** dan pengiriman ulasan tamu berfungsi normal pada domain hosting baru:

1. **Supabase Dashboard**:
   - Buka `https://supabase.com/dashboard/project/<PROJECT_ID>/auth/url-configuration`
   - **Site URL**: Isi domain produksi, contoh: `https://zenfamilyspa.com`
   - **Redirect URLs**: Tambahkan daftar domain yang diperbolehkan:
     - `https://zenfamilyspa.com/**`
     - `https://www.zenfamilyspa.com/**`
     - `http://localhost:5173/**` (untuk pengujian lokal)
     - Domain Coolify staging (jika ada).
2. **Google Cloud Console**:
   - Buka Google Cloud Console ➔ **APIs & Services** ➔ **Credentials**.
   - Pilih OAuth 2.0 Client ID web Anda.
   - Pada bagian **Authorized JavaScript origins**, tambahkan:
     - `https://zenfamilyspa.com`
     - `https://www.zenfamilyspa.com`
   - Pada bagian **Authorized redirect URIs**, pastikan callback Supabase terdaftar:
     - `https://<PROJECT_ID>.supabase.co/auth/v1/callback`

---

## 7. Checklist Verifikasi Pasca-Deployment

Sebelum mengumumkan website ke publik, jalankan checklist berikut:
- [ ] **Akses Root**: Buka `https://domain-anda.com/`, pastikan Hero Section, Foto Galeri, dan Layanan muncul.
- [ ] **Direct Navigation / Refresh (Uji SPA Rewrite)**:
  Buka tab baru langsung ke anchor link atau refresh browser saat berada di section tertentu, pastikan **tidak** muncul error 404 Apache/Nginx.
- [ ] **Google Login Member**:
  Klik tombol *"Masuk Member"*, selesaikan otentikasi Google, pastikan avatar dan nama member muncul di Navbar.
- [ ] **Ubah Profil Member & WhatsApp**:
  Buka modal profil, coba ganti nomor WhatsApp dengan nomor member lain (pastikan ditolak sistem), lalu simpan nomor unik Anda (pastikan berhasil).
- [ ] **Kirim Testimoni Tamu**:
  Pilih salah satu cabang, berikan rating 5 smile, lampirkan foto dari kamera atau perangkat, lalu kirim ulasan.
- [ ] **Moderasi di WHM App**:
  Buka WHM App di menu **Web Data ➔ User Testimoni**, pastikan ulasan yang baru dikirim muncul dengan status *Menunggu Moderasi*, klik toggle untuk menerbitkan, dan verifikasi ulasan langsung tampil di website statis.
- [ ] **Hotline WhatsApp**:
  Klik tombol floating WhatsApp di kanan bawah, pastikan langsung terhubung ke nomor holding kantor pusat (`0812-2000-168` / `0823-6786-7000`).
