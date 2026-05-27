import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Productos",
  type: "document",
  fields: [
    defineField({
      name: "codeNua",
      title: "Código NUA",
      type: "string",
    }),
    defineField({
      name: "codeSupplier",
      title: "Código tienda/proveedor",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Moneda",
      type: "string",
      initialValue: "ARS",
      options: { list: ["ARS", "USD"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      initialValue: "available",
      options: {
        list: [
          { title: "Disponible", value: "available" },
          { title: "Preventa / Encargo", value: "preorder" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [
        defineField({
          name: "image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
      validation: (Rule) => Rule.optional(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "colors",
      title: "Colores",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "variants",
      title: "Talles y stock",
      type: "array",
      of: [
        defineField({
          name: "variant",
          title: "Variante",
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Talle",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "stock",
              title: "Stock",
              type: "number",
              initialValue: 0,
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "sku",
              title: "SKU (opcional)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "size", subtitle: "stock" },
            prepare: ({ title, subtitle }) => ({
              title: `${title}`,
              subtitle:
                typeof subtitle === "number" ? `Stock: ${subtitle}` : undefined,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Fecha",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      price: "price",
      currency: "currency",
      status: "status",
    },
    prepare: ({ title, media, price, currency, status }) => {
      const statusLabel = status === "preorder" ? "Preventa" : undefined;
      const priceLabel =
        typeof price === "number" ? `${price.toLocaleString()} ${currency}` : "";
      const subtitle = [statusLabel, priceLabel].filter(Boolean).join(" · ");
      return { title, media, subtitle };
    },
  },
});

