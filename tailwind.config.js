/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
    theme: {
    extend: {
      colors: {
        pink: {
          50:  "rgb(255, 240, 244)",
          100: "rgb(255, 222, 230)",
          200: "rgb(252, 190, 204)",
          300: "rgb(246, 152, 176)",
          400: "rgb(236, 111, 154)",
          500: "rgb(224, 107, 128)",
          600: "rgb(200, 72, 102)",
          700: "rgb(170, 48, 80)",
          800: "rgb(140, 36, 66)",
          900: "rgb(110, 30, 56)",
        },
      },

      borderRadius: {
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12,
      },

      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
      },
    }, 
  },
  plugins: [],
};
