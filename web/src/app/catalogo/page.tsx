import { Container } from "@/components/Container";
import { BRAND } from "@/lib/brand";
import { ProductCard } from "@/components/ProductCard";
import { SanityLoadError } from "@/components/SanityLoadError";
import { ButtonLink } from "@/components/Button";
import { isSanityConfigured, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Category, Product } from "@/sanity/lib/types";

export const revalidate = 60;

type SearchParams = {
  categoria?: string;
  talle?: string;
  stock?: string;
  q?: string;
};

function normalize(s?: string) {
  return (s ?? "").trim().toLowerCase();
}

function hasSizeInStock(p: Product, size: string) {
  const wanted = normalize(size);
  return (p.variants ?? []).some(
    (v) => normalize(v.size) === wanted && typeof v.stock === "number" && v.stock > 0
  );
}

function isInStock(p: Product) {
  return (p.variants ?? []).some((v) => typeof v.stock === "number" && v.stock > 0);
}

function buildHref(params: Record<string, string | undefined>) {
  const url = new URL("https://example.com/catalogo");
  for (const [k, v] of Object.entries(params)) {
    if (v && v.length) url.searchParams.set(k, v);
  }
  const qs = url.searchParams.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

function selectedClass(isSelected: boolean) {
  return isSelected
    ? "!border-brand-ink !bg-brand-ink !text-white"
    : "border-border/35 bg-white text-foreground/75 hover:border-brand-rose/70 hover:bg-brand-cream hover:text-brand-ink";
}

function FiltersContent({
  sp,
  categories,
  sizes,
  stockOnly,
}: {
  sp: SearchParams;
  categories: Category[];
  sizes: string[];
  stockOnly: boolean;
}) {
  return (
    <div className="space-y-6 text-sm">
      {/* Filtro Categorías */}
      <div>
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-ink">
          Categoría
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ButtonLink
            href={buildHref({ ...sp, categoria: undefined })}
            variant="secondary"
            className={`min-h-11 rounded-xl border px-3 py-2 text-center text-xs font-bold normal-case tracking-normal shadow-none transition-all ${selectedClass(!sp.categoria)}`}
          >
            Todas
          </ButtonLink>
          {categories.map((c) => {
            const isSelected = sp.categoria === c.slug;
            return (
              <ButtonLink
                key={c._id}
                href={buildHref({ ...sp, categoria: c.slug })}
                variant="secondary"
                className={`min-h-11 rounded-xl border px-3 py-2 text-center text-xs font-bold normal-case tracking-normal shadow-none transition-all ${selectedClass(isSelected)}`}
              >
                {c.name}
              </ButtonLink>
            );
          })}
        </div>
      </div>

      {/* Filtro Talles */}
      <div>
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-ink">
          Talle disponible
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-4">
          <ButtonLink
            href={buildHref({ ...sp, talle: undefined })}
            variant="secondary"
            className={`min-h-10 rounded-xl border px-2 py-2 text-center text-xs font-bold normal-case tracking-normal shadow-none transition-all ${selectedClass(!sp.talle)}`}
          >
            Todos
          </ButtonLink>
          {sizes.map((s) => {
            const isSelected = sp.talle === s;
            return (
              <ButtonLink
                key={s}
                href={buildHref({ ...sp, talle: s })}
                variant="secondary"
                className={`min-h-10 rounded-xl border px-2 py-2 text-center text-xs font-bold normal-case tracking-normal shadow-none transition-all ${selectedClass(isSelected)}`}
              >
                {s}
              </ButtonLink>
            );
          })}
        </div>
      </div>

      {/* Filtro Stock */}
      <div className="border-t border-border/15 pt-5">
        <div className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-ink">
          Solo con stock
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ButtonLink
            href={buildHref({ ...sp, stock: undefined })}
            variant="secondary"
            className={`min-h-11 rounded-xl border px-3 py-2 text-xs font-bold normal-case tracking-normal shadow-none transition-all ${selectedClass(!stockOnly)}`}
          >
            Ver todo
          </ButtonLink>
          <ButtonLink
            href={buildHref({ ...sp, stock: "1" })}
            variant="secondary"
            className={`min-h-11 rounded-xl border px-3 py-2 text-xs font-bold normal-case tracking-normal shadow-none transition-all ${selectedClass(stockOnly)}`}
          >
            Disponible
          </ButtonLink>
        </div>
      </div>

      {/* Buscador de texto */}
      <div className="pt-4 border-t border-border/15">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-ink mb-3">
          Buscar por nombre
        </div>
        <form
          action="/catalogo"
          className="flex flex-col gap-2"
        >
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="Ej: calza, top..."
            className="w-full rounded-xl border border-border/35 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-brand-ink focus:bg-white font-semibold"
          />
          <button className="w-full rounded-xl bg-brand-ink text-white px-4 py-3.5 text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity">
            Buscar
          </button>
          {sp.categoria ? (
            <input type="hidden" name="categoria" value={sp.categoria} />
          ) : null}
          {sp.talle ? (
            <input type="hidden" name="talle" value={sp.talle} />
          ) : null}
          {sp.stock ? (
            <input type="hidden" name="stock" value={sp.stock} />
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const configured = isSanityConfigured();
  const sp = await searchParams;

  if (!configured) {
    return (
      <main className="py-16 gradient-ambient flex-1">
        <Container>
          <div className="max-w-xl rounded-3xl border border-brand-rose/25 bg-white/60 backdrop-blur-md p-8 shadow-sm">
            <h1 className="text-3xl font-extrabold text-brand-ink font-display italic">Catálogo</h1>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              Para visualizar y probar los filtros del showroom, recordá configurar Sanity en tu archivo `.env.local` con las claves correspondientes.
            </p>
          </div>
        </Container>
      </main>
    );
  }

  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    [products, categories] = await Promise.all([
      sanityFetch<Product[]>(PRODUCTS_QUERY),
      sanityFetch<Category[]>(CATEGORIES_QUERY),
    ]);
  } catch {
    return <SanityLoadError />;
  }

  const q = normalize(sp.q);
  const categoria = normalize(sp.categoria);
  const talle = normalize(sp.talle);
  const stockOnly = sp.stock === "1";
  const activeFilters = [sp.categoria, sp.talle, stockOnly ? "stock" : undefined, sp.q]
    .filter(Boolean)
    .length;

  const filtered = products.filter((p) => {
    if (categoria && normalize(p.category?.slug ?? "") !== categoria) return false;
    if (q && !normalize(p.title).includes(q)) return false;
    if (talle && !hasSizeInStock(p, talle)) return false;
    if (stockOnly && !isInStock(p)) return false;
    return true;
  });

  const sizes = Array.from(
    new Set(
      products
        .flatMap((p) => p.variants ?? [])
        .map((v) => v.size)
        .filter(Boolean)
        .map((s) => s.trim())
    )
  ).sort((a, b) => a.localeCompare(b, "es"));

  return (
    <main className="py-8 sm:py-12 gradient-ambient flex-1">
      <Container>
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-ink font-display italic">
            Showroom Online
          </h1>
          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
            Explorá nuestra vidriera. Podés filtrar por categoría o talle disponible. Recordá que la venta se concreta directamente por WhatsApp, donde te brindamos asesoramiento personalizado.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Mobile Filters */}
          <div className="lg:hidden w-full">
            <details className="w-full group">
              <summary className="w-full flex items-center justify-between rounded-2xl bg-white border border-border/40 px-4 py-3.5 text-brand-ink cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none shadow-sm active:scale-[0.99] transition-transform">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-sand text-brand-ink">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
                  </svg>
                  </span>
                  <span className="flex flex-col text-left">
                    <span className="text-sm font-extrabold">Filtros</span>
                    <span className="text-[11px] font-semibold text-foreground/55">
                      {activeFilters ? `${activeFilters} filtros activos` : "Categoría, talle, stock y búsqueda"}
                    </span>
                  </span>
                </span>
                <span className="text-xs font-bold text-foreground/50 transition-transform duration-300 group-open:rotate-180">v</span>
              </summary>
              <div className="mt-3 rounded-2xl border border-border/25 bg-white/90 p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/15 pb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-foreground/55">
                    Ajustá tu búsqueda
                  </div>
                  {activeFilters ? (
                    <ButtonLink
                      href="/catalogo"
                      variant="secondary"
                      className="rounded-full border-border/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-none"
                    >
                      Limpiar
                    </ButtonLink>
                  ) : null}
                </div>
                <FiltersContent sp={sp} categories={categories} sizes={sizes} stockOnly={stockOnly} />
              </div>
            </details>
          </div>

          {/* Desktop Sidebar de Filtros — fijo al hacer scroll */}
          <aside className="hidden lg:flex lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:flex-col lg:gap-5 rounded-2xl border border-border/30 bg-white p-5 shadow-[var(--shadow)] filter-sidebar-scroll">
            <div className="flex items-center justify-between gap-3 border-b border-border/20 pb-4">
              <div>
                <div className="text-sm font-extrabold text-brand-ink">
                  Filtros
                </div>
                <div className="mt-1 text-[11px] font-semibold text-foreground/50">
                  {activeFilters ? `${activeFilters} filtros activos` : "Refiná el catálogo"}
                </div>
              </div>
              {activeFilters ? (
                <ButtonLink
                  href="/catalogo"
                  variant="secondary"
                  className="rounded-full border-border/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-none"
                >
                  Limpiar
                </ButtonLink>
              ) : null}
            </div>
            <FiltersContent sp={sp} categories={categories} sizes={sizes} stockOnly={stockOnly} />
          </aside>


          {/* Grilla de prendas */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border/10 pb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                {filtered.length} prenda(s) encontrada(s)
              </div>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-brand-ink hover:underline decoration-brand-rose underline-offset-4"
              >
                Seguinos en Instagram
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-border/20 bg-white/40 backdrop-blur-sm p-10 text-center">
                <div className="text-lg font-bold text-brand-ink font-display italic">No encontramos resultados</div>
                <p className="mt-2 text-xs text-foreground/60 max-w-sm mx-auto">
                  Probá cambiar los filtros de categoría, talle o limpiá el buscador de texto para ver más prendas.
                </p>
                <div className="mt-6">
                  <ButtonLink
                    href="/catalogo"
                    className="px-6 py-3 text-xs uppercase tracking-wider font-bold"
                  >
                    Restablecer Filtros
                  </ButtonLink>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </Container>
    </main>
  );
}
