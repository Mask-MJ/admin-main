import { defineConfig } from 'vite';
import { createVitePlugins } from './build';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
});
