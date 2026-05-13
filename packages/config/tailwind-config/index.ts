import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

/**
 * Preset Tailwind partagé — palette AlterAges (terracotta + sauge + crème).
 * Les tokens shadcn/ui sont pilotés par variables CSS pour basculer light/dark.
 * Les tokens "bruts" (terra, sage, cream…) sont aussi exposés pour un usage direct.
 */
export const alteragesPreset = {
  darkMode: ['class'] as ['class'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        /* shadcn/ui semantic tokens — pilotés par CSS vars (voir globals.css) */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        /* Palette AlterAges — tokens directs */
        cream: '#F8F4EE',
        warm: '#FDFAF6',
        terra: {
          DEFAULT: '#B85C2C',
          light: '#D4784A',
          dark: '#8E431A',
        },
        sage: {
          DEFAULT: '#5C7A62',
          light: '#96B89B',
        },
        deep: '#3D3020',
        mid: '#6A5A3E',
        light: '#B0A08A',
        bd: {
          DEFAULT: '#DDD0BA',
          light: '#ECE4D4',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tag: '0.18em',
      },
      spacing: {
        /* Padding vertical standard des sections de la landing */
        section: '6rem',
        'section-lg': '7rem',
      },
      boxShadow: {
        /* Ombres douces calibrées sur la chaleur de la palette */
        soft: '0 1px 2px rgba(61, 48, 32, 0.04), 0 2px 6px rgba(61, 48, 32, 0.04)',
        'soft-lg':
          '0 4px 12px rgba(61, 48, 32, 0.06), 0 12px 32px rgba(61, 48, 32, 0.08)',
        hero: '0 30px 80px -20px rgba(61, 48, 32, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [animate],
} satisfies Omit<Config, 'content'>;

export default alteragesPreset;
