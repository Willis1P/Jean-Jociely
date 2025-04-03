import { supabase } from '@/lib/supabase';

export async function saveConfirmation(guests: { name: string; age: string }[]) {
  const { data, error } = await supabase
    .from('confirmations')
    .insert([
      {
        guests,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function getConfirmations() {
  const { data, error } = await supabase
    .from('confirmations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function verifyAdminPassword(password: string) {
  // Na prática, você deve implementar uma verificação mais segura
  return password === process.env.VITE_ADMIN_PASSWORD;
} 