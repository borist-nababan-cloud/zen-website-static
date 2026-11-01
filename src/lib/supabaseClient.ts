import { createClient } from '@supabase/supabase-js';
import type { Outlet, Service, OutletFacility, ReservationFormData, WebGalleryItem, ServiceOutletAvailability } from '../types';

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

// Fallback Services (Without prices to prevent misperception across branches)
export const fallbackServices: Service[] = [
  {
    id: '1',
    service_code: 'SRV-MASSAGE-ROYAL',
    name: 'The Royal Zen Body Massage',
    category: 'Body Massage',
    duration_minutes: 90,
    description: 'Perpaduan harmonis teknik pijat relaksasi tradisional Jawa dan Bali untuk meredakan ketegangan otot secara mendalam.',
    benefits: 'Melancarkan sirkulasi darah, meredakan kekakuan leher dan punggung, serta mengembalikan vitalitas tubuh.',
    image_url: './assets/gallery/carousel(1).jpg',
    sort_order: 10,
    available_outlets: []
  },
  {
    id: '2',
    service_code: 'SRV-MASSAGE-HOTSTONE',
    name: 'Volcanic Hot Stone Therapy',
    category: 'Body Massage',
    duration_minutes: 105,
    description: 'Pijatan relaksasi menggunakan batu basal vulkanis hangat yang menyalurkan energi termal ke titik-titik meridian tubuh.',
    benefits: 'Meredakan stres berat, menghangatkan sistem pencernaan, dan mengendurkan otot-otot tegang.',
    image_url: './assets/gallery/hot-stone.png',
    sort_order: 20,
    available_outlets: []
  },
  {
    id: '3',
    service_code: 'SRV-MASSAGE-AROMA',
    name: 'Aromatherapy Holistic Touch',
    category: 'Body Massage',
    duration_minutes: 90,
    description: 'Ritual pijat relaksasi lembut dengan pilihan minyak esensial murni serai, lavender, atau kayu manis.',
    benefits: 'Menenangkan pikiran yang lelah, membantu mengatasi insomnia, dan memberikan keharuman tubuh alami.',
    image_url: './assets/gallery/carousel(2).jpg',
    sort_order: 30,
    available_outlets: []
  },
  {
    id: '4',
    service_code: 'SRV-REFLEX-ESSENTIAL',
    name: 'Zen Essential Foot Reflexology',
    category: 'Foot Reflexology',
    duration_minutes: 60,
    description: 'Stimulasi akupresur pada zona refleksi telapak kaki untuk menyeimbangkan fungsi organ vital tubuh.',
    benefits: 'Mengatasi pegal pada kaki, melancarkan metabolisme, dan meringankan rasa lelah setelah perjalanan jauh.',
    image_url: './assets/gallery/rf-01.png',
    sort_order: 40,
    available_outlets: []
  },
  {
    id: '5',
    service_code: 'SRV-REFLEX-MERIDIAN',
    name: 'Comprehensive Meridian Foot & Calf',
    category: 'Foot Reflexology',
    duration_minutes: 90,
    description: 'Refleksi mendalam yang mencakup telapak kaki, betis, hingga lutut dengan rendaman air hangat herbal.',
    benefits: 'Meredakan pembengkakan kaki, merilekskan otot betis, dan meredakan ketegangan sendi.',
    image_url: './assets/gallery/bm-01.png',
    sort_order: 50,
    available_outlets: []
  },
  {
    id: '6',
    service_code: 'SRV-ADD-BODY-SCRUB',
    name: 'Lulur Herbal & Body Glow Scrub',
    category: 'Addition',
    duration_minutes: 45,
    description: 'Eksfoliasi kulit menggunakan lulur rempah beras dan kunyit tradisional untuk mengangkat sel kulit mati.',
    benefits: 'Menghaluskan tekstur kulit, mencerahkan warna kulit kusam, dan menyegarkan pori-pori.',
    image_url: './assets/gallery/prod-01.png',
    sort_order: 60,
    available_outlets: []
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
 * Fetch public treatment services from Supabase (web_services joined with web_outlet_services).
 * Queries active services ordered by sort_order without prices.
 */
export async function fetchPublicServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('web_services')
      .select(`
        id,
        service_code,
        name,
        category,
        duration_minutes,
        description,
        benefits,
        image_url,
        active,
        sort_order,
        web_outlet_services (
          kode_outlet,
          is_available,
          custom_notes,
          master_outlet (
            kode_outlet,
            name_outlet,
            city,
            no_wa
          )
        )
      `)
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase fetchPublicServices notice:', error.message);
      return fallbackServices;
    }

    if (data && data.length > 0) {
      return data.map((item: any) => {
        const available_outlets: ServiceOutletAvailability[] = (item.web_outlet_services || [])
          .filter((wos: any) => wos.is_available && wos.master_outlet)
          .map((wos: any) => ({
            kode_outlet: wos.kode_outlet,
            name_outlet: wos.master_outlet.name_outlet,
            city: wos.master_outlet.city,
            no_wa: wos.master_outlet.no_wa,
            custom_notes: wos.custom_notes
          }));

        return {
          id: item.id,
          service_code: item.service_code,
          name: item.name,
          category: item.category,
          duration_minutes: item.duration_minutes,
          description: item.description,
          benefits: item.benefits,
          image_url: item.image_url,
          sort_order: item.sort_order,
          available_outlets
        };
      }) as Service[];
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
