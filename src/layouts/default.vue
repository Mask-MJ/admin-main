<script setup lang="ts">
  import type { LoginMenuList } from '@/api/modules/types/login.type';
  import type { MenuOption } from 'naive-ui';
  import { getMenuList } from '@/api/modules/login';
  import sider from './sider/index.vue';
  import rightTools from './header/rightTools.vue';
  import leftTools from './header/leftTools.vue';
  import tabs from './header/tabs.vue';

  import { RouterLink } from 'vue-router';

  const menuOptions = ref<MenuOption[]>();
  const showTabs = ref<boolean>(false);

  const chargeMenuOptions = (menuLists: LoginMenuList[], fatherPath = '') => {
    return menuLists.map((e) => {
      const newObj: MenuOption = {
        label: e.meta.title,
        key: e.id,
        icon: () => h('i', { class: 'i-' + e.meta.icon }),
        path: fatherPath + '/' + e.path,
        name: e.meta.title,
      };
      if (e.children) {
        // 如果有children属性, 则递归
        newObj.children = chargeMenuOptions(e.children, e.path);
      } else {
        // 如果没有children属性, 则将label属性中的数据传入RouterLink中, 并将结果返回给newObj.label
        newObj.label = () => {
          return h(
            RouterLink,
            { to: { path: fatherPath + '/' + e.path } },
            { default: () => e.meta.title },
          );
        };
      }
      return newObj;
    });
  };

  onMounted(async () => {
    const result = await getMenuList();
    // console.log(currentRoute.value);
    // 菜单数据
    menuOptions.value = chargeMenuOptions(result);
    showTabs.value = true;
    // 获取当前路由对应的菜单数据
    // console.log(currentRoute.value.path);
    // console.log(currentRoute.value.path.split('/'));
    // console.log(currentRoute.value.path.split('/')[1]);
    // console.log(menuOptions.value);
    // const routerOptions = menuOptions.value.find((e) => {
    //   return (e.path as string).includes(currentRoute.value.path.split('/')[1]);
    // });
    // const currentOption = routerOptions?.children?.find((e) => {
    //   return (e.path as string).includes(currentRoute.value.path.split('/')[2]);
    // });
    // console.log(currentOption);
    // tabs.value.push(currentOption!);
  });
</script>

<template>
  <n-layout has-sider class="wh-full">
    <!-- 侧边栏组件挂载 -->
    <sider :menu-options="menuOptions" />
    <n-layout content-style="display:flex; flex-flow: column; height: 100%">
      <n-layout-header>
        <div class="h-56px flex-between header">
          <!-- 侧边栏顶部左边组件 -->
          <leftTools :menu-options="menuOptions" />
          <!-- 侧边栏顶部右边组件挂载 -->
          <rightTools />
        </div>
        <div class="h-44px">
          <tabs v-if="showTabs" :menu-options="menuOptions" />
        </div>
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
