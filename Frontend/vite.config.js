import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
const result = dotenv.config({
  path: path.resolve(__dirname, "../backend/.env"),
});

if (result.error) {
  throw result.error;
}

// Log the PORT to verify it's being loaded correctly
// console.log(`Loaded PORT from .env: ${process.env.PORT}`);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": `http://localhost:${process.env.PORT || 3000}`,
      // "/api": https://wealthwatcher.onrender.com, // for deployment
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
