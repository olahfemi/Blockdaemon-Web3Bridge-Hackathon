/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      redy: "#f254a3",
      primary: "#49adec",
      dark: '#1E2735',
      dark_deep: "#111623",
      dark_variant: '#252A39',
      white: '#ffffff',
      white_variant: "#9fa7bb",
      green: "#6cd85cf2"
    },
    extend: {
      boxShadow: {
        '2xl': '0px 4px 48px rgba(32, 51, 160, 0.08)',
      },
      animation: {
        spin: 'spin 2s linear infinite',
      },
    },
  },
  plugins: [],
}
