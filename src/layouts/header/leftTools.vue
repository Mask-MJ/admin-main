<script setup lang="ts">
  import type { MenuOption } from 'naive-ui';

  const props = defineProps({
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      default: () => [],
    },
  });

  // const routerOptions = ref<MenuOption>();
  // const currentOption = ref<MenuOption>();

  const { currentRoute } = useRouter();
  const routerOptions = computed(() => {
    return props.menuOptions?.find((e) => {
      return (e.path as string).includes(currentRoute.value.path.split('/')[1]);
    });
  });
  const currentOption = computed(() => {
    return routerOptions.value?.children?.find((e) => {
      return (e.path as string).includes(currentRoute.value.path.split('/')[2]);
    });
  });
  // 当切换路由时, 重新获取vscode-file://vscode-app/d:/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html当前路由对应的菜单数据
  // watch(
  //   () => currentRoute.value.path || props.menuOptions,
  //   () => {
  //     routerOptions.value = props.menuOptions?.find((e) => {
  //       return (e.path as string).includes(currentRoute.value.path.split('/')[1]);
  //     });
  //     currentOption.value = routerOptions.value?.children?.find((e) => {
  //       return (e.path as string).includes(currentRoute.value.path.split('/')[2]);
  //     });
  //   },
  //   { deep: true },
  // );
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-dropdown :options="routerOptions?.children">
        <div class="trigger"> {{ routerOptions?.name }} </div>
      </n-dropdown>
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <div class="trigger">{{ currentOption?.name }} </div>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped></style>
