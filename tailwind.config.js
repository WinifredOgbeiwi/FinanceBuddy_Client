/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#1c4532",
        secondary: "#f0f8f4",
        secondary2: "#daf5e7",
      },
      borderRadius: {
        main: "3px",
      },
    },
  },
  plugins: [],
};
