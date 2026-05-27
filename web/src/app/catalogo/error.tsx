"use client";

import { useEffect } from "react";
import { SanityLoadError } from "@/components/SanityLoadError";

export default function CatalogoError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <SanityLoadError onRetry={reset} />;
}
