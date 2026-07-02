# Yasashii_Yume — Photography Portfolio

A contemporary photography portfolio built with React, Tailwind CSS, and GSAP. Based on the original Yasashii_Yume design with animated carousels, floating shapes, and a cinematic dark theme.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- GSAP (scroll & entrance animations)
- React Router

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Customization

Edit `src/data/photos.ts`:

- **siteConfig** — name, tagline, contact info, social links, bio
- **photos** — replace Unsplash URLs with your own images
- **galleryCollections** — gallery cover images and descriptions

Add your images to `public/images/` and reference as `/images/your-photo.jpg`.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Single-page home with Hero, Best/Recent carousels, About, Portfolio, Galleries, Contact |
| `/gallery?category=Portraits` | Full gallery view with lightbox |

## Deployment (Vercel)

This project is configured for [Vercel](https://vercel.com) out of the box.

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 20+ |

### Deploy from GitHub (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects Vite — leave the default settings.
4. Click **Deploy**.

`vercel.json` handles SPA routing (`/` and `/gallery` both work on refresh).

### Deploy from CLI

```bash
npm install
npm run build
npx vercel
```

Follow the prompts. Use `npx vercel --prod` for production.

### Netlify

`netlify.toml` is also included if you prefer Netlify.

## Contact Form

Connect to [Formspree](https://formspree.io) in `src/pages/Home.tsx` for production email delivery.
