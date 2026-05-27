import "dotenv/config";
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

console.log("projectId:", projectId);
console.log("dataset:", dataset);
console.log("token present:", Boolean(token));
console.log("token length:", token?.length ?? 0);

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-05-27",
  token,
  useCdn: false,
});

try {
  const count = await client.fetch('count(*[_type=="category"])');
  console.log("READ ok, categories:", count);
} catch (e) {
  console.log("READ failed:", e.responseBody || e.message);
}

try {
  await client.createOrReplace({
    _id: "category.test-permissions",
    _type: "category",
    name: "Test permisos",
    slug: { _type: "slug", current: "test-permisos" },
    order: 999,
  });
  console.log("WRITE ok");
  await client.delete("category.test-permissions");
  console.log("DELETE ok");
} catch (e) {
  console.log("WRITE failed:", e.responseBody || e.message);
}
