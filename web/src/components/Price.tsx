export function Price({ value, currency }: { value: number; currency: string }) {
  if (!value || value <= 0) {
    return (
      <span className="text-sm font-semibold text-foreground/60">
        Consultar precio
      </span>
    );
  }

  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency || "ARS",
    maximumFractionDigits: 0,
  });
  return (
    <span className="text-sm font-semibold text-brand-ink">
      {formatter.format(value)}
    </span>
  );
}

