/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inmo: {
          primary: "#1e3360", // Azul elegante corporativo
          secondary: "#0f172a", // Gris oscuro para textos
          accent: "#10b981", // Verde para botones de acción/claves
        },
      },
    },
  },
  plugins: [],
};
