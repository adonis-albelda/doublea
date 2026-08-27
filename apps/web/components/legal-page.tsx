import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="bg-page-wash py-14 lg:py-20">
        <div className="container max-w-3xl">
          <h1 className="font-display text-display-lg text-foreground">{title}</h1>
          <p className="mt-2 font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
            Last updated {updated}
          </p>
          <div className="prose-legal mt-10 flex flex-col gap-6 text-body text-muted-foreground [&_h2]:mt-4 [&_h2]:font-display [&_h2]:text-h3 [&_h2]:text-foreground [&_strong]:text-foreground [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
