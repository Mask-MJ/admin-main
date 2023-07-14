//全局挂载的方法
interface Window {
  $loadingBar: import('naive-ui').LoadingBarProviderInst;
  $dialog: import('naive-ui').DialogProviderInst;
  $message: import('naive-ui').MessageProviderInst;
  $notification: import('naive-ui').NotificationProviderInst;
}
// axios 的类型定义文件
declare type Recordable<T = any> = Record<string, T>;
declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
