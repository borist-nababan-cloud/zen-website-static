import { createClient } from '@supabase/supabase-js';
import type { 
  Outlet, 
  Service, 
  OutletFacility, 
  ReservationFormData, 
  WebGalleryItem, 
  ServiceOutletAvailability, 
  WebMember, 
  WebTestimonial,
  ChatRoom,
  ChatMessage,
  ChatKnowledge
} from '../types';

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
        name_en,
        category,
        category_en,
        duration_minutes,
        description,
        description_en,
        benefits,
        benefits_en,
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
          name_en: item.name_en,
          category: item.category,
          category_en: item.category_en,
          duration_minutes: item.duration_minutes,
          description: item.description,
          description_en: item.description_en,
          benefits: item.benefits,
          benefits_en: item.benefits_en,
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
          name_en,
          category,
          category_en,
          description,
          description_en,
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
      let friendlyError = error.message;
      if (
        error.message.includes('sudah terdaftar') ||
        error.message.includes('duplicate') ||
        error.code === '23505'
      ) {
        friendlyError = 'Nomor WhatsApp ini sudah digunakan oleh member lain. Silakan gunakan nomor WhatsApp Anda yang berbeda.';
      }
      return { success: false, error: friendlyError };
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


/**
 * Fallback Testimonials for instant offline / network fallback
 */
export const fallbackTestimonials: WebTestimonial[] = [
  {
    id: 't-1',
    auth_user_id: 'default',
    customer_name: 'dr. Aris Pratama',
    customer_avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Ritual The Royal Touch sungguh luar biasa melepaskan penat setelah seminggu penuh dinas di rumah sakit. Suasana hening, aromaterapi serai yang menenangkan, dan terapis sangat berpengalaman.',
    photo_url: './assets/gallery/carousel(1).jpg',
    published: true,
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    master_outlet: {
      kode_outlet: '101',
      name_outlet: 'ZEN SUKAJADI',
      city: 'Bandung'
    }
  },
  {
    id: 't-2',
    auth_user_id: 'default',
    customer_name: 'Maya Indriani, S.E.',
    customer_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Langganan tetap setiap akhir pekan di Gunawarman. Aromaterapi dan foot reflexology-nya juara, selalu bikin tidur malam jauh lebih nyenyak dan badan segar kembali di hari Senin.',
    photo_url: './assets/gallery/rf-01.png',
    published: true,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    master_outlet: {
      kode_outlet: '105',
      name_outlet: 'ZEN GUNAWARMAN',
      city: 'Jakarta Selatan'
    }
  },
  {
    id: 't-3',
    auth_user_id: 'default',
    customer_name: 'Hendra Gunawan',
    customer_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Pelayanan ramah berkelas bintang lima. Volcanic hot stone therapy benar-benar merelaksasi otot punggung yang kaku sehabis surfing dan penerbangan panjang.',
    photo_url: './assets/gallery/hot-stone.png',
    published: true,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    master_outlet: {
      kode_outlet: '110',
      name_outlet: 'ZEN BALI (SEMINYAK)',
      city: 'Badung'
    }
  },
  {
    id: 't-4',
    auth_user_id: 'default',
    customer_name: 'Stephanie Tan',
    customer_avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    comment: 'Lulur tubuhnya lembut dan wangi rempahnya alami banget. Kulit terasa lebih halus, cerah, dan segar setelah perawatan. Ruangan bersih dan higienis.',
    photo_url: './assets/gallery/prod-01.png',
    published: true,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    master_outlet: {
      kode_outlet: '103',
      name_outlet: 'ZEN SURYA SUMANTRI',
      city: 'Bandung'
    }
  },
  {
    id: 't-5',
    auth_user_id: 'default',
    customer_name: 'Rizky Firmansyah',
    customer_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Tempat spa paling tenang di tengah hiruk pikuk Jakarta Selatan. Privasi sangat terjaga, terapis ramah, sopan, dan pijatan bertenaga pas sesuai preferensi.',
    photo_url: './assets/gallery/carousel(2).jpg',
    published: true,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    master_outlet: {
      kode_outlet: '106',
      name_outlet: 'ZEN PAKUBUWONO',
      city: 'Jakarta Selatan'
    }
  },
  {
    id: 't-6',
    auth_user_id: 'default',
    customer_name: 'Nurul Hidayah',
    customer_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Ruang perawatannya sangat bersih, wangi, dan estetik. Menikmati waktu me-time di Zen selalu jadi keputusan terbaik untuk mengembalikan energi positif.',
    photo_url: './assets/gallery/carousel(3).jpg',
    published: true,
    created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    master_outlet: {
      kode_outlet: '117',
      name_outlet: 'ZEN KOTA BARU PARAHYANGAN',
      city: 'Bandung Barat'
    }
  }
];

/**
 * Fetch top published testimonials (newest 6) from public.web_testimonials.
 */
export async function fetchPublicTestimonials(limit = 6): Promise<WebTestimonial[]> {
  try {
    const { data, error } = await supabase
      .from('web_testimonials')
      .select(`
        id,
        auth_user_id,
        member_id,
        customer_name,
        customer_avatar,
        kode_outlet,
        rating,
        comment,
        photo_url,
        published,
        created_at,
        update_at,
        master_outlet (
          kode_outlet,
          name_outlet,
          city
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Supabase fetchPublicTestimonials notice:', error.message);
      return fallbackTestimonials;
    }

    if (data && data.length > 0) {
      return data as any as WebTestimonial[];
    }
  } catch (err) {
    console.warn('Network issue fetching testimonials, using fallback:', err);
  }
  return fallbackTestimonials;
}

/**
 * Fetch or initialize web_members profile for the authenticated user.
 */
export async function fetchMemberProfile(authUserId: string, email?: string, fullName?: string, avatarUrl?: string): Promise<WebMember | null> {
  try {
    const { data, error } = await supabase
      .from('web_members')
      .select('*')
      .eq('auth_user_id', authUserId)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching member profile:', error.message);
    }

    if (data) {
      return data as WebMember;
    }

    // Auto-create initial record if not exists
    if (email) {
      const newMemberPayload = {
        auth_user_id: authUserId,
        email: email,
        full_name: fullName || email.split('@')[0],
        avatar_url: avatarUrl || null,
        active: true,
        pin_setup: false,
        phone_otentication: false,
        register_date: new Date().toISOString()
      };

      const { data: inserted, error: insertError } = await supabase
        .from('web_members')
        .insert([newMemberPayload])
        .select()
        .single();

      if (!insertError && inserted) {
        return inserted as WebMember;
      }
    }
  } catch (err) {
    console.warn('Exception in fetchMemberProfile:', err);
  }
  return null;
}

/**
 * Update member profile.
 */
/**
 * Normalizes an Indonesian phone number to digits only (e.g., 081234567890).
 */
export function normalizePhoneWa(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('62')) {
    cleaned = '0' + cleaned.slice(2);
  }
  return cleaned;
}

/**
 * Checks if a WhatsApp number is available (not used by any other member).
 */
export async function checkMemberPhoneWaAvailable(phoneWa: string, currentMemberId: string): Promise<{ available: boolean; error?: string }> {
  const normalized = normalizePhoneWa(phoneWa);
  if (!normalized) {
    return { available: true };
  }

  if (normalized.length < 9) {
    return { available: false, error: 'Nomor WhatsApp minimal 9 digit angka.' };
  }

  try {
    // 1. Try RPC check function in Supabase
    const { data, error } = await supabase.rpc('check_member_phone_wa_available', {
      p_member_id: currentMemberId,
      p_phone_wa: normalized
    });

    if (!error && typeof data === 'boolean') {
      return { available: data };
    }

    // 2. Fallback query
    const { data: members, error: queryError } = await supabase
      .from('web_members')
      .select('id, phone_wa')
      .neq('id', currentMemberId)
      .not('phone_wa', 'is', null);

    if (queryError) {
      console.warn('Phone check fallback notice:', queryError.message);
      return { available: true };
    }

    const isTaken = (members || []).some((m: any) => {
      if (!m.phone_wa) return false;
      return normalizePhoneWa(m.phone_wa) === normalized;
    });

    return { available: !isTaken };
  } catch (err: any) {
    console.warn('Exception during phone check:', err);
    return { available: true };
  }
}

export async function updateMemberProfile(memberId: string, updates: Partial<WebMember>): Promise<{ success: boolean; data?: WebMember; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('web_members')
      .update({
        ...updates,
        update_at: new Date().toISOString()
      })
      .eq('id', memberId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data: data as WebMember };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal menyimpan profil member.' };
  }
}

/**
 * Upload testimonial photo to Supabase Storage 'web-testimonials' bucket.
 */
export async function uploadTestimonialPhoto(file: File, memberName: string): Promise<string> {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const cleanName = memberName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20);
  const fileName = `reviews/zen-review-${cleanName}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('web-testimonials')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    throw new Error(`Gagal mengunggah foto ulasan: ${error.message}`);
  }

  const { data: pubData } = supabase.storage
    .from('web-testimonials')
    .getPublicUrl(data.path);

  return pubData.publicUrl;
}

/**
 * Submit member testimonial to public.web_testimonials (published = false).
 */
export async function submitTestimonial(testimonial: {
  auth_user_id: string;
  member_id?: string | null;
  customer_name: string;
  customer_avatar?: string | null;
  kode_outlet?: string | null;
  rating: number;
  comment: string;
  photo_url?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('web_testimonials')
      .insert([
        {
          auth_user_id: testimonial.auth_user_id,
          member_id: testimonial.member_id || null,
          customer_name: testimonial.customer_name,
          customer_avatar: testimonial.customer_avatar || null,
          kode_outlet: testimonial.kode_outlet || null,
          rating: testimonial.rating,
          comment: testimonial.comment,
          photo_url: testimonial.photo_url || null,
          published: false,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Gagal mengirim testimoni.' };
  }
}

/**
 * ============================================================================
 * CRM WEB CHAT FUNCTIONS (Supabase Cloud)
 * ============================================================================
 */

/**
 * Fetch the active chat room for a logged-in member.
 * Supports finding by web_members.id or auth_user_id.
 */
export async function fetchMemberActiveChatRoom(params: {
  memberId?: string | null;
  authUserId?: string | null;
}): Promise<ChatRoom | null> {
  try {
    const { memberId, authUserId } = params;
    if (!memberId && !authUserId) return null;

    let query = supabase
      .from('web_chat_rooms')
      .select('*')
      .neq('status', 'RESOLVED');

    if (memberId && authUserId) {
      query = query.or(`member_id.eq.${memberId},auth_user_id.eq.${authUserId}`);
    } else if (memberId) {
      query = query.eq('member_id', memberId);
    } else if (authUserId) {
      query = query.eq('auth_user_id', authUserId);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching active chat room:', error.message);
      return null;
    }
    return (data as ChatRoom) || null;
  } catch (err) {
    console.warn('Network issue fetching active chat room:', err);
    return null;
  }
}

/**
 * Create a new chat room for a member.
 */
export async function createChatRoom(params: {
  member_id?: string | null;
  auth_user_id?: string | null;
  member_name: string;
  member_phone?: string | null;
  kode_outlet?: string | null;
  category?: 'RESERVASI' | 'HOLDING' | 'GENERAL';
}): Promise<ChatRoom | null> {
  try {
    const { data, error } = await supabase
      .from('web_chat_rooms')
      .insert([
        {
          member_id: params.member_id || null,
          auth_user_id: params.auth_user_id || null,
          member_name: params.member_name,
          member_phone: params.member_phone || null,
          kode_outlet: params.kode_outlet || null,
          category: params.category || 'GENERAL',
          status: 'BOT',
          unread_by_outlet: false,
          unread_by_admin: false,
          unread_by_member: false,
          last_message: 'Room percakapan dibuka',
          last_message_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating chat room:', error.message);
      return null;
    }
    return data as ChatRoom;
  } catch (err) {
    console.error('Network issue creating chat room:', err);
    return null;
  }
}

/**
 * Fetch all messages for a specific chat room.
 */
export async function fetchChatMessages(roomId: string): Promise<ChatMessage[]> {
  try {
    const { data, error } = await supabase
      .from('web_chat_messages')
      .select('*')
      .eq('room_id', roomId)
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('Error fetching chat messages:', error.message);
      return [];
    }
    return (data as ChatMessage[]) || [];
  } catch (err) {
    console.warn('Network issue fetching chat messages:', err);
    return [];
  }
}

/**
 * Send a message in a chat room.
 */
export async function sendChatMessage(params: {
  room_id: string;
  sender_type: 'MEMBER' | 'BOT' | 'OUTLET_STAFF' | 'WEB_ADMIN';
  sender_name: string;
  message_text: string;
  sender_id?: string | null;
  metadata?: any;
}): Promise<ChatMessage | null> {
  try {
    const { data, error } = await supabase
      .from('web_chat_messages')
      .insert([
        {
          room_id: params.room_id,
          sender_type: params.sender_type,
          sender_name: params.sender_name,
          sender_id: params.sender_id || null,
          message_text: params.message_text,
          metadata: params.metadata || {},
          is_read: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error sending chat message:', error.message);
      return null;
    }
    return data as ChatMessage;
  } catch (err) {
    console.error('Network issue sending chat message:', err);
    return null;
  }
}

/**
 * Update chat room status or route to outlet/holding.
 */
export async function updateChatRoom(
  roomId: string,
  updates: Partial<ChatRoom>
): Promise<ChatRoom | null> {
  try {
    const { data, error } = await supabase
      .from('web_chat_rooms')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', roomId)
      .select()
      .single();

    if (error) {
      console.error('Error updating chat room:', error.message);
      return null;
    }
    return data as ChatRoom;
  } catch (err) {
    console.error('Network issue updating chat room:', err);
    return null;
  }
}

/**
 * Fetch active Chat Knowledge Base (FAQ items) with English support.
 */
export async function fetchChatKnowledge(): Promise<ChatKnowledge[]> {
  try {
    const { data, error } = await supabase
      .from('web_chat_knowledge')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Error fetching chat knowledge:', error.message);
      return [];
    }
    return (data as ChatKnowledge[]) || [];
  } catch (err) {
    console.warn('Network issue fetching chat knowledge:', err);
    return [];
  }
}
