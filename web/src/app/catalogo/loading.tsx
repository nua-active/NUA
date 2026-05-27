import { Container } from "@/components/Container";

export default function CatalogoLoading() {
  return (
    <main className="py-6 sm:py-10 gradient-ambient flex-1">
      <Container>
        <div className="h-9 w-56 rounded-xl bg-white/50 animate-pulse" />
        <div className="mt-2 h-3 w-full max-w-md rounded-lg bg-white/40 animate-pulse" />
        <div className="mt-5 h-28 rounded-2xl bg-white/50 animate-pulse" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[28px] border border-border/20 bg-white/50 aspect-[4/5] animate-pulse"
            />
          ))}
        </div>
      </Container>
    </main>
  );
}
