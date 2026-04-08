/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        panel: '0 24px 60px rgba(15, 23, 42, 0.12)',
        soft: '0 12px 30px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          950: '#0b1220',
        },
      },
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(37, 99, 235, 0.32), transparent 34%), linear-gradient(180deg, #0f274c 0%, #07111f 60%, #020617 100%)',
      },
    },
  },
  plugins: [],
};
