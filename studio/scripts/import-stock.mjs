import "dotenv/config";
import { readFile } from "node:fs/promises";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Falta SANITY_STUDIO_PROJECT_ID en studio/.env");
}
if (!token) {
  throw new Error(
    "Falta SANITY_API_WRITE_TOKEN (crear token con permisos de escritura en Sanity → API → Tokens)"
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-27",
  token,
  useCdn: false,
});

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

async function upsertCategory(c) {
  const _id = categoryId(c.slug);
  await client.createOrReplace({
    _id,
    _type: "category",
    name: c.name,
    slug: { _type: "slug", current: c.slug },
    order: 0,
  });
}

async function upsertProduct(p) {
  const _id = productId(p);
  const categoryRef = p.categorySlug
    ? { _type: "reference", _ref: categoryId(p.categorySlug) }
    : undefined;

  const doc = {
    _id,
    _type: "product",
    codeNua: p.codeNua || undefined,
    codeSupplier: p.codeSupplier || undefined,
    title: p.title,
    slug: { _type: "slug", current: slugify(p.title).slice(0, 96) },
    price: Number(p.price ?? 0),
    currency: "ARS",
    description: p.description || "",
    status: p.status || "available",
    category: categoryRef,
    colors: Array.isArray(p.colors) ? p.colors : [],
    variants: (p.variants || []).map((v) => ({
      _type: "variant",
      size: v.size,
      stock: Number(v.stock ?? 0),
      sku: v.sku || undefined,
    })),
    isFeatured: false,
    createdAt: new Date().toISOString(),
    // images queda vacío: se cargan en Studio.
  };

  await client.createOrReplace(doc);
}

async function main() {
  const raw = await readFile(new URL("../import/stock-2026-05-27.json", import.meta.url), "utf8");
  const data = JSON.parse(raw);

  for (const c of data.categories || []) {
    await upsertCategory(c);
  }
  for (const p of data.products || []) {
    await upsertProduct(p);
  }

  console.log("Import OK:", {
    categories: (data.categories || []).length,
    products: (data.products || []).length,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

