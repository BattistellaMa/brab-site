import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

// Validação das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Erro: Variáveis de ambiente do Supabase não configuradas!');
  console.error('📝 Crie um arquivo .env na raiz do projeto com:');
  console.error('VITE_SUPABASE_URL=rezdbfaksjeiiopfendl');
  console.error('VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase_aqui');
  console.error('🔗 Acesse: https://supabase.com para criar um projeto');
  
  // Criar cliente mock para evitar erros de runtime
  supabase = {
    from: () => ({
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } }),
      select: () => Promise.resolve({ data: null, error: { message: 'Supabase não configurado' } })
    })
  };
} else {
  // Cliente Supabase válido
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase configurado com sucesso!');
}

export { supabase };
