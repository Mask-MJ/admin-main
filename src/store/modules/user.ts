import { defineStore } from 'pinia';

// 定义user-store用户模块
export const useUserStore = defineStore('user-store', {
  // 设置user 的 state
  state: () => ({
    // 设置token , 默认值为空字符串
    // token: '',
    // 使用vueuse的useStorage方法, 传入key和默认值, 返回一个ref响应式对象 , 用于存储token且在localStorage中存储
    // 使用useStorage函数调用, 传入TOKEN作为key, 空字符串为默认值
    // 如果localStorage中有TOKEN, 则使用localStorage中的TOKEN, 否则使用默认值
    token: useStorage('TOKEN__', ''),
  }),
  getters: {
    // 获取token
    getToken: (state) => {
      return state.token;
    },
  },
  actions: {
    // 设置token
    // 在点击登录按钮时, 调用setToken方法, 传入参数token1并且类型是string , 将token1赋值给token且token为响应式数据
    setToken(token1: string) {
      this.token = token1;
    },
  },
});
