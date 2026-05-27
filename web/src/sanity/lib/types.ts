export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export type ProductVariant = {
  size: string;
  stock: number;
  sku?: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  description?: string;
  images?: unknown[];
  colors?: string[];
  isFeatured?: boolean;
  createdAt?: string;
  category?: { name: string; slug: string } | null;
  variants?: ProductVariant[];
};

