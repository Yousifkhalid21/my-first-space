module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: {
          900: "#050609",
          850: "#070912",
          800: "#0A0D18",
          700: "#10162A",
          600: "#1E2A40",
          500: "#334155",
          400: "#64748B",
          300: "#94A3B8"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(129, 140, 248, 0.25)",
        deep: "0 18px 50px rgba(0,0,0,0.55)"
      }
    }
  },
  plugins: []
};
