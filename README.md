# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/380dbe12-e099-41ee-af6c-8bc027c9ffba

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/380dbe12-e099-41ee-af6c-8bc027c9ffba) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/380dbe12-e099-41ee-af6c-8bc027c9ffba) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

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
- Preencha as variáveis no arquivo `.env` com seus valores

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
- QR Code PIX: Adicione a imagem em `/public/lovable-uploads/lua-de-mel-qr.png.jpg`

## Tecnologias

- React
- Vite
- TypeScript
- TailwindCSS
- Supabase
- Shadcn/ui
