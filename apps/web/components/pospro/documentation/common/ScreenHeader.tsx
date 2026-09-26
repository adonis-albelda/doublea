interface ScreenHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export function ScreenHeader({ title, description, eyebrow = "Mobile · Authentication" }: ScreenHeaderProps) {
  return (
    <div className="border-b border-border-sage pb-6">
      <p className="font-display text-caption uppercase tracking-wide text-slate-sage">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-h2 text-foreground">{title}</h1>
      <p className="mt-2 max-w-2xl text-body-lg text-muted-foreground">{description}</p>
    </div>
  );
}
