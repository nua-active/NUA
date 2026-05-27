import { cache } from "react";
import { unstable_cache } from "next/cache";
import { sanityClient } from "@/sanity/lib/client";
import { SANITY_CONFIGURED } from "@/sanity/lib/api";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 750;

export function isSanityConfigured() {
  return SANITY_CONFIGURED;
}

function isRetriableError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  const cause = (error as Error & { cause?: unknown }).cause;
  const causeMessage =
    cause instanceof Error ? cause.message.toLowerCase() : String(cause ?? "").toLowerCase();

  return (
    message.includes("fetch failed") ||
    message.includes("timeout") ||
    message.includes("network") ||
    message.includes("econnreset") ||
    message.includes("enotfound") ||
    causeMessage.includes("timeout") ||
    causeMessage.includes("connect")
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFromSanity<T>(
  query: string,
  params: Record<string, unknown>
): Promise<T> {
  if (!sanityClient) {
    throw new Error(
      "Sanity no está configurado. Definí NEXT_PUBLIC_SANITY_PROJECT_ID y NEXT_PUBLIC_SANITY_DATASET."
    );
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await sanityClient.fetch<T>(query, params);
    } catch (error) {
      lastError = error;
      if (attempt >= MAX_RETRIES || !isRetriableError(error)) {
        throw error;
      }
      await sleep(RETRY_DELAY_MS * attempt);
    }
  }

  throw lastError;
}

const cachedSanityFetch = unstable_cache(
  async (query: string, paramsJson: string) => {
    const params = JSON.parse(paramsJson) as Record<string, unknown>;
    return fetchFromSanity<unknown>(query, params);
  },
  ["sanity-query"],
  { revalidate: 60, tags: ["sanity"] }
);

export const sanityFetch = cache(async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  const normalizedParams = params ?? {};
  const paramsJson = JSON.stringify(normalizedParams);
  return (await cachedSanityFetch(query, paramsJson)) as T;
});
