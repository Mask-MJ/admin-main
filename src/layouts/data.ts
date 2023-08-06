// 定义layout顶部栏的icon数据
export const headerLists = [
  {
    hoverName: '搜索',
    icon: 'i-ant-design:search-outlined',
  },
  {
    hoverName: 'github',
    icon: 'i-ant-design:github-outlined',
  },
  {
    hoverName: '全屏',
    icon: 'i-ant-design:fullscreen-outlined',
  },
  {
    hoverName: '主题模式',
    icon: 'i-ant-design:smile-outlined',
  },
];

// 定义layout顶部栏的icon数据
export const options = [
  {
    label: '中文',
    key: 'China',
  },
  {
    label: 'English',
    key: 'English',
  },
];

// 定义layout顶部栏的icon数据
export const userOptions = [
  {
    label: '个人中心',
    key: 'userCenter',
    icon: () => h('i', { class: 'i-ant-design:user-outlined' }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('i', { class: 'i-ant-design:logout-outlined ' }),
  },
];
// 定义layout顶部左边栏数据
// export const options1 = [
//   {
//     label: 'David Tao',
//     key: 1,
//   },
//   {
//     label: '黑色柳丁',
//     key: 2,
//   },
// ];
// export const options2 = [
//   {
//     label: '小镇姑娘',
//     key: 1,
//   },
//   {
//     label: '普通朋友',
//     key: 2,
//   },
// ];

/** 过渡动画类型 */
export enum EnumThemeAnimateMode {
  'zoom-fade' = '渐变',
  'zoom-out' = '闪现',
  'fade-slide' = '滑动',
  'fade' = '消退',
  'fade-bottom' = '底部消退',
  'fade-scale' = '缩放消退',
}
