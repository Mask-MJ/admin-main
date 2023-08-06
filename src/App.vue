<!-- <script setup lang="ts">
  import { getNaiveThemeOverrides } from './store/helper/theme-helper';

  const themeColor = {
    primary: '#1890ff',
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  };

  const themeOverrides = getNaiveThemeOverrides(themeColor);
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template> -->

<script setup lang="ts">
  import type { NLocale, NDateLocale } from 'naive-ui';
  import { subscribeThemeStore } from '@/store/helper/subscribeTheme.ts';
  import { zhCN, dateZhCN } from 'naive-ui';

  // 定义themeStore 用于获取theme商店定义的主题色
  const themeStore = useThemeStore();
  // 定义locale 用于获取语言包
  const locale = ref<NLocale | null>(zhCN);
  // 定义dateLocale 用于获取日期语言包
  const dateLocale = ref<NDateLocale | null>(dateZhCN);

  // const changeLang = () => {
  //   // locale.value = zhCN;
  //   // dateLocale.value = dateZhCN;
  //   if (locale.value === null) {
  //     locale.value = zhCN;
  //     dateLocale.value = dateZhCN;
  //   } else {
  //     locale.value = null;
  //     dateLocale.value = null;
  //   }
  // };

  subscribeThemeStore();
</script>

<template>
  <n-config-provider
    :theme-overrides="themeStore.getThemeColor"
    :locale="locale"
    :date-locale="dateLocale"
  >
    <!-- <n-config-provider :theme-overrides="themeStore.getThemeColor"> -->
    <NaiveProvider>
      <!-- <NButton @click="changeLang">中文英文</NButton> -->
      <RouterView />
    </NaiveProvider>
  </n-config-provider>
</template>
