/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for premium feel
        primary: '#1E293B',
        accent: '#10B981', // Emerald green
        secondary: '#0F172A',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}
