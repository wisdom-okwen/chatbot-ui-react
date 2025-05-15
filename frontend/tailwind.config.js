/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        'header': '100%',
        'input': '80%'
      },
      height: {
        'header': '4rem',
        'chat': '450px'
      },
      colors: {
        primary: '#0f172a',
        brandBlue: '#1e40af',
      },
    },
  },  
  plugins: [],
}

