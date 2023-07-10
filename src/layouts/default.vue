<script setup lang="ts">
  import { getMenuList } from '@/api/modules/login';
  import type { LoginMenuList } from '@/api/modules/types/login.type';
  import type { MenuOption } from 'naive-ui';
  import { RouterLink } from 'vue-router';

  // 通过封装的defHttp方法发送请求, 获取菜单数据
  // defHttp.get({ url: 'system/menu/getRouters' });

  // 定义menuOptions, 用于存储菜单列表数据
  const menuOptions = ref();

  // chargeMenuOptions 方法用于遍历服务器返回的数据
  // 使用LoginMenuList[] 类型定义

  const chargeMenuOptions = (menuLists: LoginMenuList[], fatherPath = '') => {
    return menuLists.map((e) => {
      // 定义newObj对象, 用于存储遍历的结果
      // 将数据中的meta属性中的title属性和id属性取出来, 通过newObj对象存储起来, 返回newObj对象给menuOptions.value
      // console.log(e);
      const newObj: MenuOption = {
        label: e.meta.title,
        // label: () => h(RouterLink, { to: { path: e.path } }, { default: () => e.meta.title }),
        // 三元运算符 :  e.children ? e.meta.title : () => h( )  --> 如果有children属性, 则将e.meta.title返回给label属性, 如果没有children属性, 则将() => h( )返回给label属性
        // label: e.children
        //   ? e.meta.title
        //   : () =>
        //       h(
        //         RouterLink,
        //         { to: { path: fatherPath + '/' + e.path } },
        //         { default: () => e.meta.title },
        //       ),
        key: e.id,
      };
      // 递归 : 调用chargeMenuOptions方法, 用于遍历children属性中的数据
      if (e.children) {
        // 如果有children属性, 则将children属性中的数据传入chargeMenuOptions方法中, 并将结果返回给newObj.children
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
    // 通过 result 接收服务器返回的数据
    const result = await getMenuList();
    // console.log(result);
    // 将服务器返回的数据中的meta属性中的title属性和id属性取出来, 通过chargeMenuOptions方法存储起来, 返回给menuOptions.value
    menuOptions.value = chargeMenuOptions(result);
    // console.log(menuOptions.value);

    // 通过数组的map方法遍历, 将遍历的结果返回给menuOptions.value
    // menuOptions.value = result.map((e: any) => {
    //   // console.log(e);

    //   // 定义一个newObj对象, 用于存储遍历的结果
    //   // 将服务器返回的数据中的meta属性中的title属性和id属性取出来, 通过newObj对象存储起来, 返回newObj对象给menuOptions.value
    //   const newObj = {
    //     label: e.meta.title,
    //     key: e.id,
    //   };
    //   return newObj;
    // });
  });

  // const menuOptions2: MenuOption[] = [{
  //     label: '寻羊冒险记',
  //     key: 'a-wild-sheep-chase',
  //   }];
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="80"
      :width="200"
      show-trigger="arrow-circle"
    >
      <n-menu
        class="h-screen"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>颐和园路</n-layout-header>
      <n-layout-content> <router-view /> </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped></style>
