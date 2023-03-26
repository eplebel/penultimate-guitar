/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
		screens: {
			'xs': '350px',
			// => @media (min-width: 350px) { ... }
			
			'sm': '450px',
			// => @media (min-width: 450px) { ... }

			'md': '960px',
			// => @media (min-width: 960px) { ... }
		  },
	},
  },
  plugins: [],
};
