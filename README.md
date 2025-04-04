# Site de Casamento - Jean & Jociely

Site de casamento desenvolvido com React, Vite, TailwindCSS e Supabase.

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
- Copie o arquivo `.env.example` para `.env`
```bash
cp .env.example .env
```
- Preencha as variáveis no arquivo `.env` com seus valores:
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
  - VITE_SUPABASE_SERVICE_ROLE_KEY
  - VITE_ADMIN_PASSWORD

## Desenvolvimento

Para rodar o projeto localmente:
```bash
npm run dev
```

## Deploy no Vercel

1. Faça fork do repositório no GitHub

2. No Vercel:
   - Conecte sua conta GitHub
   - Importe o projeto
   - Configure as variáveis de ambiente:
     - VITE_SUPABASE_URL
     - VITE_SUPABASE_ANON_KEY
     - VITE_SUPABASE_SERVICE_ROLE_KEY
     - VITE_ADMIN_PASSWORD
   - Deploy!

## Estrutura de Arquivos

- `/src` - Código fonte
  - `/components` - Componentes React
  - `/pages` - Páginas da aplicação
  - `/lib` - Utilitários e configurações
  - `/types` - Tipos TypeScript
- `/public` - Arquivos estáticos
  - `/lovable-uploads` - Imagens e vídeos

## Recursos Necessários

- Vídeo de fundo: Adicione um vídeo MP4 em `/public/lovable-uploads/wedding-bg.mp4`
- QR Code PIX: Adicione a imagem em `/public/lovable-uploads/lua-de-mel-qr.jpg`

## Tecnologias

- React
- Vite
- TypeScript
- TailwindCSS
- Supabase
- Shadcn/ui
