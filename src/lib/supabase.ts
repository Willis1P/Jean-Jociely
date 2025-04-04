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
  timestamp: new Date().toISOString(),
  ambiente: import.meta.env.MODE
});

if (!env.url || !env.anonKey) {
  console.error('Erro de configuração do Supabase:', {
    urlPresente: !!env.url,
    anonKeyPresente: !!env.anonKey,
    urlCompleta: env.url,
    ambiente: import.meta.env.MODE
  });
  throw new Error('Configuração do Supabase incompleta');
}

// Criar cliente com configurações específicas
export const supabase = createClient(env.url, env.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase-auth'
  },
  db: {
    schema: 'public'
  }
});

// Teste de conexão inicial
const testarConexao = async () => {
  try {
    const { data, error, status } = await supabase
      .from('gifts')
      .select('count')
      .limit(1)
      .single();
    
    console.log('Teste de conexão Supabase:', {
      sucesso: !error,
      erro: error?.message,
      status,
      data,
      headers: {
        authorization: `Bearer ${env.anonKey.substring(0, 10)}...`,
        contentType: 'application/json'
      }
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Erro no teste de conexão:', {
      mensagem: error.message,
      codigo: error.code,
      detalhes: error.details,
      dica: error.hint
    });
  }
};

testarConexao(); 