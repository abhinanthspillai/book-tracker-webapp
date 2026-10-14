/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF6EE',
        surface: '#FFFFFF',
        ink: '#1C1A17',
        muted: '#6B645A',
        border: '#E8E0D2',
        accent: '#B8812E',
        'accent-soft': '#F3E6CC',
        success: '#3F7D58',
        danger: '#B5483A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'DM Serif Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '20px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(28, 26, 23, 0.08)',
        'soft-lg': '0 4px 16px rgba(28, 26, 23, 0.12)',
      },
    },
  },
  plugins: [],
}
