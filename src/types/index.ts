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

export interface Service {
  id: string;
  service_code: string;
  name: string;
  category: string;
  duration_minutes: number;
  price: number;
  description: string;
  benefits?: string | null;
  image_url?: string | null;
  is_featured: boolean;
  sort_order: number;
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
