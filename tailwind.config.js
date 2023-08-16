/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      backgroundColor: {
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        "round-sm": "0px 0px 5px 2px rgba(0, 0, 0, 0.3)",
        "round-xl": "0px 0px 10px 3px rgba(0, 0, 0, 0.3)",
      },
      keyframes: {
        wiggle: {
          "0% 100%": { transform: "rotate(0deg)" },
          "15%, 35%, 55%, 75%, 95%": { transform: "rotate(-2deg)" },
          "5%, 25%, 45%, 65%, 85%": { transform: "rotate(2deg)" },
        },
        appear: {
          "0%": { opacity: "0", transform: "translateY(65px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        disappear: {
          "0%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(65px)" },
        },
        fliesout: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        fliesin: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-out 1",
        appear: "appear 0.3s ease-out 1",
        disappear: "disappear 0.3s ease-out 1",
        fliesout: "fliesout 0.3s ease-out 1",
        fliesin: "fliesin 0.3s ease-out 1",
      },
    },
  },
  plugins: [],
};
