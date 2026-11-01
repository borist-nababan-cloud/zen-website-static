# Zen Landing Page Development Rules

## 1. Aesthetic & Branding
- Inspiration: Luxury, Minimalist, Zen, Calming Stones.
- Palette: #889D35 (Bamboo Green), #D2C0A7 (Sand/Stone), #F8F5F1 (Linen/White Background), #3C3C32 (River Stone Text).
- Typography: Use elegant Serif fonts for headings (like Playfair Display) and clean Sans-serif for body.

## 2. Technical Strategy
- Framework: React (Vite) - Build as a Static Site (SSG/SPA).
- Data Fetching: Direct connection to Supabase via `anon` key.
- Security: Every table accessed by this site MUST have RLS (Row Level Security) enabled for 'Public' (SELECT only).
- Performance: Optimize images (WebP format) to ensure fast loading on mobile.

## 3. SEO Standard
- Meta tags for every treatment page.
- Clean URL structure.
- Implementation of Schema.org (LocalBusiness) for each outlet.


## 4. Database Prefix Standard (`web_*****`)
- Every database entity specifically backing website features (e.g. facilities, articles, banners) MUST have the prefix `web_*****` (e.g. `web_facilities`, `web_outlet_facilities`).
- All queries from static web must consume public views or tables with strict RLS public read policies (`anon` role).
