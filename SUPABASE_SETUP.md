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

## 4. Testar a aplicação
- Execute `npm run dev`
- Navegue para `/agendamento`
- Clique em "Agendar Serviço"
- Preencha o formulário e teste o envio
