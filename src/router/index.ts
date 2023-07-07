import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  // hash 模式
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 路由配置
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/dashboard/home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue'),
    },
  ],
  // 页面跳转滚动行为
  strict: true,
  //
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

//路由守卫

export const setupRouter = (app: App) => {
  app.use(router);
};
