# zen-website-static

Official luxury landing page and public web portal for **Zen Family Spa & Reflexology**.

## Features
- **Luxury Aesthetic**: Inspired by high-end wellness retreats (`gayaspawellness.com` & `ame-spa.com`).
- **Zen Brand Identity**: Background `#F8F5F1` (Linen Base), Primary `#889D35` (Bamboo Green), `#D2C0A7` (Warm Sand), `#3C3C32` (River Stone Charcoal).
- **Public Supabase Integration**:
  - Dynamic outlet locator fetched from `public.master_outlet` (public columns only).
  - Treatment catalog fetched from `public.master_services`.
  - Online reservation leads submitted to `public.crm_leads`.
- **Shared Hosting Ready**: Relative build paths (`base: './'`) for zero-configuration deployment to cPanel/FTP shared hosting or CDN.
- **Rich SEO & Microdata**: Open Graph, Twitter Cards, and Schema.org `DaySpa` / `LocalBusiness` JSON-LD.

## Tech Stack
- **Framework**: React 18 + Vite 6 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend / Database**: Supabase Cloud (PostgreSQL 18)

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

### 3. Local Development
```bash
npm run dev
```

### 4. Production Build
```bash
npm run build
```
The output will be generated in `dist/` and can be uploaded directly to any static web server or shared hosting public directory.

