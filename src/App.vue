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
  // 定义themeStore 用于获取theme商店定义的主题色
  const themeStore = useThemeStore();
</script>

<template>
  <n-config-provider :theme-overrides="themeStore.getThemeColor">
    <NaiveProvider>
      <RouterView />
    </NaiveProvider>
  </n-config-provider>
</template>
