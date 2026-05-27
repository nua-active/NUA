import Image from "next/image";
import { BRAND } from "@/lib/brand";
import { getWhatsAppHref } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const href = getWhatsAppHref(BRAND.whatsapp.defaultMessage);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25d366]/35 blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-90 -z-10" />
      <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-lg ring-2 ring-white/80 sm:h-16 sm:w-16">
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          fill
          sizes="64px"
          className="object-cover"
          priority
        />
      </div>
    </a>
  );
}
