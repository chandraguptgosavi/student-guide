const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          DEFAULT: "#5271ff",
        },
        gray: {
          light: "#F3F4F6",
          dark: "#1F2937",
        },
      },
      spacing: {
        'h-1/12': '8.33%',
        "h-11/12":"91.67%"
      },
      screens: {
        print: { raw: "print" },
        // => @media  print { ... }
      },
    },
  },
  variants: {
    extend: {
      outline: ['active'],
    },
  },
  plugins: [],
};
