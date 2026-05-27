export type CatalogSearchParams = {
  categoria?: string;
  talle?: string;
  stock?: string;
  q?: string;
};

export function parseFilterList(value?: string): string[] {
  return (value ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function toggleInList(current: string | undefined, item: string): string | undefined {
  const list = parseFilterList(current);
  const normalized = item.trim().toLowerCase();
  const index = list.indexOf(normalized);
  if (index >= 0) list.splice(index, 1);
  else list.push(normalized);
  return list.length ? list.join(",") : undefined;
}

export function buildCatalogHref(
  current: CatalogSearchParams,
  updates: Partial<CatalogSearchParams>
): string {
  const next: CatalogSearchParams = { ...current, ...updates };
  const url = new URL("https://example.com/catalogo");

  if (next.categoria) url.searchParams.set("categoria", next.categoria);
  if (next.talle) url.searchParams.set("talle", next.talle);
  if (next.stock) url.searchParams.set("stock", next.stock);
  if (next.q) url.searchParams.set("q", next.q);

  const qs = url.searchParams.toString();
  return qs ? `/catalogo?${qs}` : "/catalogo";
}

export function countActiveFilters(sp: CatalogSearchParams): number {
  let count = parseFilterList(sp.categoria).length + parseFilterList(sp.talle).length;
  if (sp.stock === "1") count += 1;
  if (sp.q?.trim()) count += 1;
  return count;
}
