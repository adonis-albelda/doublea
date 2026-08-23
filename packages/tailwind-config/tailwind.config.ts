import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

// Shared preset — design-system.md is the single source of truth for these
// values. apps/web extends this rather than redefining the theme.
const config: Omit<Config, "content"> = {
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        lg: "64px",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sage: {
          700: "hsl(var(--sage-700))",
          500: "hsl(var(--sage-500))",
          300: "hsl(var(--sage-300))",
          100: "hsl(var(--sage-100))",
        },
        ink: "hsl(var(--ink))",
        paper: "hsl(var(--paper))",
        clay: "hsl(var(--clay))",
        "slate-sage": "hsl(var(--slate-sage))",
        "border-sage": "hsl(var(--border-sage))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "display-xl": ["3.75rem", { lineHeight: "1.05", fontWeight: "700" }],
        "display-lg": ["2.75rem", { lineHeight: "1.1", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.15", fontWeight: "500" }],
        h3: ["1.5rem", { lineHeight: "1.25", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        caption: [
          "0.8125rem",
          { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.04em" },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
