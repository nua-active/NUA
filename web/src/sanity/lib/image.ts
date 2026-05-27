import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/lib/client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity no está configurado (image builder).");
  }
  return builder.image(source);
}

