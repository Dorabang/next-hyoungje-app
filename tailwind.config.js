/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        grayColor: {
          100: '#eee',
          200: '#ddd',
          300: '#999',
          400: '#666',
          500: '#333',
        },
        primary: '#BF1E2E',
        limeColor: '#8EC000',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
