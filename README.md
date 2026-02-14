# Angular News App

A modern Angular SPA for browsing tech & connectivity news, consuming a Strapi 5 headless CMS via REST API.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Angular 21 | Frontend framework (standalone components, signals) |
| TypeScript | Type safety and interfaces for Strapi API |
| CSS | Component-scoped and global styles (no frameworks) |
| RxJS | Reactive HTTP requests |
| Angular Router | Client-side navigation |
| Docker + Nginx | Production container |

## Features

- Dark theme with responsive layout and custom CSS (no Tailwind/Bootstrap)
- Strapi blocks renderer built from scratch (paragraphs, headings, lists, images, quotes, code)
- Responsive grid with notice cards, category badges, and featured images
- Environment-based configuration (dev/prod)
- Multi-stage Docker build (Node build + Nginx serve)

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/          # Sticky navigation bar
│   │   ├── footer/          # Site footer
│   │   ├── notice-card/     # Notice card with image + hover effects
│   │   ├── category-badge/  # Category pill badge
│   │   └── block-renderer/  # Custom Strapi blocks renderer
│   ├── pages/               # Route-level page components
│   │   ├── home/            # Hero section + latest notices
│   │   ├── notices/         # Full notices listing
│   │   ├── notice-detail/   # Single notice article
│   │   ├── about/           # About page
│   │   └── contact/         # Contact page
│   ├── services/            # Injectable API services
│   │   └── strapi.service   # HttpClient-based Strapi client
│   └── models/              # TypeScript interfaces
│       └── strapi.models    # Notice, Category, StrapiImage, Block types
├── environments/            # Dev/prod configuration
└── styles.css               # Global styles, CSS variables, fonts
```

## Getting Started

### Prerequisites

- Node.js >= 20
- A running Strapi 5 instance providing the REST API

### Development

```bash
npm install
ng serve
```

Open http://localhost:4200. The app expects Strapi running at `http://localhost:1337`.

### Production Build

```bash
ng build
```

Output goes to `dist/` — static files ready to be served by any web server.

### Docker

```bash
docker build -t ntc-frontend .
docker run -p 3000:3000 ntc-frontend
```

## Environment Configuration

Edit `src/environments/environment.ts` for development:

```typescript
export const environment = {
  production: false,
  strapiUrl: 'http://localhost:1337',
};
```

For production, update `src/environments/environment.prod.ts` or pass `STRAPI_URL` as a Docker build arg.

## License

Private project.
