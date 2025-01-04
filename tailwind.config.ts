import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
      },
      // Combined colors
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
        // Additional colors from second config
        color1: "#323338",
        color2: "#848588",
        color3: "#5F48EA",
        color4: "#E8ECEE",
        color5: "#C1C2C3",
        color6: "#08C7E0",
        color7: "#46474C",
        color8: "#5B5C60",
        color9: "#98999B",
        color10: "#E6E9EF",
        color11: "#6F7074",
        color12: "#F5F6F8",
        color13: "#F4F5F6",
        color14: "#3BACD0",
        color15: "#F9F9F9",
        color16: "#E1F4F7",
        darkColor1: "#1E272E",
        darkColor2: "#222B32",
        darkColor3: "#A9ACAE",
        darkColor4: "#384047",
        darkColor5: "#2B343B",
        darkColor6: "#CECFD0",
        darkColor7: "#D5D6D7",
        darkColor8: "#384047",
        error: "#E44258",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        one: "-1px 0px 0px 0px #E9EBF0 inset",
        darkOne: "-1px 0px 0px 0px #384047 inset",
        two: "0px -1px 0px 0px #E9EBF0 inset",
        darkTwo: "0px -1px 0px 0px #384047 inset",
        three: "0px 8px 16px 0px rgba(33, 30, 30, 0.16)",
        darkThree: "0px 6px 22px 0px rgba(0, 0, 0, 0.10)",
        four: "0px 2px 22px 0px rgba(0, 0, 0, 0.10)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
      screens: {
        xxxs: "280px",
        xxs: "320px",
        340: "340px",
        xs: "480px",
        d: "500px",
        s: "576px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
