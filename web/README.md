## Activewear NUA · Web

Vidriera digital (Next.js) para mostrar productos, filtrar por talle/stock y enviar consulta por WhatsApp.

## Getting Started

### Variables de entorno

Crear `web/.env.local` a partir de `web/.env.example`.

### Desarrollo

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity
- El catálogo se lee desde Sanity.
- El Studio vive en `../studio` (ver `studio/README.md`).

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

- En Vercel, configurar **Root Directory**: `web`.
- Agregar las variables de entorno (mismas que `web/.env.example`).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
