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
  name_en?: string | null;
  category: string;
  category_en?: string | null;
  duration_minutes: number;
  price?: number;
  description?: string | null;
  description_en?: string | null;
  benefits?: string | null;
  benefits_en?: string[] | null;
  image_url?: string | null;
  is_featured?: boolean;
  sort_order: number;
  available_outlets?: ServiceOutletAvailability[];
}

export interface Facility {
  id: string;
  facility_code: string;
  name: string;
  name_en?: string | null;
  category: string;
  category_en?: string | null;
  description?: string | null;
  description_en?: string | null;
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
  title_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  category: string;
  category_en?: string | null;
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

export interface ChatRoom {
  id: string;
  member_id: string | null;
  auth_user_id?: string | null;
  member_name: string;
  member_phone: string | null;
  kode_outlet: string | null;
  category: 'RESERVASI' | 'HOLDING' | 'GENERAL';
  status: 'BOT' | 'WAITING_STAFF' | 'ACTIVE' | 'RESOLVED';
  unread_by_outlet: boolean;
  unread_by_admin: boolean;
  unread_by_member: boolean;
  last_message: string | null;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_type: 'MEMBER' | 'BOT' | 'OUTLET_STAFF' | 'WEB_ADMIN';
  sender_name: string;
  sender_id: string | null;
  message_text: string;
  metadata?: any;
  is_read: boolean;
  created_at: string;
}

export interface ChatKnowledge {
  id: string;
  category: string;
  keyword: string;
  keyword_en?: string | null;
  question: string;
  question_en?: string | null;
  answer: string;
  answer_en?: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface WebNewsPromo {
  id: string;
  title: string;
  title_en?: string | null;
  subtitle?: string | null;
  subtitle_en?: string | null;
  description?: string | null;
  description_en?: string | null;
  image_url: string;
  badge_text?: string | null;
  cta_url?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

