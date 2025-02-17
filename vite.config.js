// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow access from other devices in the network
    port: 5173, // Use the default Vite port or change as needed
  },
  proxy: {
    '/socket.io': {
      target: 'http://192.168.1.238:5173',
      ws: true,
      changeOrigin: true,
    },
  },
});
