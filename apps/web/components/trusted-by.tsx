// Track is duplicated 3x so the marquee loops seamlessly with only 4 logos
// (translateX(-33.333%) in the marquee-3x keyframe matches the 3x repeat);
// prefers-reduced-motion freezes it via the global rule in globals.css.
const TRUSTED_BY = [
  { name: "Client One", logo: "/trusted/logo1.jpg" },
  { name: "Client Two", logo: "/trusted/logo2.jpg" },
  { name: "Client Three", logo: "/trusted/logo3.webp" },
  { name: "Client Four", logo: "/trusted/logo4.webp" },
  { name: "Client Five", logo: "/trusted/logo5.png" },
] as const;

function LogoStrip({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden={ariaHidden}>
      {TRUSTED_BY.map((client, i) => (
        <div key={`${client.name}-${i}`} className="flex h-10 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={client.logo} alt={client.name} className="h-full w-auto object-contain" />
        </div>
      ))}
    </div>
  );
}

export function TrustedBy() {
  return (
    <section
      aria-label="Trusted by"
      className="border-y border-border-sage bg-background py-8"
    >
      <div className="container">
        <p className="text-center font-mono text-caption uppercase tracking-[0.04em] text-slate-sage">
          Trusted by teams at
        </p>
      </div>

      <div className="relative mt-6 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee-3x_28s_linear_infinite] hover:[animation-play-state:paused]">
          <LogoStrip />
          <LogoStrip ariaHidden />
          <LogoStrip ariaHidden />
        </div>
      </div>
    </section>
  );
}
