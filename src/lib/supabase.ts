import { createClient } from '@supabase/supabase-js';

// Log completo das variáveis de ambiente
console.log('Todas as variáveis de ambiente:', {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  serviceKey: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  adminPass: import.meta.env.VITE_ADMIN_PASSWORD
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Erro nas variáveis de ambiente:', {
    temUrl: !!supabaseUrl,
    temAnonKey: !!supabaseAnonKey,
    urlTamanho: supabaseUrl?.length,
    anonKeyTamanho: supabaseAnonKey?.length
  });
  throw new Error('Faltam variáveis de ambiente do Supabase. Verifique o arquivo .env');
}

// Criar cliente com opções adicionais
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}); 