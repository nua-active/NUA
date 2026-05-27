import Image from "next/image";

type Props = {
  title?: string;
  size?: "card" | "detail";
};

export function ProductImagePlaceholder({ title, size = "card" }: Props) {
  const isDetail = size === "detail";

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden"
      aria-label={title ? `Imagen pendiente: ${title}` : "Imagen pendiente"}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--brand-peach),transparent_55%),radial-gradient(circle_at_80%_0%,var(--brand-lilac),transparent_45%),radial-gradient(circle_at_50%_100%,var(--brand-rose),transparent_50%)] opacity-70" />
      <div className="absolute inset-0 bg-brand-sand/30" />

      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        <Image
          src="/logo.jpeg"
          alt="NUA"
          width={isDetail ? 140 : 96}
          height={isDetail ? 48 : 32}
          className={`${isDetail ? "h-10" : "h-7"} w-auto object-contain opacity-80`}
        />
        <span
          className={`font-semibold text-brand-ink/70 ${
            isDetail ? "text-sm" : "text-[10px] uppercase tracking-widest"
          }`}
        >
          Foto próximamente
        </span>
        {title && isDetail ? (
          <span className="text-xs text-foreground/60 max-w-xs line-clamp-2">
            {title}
          </span>
        ) : null}
      </div>
    </div>
  );
}
