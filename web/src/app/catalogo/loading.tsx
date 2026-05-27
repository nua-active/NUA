import { Container } from "@/components/Container";

export default function CatalogoLoading() {
  return (
    <main className="py-8 sm:py-12 gradient-ambient flex-1">
      <Container>
        <div className="h-10 w-64 rounded-2xl bg-white/50 animate-pulse" />
        <div className="mt-3 h-4 w-full max-w-2xl rounded-xl bg-white/40 animate-pulse" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="hidden lg:block h-80 rounded-[32px] bg-white/50 animate-pulse" />
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-border/20 bg-white/50 aspect-[4/5] animate-pulse"
              />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
