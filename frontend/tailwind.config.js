/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(222.2 47.4% 11.2%)',
        foreground: 'hsl(210 40% 98%)',
        primary: {
          DEFAULT: 'hsl(217.2 91.2% 59.8%)',
          foreground: 'hsl(210 40% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(215.3 25% 26.7%)',
          foreground: 'hsl(210 40% 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 62.8% 30.6%)',
          foreground: 'hsl(210 40% 98%)',
        },
        success: {
          DEFAULT: 'hsl(142.1 76.2% 36.3%)',
          foreground: 'hsl(210 40% 98%)',
        },
        warning: {
          DEFAULT: 'hsl(38 92% 50%)',
          foreground: 'hsl(210 40% 98%)',
        },
        info: {
          DEFAULT: 'hsl(199 89% 48%)',
          foreground: 'hsl(210 40% 98%)',
        },
        card: {
          DEFAULT: 'hsl(217.2 32.6% 17.5%)',
          foreground: 'hsl(210 40% 98%)',
        },
        input: {
          DEFAULT: 'hsl(215.3 19.3% 34.5%)',
          foreground: 'hsl(210 40% 98%)',
        },
      },
      borderRadius: {
        lg: '0.75rem',
      },
      padding: {
        container: '2rem',
      },
      maxWidth: {
        '2xl': '1400px',
      },
      transitionDuration: {
        '200': '200ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'accordion': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 500ms ease-out',
        'slide-up': 'slide-up 500ms ease-out',
      },
    },
  },
  plugins: [],
};
