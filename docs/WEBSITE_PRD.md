#### **PRD: Zen Family Spa Official Website**

**1. Objective:**
Membangun wajah digital Zen Family Spa yang elegan, informatif, dan dinamis dengan data yang tersinkronisasi langsung dari database pusat (Supabase).

**2. Key Features:**
*   **Dynamic Treatment Menu:** Mengambil data kategori dan harga jasa langsung dari tabel `inv_recipes` atau `master_services` di Supabase.
*   **Outlet Locator:** Menampilkan daftar 10+ outlet (dari tabel `master_outlet`) lengkap dengan alamat, jam operasional, dan integrasi Google Maps.
*   **Booking Inquiry Form:** Form reservasi yang mengirim data langsung ke tabel `crm_leads` di Supabase (untuk kemudian diproses oleh tim di Internal App).
*   **Responsive Design:** Tampilan mewah yang menyesuaikan di smartphone maupun desktop.

**3. Integration Details:**
*   **Source Table 1 (Outlets):** `master_outlet` (Filter: `active = true`).
*   **Source Table 2 (Services):** `master_services` (Kategori: Massage, Reflexology, etc).
*   **Output Target:** Static files (Folder `dist/` dari Vite) untuk di-upload ke Shared Hosting via FTP.
