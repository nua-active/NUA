import { PropsWithChildren } from "react";

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-rose/15 border border-brand-rose/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-ink">
      {children}
    </span>
  );
}

