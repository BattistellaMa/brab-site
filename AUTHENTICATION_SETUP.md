# Configuração do Sistema de Autenticação - ABRAB

Este documento descreve como configurar o sistema de autenticação integrado ao Supabase para o projeto ABRAB.

## 🚀 Funcionalidades Implementadas

- ✅ Autenticação com Google OAuth
- ✅ Sistema de rotas protegidas por papel (client/admin)
- ✅ Contexto de autenticação global
- ✅ Páginas de login, dashboard e áreas específicas
- ✅ Header responsivo com menu de usuário
- ✅ Redirecionamento automático baseado em autenticação

## 📋 Pré-requisitos

1. **Projeto Supabase configurado** com as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. **Autenticação Google habilitada** no Supabase Dashboard

## 🗄️ Configuração do Banco de Dados

### 1. Executar o Schema SQL

Execute o arquivo `src/config/supabase-schema.sql` no SQL Editor do Supabase para criar:

- Tabela `profiles` com RLS habilitado
- Políticas de segurança
- Triggers para criação automática de perfis
- Funções auxiliares

### 2. Estrutura da Tabela Profiles

```sql
profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'client',
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

## 🔐 Configuração da Autenticação Google

### 1. No Supabase Dashboard

1. Vá para **Authentication** > **Providers**
2. Habilite **Google**
3. Configure:
   - **Client ID**: ID do cliente OAuth do Google
   - **Client Secret**: Chave secreta do cliente OAuth
   - **Redirect URL**: `https://[SEU_PROJETO].supabase.co/auth/v1/callback`

### 2. No Google Cloud Console

1. Crie um projeto ou use um existente
2. Habilite a API Google+ 
3. Configure as credenciais OAuth 2.0
4. Adicione as URLs de redirecionamento autorizadas

## 🎯 Estrutura de Arquivos

```
src/
├── components/
│   ├── Header.jsx          # Header com navegação e menu de usuário
│   └── ProtectedRoute.jsx  # Componente para proteger rotas
├── contexts/
│   └── AuthContext.jsx     # Contexto global de autenticação
├── pages/
│   ├── Login.jsx           # Página de login
│   ├── Dashboard.jsx       # Dashboard principal
│   ├── Cliente.jsx         # Área do cliente
│   ├── Admin.jsx           # Área administrativa
│   └── AcessoNegado.jsx    # Página de acesso negado
├── routes/
│   └── index.jsx           # Sistema de rotas com proteção
└── styles/                 # Arquivos CSS para cada página
```

## 🔒 Sistema de Permissões

### Papéis de Usuário

- **`client`**: Usuários comuns que podem:
  - Acessar dashboard
  - Gerenciar agendamentos
  - Ver área do cliente
  - Acessar páginas de agendamento

- **`admin`**: Administradores que podem:
  - Todas as permissões de client
  - Acessar painel administrativo
  - Gerenciar clientes
  - Ver relatórios
  - Configurar sistema

### Rotas Protegidas

```jsx
// Exemplo de rota protegida
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <Admin />
  </ProtectedRoute>
} />
```

## 🎨 Componentes Principais

### AuthContext

Gerencia o estado global de autenticação:

```jsx
const { user, profile, isAuthenticated, isAdmin, signOut } = useAuth();
```

### ProtectedRoute

Protege rotas baseado no papel do usuário:

```jsx
<ProtectedRoute allowedRoles={['client', 'admin']}>
  <Componente />
</ProtectedRoute>
```

### Header

Header responsivo com:
- Logo/nome da empresa
- Navegação condicional (apenas para usuários logados)
- Menu de usuário com avatar
- Botão de logout

## 📱 Responsividade

- Design mobile-first
- Componentes adaptáveis para diferentes tamanhos de tela
- Navegação otimizada para dispositivos móveis

## 🚨 Tratamento de Erros

- Redirecionamento automático para login se não autenticado
- Página de acesso negado para usuários sem permissão
- Loading states durante verificações de autenticação
- Tratamento de erros de login/logout

## 🔄 Fluxo de Autenticação

1. **Usuário não autenticado** → Redirecionado para `/login`
2. **Login com Google** → Redirecionado para `/` (Dashboard)
3. **Acesso a rota protegida** → Verificação de papel
4. **Sem permissão** → Redirecionado para `/acesso-negado`
5. **Logout** → Redirecionado para `/login`

## 🛠️ Comandos Úteis

### Verificar Status da Autenticação

```jsx
const { isAuthenticated, loading } = useAuth();

if (loading) return <LoadingSpinner />;
if (!isAuthenticated) return <Navigate to="/login" />;
```

### Atualizar Perfil do Usuário

```jsx
const { updateProfile } = useAuth();

const handleUpdate = async () => {
  const { data, error } = await updateProfile({
    full_name: 'Novo Nome',
    phone: '123456789'
  });
};
```

## 📝 Notas Importantes

1. **Primeiro Login**: Usuários recebem automaticamente o papel `client`
2. **Promoção para Admin**: Deve ser feita manualmente no banco de dados
3. **Sessões**: Gerenciadas automaticamente pelo Supabase
4. **Segurança**: RLS (Row Level Security) habilitado por padrão

## 🐛 Solução de Problemas

### Erro de Redirecionamento
- Verifique as URLs de redirecionamento no Google Cloud Console
- Confirme as configurações no Supabase Dashboard

### Usuário não consegue acessar área admin
- Verifique se o campo `role` na tabela `profiles` está como `admin`
- Confirme se as políticas RLS estão funcionando

### Problemas de autenticação
- Verifique as variáveis de ambiente
- Confirme se o projeto Supabase está ativo
- Verifique os logs de autenticação no Supabase Dashboard

## 🔮 Próximos Passos

- [ ] Implementar notificações toast para feedback do usuário
- [ ] Adicionar mais provedores de autenticação (Facebook, Apple)
- [ ] Sistema de recuperação de senha
- [ ] Verificação de email
- [ ] Logs de auditoria para ações administrativas
- [ ] Sistema de convites para novos usuários
