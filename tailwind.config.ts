import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores base
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Cards y popovers
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        // Colores principales (azul)
        primary: {
          DEFAULT: "hsl(var(--primary))", // azul 220 60% 60%
          foreground: "hsl(var(--primary-foreground))",
        },
        
        // Colores secundarios (verde oscuro en dark mode)
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        // Colores de acento (azul verdoso)
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        // Colores neutros
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Destructivo (rojo)
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        // Bordes e inputs
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Colores para gráficos
        chart: {
          "1": "hsl(var(--chart-1))", // azul
          "2": "hsl(var(--chart-2))", // verde
          "3": "hsl(var(--chart-3))", // azul verdoso
          "4": "hsl(var(--chart-4))", // violeta
          "5": "hsl(var(--chart-5))", // verde claro
        },
        
        // Colores directos para uso específico
        blue: {
          DEFAULT: "hsl(220, 60%, 60%)", // azul principal
          dark: "hsl(220, 12%, 10%)", // azul muy oscuro (bg dark)
          card: "hsl(220, 10%, 12%)", // azul oscuro para cards
          border: "hsl(220, 15%, 18%)", // azul para bordes
        },
        green: {
          DEFAULT: "hsl(160, 60%, 45%)", // verde principal
          dark: "hsl(160, 30%, 18%)", // verde oscuro
          muted: "hsl(160, 20%, 60%)", // verde azulado muted
          input: "hsl(160, 15%, 18%)", // verde para inputs
          popover: "hsl(160, 10%, 13%)", // verde azulado popover
        },
        teal: {
          DEFAULT: "hsl(200, 40%, 20%)", // azul verdoso
          accent: "hsl(200, 50%, 40%)", // azul verdoso acento
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundColor: {
        'dark-bg': 'var(--color-bg)',
      },
      textColor: {
        'dark-text': 'var(--color-text)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
