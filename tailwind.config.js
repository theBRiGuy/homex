const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			blue: colors.blue,
			white: colors.white,
			gray: colors.trueGray,
			green: colors.emerald,
			indigo: colors.indigo,
			red: colors.rose,
			yellow: colors.amber
		},
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
