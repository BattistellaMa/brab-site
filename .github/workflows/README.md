# Configuração do GitHub Actions para Deploy

## Como Configurar

### 1. Adicionar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** > **Secrets and variables** > **Actions**
3. Clique em **New repository secret**
4. Adicione os seguintes secrets:

   - **Nome**: `VITE_SUPABASE_URL`
     **Valor**: A URL do seu projeto Supabase (ex: `https://xxxxx.supabase.co`)
   
   - **Nome**: `VITE_SUPABASE_ANON_KEY`
     **Valor**: A chave anônima do seu projeto Supabase

### 2. Habilitar GitHub Pages

1. Acesse **Settings** > **Pages**
2. Em **Source**, selecione:
   - **Source**: `GitHub Actions`
3. Salve as configurações

### 3. Fazer Push para Main

Após configurar os secrets, faça push para a branch `main`:

```bash
git add .
git commit -m "Adicionar GitHub Actions para deploy"
git push origin main
```

O GitHub Actions irá:
1. Fazer checkout do código
2. Instalar dependências
3. Fazer build com as variáveis de ambiente
4. Fazer deploy para GitHub Pages

### 4. Verificar o Deploy

1. Acesse a aba **Actions** no seu repositório
2. Você verá o workflow em execução
3. Quando completar, o site estará disponível em:
   `https://BattistellaMa.github.io/brab-site/`

## Troubleshooting

### Erro: "Secrets not found"
- Verifique se os secrets foram criados corretamente
- Os nomes devem ser exatamente: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

### Erro: "Pages build failed"
- Verifique os logs na aba Actions
- Verifique se as variáveis de ambiente estão corretas
- Verifique se o build funciona localmente: `npm run build`

### Deploy não atualiza
- Aguarde alguns minutos (o GitHub Pages pode levar até 10 minutos)
- Limpe o cache do navegador
- Verifique se o workflow foi executado com sucesso na aba Actions

## Executar Manualmente

Se quiser executar o deploy manualmente:

1. Vá na aba **Actions**
2. Selecione o workflow **Deploy to GitHub Pages**
3. Clique em **Run workflow**
4. Selecione a branch `main`
5. Clique em **Run workflow**

