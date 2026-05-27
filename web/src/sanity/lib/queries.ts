import { groq } from "next-sanity";

export const CATEGORIES_QUERY = groq`
*[_type=="category"] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current
}
`;

export const PRODUCTS_QUERY = groq`
*[_type=="product"] | order(createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  description,
  images,
  colors,
  isFeatured,
  createdAt,
  category->{name, "slug": slug.current},
  variants[]{size, stock, sku}
}
`;

export const PRODUCT_BY_SLUG_QUERY = groq`
*[_type=="product" && slug.current==$slug][0] {
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  description,
  images,
  colors,
  isFeatured,
  createdAt,
  category->{name, "slug": slug.current},
  variants[]{size, stock, sku}
}
`;

