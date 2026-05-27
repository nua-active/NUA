import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="py-20">
      <Container>
        <div className="rounded-3xl border border-border bg-surface p-8 shadow-[var(--shadow)]">
          <div className="text-2xl font-semibold text-brand-ink">
            Página no encontrada
          </div>
          <div className="mt-2 text-sm text-foreground/70">
            El contenido que buscás no existe o cambió de lugar.
          </div>
          <div className="mt-6 flex gap-3">
            <ButtonLink href="/" variant="secondary" className="shadow-none">
              Ir al inicio
            </ButtonLink>
            <ButtonLink href="/catalogo" className="shadow-none">
              Ver catálogo
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}

