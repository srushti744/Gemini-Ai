import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: "src/index.js",
      name: "App",
      fileName: "app"
    },

    rollupOptions: {
      external: ["react", "react-dom", "axios"],

      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          axios: "axios"
        }
      }
    }
  }
})