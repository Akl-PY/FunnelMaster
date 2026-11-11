/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        themeBg: '#050D0A',
        themeCard: '#0C1A15',
        themeBorder: '#18382E',
        themeAccent: '#10B981',
        themeText: '#F8FAFC',
        themeMuted: '#94A3B8'
      }
    },
  },
  plugins: [],
};
