import { Container } from "@/components/Container";
import { BRAND } from "@/lib/brand";
import { ProductCard } from "@/components/ProductCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { SanityLoadError } from "@/components/SanityLoadError";
import { ButtonLink } from "@/components/Button";
import { isSanityConfigured, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from "@/sanity/lib/queries";
import type { Category, Product } from "@/sanity/lib/types";
import {
  countActiveFilters,
  parseFilterList,
  type CatalogSearchParams,
} from "@/lib/catalog-filters";

export const revalidate = 60;

type SearchParams = CatalogSearchParams;

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

function matchesAnySize(p: Product, sizes: string[]) {
  return sizes.some((size) => hasSizeInStock(p, size));
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
  const selectedCategories = parseFilterList(sp.categoria);
  const selectedSizes = parseFilterList(sp.talle);
  const stockOnly = sp.stock === "1";

  const filtered = products.filter((p) => {
    if (selectedCategories.length > 0) {
      const productCategory = normalize(p.category?.slug ?? "");
      if (!selectedCategories.includes(productCategory)) return false;
    }
    if (q && !normalize(p.title).includes(q)) return false;
    if (selectedSizes.length > 0 && !matchesAnySize(p, selectedSizes)) return false;
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
    <main className="py-6 sm:py-10 gradient-ambient flex-1">
      <Container>
        <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-ink font-display italic">
              Showroom Online
            </h1>
            <p className="mt-1 max-w-xl text-xs text-foreground/70">
              Tocá varios tipos de prenda o talles para combinar filtros. La venta se coordina por WhatsApp.
            </p>
          </div>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[10px] font-bold uppercase tracking-wider text-brand-ink hover:underline decoration-brand-rose underline-offset-4 sm:inline-flex"
          >
            Instagram
          </a>
        </div>

        <CatalogFilters
          sp={sp}
          categories={categories}
          sizes={sizes}
          stockOnly={stockOnly}
          resultCount={filtered.length}
        />

        <section className="mt-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-border/20 bg-white/60 p-10 text-center">
              <div className="text-lg font-bold text-brand-ink font-display italic">
                No encontramos resultados
              </div>
              <p className="mt-2 text-xs text-foreground/60 max-w-sm mx-auto">
                Probá quitar algún filtro o buscar con otro término.
              </p>
              {countActiveFilters(sp) > 0 ? (
                <div className="mt-6">
                  <ButtonLink
                    href="/catalogo"
                    className="px-6 py-3 text-xs uppercase tracking-wider font-bold"
                  >
                    Restablecer filtros
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>
      </Container>
    </main>
  );
}
