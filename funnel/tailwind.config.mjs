/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          card: '#111827',
          emerald: '#10B981',
          rose: '#F43F5E'
        }
      }
    },
  },
  plugins: [],
};
