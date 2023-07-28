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
          "primary": "#F11A7B", 
          // "primary": "#068FFF", 
          // "primary": "#30AADD",
          "secondary": "#FF78C4",
          "base-100": "#F5F5F5",
          accent: '#FFFEC4',       // Bright yellow
          "third": '#333333',         // Dark gray
          // "info": "#FFD9D9",
          "info": "#FFD1DA",
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

