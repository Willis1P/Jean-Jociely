export interface Gift {
  id: string;
  name: string;
  image_url: string;
  price: number;
  reserved_by?: string;
  paid: boolean;
  created_at: string;
}

export interface GiftFormData {
  name: string;
  image_url: string;
  price: number;
} 