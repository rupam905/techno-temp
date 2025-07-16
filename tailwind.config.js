/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", // 🔁 Make sure components folder is scanned
  ],
  theme: {
    extend: {
      zIndex: {
        1: '1', // 🔁 Needed to control star layering
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "star-movement-bottom": "star-movement-bottom 6s linear infinite alternate",
        "star-movement-top": "star-movement-top 6s linear infinite alternate",
      },
      keyframes: {
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
