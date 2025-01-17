
const svgToDataUri = require("mini-svg-data-uri");
 
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-card': '0 4px 4px 0 rgba(0, 0, 0, 0.111)', // x:0, y:4, blur:4, spread:0, color: black, opacity: 25%
        'custom-shadow': '0 11.27px 45.09px 0 rgba(0, 34, 51, 0.06)',
        'custom-hover': '0px 11.7px 75px 0px rgba(0, 26, 102, 0.1)',
      }
      ,
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#068179", 
        secondary: "#F27125", 
        grayColor: "#767E94",
      },
      fontFamily: {
        NotoSans: ['var(--Noto-Sans)'],
        nunitosans: ['var(--font-nunitosans)'],
        Archivoo: ['var(--font-Archivo)'],
      },
      screens: {
        mobileS:"320px",
        mobileM:"375px",
        mobileL:"425px",
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px", // => @media (min-width: 1280px) { ... }
       
      }
    },
  },
  plugins: [

    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    }
    

  ],
};
