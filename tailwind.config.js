/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
          // "primary": "#FF6B6B",
          // "primary": "#FF6666", 
          "primary": "#176B87", 
          // "primary": "#30AADD",
          "secondary": "#5C6AC4",
          "base-100": "#F8F8F8",
          accent: '#ff0000',       // Bright yellow
          "third": '#333333',         // Dark gray
          // "info": "#FFD9D9",
          "info": "#DAFFFB",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        }
      },
      "retro"
    ]
  },
  plugins: [require("daisyui")],
}

