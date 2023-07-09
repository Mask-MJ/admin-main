import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPageGuard, createPermissionGuard } from './permissionGuard';
import routes from '~pages';

// console.log(routes);
export const router = createRouter({
  // hash 模式
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 路由配置
  // routes: [
  //   {
  //     // 首页
  //     path: '/dashboard/worktable',
  //     name: 'worktable',
  //     component: () => import('../views/dashboard/worktable/index.vue'),
  //   },
  //   {
  //     // 登陆页
  //     path: '/login',
  //     name: 'login',
  //     component: () => import('../views/login/index.vue'),
  //   },
  // ],
  //使用vite-plugin-pages插件后，路由配置改为自动导入路由
  routes: routes,
  // 页面跳转滚动行为
  strict: true,
  //
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

//路由守卫

export const setupRouter = (app: App) => {
  app.use(router);
  // 创建页面拦截器 - 页面守卫 ----封装到createPageGuard方法中
  // // 进入路由前
  // router.beforeEach(() => {
  //   // 开启进度条
  //   window.$loadingBar.start();
  //   return true;
  // });
  // // 进入路由后
  // router.afterEach(() => {
  //   // 关闭进度条
  //   window.$loadingBar.finish();
  //   // 把滚动条回到顶部
  //   document.body.scrollTo(0, 0);
  // });

  // 创建页面拦截器 - 页面守卫
  createPageGuard(router);
  // 创建路由守卫 - 路由守卫
  createPermissionGuard(router);
};
