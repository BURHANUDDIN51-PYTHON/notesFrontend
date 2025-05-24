/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['arial'],  // For body and UI
        heading: ['cursive'],  // Custom for headings and titles
      },
      
    }
  },
  plugins: [],
}