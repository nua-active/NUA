import Link from "next/link";
import type { ReactNode } from "react";
import {
  buildCatalogHref,
  countActiveFilters,
  parseFilterList,
  toggleInList,
  type CatalogSearchParams,
} from "@/lib/catalog-filters";
import type { Category } from "@/sanity/lib/types";

function FilterPill({
  href,
  selected,
  children,
  compact,
}: {
  href: string;
  selected: boolean;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border font-semibold transition-colors ${
        compact ? "min-w-8 px-2 py-1 text-[11px]" : "px-3 py-1 text-[11px]"
      } ${
        selected
          ? "border-brand-ink bg-brand-ink text-white"
          : "border-border/45 bg-white text-brand-ink hover:border-brand-ink/35 hover:bg-brand-cream"
      }`}
    >
      {children}
    </Link>
  );
}

export function CatalogFilters({
  sp,
  categories,
  sizes,
  stockOnly,
  resultCount,
}: {
  sp: CatalogSearchParams;
  categories: Category[];
  sizes: string[];
  stockOnly: boolean;
  resultCount: number;
}) {
  const selectedCategories = parseFilterList(sp.categoria);
  const selectedSizes = parseFilterList(sp.talle);
  const activeCount = countActiveFilters(sp);

  return (
    <section
      aria-label="Filtros del catálogo"
      className="sticky top-[4.25rem] z-30 rounded-2xl border border-border/25 bg-white/95 shadow-sm backdrop-blur-md"
    >
      {/* Búsqueda + acciones */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/10 px-3 py-2.5">
        <form action="/catalogo" className="flex min-w-0 flex-1 items-center gap-2">
          <input
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="Buscar prenda..."
            className="h-8 min-w-0 flex-1 rounded-full border border-border/40 bg-white px-3 text-xs font-medium text-brand-ink outline-none transition-colors focus:border-brand-ink"
          />
          {sp.categoria ? <input type="hidden" name="categoria" value={sp.categoria} /> : null}
          {sp.talle ? <input type="hidden" name="talle" value={sp.talle} /> : null}
          {sp.stock ? <input type="hidden" name="stock" value={sp.stock} /> : null}
          <button
            type="submit"
            className="inline-flex h-8 shrink-0 items-center rounded-full bg-brand-ink px-3 text-[10px] font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90"
          >
            Buscar
          </button>
        </form>

        <FilterPill
          href={buildCatalogHref(sp, { stock: stockOnly ? undefined : "1" })}
          selected={stockOnly}
        >
          En stock
        </FilterPill>

        {activeCount > 0 ? (
          <Link
            href="/catalogo"
            scroll={false}
            className="inline-flex h-8 shrink-0 items-center rounded-full border border-border/40 px-3 text-[10px] font-bold uppercase tracking-wide text-brand-ink transition-colors hover:bg-brand-cream"
          >
            Limpiar
          </Link>
        ) : null}

        <span className="ml-auto shrink-0 text-[10px] font-semibold uppercase tracking-wide text-foreground/45">
          {resultCount} resultado{resultCount === 1 ? "" : "s"}
        </span>
      </div>

      {/* Categorías — multi-select */}
      <div className="border-b border-border/10 px-3 py-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-foreground/45">
            Tipo
          </span>
          {categories.map((c) => {
            const slug = c.slug.toLowerCase();
            const isSelected = selectedCategories.includes(slug);
            return (
              <FilterPill
                key={c._id}
                href={buildCatalogHref(sp, {
                  categoria: toggleInList(sp.categoria, slug),
                })}
                selected={isSelected}
              >
                {c.name}
              </FilterPill>
            );
          })}
        </div>
      </div>

      {/* Talles — multi-select */}
      {sizes.length > 0 ? (
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-foreground/45">
              Talle
            </span>
            {sizes.map((size) => {
              const normalized = size.toLowerCase();
              const isSelected = selectedSizes.includes(normalized);
              return (
                <FilterPill
                  key={size}
                  href={buildCatalogHref(sp, {
                    talle: toggleInList(sp.talle, size),
                  })}
                  selected={isSelected}
                  compact
                >
                  {size}
                </FilterPill>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
