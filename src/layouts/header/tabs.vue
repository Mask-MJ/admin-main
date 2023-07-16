<script setup lang="ts">
  import { router } from '@/router';
  import type { MenuOption } from 'naive-ui';

  const props = defineProps({
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      default: () => [],
    },
  });

  const { currentRoute } = useRouter(); // 获取当前路由

  const tabs = ref<MenuOption[]>([]);
  const active = ref<string>('');

  const handleClick = (item: string) => {
    // console.log(item);
    // active.value = item;
    router.push({ path: item });
  };
  const handleClose = (item: string) => {
    // console.log(item); // 当前要关闭的tab的path
    // 如果tabs中的tab数量大于1, 则执行过滤 , 否则不执行
    if (tabs.value.length > 1) {
      // 在tabs中过滤掉当前要关闭的tab
      tabs.value = tabs.value.filter((e) => {
        // 过滤不是item的tab
        return e.path !== item;
      });
    }
  };

  watch(
    () => {
      return currentRoute.value.path;
    },
    () => {
      // console.log(currentRoute.value.path);
      const routerOptions = props.menuOptions?.find((e) => {
        return (e.path as string).includes(currentRoute.value.path.split('/')[1]);
      });
      const currentOption = routerOptions?.children?.find((e) => {
        return (e.path as string).includes(currentRoute.value.path.split('/')[2]);
      });

      const hasPath = tabs.value.find((e) => {
        return e.path === currentOption?.path;
      });
      // console.log(tabs);

      // 当router改变时,将当前tabs的active值改为当前路由的path
      active.value = currentRoute.value.path;

      // console.log(hasPath);
      // console.log(props.menuOptions);
      if (hasPath) {
      } else {
        currentOption && tabs.value.push(currentOption as any);
      }
      // console.log(tabs.value);
    },
    { immediate: true }, // 立即执行
  );
</script>

<template>
  <n-tabs
    v-model:value="active"
    type="card"
    size="small"
    closable
    @update:value="handleClick"
    @close="handleClose"
  >
    <template v-for="item in tabs" :key="item?.path">
      <n-tab-pane :name="(item.path as string)" :tab="(item.name as string)"> </n-tab-pane>
    </template>
  </n-tabs>
</template>

<style scoped></style>
