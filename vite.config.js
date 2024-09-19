import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Set the root to the client directory
  root: path.resolve(__dirname, "client"),

  // Set the base URL for the build
  base: "./", // Adjust this if deploying to a subdirectory

  plugins: [react()],

  build: {
    outDir: path.resolve(__dirname, "dist"), // Output build to 'dist' in the root
    emptyOutDir: true, // Clears out the directory before building
  },

  server: {
    port: 5173,
    open: true, // Automatically open the app in the browser
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"), // Adjust aliases as needed
    },
  },
});
