module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			backgroundImage: ['hover', 'focus'],
			blur: ['hover', 'focus'],
			contrast: ['hover', 'focus'],
		},
	},
	plugins: [],
};
