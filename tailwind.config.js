/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'darkBlue': '#141D2F',
      'white': '#FFFFFF',
      'lightBlue':'#1E2A47',
      'blue':'#0079FF'
    }
  },
  plugins: [],
}