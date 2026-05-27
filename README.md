# Activewear NUA · Vidriera Digital

Repositorio con:
- `web/`: sitio público (Next.js) para ver catálogo y consultar por WhatsApp.
- `studio/`: panel admin (Sanity Studio) para cargar productos, talles y stock.

## Requisitos
- Node.js (recomendado: LTS)

## Configuración rápida

### 1) Sanity (Catálogo)
1. Crear proyecto en Sanity.
2. Configurar variables en `studio/.env` (ver `studio/.env.example`).
3. Levantar el Studio:

```bash
cd studio
npm install
npm run dev
```

### 2) Web (Next.js)
1. Configurar variables en `web/.env.local` (ver `web/.env.example`).
2. Levantar la web:

```bash
cd web
npm install
npm run dev
```

## Deploy en Vercel
- Importar el repo en Vercel.
- Setear **Root Directory**: `web`.
- Agregar variables de entorno (las mismas que en `web/.env.example`).
- (Recomendado) Configurar dominio y setear `NEXT_PUBLIC_SITE_URL` con el dominio final.

