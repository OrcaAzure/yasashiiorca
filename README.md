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

## Deployment

### Vercel
```bash
npx vercel
```
Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Netlify
Deploy the `dist` folder after `npm run build`, or connect your repo at [netlify.com](https://netlify.com).

Both `vercel.json` and `netlify.toml` handle SPA routing.

## Contact Form

Connect to [Formspree](https://formspree.io) in `src/pages/Home.tsx` for production email delivery.
