<script setup lang="ts">
  import { headerLists, options, userOptions } from '../data';

  // 定义layout顶部栏的icon对应的按钮事件
  const handleSelect = (_e: string) => {
    // console.log(e);
  };
  // 定义layout顶部栏的icon对应的按钮事件
  const handleUserSelect = (_e: string) => {
    // console.log(e);
  };
</script>

<template>
  <div class="flex">
    <li v-for="item in headerLists" :key="item.icon" class="w-40px h-56px flex-center">
      <n-tooltip trigger="hover">
        <template #trigger>
          <i :class="item.icon" class="text-xl"></i>
        </template>
        {{ item.hoverName }}
      </n-tooltip>
    </li>
    <!-- <n-tooltip trigger="hover">
              <template #trigger>
                <div class="w-40px h-56px flex-center">
                  <i class="i-ant-design:search-outlined text-xl"></i>
                </div>
              </template>
              搜索
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div class="w-40px h-56px flex-center">
                  <i class="i-ant-design:github-outlined text-xl"></i>
                </div>
              </template>
              github
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div class="w-40px h-56px flex-center">
                  <i class="i-ant-design:fullscreen-outlined text-xl"></i>
                </div>
              </template>
              全屏
            </n-tooltip>
            <n-tooltip trigger="hover">
              <template #trigger>
                <div class="w-40px h-56px flex-center">
                  <i class="i-ant-design:smile-outlined text-xl"></i>
                </div>
              </template>
              主题模式
            </n-tooltip> -->
    <n-dropdown trigger="hover" :options="options" @select="handleSelect">
      <div class="w-40px h-56px flex-center">
        <i class="i-ant-design:translation-outlined text-xl"></i>
      </div>
    </n-dropdown>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-badge :value="8" :offset="[-10, 16]">
          <div class="w-40px h-56px flex-center">
            <i class="i-ant-design:message-outlined text-xl c-black"></i>
          </div>
        </n-badge>
      </template>
      消息通知
    </n-tooltip>
    <n-dropdown trigger="hover" :options="userOptions" @select="handleUserSelect">
      <div class="px-16px h-56px flex-around">
        <n-avatar
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <span class="ml-8px">MEIII11111III</span>
      </div>
    </n-dropdown>
  </div>
</template>

<style scoped></style>
