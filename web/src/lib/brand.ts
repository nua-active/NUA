export const BRAND = {
  name: "Activewear NUA",
  tagline: "Ropa deportiva para mujer en tonos cálidos y pasteles.",
  instagramUrl: "https://www.instagram.com/activewearnua/",
  email: "activewearnua@gmail.com",
  whatsapp: {
    /**
     * Formato esperado: código de país + número, sin + ni espacios.
     * Ej: 5491123456789
     */
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    defaultMessage: "Hola! Quiero consultar por Activewear NUA.",
  },
  ui: {
    ctaPrimary: "Consultar por WhatsApp",
    ctaSecondary: "Ver catálogo",
  },
  home: {
    heroTitle: "Tu próximo set deportivo, más cerca.",
    heroSubtitle:
      "Explorá la colección, revisá talles disponibles y escribinos por WhatsApp para que el equipo de ventas te asesore.",
    sections: {
      newIn: "Nuevos ingresos",
      featured: "Destacados",
      categories: "Categorías",
      socialProof: "Lo que dicen nuestras clientas",
      instagram: "Más de NUA en Instagram",
    },
  },
} as const;

export type Brand = typeof BRAND;

