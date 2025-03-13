import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [
        react(),
        TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:6969",
                changeOrigin: false,
                secure: false,
            },
        },
    },
});
