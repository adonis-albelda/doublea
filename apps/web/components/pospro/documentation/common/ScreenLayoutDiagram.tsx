import type { ScreenLayout } from "@/lib/pospro/auth-data";

interface ScreenLayoutDiagramProps {
  layout: ScreenLayout;
}

export function ScreenLayoutDiagram({ layout }: ScreenLayoutDiagramProps) {
  return (
    <div className="rounded-lg border border-border-sage bg-card p-6">
      <div className="flex items-center justify-end">
        <span className="text-xs text-muted-foreground">
          {layout.dimensions.width} × {layout.dimensions.height}px
        </span>
      </div>
      <pre className="mt-2 overflow-x-auto rounded-md bg-ink px-4 py-3 font-mono text-xs leading-relaxed text-sage-300">
        {layout.ascii}
      </pre>
      <p className="mt-3 text-sm text-muted-foreground">{layout.notes}</p>
    </div>
  );
}
