# Guia de Deploy no GitHub Pages

## ✅ Correções Implementadas

As seguintes correções foram aplicadas para resolver o erro 404 no GitHub Pages:

1. **BrowserRouter com basename**: Configurado para usar `/brab-site` em produção
2. **404.html melhorado**: Redireciona corretamente rotas e callbacks OAuth
3. **Tratamento de callback OAuth**: Melhorado para funcionar no GitHub Pages

## 📋 Passo a Passo para Deploy

### 1. Verificar Configurações

Certifique-se de que os seguintes arquivos estão configurados corretamente:

- ✅ `vite.config.js` - base: `/brab-site/`
- ✅ `package.json` - homepage: `https://BattistellaMa.github.io/brab-site`
- ✅ `src/App.jsx` - BrowserRouter com basename
- ✅ `public/404.html` - Arquivo de redirecionamento

### 2. Configurar Supabase

No painel do Supabase:

1. **Authentication > URL Configuration**
   - **Site URL**: `https://BattistellaMa.github.io/brab-site/`
   - **Redirect URLs**: Adicione:
     - `https://BattistellaMa.github.io/brab-site/`
     - `http://localhost:5173/` (para desenvolvimento)

2. **Verificar se o projeto está ativo** (não pausado)

### 3. Fazer o Build

```bash
# Instalar dependências (se ainda não fez)
npm install

# Testar o build localmente
npm run build

# Verificar se o 404.html está na pasta dist/
ls dist/404.html
```

### 4. Fazer o Deploy

```bash
# Deploy para GitHub Pages
npm run deploy
```

Este comando vai:
- Executar `predeploy` (faz o build)
- Publicar a pasta `dist/` na branch `gh-pages`

### 5. Configurar GitHub Pages (se ainda não fez)

1. Acesse o repositório no GitHub
2. Vá em **Settings > Pages**
3. Em **Source**, selecione:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Clique em **Save**

### 6. Aguardar e Testar

- Aguarde 1-2 minutos para o GitHub processar
- Acesse: `https://BattistellaMa.github.io/brab-site/`
- Teste o login com Google
- Verifique se as rotas funcionam corretamente

## 🔄 Atualizações Futuras

Para atualizar o site após fazer mudanças:

```bash
# 1. Fazer commit das alterações
git add .
git commit -m "Descrição das alterações"
git push origin main

# 2. Fazer deploy
npm run deploy
```

## 🐛 Troubleshooting

### Erro 404 ao navegar entre páginas

**Solução**: 
- Verifique se o arquivo `404.html` está na pasta `dist/` após o build
- Verifique se o `BrowserRouter` tem o `basename` correto
- Limpe o cache do navegador (Ctrl+Shift+R)

### Login com Google não funciona

**Solução**:
- Verifique se a URL de produção está configurada no Supabase
- Verifique se o projeto Supabase está ativo
- Verifique o console do navegador para erros

### Assets não carregam

**Solução**:
- Verifique se `base: '/brab-site/'` no `vite.config.js` corresponde ao nome do repositório
- Verifique se os caminhos dos assets estão corretos

### Callback OAuth retorna 404

**Solução**:
- O arquivo `404.html` deve redirecionar corretamente para `index.html` preservando o hash
- Verifique se o `404.html` está na pasta `dist/` após o build

## 📝 Notas Importantes

1. **O arquivo `404.html` é essencial**: Sem ele, o GitHub Pages não consegue lidar com rotas do React Router
2. **O basename no BrowserRouter**: Deve corresponder ao base path no `vite.config.js`
3. **URLs no Supabase**: Sempre configure as URLs de produção e desenvolvimento

## ✅ Checklist de Deploy

- [ ] Build local funciona (`npm run build`)
- [ ] Arquivo `404.html` está em `dist/` após o build
- [ ] URLs configuradas no Supabase
- [ ] Projeto Supabase está ativo
- [ ] Deploy executado (`npm run deploy`)
- [ ] GitHub Pages configurado (branch `gh-pages`)
- [ ] Site acessível em `https://BattistellaMa.github.io/brab-site/`
- [ ] Login com Google funciona
- [ ] Navegação entre páginas funciona

