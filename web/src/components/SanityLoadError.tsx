import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export function SanityLoadError({
  title = "No pudimos cargar el catálogo",
  retryHref = "/catalogo",
  onRetry,
}: {
  title?: string;
  retryHref?: string;
  onRetry?: () => void;
}) {
  return (
    <main className="py-16 gradient-ambient flex-1">
      <Container>
        <div className="max-w-xl rounded-3xl border border-brand-rose/25 bg-white/60 backdrop-blur-md p-8 shadow-sm">
          <h1 className="text-3xl font-extrabold text-brand-ink font-display italic">{title}</h1>
          <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
            Hubo un problema de conexión con el servidor de contenidos. Suele ser temporal: probá
            recargar en unos segundos.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md bg-brand-rose text-brand-ink border border-transparent"
              >
                Reintentar
              </button>
            ) : (
              <ButtonLink href={retryHref} className="px-6 py-3 text-xs uppercase tracking-wider font-bold">
                Reintentar
              </ButtonLink>
            )}
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest border border-border/40 bg-white/80 text-brand-ink hover:bg-brand-sand/40 transition-all"
            >
              Contacto
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
