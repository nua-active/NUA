import Image from "next/image";

type WhatsAppIconProps = {
  size?: number;
  className?: string;
};

/** Logo oficial de WhatsApp (`/public/whatsapp.png`). */
export function WhatsAppIcon({ size = 20, className = "" }: WhatsAppIconProps) {
  return (
    <Image
      src="/whatsapp.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      aria-hidden
    />
  );
}
