import { defineStore } from 'pinia';
import { getNaiveThemeOverrides } from '../helper/theme-helper';

// 定义theme-store主题模块
export const useThemeStore = defineStore('theme-store', {
  state: () => ({
    // 设置主题色
    themeColor: {
      primary: '#1890ff',
      info: '#2080f0',
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
    },
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
