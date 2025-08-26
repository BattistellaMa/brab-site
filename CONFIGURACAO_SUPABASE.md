# 🔧 Configuração do Supabase - Passo a Passo

## ❌ **ERRO ATUAL RESOLVIDO**
O erro "supabaseUrl is required" foi corrigido! Agora a aplicação funciona mesmo sem o Supabase configurado.

## 📋 **Passos para Configurar o Supabase**

### 1️⃣ **Criar Conta no Supabase**
- Acesse [supabase.com](https://supabase.com)
- Clique em "Start your project"
- Faça login com GitHub ou crie uma conta

### 2️⃣ **Criar Novo Projeto**
- Clique em "New Project"
- Escolha sua organização
- Digite um nome para o projeto (ex: "gestao-brab")
- Escolha uma senha forte para o banco
- Escolha a região mais próxima (ex: São Paulo)
- Clique em "Create new project"

### 3️⃣ **Aguardar Configuração**
- O projeto pode levar alguns minutos para ficar pronto
- Aguarde até aparecer "Project is ready"

### 4️⃣ **Obter Credenciais**
- No projeto, vá para **Settings** → **API**
- Copie:
  - **Project URL** (ex: `https://abcdefghijklmnop.supabase.co`)
  - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 5️⃣ **Criar Arquivo .env**
Na raiz do projeto, crie um arquivo chamado `.env` com:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

### 6️⃣ **Criar Tabela no Banco**
No Supabase, vá para **SQL Editor** e execute:

```sql
-- Criar tabela de clientes
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

-- Habilitar segurança de linha
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Permitir inserção de novos clientes
CREATE POLICY "Permitir inserção de clientes" ON clientes
  FOR INSERT WITH CHECK (true);

-- Permitir leitura (opcional)
CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT USING (true);
```

### 7️⃣ **Reiniciar a Aplicação**
```bash
npm run dev
```

## ✅ **Como Testar**

1. Navegue para `/agendamento`
2. Clique em "Agendar Serviço"
3. Preencha o formulário
4. Clique em "Agendar"
5. Verifique se aparece "Agendamento realizado com sucesso!"

## 🔍 **Verificar Dados**

No Supabase, vá para **Table Editor** → **clientes** para ver os dados inseridos.

## 🆘 **Se Der Erro**

- Verifique se o arquivo `.env` está na raiz do projeto
- Confirme se as credenciais estão corretas
- Verifique se a tabela foi criada
- Olhe o console do navegador para mensagens de erro

## 📱 **Contato Alternativo**

Enquanto o Supabase não estiver configurado, o formulário mostrará:
> "Sistema em manutenção. Entre em contato diretamente pelo WhatsApp ou email."
