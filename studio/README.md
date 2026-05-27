# Sanity Studio (Catálogo NUA)

Este proyecto es el panel admin para cargar productos, talles y stock.

## 1) Crear proyecto en Sanity
- Crear un proyecto en `https://www.sanity.io/` (plan free alcanza para empezar).
- Crear un dataset (recomendado: `production`).

## 2) Configurar variables de entorno
Crear un `.env` en esta carpeta (`studio/.env`) con:

```bash
SANITY_STUDIO_PROJECT_ID="tuProjectId"
SANITY_STUDIO_DATASET="production"
```

## 3) Correr el Studio

```bash
npm run dev
```

## 4) Permisos / CORS
- En Sanity → API settings, habilitar CORS para el dominio de Vercel (y `http://localhost:3000`).
- Si vas a usar lectura pública del catálogo, podés dejar dataset público. Si preferís privado, necesitás un token de lectura en el frontend.

