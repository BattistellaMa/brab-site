# Troubleshooting - Problemas de Autenticação no GitHub Pages

## Problema: Todas as páginas redirecionam para login

### Possíveis Causas e Soluções

#### 1. Variáveis de Ambiente não Configuradas

**Problema**: As variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` não estão disponíveis no GitHub Pages.

**Solução**: 
- As variáveis de ambiente precisam ser injetadas no build
- No GitHub Pages, você precisa usar GitHub Secrets e Actions, OU
- Incluir as variáveis diretamente no código (não recomendado para produção)

**Como verificar**:
1. Abra o console do navegador (F12)
2. Procure por erros relacionados ao Supabase
3. Verifique se há mensagens como "Supabase não configurado"

#### 2. Sessão não está sendo Persistida

**Problema**: O localStorage pode não estar funcionando corretamente no GitHub Pages.

**Solução**: 
- Já implementado: Configuração explícita de storage no `supabaseClient.jsx`
- Verifique se o navegador permite cookies/localStorage (modo privado pode bloquear)

**Como verificar**:
1. Abra o console do navegador (F12)
2. Vá em Application > Local Storage
3. Procure por chaves do Supabase (geralmente começam com `sb-`)
4. Se não houver nada, o localStorage pode estar bloqueado

#### 3. Problema com o Basename do Router

**Problema**: O React Router pode não estar funcionando corretamente com o basename `/brab-site`.

**Solução**: 
- Já implementado: Basename configurado dinamicamente baseado no ambiente
- Verifique se o `404.html` está sendo servido corretamente

**Como verificar**:
1. Acesse uma rota diretamente: `https://BattistellaMa.github.io/brab-site/cliente`
2. Se retornar 404, o problema é com o `404.html`
3. Se redirecionar para login, o problema é com a autenticação

#### 4. Perfil não está sendo Carregado

**Problema**: O perfil do usuário não está sendo criado ou carregado corretamente.

**Solução**: 
- Verifique se a tabela `profiles` existe no Supabase
- Verifique se as políticas RLS estão configuradas corretamente
- Verifique os logs no console do navegador

**Como verificar**:
1. Abra o console do navegador (F12)
2. Procure por mensagens como "Perfil não encontrado" ou "Erro ao buscar perfil"
3. Verifique se há erros de conexão com o banco

#### 5. Projeto Supabase Pausado

**Problema**: O projeto Supabase pode estar pausado.

**Solução**: 
- Acesse o painel do Supabase
- Verifique se o projeto está ativo
- Se estiver pausado, restaure o projeto

## Como Debugar

### 1. Verificar Logs no Console

Abra o console do navegador e procure por:
- `AuthContext - Sessão atual:`
- `AuthContext - Usuário autenticado:`
- `AuthContext - Perfil carregado:`
- `ProtectedRoute - Estado:`

### 2. Verificar LocalStorage

1. Abra o console (F12)
2. Vá em Application > Local Storage
3. Procure por chaves do Supabase
4. Verifique se há uma sessão armazenada

### 3. Verificar Network

1. Abra o console (F12)
2. Vá em Network
3. Procure por requisições para o Supabase
4. Verifique se há erros 401, 403, ou 500

### 4. Testar Localmente

1. Execute `npm run dev`
2. Teste o login
3. Se funcionar localmente mas não no GitHub Pages, o problema é com:
   - Variáveis de ambiente
   - Configuração do build
   - Problemas com o 404.html

## Solução Rápida: Verificar Variáveis de Ambiente

Se as variáveis de ambiente não estiverem configuradas no GitHub Pages, você pode:

### Opção 1: Usar GitHub Actions (Recomendado)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Opção 2: Configurar Variáveis no Build Local

Se você fizer o build localmente, certifique-se de que as variáveis estão no `.env`:

```env
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

## Checklist de Verificação

- [ ] Variáveis de ambiente configuradas
- [ ] Projeto Supabase ativo (não pausado)
- [ ] Tabela `profiles` existe no Supabase
- [ ] Políticas RLS configuradas corretamente
- [ ] Arquivo `404.html` está na pasta `dist/` após o build
- [ ] LocalStorage não está bloqueado
- [ ] Console do navegador não mostra erros
- [ ] Sessão está sendo criada após login
- [ ] Perfil está sendo carregado após login

## Próximos Passos

1. Verifique os logs no console do navegador
2. Verifique se as variáveis de ambiente estão configuradas
3. Teste localmente primeiro
4. Se funcionar localmente, o problema é com a configuração do GitHub Pages

