-- Script para corrigir a tabela clientes no Supabase
-- Execute este SQL no Editor SQL do seu projeto Supabase

-- 1. Primeiro, vamos verificar a estrutura atual da tabela
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'clientes';

-- 2. Se o campo telefone estiver como numeric/integer, vamos alterá-lo para VARCHAR
ALTER TABLE clientes 
ALTER COLUMN telefone TYPE VARCHAR(20);

-- 3. Verificar se as políticas RLS estão configuradas corretamente
-- Se não existirem, execute:

-- Habilitar RLS (Row Level Security)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção
CREATE POLICY "Permitir inserção de clientes" ON clientes
  FOR INSERT WITH CHECK (true);

-- Criar política para permitir leitura (opcional)
CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT USING (true);

-- 4. Verificar se a tabela tem a estrutura correta
-- A estrutura deve ser:
/*
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  cliente_nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,  -- IMPORTANTE: deve ser VARCHAR, não numeric
  email VARCHAR(255) NOT NULL,
  endereco TEXT NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  tipo_servico VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
*/

-- 5. Se precisar recriar a tabela completamente (CUIDADO: isso apaga todos os dados):
/*
DROP TABLE IF EXISTS clientes;

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

-- Habilitar RLS
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Criar políticas
CREATE POLICY "Permitir inserção de clientes" ON clientes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura de clientes" ON clientes
  FOR SELECT USING (true);
*/
