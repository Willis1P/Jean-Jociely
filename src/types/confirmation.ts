export interface Guest {
  name: string;
  type: 'adult' | 'child';
}

export interface Confirmation {
  id: string;
  guests: Guest[];
  created_at: string;
} 