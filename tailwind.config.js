/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.{js,ts,jsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
