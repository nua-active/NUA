import { readFile, writeFile } from "node:fs/promises";

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function productId(p) {
  const size = p.variants?.[0]?.size;
  const base = `${p.codeNua || "producto"}-${p.codeSupplier || p.title}${size ? `-${size}` : ""}`;
  return `product.${slugify(base).slice(0, 80)}`;
}

function categoryId(slug) {
  return `category.${slug}`;
}

async function main() {
  const raw = await readFile(
    new URL("../import/stock-2026-05-27.json", import.meta.url),
    "utf8"
  );
  const data = JSON.parse(raw);
  const lines = [];

  for (const c of data.categories || []) {
    lines.push(
      JSON.stringify({
        _id: categoryId(c.slug),
        _type: "category",
        name: c.name,
        slug: { _type: "slug", current: c.slug },
        order: c.order ?? 0,
      })
    );
  }

  for (const p of data.products || []) {
    lines.push(
      JSON.stringify({
        _id: productId(p),
        _type: "product",
        codeNua: p.codeNua || undefined,
        codeSupplier: p.codeSupplier || undefined,
        title: p.title,
        slug: { _type: "slug", current: slugify(p.title).slice(0, 96) },
        price: Number(p.price ?? 0),
        currency: "ARS",
        description: p.description || "",
        status: p.status || "available",
        category: p.categorySlug
          ? { _type: "reference", _ref: categoryId(p.categorySlug) }
          : undefined,
        colors: Array.isArray(p.colors) ? p.colors : [],
        variants: (p.variants || []).map((v) => ({
          _type: "variant",
          size: v.size,
          stock: Number(v.stock ?? 0),
          sku: v.sku || undefined,
        })),
        isFeatured: false,
        createdAt: new Date().toISOString(),
      })
    );
  }

  const out = new URL("../import/stock-2026-05-27.ndjson", import.meta.url);
  await writeFile(out, lines.join("\n") + "\n", "utf8");
  console.log("NDJSON generado:", out.pathname);
  console.log("Documentos:", lines.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
