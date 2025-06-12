import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',

  server: {
    proxy: {
      // 백엔드 A (DAMOA 스케줄 / Likes 등)
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },
      '/damoa/schedule': {
        target: 'http://localhost:8088',
        changeOrigin: true,
      },

      // 백엔드 B (이벤트 수집)
      '/events': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
