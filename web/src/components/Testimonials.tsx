import { TESTIMONIALS } from "@/lib/testimonials";
import { Container } from "@/components/Container";
import { BRAND } from "@/lib/brand";

export function Testimonials() {
  return (
    <section className="py-12">
      <Container>
        <div className="text-lg font-semibold text-brand-ink">
          {BRAND.home.sections.socialProof}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-surface p-6 shadow-[var(--shadow)]"
            >
              <div className="text-sm font-semibold text-brand-ink">{t.name}</div>
              <div className="mt-2 text-sm leading-6 text-foreground/75">
                “{t.text}”
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

