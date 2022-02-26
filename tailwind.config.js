module.exports = {
  jit: true,
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        color1: "#463F3A",
        color2: "#8A817C",
        color3: "#BCB8B1",
        color4: "#F4F3EE",
        color5: "#E0AFA0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
