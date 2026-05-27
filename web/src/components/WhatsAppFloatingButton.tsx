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
      {/* Efecto de brillo de fondo */}
      <div className="absolute inset-0 rounded-full bg-[#25d366] opacity-40 blur-md group-hover:opacity-60 transition-opacity duration-300 -z-10" />
      
      {/* Botón Circular Oficial */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg border border-white/10 transition-transform duration-300">
        <svg className="w-8 h-8 sm:w-9 sm:h-9 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 2c-5.506 0-9.975 4.47-9.975 9.977 0 1.758.459 3.472 1.33 4.982l-1.417 5.176 5.297-1.39c1.464.798 3.107 1.218 4.764 1.219h.004c5.507 0 9.977-4.47 9.977-9.978.002-2.67-1.037-5.18-2.92-7.065C17.21 3.038 14.7 2.003 12.031 2zm6.99 14.025c-.297.837-1.72 1.537-2.355 1.636-.576.09-1.326.167-2.126-.09-.5-.16-1.127-.417-1.93-.76-3.434-1.458-5.65-4.96-5.823-5.187-.172-.228-1.398-1.857-1.398-3.541 0-1.684.86-2.512 1.17-2.852.29-.317.76-.44 1.23-.44h.38c.36 0 .84-.04 1.21.84.38.91 1.29 3.15 1.41 3.39.12.24.12.52-.04.83-.16.31-.38.56-.56.76-.18.2-.38.45-.16.83.47.8 2.057 3.385 4.416 4.78.607.36 1.09.47 1.49.37.407-.1 1.297-.53 1.48-1.03.18-.5.18-.94.12-1.03-.06-.09-.24-.14-.52-.29z"/>
        </svg>
      </div>
    </a>
  );
}

