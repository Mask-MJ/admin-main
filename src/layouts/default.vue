<script setup lang="ts">
  // import { useRouter } from 'vue-router';
  import { options1, options2 } from './data';
  import sider from './sider/index.vue';
  import rightTools from './header/rightTools.vue';
</script>

<template>
  <n-layout has-sider class="wh-full">
    <!-- 侧边栏组件挂载 -->
    <sider />
    <n-layout content-style="display:flex; flex-flow: column; height: 100%">
      <n-layout-header bordered>
        <div class="h-56px flex-between header">
          <!-- 侧边栏顶部左边组件挂载 -->
          <n-breadcrumb>
            <n-breadcrumb-item>
              <n-dropdown :options="options1">
                <div class="trigger"> I'm ok </div>
              </n-dropdown>
            </n-breadcrumb-item>
            <n-breadcrumb-item>
              <n-dropdown :options="options2">
                <div class="trigger"> I'm ok </div>
              </n-dropdown>
            </n-breadcrumb-item>
          </n-breadcrumb>
          <!-- 侧边栏顶部右边组件挂载 -->
          <rightTools />
        </div>
        <div class="h-44px"></div>
      </n-layout-header>
      <n-layout-content content-style="height: 100%" :native-scrollbar="false">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in" appear>
            <div :key="(route.name as string)" class="h-full flex-grow bg-#f6f9f8 dark:bg-#101014">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </n-layout-content>
      <n-layout-footer>
        <div class="h-48px flex-center drop-shadow">2023 MeiJun-Admin</div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
<style scoped>
  .header {
    border-bottom: 1px solid #ce2525;
  }
</style>
