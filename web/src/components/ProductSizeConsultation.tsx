"use client";

import { useMemo, useState } from "react";
import { ButtonAnchor } from "@/components/Button";
import { BRAND } from "@/lib/brand";
import { buildProductWhatsAppMessage, getWhatsAppHref } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

type ProductSizeConsultationProps = {
  pageUrl?: string;
  productTitle: string;
  sizes: string[];
};

export function ProductSizeConsultation({
  pageUrl,
  productTitle,
  sizes,
}: ProductSizeConsultationProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");

  const whatsappHref = useMemo(() => {
    const msg = buildProductWhatsAppMessage({
      productTitle,
      size: selectedSize,
      url: pageUrl,
    });

    return getWhatsAppHref(msg);
  }, [pageUrl, productTitle, selectedSize]);

  return (
    <div className="rounded-[32px] border border-border/30 bg-white/50 backdrop-blur-md p-6 shadow-sm flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-ink">
          1. Elegí tu talle para consultar
        </div>
        <div className="text-[11px] text-foreground/60">
          Seleccioná un talle y después tocá WhatsApp para enviar la consulta.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-2xl border px-5 py-3 text-xs font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 ${
                isSelected
                  ? "border-brand-ink bg-brand-ink text-white"
                  : "border-brand-peach/40 bg-white/80 text-brand-ink hover:bg-brand-peach/30"
              }`}
              aria-pressed={isSelected}
            >
              Talle {size}
            </button>
          );
        })}
      </div>

      <div className="border-t border-border/10 pt-4 flex flex-col gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-ink">
          Talle seleccionado: {selectedSize}
        </div>
        <ButtonAnchor
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white bg-[#25d366] hover:bg-[#20ba5a] rounded-full shadow-md transition-all duration-300"
        >
          <WhatsAppIcon size={18} />
          {BRAND.ui.ctaPrimary}
        </ButtonAnchor>
      </div>
    </div>
  );
}
