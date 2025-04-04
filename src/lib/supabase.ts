import { createClient } from '@supabase/supabase-js';

// Log completo das variáveis de ambiente
const env = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  serviceKey: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  adminPass: import.meta.env.VITE_ADMIN_PASSWORD
};

console.log('Variáveis de ambiente carregadas:', {
  temUrl: !!env.url,
  temAnonKey: !!env.anonKey,
  urlCompleta: env.url === 'https://twskyciqnyoxslqbctdd.supabase.co',
  anonKeyTamanho: env.anonKey?.length
});

if (!env.url || !env.anonKey) {
  throw new Error(`Configuração do Supabase incompleta:
    URL: ${env.url ? 'presente' : 'ausente'}
    Anon Key: ${env.anonKey ? 'presente' : 'ausente'}
  `);
}

// Criar cliente com configurações específicas
export const supabase = createClient(env.url, env.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}); 