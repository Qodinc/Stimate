/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontSize: {
				footerM: "0.5rem",
				baseM: "0.8125rem",
				base: "1rem",
				zoom: "1.25rem",
				lg: "1.5rem",
				xl: "2rem",
				"2xl": "2.25rem",
				"3xl": "3rem",
				"4xl": "4rem",
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				baseColor: "#050315", //Text Primary Color
				accent: "#2F27CE", //Primary Color
				accent100: "#E0DFF9", //Primary 100 Color
				lightAccent: "#443DFF", //Subtitle Color
				accentBackground: "#F7F7FD", //Nav Fill Color
				white: "#FFFFFF",
				bgSecondary: '#DEDCFF', // Background de tabs
				secondaryIcon: "#6660E1", // Primary500 
				baseTextarea: "#FAFAFA"
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				comfortaa: ['Comfortaa', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
