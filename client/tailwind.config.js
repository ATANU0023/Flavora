/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0d0d14',
          800: '#12121e',
          700: '#1a1a2e',
          600: '#1e1e35',
        },
        accent: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#7c3aed',
          glow: 'rgba(168,85,247,0.3)',
        },
        pink: '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.15) 0%, transparent 65%)',
        'card-gradient': 'linear-gradient(to top, rgba(13,13,20,0.85) 0%, transparent 55%)',
        'accent-gradient': 'linear-gradient(135deg, #a855f7, #7c3aed)',
        'title-gradient': 'linear-gradient(135deg, #c084fc, #ec4899)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(168,85,247,0.25)',
        'glow-pink': '0 0 20px rgba(236,72,153,0.2)',
        card: '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'slide-in': 'slideIn 0.3s ease',
        spin: 'spin 1s linear infinite',
        'fade-up': 'fadeUp 0.4s ease',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideIn: {
          from: { transform: 'translateX(120%)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 },
        },
        fadeUp: {
          from: { transform: 'translateY(16px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
      },
      backdropBlur: { xs: '4px' },
    },
  },
  plugins: [],
};
