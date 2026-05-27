import { createClient } from "@sanity/client";
import {
  SANITY_API_READ_TOKEN,
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_USE_CDN,
  SANITY_CONFIGURED,
} from "@/sanity/lib/api";

const SANITY_FETCH_TIMEOUT_MS = 30_000;

export const sanityClient = SANITY_CONFIGURED
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      token: SANITY_API_READ_TOKEN || undefined,
      // Con token autenticado, evitamos CDN para datos frescos.
      useCdn: SANITY_API_READ_TOKEN ? false : SANITY_USE_CDN,
      perspective: "published",
      timeout: SANITY_FETCH_TIMEOUT_MS,
    })
  : null;
