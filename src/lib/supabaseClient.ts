import { createClient } from '@supabase/supabase-js';
import type { Outlet, Service, OutletFacility, ReservationFormData, WebGalleryItem } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ihdlwogvjfgawgsalgng.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KobV2o95Ymfem77b4zVBJg_E_onldRD';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fallback Holding Profile (Kode 111) for Hotline & Central Contact
export const fallbackHolding: Outlet = {
  kode_outlet: '111',
  name_outlet: 'ZEN HOLDING (HEAD OFFICE)',
  alamat: 'Jl. Surya Sumantri No. 182, Sukawarna, Kec. Sukajadi',
  city: 'Bandung',
  province: 'Jawa Barat',
  no_telp: '022-2003788',
  no_wa: '082367867000',
  email: 'info@zenfamilyspa.id'
};

// Fallback Outlets for instant offline rendering / network resilience
export const fallbackOutlets: Outlet[] = [
  {
    kode_outlet: '101',
    name_outlet: 'ZEN SUKAJADI',
    alamat: 'Jl. Sukajadi No. 168, Pasteur, Kec. Sukajadi',
    city: 'Bandung',
    province: 'Jawa Barat',
    no_telp: '022-2031768',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '103',
    name_outlet: 'ZEN SURYA SUMANTRI',
    alamat: 'Jl. Surya Sumantri No. 18, Sukawarna, Kec. Sukajadi',
    city: 'Bandung',
    province: 'Jawa Barat',
    no_telp: '022-2003788',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '105',
    name_outlet: 'ZEN GUNAWARMAN',
    alamat: 'Jl. Gunawarman No. 43, Senopati, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    no_telp: '021-7262375',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '106',
    name_outlet: 'ZEN PAKUBUWONO',
    alamat: 'Jl. Pakubuwono VI No. 35, Gunung, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    no_telp: '021-7221389',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '110',
    name_outlet: 'ZEN BALI (SEMINYAK)',
    alamat: 'Jl. Sunset Road No. 89, Seminyak, Kuta',
    city: 'Badung',
    province: 'Bali',
    no_telp: '0361-8475900',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '112',
    name_outlet: 'ZEN DEPOK',
    alamat: 'Jl. Margonda Raya No. 250, Kemiri Muka, Beji',
    city: 'Depok',
    province: 'Jawa Barat',
    no_telp: '021-77202350',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '115',
    name_outlet: 'ZEN MAKASSAR',
    alamat: 'Jl. Pelita Raya No. 46, Balla Parang, Kec. Rappocini',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    no_telp: '0411-450980',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '116',
    name_outlet: 'ZEN MEKARWANGI',
    alamat: 'Jl. Mekar Utama No. 112, Komplek Mekarwangi',
    city: 'Bandung',
    province: 'Jawa Barat',
    no_telp: '022-5208990',
    no_wa: '08122000168'
  },
  {
    kode_outlet: '117',
    name_outlet: 'ZEN KOTA BARU PARAHYANGAN',
    alamat: 'Jl. Parahyangan Raya No. 2 Kav. 6B, Kertajaya, Padalarang',
    city: 'Bandung Barat',
    province: 'Jawa Barat',
    no_telp: '022-86813500',
    no_wa: '087877517000'
  },
  {
    kode_outlet: '107',
    name_outlet: 'ZEN PALU',
    alamat: 'Jl. Moh. Hatta No. 16, Lolu Utara, Kec. Palu Timur',
    city: 'Palu',
    province: 'Sulawesi Tengah',
    no_telp: '0451-423588',
    no_wa: '08122000168'
  }
];

// Fallback Services
export const fallbackServices: Service[] = [
  {
    id: '1',
    service_code: 'ZEN-SIG-01',
    name: 'The Royal Touch Ritual',
    category: 'Signature Body Massage',
    duration_minutes: 100,
    price: 345000,
    description: 'Perawatan holistik khas Zen yang memadukan pijatan jaringan dalam (deep tissue), akupresur meridian tradisional, dan kompres hangat aromaterapi serai organik.',
    benefits: 'Meredakan ketegangan otot kronis, melancarkan peredaran darah, dan memulihkan kualitas tidur.',
    image_url: './assets/gallery/carousel(1).jpg',
    is_featured: true,
    sort_order: 1
  },
  {
    id: '2',
    service_code: 'ZEN-SIG-02',
    name: 'Zen Relaxing Massage 90\'',
    category: 'Signature Body Massage',
    duration_minutes: 90,
    price: 290000,
    description: 'Terapi pijat seluruh tubuh dengan usapan panjang berirama lembut menggunakan minyak esensial murni (Lavender, Lemongrass, atau Sandalwood).',
    benefits: 'Menurunkan kadar hormon stres kortisol dan menenangkan sistem saraf pusat.',
    image_url: './assets/gallery/carousel(2).jpg',
    is_featured: true,
    sort_order: 2
  },
  {
    id: '3',
    service_code: 'ZEN-SIG-03',
    name: 'Volcanic Hot Stone Therapy',
    category: 'Signature Body Massage',
    duration_minutes: 120,
    price: 380000,
    description: 'Pijat relaksasi yang dipadukan dengan peletakan batu basal vulkanis hangat di titik cakra tubuh untuk menyalurkan energi panas menembus lapisan otot terdalam.',
    benefits: 'Meluruhkan kekakuan sendi, membuang toksin tubuh, dan memberikan rasa relaksasi total.',
    image_url: './assets/gallery/hot-stone.png',
    is_featured: true,
    sort_order: 3
  },
  {
    id: '4',
    service_code: 'ZEN-REF-01',
    name: 'Foot & Back Acupressure 90\'',
    category: 'Reflexology',
    duration_minutes: 90,
    price: 240000,
    description: 'Kombinasi stimulasi titik refleksi telapak kaki dengan pijat punggung, leher, dan bahu pada kursi recliner mewah berposisi ergonomis.',
    benefits: 'Meringankan kelelahan setelah beraktivitas, memulihkan stamina, dan melegakan ketegangan leher/pundak.',
    image_url: './assets/gallery/rf-01.png',
    is_featured: true,
    sort_order: 4
  },
  {
    id: '5',
    service_code: 'ZEN-REF-02',
    name: 'Pure Foot Reflexology 60\'',
    category: 'Reflexology',
    duration_minutes: 60,
    price: 185000,
    description: 'Stimulasi mendalam pada zona refleks kaki yang terhubung langsung ke organ vital tubuh menggunakan krim aromatik beraroma peppermint.',
    benefits: 'Melancarkan peredaran darah perifer dan meringankan keluhan kaki bengkak/pegal.',
    image_url: './assets/gallery/rf-02.png',
    is_featured: false,
    sort_order: 5
  },
  {
    id: '6',
    service_code: 'ZEN-SCB-01',
    name: 'Javanese Lulur & Milk Body Polish',
    category: 'Body Glow & Scrub',
    duration_minutes: 90,
    price: 295000,
    description: 'Tradisi lulur keraton berbahan kunyit, temugiring, dan tepung beras untuk mengangkat sel kulit mati, dilanjutkan masker susu murni dan shower air hangat.',
    benefits: 'Mencerahkan kulit kusam, melembutkan tekstur kulit, dan meregenerasi sel kulit baru.',
    image_url: './assets/gallery/prod-01.png',
    is_featured: true,
    sort_order: 6
  }
];

/**
 * Fetch holding contact info (kode_outlet = '111') for Header, Footer, and Floating WhatsApp.
 */
export async function fetchHoldingContact(): Promise<Outlet> {
  try {
    const { data, error } = await supabase
      .from('master_outlet')
      .select('kode_outlet, name_outlet, alamat, city, province, no_telp, no_wa, email, location')
      .eq('kode_outlet', '111')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetchHoldingContact notice:', error.message);
      return fallbackHolding;
    }

    if (data) {
      return data as Outlet;
    }
  } catch (err) {
    console.warn('Network issue fetching holding contact, using fallback:', err);
  }
  return fallbackHolding;
}

/**
 * Fetch public outlets from Supabase.
 * Strictly queries only public fields and filters active = true.
 */
export async function fetchPublicOutlets(): Promise<Outlet[]> {
  try {
    const { data, error } = await supabase
      .from('master_outlet')
      .select('kode_outlet, name_outlet, alamat, city, province, no_telp, no_wa, email, location')
      .eq('active', true)
      .order('kode_outlet');

    if (error) {
      console.warn('Supabase fetchPublicOutlets notice:', error.message);
      return fallbackOutlets;
    }

    if (data && data.length > 0) {
      return data as Outlet[];
    }
  } catch (err) {
    console.warn('Network issue fetching outlets, using fallback:', err);
  }
  return fallbackOutlets;
}

/**
 * Fetch public treatment services from Supabase.
 * Queries active services ordered by sort_order.
 */
export async function fetchPublicServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('master_services')
      .select('id, service_code, name, category, duration_minutes, price, description, benefits, image_url, is_featured, sort_order')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase fetchPublicServices notice:', error.message);
      return fallbackServices;
    }

    if (data && data.length > 0) {
      return data as Service[];
    }
  } catch (err) {
    console.warn('Network issue fetching services, using fallback:', err);
  }
  return fallbackServices;
}

/**
 * Fetch outlet facilities mappings from web_outlet_facilities joined with web_facilities.
 */
export async function fetchOutletFacilities(): Promise<OutletFacility[]> {
  try {
    const { data, error } = await supabase
      .from('web_outlet_facilities')
      .select(`
        id,
        kode_outlet,
        facility_id,
        custom_notes,
        custom_image_url_1,
        custom_image_url_2,
        is_available,
        facility:web_facilities (
          id,
          facility_code,
          name,
          category,
          description,
          icon_name,
          image_url_1,
          image_url_2,
          is_active,
          sort_order
        )
      `)
      .eq('is_available', true);

    if (error) {
      console.warn('Supabase fetchOutletFacilities notice:', error.message);
      return [];
    }

    if (data && data.length > 0) {
      return data.map((item: any) => ({
        id: item.id,
        kode_outlet: item.kode_outlet,
        facility_id: item.facility_id,
        custom_notes: item.custom_notes,
        custom_image_url_1: item.custom_image_url_1,
        custom_image_url_2: item.custom_image_url_2,
        is_available: item.is_available,
        facility: Array.isArray(item.facility) ? item.facility[0] : item.facility
      })) as OutletFacility[];
    }
  } catch (err) {
    console.warn('Network issue fetching outlet facilities:', err);
  }
  return [];
}

/**
 * Submit reservation inquiry directly to public.crm_leads.
 */
export async function submitReservationLead(lead: ReservationFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('crm_leads')
      .insert([
        {
          customer_name: lead.customer_name.trim(),
          phone: lead.phone.trim(),
          kode_outlet: lead.kode_outlet,
          service_name: lead.service_name,
          reservation_date: lead.reservation_date,
          reservation_time: lead.reservation_time,
          guest_count: Number(lead.guest_count) || 1,
          notes: lead.notes?.trim() || null,
          status: 'NEW',
          source: 'WEBSITE'
        }
      ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Terjadi gangguan koneksi saat mengirim reservasi.' };
  }
}

/**
 * Fallback Galleries for resilient rendering if Supabase connection drops.
 */
export const fallbackGalleries: WebGalleryItem[] = [
  {
    id: 'g-1',
    title: 'Ruang Perawatan Privat',
    description: 'Pencahayaan temaram dan aromaterapi serai yang menenangkan batin.',
    category: 'Suasana & Interior',
    image_url: './assets/gallery/carousel(1).jpg',
    active: true,
    sort_order: 10
  },
  {
    id: 'g-2',
    title: 'Batu Basal Vulkanis Alami',
    description: 'Menyalurkan kehangatan mendalam pada titik meridian tubuh.',
    category: 'Perawatan & Spa',
    image_url: './assets/gallery/hot-stone.png',
    active: true,
    sort_order: 20
  },
  {
    id: 'g-3',
    title: 'Suasana Tenang & Bersih',
    description: 'Higienitas berstandar tinggi dengan linen steril sekali pakai.',
    category: 'Suasana & Interior',
    image_url: './assets/gallery/carousel(3).jpg',
    active: true,
    sort_order: 30
  },
  {
    id: 'g-4',
    title: 'Lounge Refleksi Ergonomis',
    description: 'Kursi malas mewah berposisi nol gravitasi untuk relaksasi kaki optimal.',
    category: 'Refleksi',
    image_url: './assets/gallery/rf-01.png',
    active: true,
    sort_order: 40
  },
  {
    id: 'g-5',
    title: 'Minyak Esensial Nusantara',
    description: 'Ekstrak bunga dan rempah segar asli Indonesia.',
    category: 'Bahan Alami',
    image_url: './assets/gallery/carousel(2).jpg',
    active: true,
    sort_order: 50
  },
  {
    id: 'g-6',
    title: 'Perawatan Lulur Tradisional',
    description: 'Eksfoliasi lembut untuk mencerahkan dan menghaluskan kulit.',
    category: 'Perawatan & Spa',
    image_url: './assets/gallery/prod-01.png',
    active: true,
    sort_order: 60
  }
];

/**
 * Fetch active gallery items from public.web_galleries strictly where active = true.
 */
export async function fetchPublicGalleries(): Promise<WebGalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('web_galleries')
      .select('id, title, description, category, image_url, kode_outlet, active, sort_order')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase fetchPublicGalleries notice:', error.message);
      return fallbackGalleries;
    }

    if (data) {
      return data as WebGalleryItem[];
    }
  } catch (err) {
    console.warn('Network issue fetching web_galleries:', err);
    return fallbackGalleries;
  }
  return [];
}
