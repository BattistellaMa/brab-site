# Configuração do Supabase

## 1. Criar projeto no Supabase
- Acesse [supabase.com](https://supabase.com)
- Crie uma nova conta ou faça login
- Crie um novo projeto

## 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=sua_url_do_supabase_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase_aqui
```

## 3. Criar tabela 'clientes'
Execute o seguinte SQL no editor SQL do Supabase:

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  cliente_nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  tipo_servico VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção
CREATE POLICY "Permitir inserção de clientes" ON clientes
  FOR INSERT WITH CHECK (true);

-- Criar política para permitir leitura (opcional)
CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT USING (true);
```

## 4. Configurar autenticação Google OAuth

### 4.1. No painel do Supabase:
1. Vá em **Authentication** > **Providers**
2. Ative o provedor **Google**
3. Adicione suas credenciais do Google OAuth (Client ID e Client Secret)
   - Para obter as credenciais: [Google Cloud Console](https://console.cloud.google.com/)

### 4.2. Configurar URLs de redirecionamento:

**IMPORTANTE**: Adicione todas as URLs onde sua aplicação será acessada:

1. No painel do Supabase, vá em **Authentication** > **URL Configuration**
2. Adicione as seguintes URLs em **Redirect URLs**:
   - Para desenvolvimento local: `http://localhost:5173/` (ou a porta que você usa)
   - Para GitHub Pages: `https://seu-usuario.github.io/` (ou `https://seu-usuario.github.io/nome-do-repo/` se estiver em um subdiretório)
   - Se usar um domínio customizado: `https://seu-dominio.com/`

3. Em **Site URL**, configure a URL principal de produção (ex: `https://seu-usuario.github.io/`)

### 4.3. Configurar no Google Cloud Console:
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em **APIs & Services** > **Credentials**
3. Edite seu OAuth 2.0 Client ID
4. Em **Authorized redirect URIs**, adicione:
   - `https://[seu-projeto-id].supabase.co/auth/v1/callback`
   - (Você encontra essa URL no painel do Supabase em Authentication > Providers > Google)

## 5. Verificar se o projeto Supabase está ativo

**IMPORTANTE**: Projetos gratuitos do Supabase podem ser pausados após inatividade.

1. Acesse o painel do Supabase
2. Verifique se o projeto está **Active** (não pausado)
3. Se estiver pausado, clique em **Restore** para reativar
4. Aguarde alguns minutos para o banco de dados inicializar completamente

## 6. Criar tabela 'profiles' (para autenticação)

Execute o seguinte SQL no editor SQL do Supabase:

```sql
-- Ver arquivo src/config/supabase-schema.sql para o schema completo
```

Ou execute diretamente:

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
    full_name TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança (ver src/config/supabase-schema.sql para políticas completas)
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);
```

## 7. Criar tabela 'clientes'
Execute o seguinte SQL no editor SQL do Supabase:

```sql
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  cliente_nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  tipo_servico VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção
CREATE POLICY "Permitir inserção de clientes" ON clientes
  FOR INSERT WITH CHECK (true);

-- Criar política para permitir leitura (opcional)
CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT USING (true);
```

## 8. Testar a aplicação
- Execute `npm run dev`
- Navegue para `/login`
- Teste o login com Google
- Verifique se o redirecionamento funciona corretamente

## 9. Troubleshooting

### Erro: "FATAL: terminating connection due to administrator command (SQLSTATE 57P01)"
- **Causa**: Projeto Supabase está pausado
- **Solução**: Acesse o painel do Supabase e restaure o projeto

### Erro: "redirect_uri_mismatch"
- **Causa**: URL de redirecionamento não configurada corretamente
- **Solução**: Verifique se todas as URLs estão configuradas no Supabase e no Google Cloud Console

### Login funciona localmente mas não no GitHub Pages
- **Causa**: URL de redirecionamento não inclui a URL do GitHub Pages
- **Solução**: Adicione a URL completa do GitHub Pages nas configurações do Supabase
