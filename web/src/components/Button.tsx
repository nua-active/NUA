import Link from "next/link";
import { ComponentProps } from "react";

type AnchorProps = ComponentProps<"a">;
type LinkProps = ComponentProps<typeof Link>;

type Common = {
  variant?: "primary" | "secondary";
  className?: string;
};

function classes(variant: Common["variant"]) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-sm hover:shadow-md";
  if (variant === "secondary") {
    return `${base} bg-white/80 text-brand-ink border border-border/40 hover:bg-brand-sand/40`;
  }
  return `${base} bg-brand-ink text-white hover:opacity-95 hover:-translate-y-0.5`;
}

export function ButtonLink(
  props: LinkProps & Common & { href: string }
) {
  const { variant = "primary", className = "", ...rest } = props;
  return <Link className={`${classes(variant)} ${className}`} {...rest} />;
}

export function ButtonAnchor(
  props: AnchorProps & Common & { href: string }
) {
  const { variant = "primary", className = "", ...rest } = props;
  return <a className={`${classes(variant)} ${className}`} {...rest} />;
}

