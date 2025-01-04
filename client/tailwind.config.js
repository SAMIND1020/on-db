/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#B32113",
          dark: "#B32113",
        },
        secondary: {
          DEFAULT: "#f8fafb",
          dark: "#1F2D34"
        },
        text: {
          DEFAULT: "#0e151b",
          dark: "#f8fafb"
        },
        text2: {
          DEFAULT: "#507695",
          dark: "#B6B6B6"
        },
        hover: {
          DEFAULT: "#8F1600",
          dark: "#8F1600",
        },
        selected: {
          DEFAULT: "#e8eef3",
          dark: "#33434A"
        },
        disable: {
          DEFAULT: "#b6b6b6"
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#363636"
        },
      },
    },
  },
  plugins: [],
}