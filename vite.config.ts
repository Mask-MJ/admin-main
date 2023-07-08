import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { createVitePlugins } from './build';

// console.log('process.cwd()', process.cwd());
// console.log(`resolve()`, resolve(process.cwd(), 'src'));

// 官网 https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // process.cwd() --> G:/study/项目学习/admin-main
      // resolve(参数一,参数二) -->识别(是/还是\)并且拼接两个参数--> G:/study/项目学习/admin-main/src
      '@': `${resolve(process.cwd(), 'src')}`,
      '#': `${resolve(process.cwd(), 'types')}`,
    },
  },
  server: {
    // 开启 https
    https: true,
    // 开启 localhost
    host: true,
    // 端口号修改
    port: 3100,
    // 代理
    // proxy: {},
  },
  // plugins 为 vite 插件
  plugins: createVitePlugins(),
});
