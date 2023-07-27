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
    port: 3333,
    // 代理
    proxy: {
      // proxy 选项:
      // 匹配https://localhost:3100/basic-api开头的请求时,将其代理到http://10.2.0.221:8080/basic-api
      '/basic-api': {
        target: 'http://10.2.0.221:8080/', // 后端服务实际地址
        ws: true, // 是否启用websockets
        changeOrigin: true, // 是否跨域
        // 重写api-->去掉basic-api 例如:https://localhost:3100/basic-api/code --> http://10.2.0.221:8080/code
        rewrite: (path) => path.replace(/^\/basic-api/, ''),
        secure: false, // 如果是https接口，需要配置这个参数
      },
    },
  },
  // plugins 为 vite 插件
  plugins: createVitePlugins(),
});
