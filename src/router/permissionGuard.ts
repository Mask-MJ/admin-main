import type { Router } from 'vue-router';

// 创建页面拦截器 - 页面守卫
export function createPageGuard(router: Router) {
  // 进入路由前
  router.beforeEach(() => {
    // 开启进度条
    window.$loadingBar.start();
    return true;
  });
  // 进入路由后
  router.afterEach(() => {
    // 关闭进度条
    window.$loadingBar.finish();
    // 把滚动条回到顶部
    document.body.scrollTo(0, 0);
  });
}

// 创建路由守卫 - 路由守卫
// export function createPermissionGuard(router: Router) {
//   const token = false;
//   // 进入路由前
//   //  to到哪里去 from 从哪里来 next()放行 , 因为from没有用到，所以可以用_代表私有变量
//   router.beforeEach((to, _from, next) => {
//     // 白名单:不需要登陆就能进入的页面
//     if (to.path === '/login') {
//       if (token) {
//         next('/dashboard/worktable');
//         return;
//       } else {
//         next();
//         return;
//       }
//     } else if (to.path === '/404') {
//       next();
//       return;
//     } else {
//       //不在白名单中，需要登陆才能进入
//       //判断是否有token,有token就可以进入，如果没有token就跳转到登陆页面
//       if (token) {
//         next();
//         return;
//       } else {
//         next('/login');
//         return;
//       }
//     }
//   });
// }
// 白名单, 不需要权限的页面
const whitePathList = ['/login', '/404'];
export function createPermissionGuard(router: Router) {
  // 进入路由前
  router.beforeEach((to, _from, next) => {
    //使用 useUserStore 获取user-store模块
    const userStore = useUserStore();
    // 获取token
    const token = userStore.getToken;
    //如果前往的地址to.path 在白名单中，直接放行
    if (whitePathList.includes(to.path)) {
      if (to.path === '/login' && token) {
        next('/dashboard/worktable');
        return;
      } else {
        next();
        return;
      }
    } else {
      //不在白名单中，需要登陆才能进入
      //判断是否有token,有token就可以进入，如果没有token就跳转到登陆页面
      if (token) {
        // 如果前往的地址是 / , 就跳转到 /dashboard/worktable
        if (to.path === '/') {
          next('/dashboard/worktable');
          return;
        } else {
          next();
          return;
        }
      } else {
        next('/login');
        return;
      }
    }
  });
}
