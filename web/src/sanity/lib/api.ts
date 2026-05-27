export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-27";

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const SANITY_USE_CDN =
  (process.env.NEXT_PUBLIC_SANITY_USE_CDN ?? "true") === "true";

/** Token de solo lectura (server-side). Necesario si el dataset es privado. */
export const SANITY_API_READ_TOKEN = process.env.SANITY_API_READ_TOKEN ?? "";

export const SANITY_CONFIGURED = Boolean(SANITY_PROJECT_ID);

