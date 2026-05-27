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

## 3) Panel online (para el equipo)

**https://activewear-nua.sanity.studio**

Invitá a cada persona en [sanity.io/manage](https://www.sanity.io/manage) → proyecto → **Members** (rol **Editor**).

## 4) Correr el Studio en local (opcional)

```bash
npm run dev
```

Abre `http://localhost:3333`.

## 5) Publicar cambios del Studio (después de editar schemas)

Desde esta carpeta `studio/`:

```bash
npm run deploy
```

## 6) Permisos / CORS
- En Sanity → API settings, habilitar CORS para el dominio de Vercel (y `http://localhost:3000`).
- Si vas a usar lectura pública del catálogo, podés dejar dataset público. Si preferís privado, necesitás un token de lectura en el frontend.

