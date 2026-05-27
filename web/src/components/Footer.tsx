import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-brand-sand/10">
      <Container>
        <div className="py-16 flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="flex flex-col gap-3 max-w-md">
            <div className="text-xl font-black tracking-widest text-brand-ink uppercase">
              {BRAND.name.replace("Activewear ", "")}
              <span className="text-xs font-light tracking-widest lowercase block text-foreground/60 -mt-1">
                activewear
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/70">
              {BRAND.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <Link className="font-semibold text-foreground/70 hover:text-brand-ink hover:underline decoration-brand-rose underline-offset-4 transition-colors" href="/">
              Inicio
            </Link>
            <Link
              className="font-semibold text-foreground/70 hover:text-brand-ink hover:underline decoration-brand-peach underline-offset-4 transition-colors"
              href="/catalogo"
            >
              Catálogo
            </Link>
            <Link
              className="font-semibold text-foreground/70 hover:text-brand-ink hover:underline decoration-brand-lilac underline-offset-4 transition-colors"
              href="/contacto"
            >
              Contacto
            </Link>
            <a
              className="font-semibold text-foreground/70 hover:text-brand-ink hover:underline decoration-brand-rose underline-offset-4 transition-colors"
              href={`mailto:${BRAND.email}`}
            >
              Email
            </a>
            <a
              className="font-semibold text-foreground/70 hover:text-brand-ink hover:underline decoration-brand-peach underline-offset-4 transition-colors"
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="py-8 border-t border-border/20 text-xs text-foreground/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Diseñado con</span>
            <span className="text-brand-rose font-bold">♥</span>
            <span>para el movimiento y el bienestar.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

