import { defineStore } from 'pinia';
import { getNaiveThemeOverrides } from '../helper/theme-helper';

// 定义theme-store主题模块
export const useThemeStore = defineStore('theme-store', {
  // state: () => ({
  //   // 设置主题色
  //    themeColor: {
  //     primary: '#1890ff',
  //     info: '#2080f0',
  //     success: '#52c41a',
  //     warning: '#faad14',
  //     error: '#f5222d',
  //   },
  // }),

  state: () => ({
    // 设置主题色
    // 使用vueuse的useStorage方法, 传入key和默认值, 返回一个ref对象 , 用于存储主题色 , 且在localStorage中存储
    // 使用useStorage函数调用, 传入THEME_COLOR作为key, 主题色这个对象为默认值
    // 如果localStorage中有THEME_COLOR, 则使用localStorage中的THEME_COLOR, 否则使用默认值
    themeColor: useStorage('THEME_COLOR', {
      primary: '#1890ff',
      info: '#2080f0',
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
    }),
  }),

  getters: {
    getPrimaryColor: (state) => {
      return state.themeColor.primary;
    },
    // 获取主题色
    getThemeColor: (state) => {
      // 调用getNaiveThemeOverrides方法, 获取naive的主题颜色 , 传入state.themeColor这五种颜色 , 返回这五种颜色对应的主题色阶
      // console.log(getNaiveThemeOverrides(state.themeColor)); // { common: { primaryColor: '#1890ff', primaryColorSuppl: '#1890ff', primaryColorHover: '#40a9ff', primaryColorPressed: '#096dd9', primaryColorActive: 'rgba(24, 144, 255, 0.1)' }, LoadingBar: { colorLoading: '#1890ff' } }
      return getNaiveThemeOverrides(state.themeColor);
    },
  },
  actions: {},
});
