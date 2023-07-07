<script setup lang="ts" name="NaiveProvider">
  // 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
  function registerNaiveTools() {
    window.$loadingBar = useLoadingBar();
    window.$dialog = useDialog();
    window.$message = useMessage();
    window.$notification = useNotification();
  }

  const NaiveProviderContent = defineComponent({
    name: 'NaiveProviderContent',
    setup() {
      registerNaiveTools();
    },
    render() {
      return h('div');
    },
  });
</script>

<template>
  <!-- 加载条组件 -->
  <n-loading-bar-provider>
    <!-- 对话框 - 需确认的弹窗 -->
    <n-dialog-provider>
      <!-- 通知窗口 - 弹窗 - 强提醒 -->
      <n-notification-provider>
        <!-- 信息组件 - 弹窗 - 能自动消失 -->
        <n-message-provider>
          <slot />
          <NaiveProviderContent />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<style scoped></style>
