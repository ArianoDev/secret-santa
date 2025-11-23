/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // PALETTE PERSONALIZZATA
        brickEmber: "#bb010b",   // Deep, passionate red – embers
        flagRed: "#cd1624",      // Vivid, proud red
        blueSpruce: "#2b6a4d",   // Evergreen, cool confidence
        deepForest: "#004733",
        jungleTeal: "#23856d",   // Mossy teal, depth and resilience
        brightSnow: "#faf8f8"    // Clean, fresh snow
      },
      boxShadow: {
        "xmas-soft": "0 18px 40px rgba(0,0,0,0.55)"
      }
    }
  },
  plugins: []
};