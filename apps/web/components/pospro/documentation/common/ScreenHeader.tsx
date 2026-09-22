interface ScreenHeaderProps {
  title: string;
  description: string;
}

export function ScreenHeader({ title, description }: ScreenHeaderProps) {
  return (
    <div className="border-b border-border-sage pb-6">
      <p className="font-display text-caption uppercase tracking-wide text-slate-sage">
        Mobile · Authentication
      </p>
      <h1 className="mt-2 font-display text-h2 text-foreground">{title}</h1>
      <p className="mt-2 max-w-2xl text-body-lg text-muted-foreground">{description}</p>
    </div>
  );
}
