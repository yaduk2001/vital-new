/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          blue: '#146EE9',
          blueMedium: '#285B95',
          blueDark: '#0B4BA9',
          blueBright: '#2B69C8',
          blueDeep: '#164FA6',
          blueVeryDark: '#0041A0',
          blueLight: '#1C57B0',
          blueMint: '#2760B7',
          blueSky: '#1E5AB1',
          blueOcean: '#205AB3',
        },
        background: {
          DEFAULT: '#0A0F1A',
          secondary: '#1A2332',
          tertiary: '#2A3442',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0A0F1A 0%, #1A2332 50%, #0A0F1A 100%)',
        'gradient-accent': 'linear-gradient(135deg, #146EE9 0%, #285B95 50%, #0B4BA9 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(20, 110, 233, 0.1) 0%, rgba(40, 91, 149, 0.1) 50%, rgba(11, 75, 169, 0.1) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 110, 233, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(20, 110, 233, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(20, 110, 233, 0.3)',
        'glow-lg': '0 0 40px rgba(20, 110, 233, 0.4)',
        'glow-xl': '0 0 60px rgba(20, 110, 233, 0.5)',
      },
    },
  },
  plugins: [],
} 