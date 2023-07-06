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
    vue(),
    mkcert(),
    Unocss(),
    VueI18nPlugin({
      runtimeOnly: true,
      include: [path.resolve(process.cwd(), 'src/locales/lang/**')],
    }),
    Pages({
      dirs: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue', '**/modal/*', '**/data.ts'],
    }),
    Layouts(),
    AutoImport({
      // 自动导入 vue vue-router vue-i18n @vueuse/head @vueuse/core naive-ui
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      dirs: ['src/store/modules', 'src/components/Common'],
      dts: 'types/auto-imports.d.ts',
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [IconsResolver(), NaiveUiResolver()],
    }),
    // 自动导入 icon
    Icons({
      autoInstall: true,
    }),
  ];
};
