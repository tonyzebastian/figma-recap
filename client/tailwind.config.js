module.exports = {
  content: [
    './public/**/*.html', // Adjust this path if your HTML files are in a different location
    './src/**/*.{js,jsx,ts,tsx}', // Include your JavaScript files if you use Tailwind in them
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'sans-serif'], // Add Geist font family
      },
    },
  },
  plugins: [],
};