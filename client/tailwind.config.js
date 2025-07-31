// tailwind.config.js (ESM compatible)
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "500px",
        lg: "768px",
        xl: "900px",
        "2xl": "1024px",
        "3xl": "1200px",
      },
    },
  },
  plugins: [],
};
