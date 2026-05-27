import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/Container";

const nav = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass-nav shadow-sm">
      <Container>
        <div className="min-h-16 sm:min-h-20 flex items-center justify-between gap-3 py-2">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3 group">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-border/60 overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/logo.jpeg"
                alt={BRAND.name}
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="text-sm sm:text-base font-extrabold tracking-widest text-brand-ink uppercase whitespace-nowrap">
                {BRAND.name.replace("Activewear ", "")}
                <span className="hidden min-[380px]:block text-xs font-light tracking-normal lowercase text-foreground/60 -mt-1">
                  activewear
                </span>
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-1 rounded-full border border-border/30 bg-white/65 p-1 shadow-sm sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-foreground/75 transition-all duration-300 hover:bg-brand-peach/40 hover:text-brand-ink active:scale-95 sm:px-4 sm:text-xs sm:tracking-widest"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-all duration-300 hover:bg-brand-rose/30 hover:text-brand-ink active:scale-95 md:inline-flex"
            >
              Instagram
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
