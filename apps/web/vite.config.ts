import { svelte } from '@sveltejs/vite-plugin-svelte';
import * as path from 'path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    svelte(),
    Icons({
      compiler: 'svelte',
    }),
  ],
  optimizeDeps: { exclude: ['svelte-navigator'] },
});
