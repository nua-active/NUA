import { BRAND } from "@/lib/brand";

export function getWhatsAppHref(message: string) {
  const number = BRAND.whatsapp.number.trim();
  const encoded = encodeURIComponent(message);

  if (!number) {
    // Fallback: si no hay número configurado, enviamos a Instagram.
    return BRAND.instagramUrl;
  }

  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildProductWhatsAppMessage(input: {
  productTitle: string;
  size?: string;
  url?: string;
}) {
  const parts: string[] = [
    `Hola! Quiero consultar por: ${input.productTitle}`,
  ];

  if (input.size) parts.push(`Talle: ${input.size}`);
  if (input.url) parts.push(`Link: ${input.url}`);

  return parts.join(" — ");
}

