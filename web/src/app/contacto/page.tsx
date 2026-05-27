import { Container } from "@/components/Container";
import { BRAND } from "@/lib/brand";
import { ButtonAnchor } from "@/components/Button";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function ContactoPage() {
  return (
    <main className="py-16 gradient-ambient flex-1">
      <Container>
        <div className="flex flex-col gap-3 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-brand-ink font-display italic">
            Contacto
          </h1>
          <p className="text-sm text-foreground/80 leading-relaxed">
            ¿Querés realizar un pedido o consultarnos algo? Escribinos directamente por WhatsApp para recibir asesoramiento personalizado. También podés enviarnos un email o seguirnos en nuestras redes.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* WhatsApp Card */}
          <div className="glass-card rounded-[32px] p-8 shadow-[var(--shadow)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-ink">
                <WhatsAppIcon size={22} />
                WhatsApp
              </div>
              <p className="text-xs leading-relaxed text-foreground/70">
                Respuesta rápida y asesoramiento personalizado en horario comercial.
              </p>
            </div>
            <div>
              <ButtonAnchor
                href={getWhatsAppHref(BRAND.whatsapp.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-[#25d366] hover:bg-[#20ba5a] rounded-full shadow-sm"
              >
                <WhatsAppIcon size={18} />
                {BRAND.ui.ctaPrimary}
              </ButtonAnchor>
            </div>
          </div>

          {/* Email Card */}
          <div className="glass-card rounded-[32px] p-8 shadow-[var(--shadow)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-bold uppercase tracking-wider text-brand-ink">
                Email
              </div>
              <p className="text-xs leading-relaxed text-foreground/70">
                Para consultas generales, colaboraciones o propuestas especiales.
              </p>
            </div>
            <div>
              <ButtonAnchor
                href={`mailto:${BRAND.email}`}
                variant="secondary"
                className="w-full text-center px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm bg-white/80"
              >
                {BRAND.email}
              </ButtonAnchor>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="glass-card rounded-[32px] p-8 shadow-[var(--shadow)] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-bold uppercase tracking-wider text-brand-ink">
                Instagram
              </div>
              <p className="text-xs leading-relaxed text-foreground/70">
                Mirá las novedades, lanzamientos exclusivos y looks reales de nuestras clientas.
              </p>
            </div>
            <div>
              <ButtonAnchor
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="w-full text-center px-6 py-3.5 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm bg-white/80"
              >
                Ver Instagram
              </ButtonAnchor>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

