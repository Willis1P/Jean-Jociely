import { createClient } from '@supabase/supabase-js';

// Log completo das variáveis de ambiente
const env = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  serviceKey: import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  adminPass: import.meta.env.VITE_ADMIN_PASSWORD
};

console.log('Detalhes completos da configuração Supabase:', {
  url: env.url,
  anonKeyPrimeiros10Chars: env.anonKey?.substring(0, 10),
  urlValida: env.url?.startsWith('https://'),
  timestamp: new Date().toISOString()
});

if (!env.url || !env.anonKey) {
  console.error('Erro de configuração do Supabase:', {
    urlPresente: !!env.url,
    anonKeyPresente: !!env.anonKey,
    urlCompleta: env.url
  });
  throw new Error('Configuração do Supabase incompleta');
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
      'Authorization': `Bearer ${env.anonKey}`
    }
  }
});

// Teste de conexão inicial
supabase
  .from('gifts')
  .select('count')
  .limit(1)
  .single()
  .then(response => {
    console.log('Teste de conexão Supabase:', {
      sucesso: !response.error,
      erro: response.error?.message,
      status: response.status
    });
  })
  .catch(error => {
    console.error('Erro no teste de conexão:', error);
  }); 