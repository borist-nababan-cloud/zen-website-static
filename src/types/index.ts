export interface Outlet {
  kode_outlet: string;
  name_outlet: string;
  alamat?: string | null;
  city?: string | null;
  province?: string | null;
  no_telp?: string | null;
  no_wa?: string | null;
  email?: string | null;
  location?: {
    lat?: number;
    lng?: number;
    maps_url?: string;
  } | string | null;
}

export interface ServiceOutletAvailability {
  kode_outlet: string;
  name_outlet: string;
  city?: string | null;
  no_wa?: string | null;
  custom_notes?: string | null;
}

export interface Service {
  id: string;
  service_code: string;
  name: string;
  category: string;
  duration_minutes: number;
  price?: number;
  description?: string | null;
  benefits?: string | null;
  image_url?: string | null;
  is_featured?: boolean;
  sort_order: number;
  available_outlets?: ServiceOutletAvailability[];
}

export interface Facility {
  id: string;
  facility_code: string;
  name: string;
  category: string;
  description?: string | null;
  icon_name?: string | null;
  image_url_1?: string | null;
  image_url_2?: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface OutletFacility {
  id: string;
  kode_outlet: string;
  facility_id: string;
  custom_notes?: string | null;
  custom_image_url_1?: string | null;
  custom_image_url_2?: string | null;
  is_available: boolean;
  facility?: Facility;
}

export interface ReservationFormData {
  customer_name: string;
  phone: string;
  kode_outlet: string;
  service_name: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  notes?: string;
}

export interface WebGalleryItem {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  image_url: string;
  kode_outlet?: string | null;
  active: boolean;
  sort_order: number;
}

export interface WebMember {
  id: string;
  auth_user_id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
  phone_wa?: string | null;
  fixline?: string | null;
  shipping_address?: string | null;
  city?: string | null;
  province?: string | null;
  zip_code?: string | null;
  birth_date?: string | null;
  active: boolean;
  pin_setup: boolean;
  phone_otentication: boolean;
  register_date: string;
  created_at?: string;
  update_at?: string;
}

export interface WebTestimonial {
  id: string;
  auth_user_id: string;
  member_id?: string | null;
  customer_name: string;
  customer_avatar?: string | null;
  kode_outlet?: string | null;
  rating: number; // 1 to 5
  comment: string;
  photo_url?: string | null;
  published: boolean;
  created_at: string;
  update_at?: string;
  master_outlet?: {
    kode_outlet: string;
    name_outlet: string;
    city: string;
  } | null;
}
