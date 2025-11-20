import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "underline",
              fontWeight: "500",
            },
            strong: {
              color: "inherit",
              fontWeight: "600",
            },
            code: {
              color: "inherit",
              backgroundColor: "rgb(250 250 250)",
              padding: "0.125rem 0.25rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "rgb(250 250 250)",
              color: "rgb(24 24 27)",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: "rgb(24 24 27)",
            },
            pre: {
              backgroundColor: "rgb(24 24 27)",
              color: "rgb(250 250 250)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
