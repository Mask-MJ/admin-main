import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import Unocss from 'unocss/vite';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';

export const createVitePlugins = () => {
  return [
    // vue 插件 -> 解析.vue文件 (因为浏览器只能解析.js文件)
    vue(),
    // 生成证书 https
    mkcert(),
    // 原子类css框架 -> 一行代码就可以实现样式
    Unocss(),
    // vue-i18n 翻译插件 -> 国际化 (中文/英文)
    VueI18nPlugin({
      runtimeOnly: true,
      include: [path.resolve(process.cwd(), 'src/locales/lang/**')],
    }),
    // vite-plugin-pages -> 自动导入路由
    Pages({
      // 导入的文件夹
      dirs: [{ dir: 'src/views', baseRoute: '' }],
      // 不导入的文件
      exclude: ['**/components/*.vue', '**/modal/*', '**/data.ts'],
    }),
    // vite-plugin-vue-layouts -> 自动导入布局
    Layouts(),
    // unplugin-auto-import -> 定义自动导入的插件
    AutoImport({
      // 定义自动导入的插件
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        // 改变页面title
        '@vueuse/head',
        // vue的hooks工具库
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      // 自动导入的文件夹 :
      // 比如自动导入store/modules文件夹下的所有文件(用store仓库时不需要手动import)
      // 比如自动导入components/Common文件夹下的所有文件(用组件时不需要手动import)
      dirs: ['src/store/modules', 'src/components/Common'],
      // 在全局中声明自动导入的文件
      dts: 'types/auto-imports.d.ts',
    }),
    // unplugin-vue-components -> 自动导入组件库
    Components({
      // 在全局中声明自动导入的文件
      dts: 'types/components.d.ts',
      // 函数调用 , 自动导入的组件库
      resolvers: [IconsResolver(), NaiveUiResolver()],
    }),
    // 自动导入 icon
    Icons({
      autoInstall: true,
    }),
  ];
};
