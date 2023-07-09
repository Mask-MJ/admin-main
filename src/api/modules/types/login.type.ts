//定义菜单列表的数据类型
export interface LoginMenuList {
  alwaysShow: boolean;
  children: LoginMenuList[];
  component: string;
  hidden: boolean;
  id: string;
  meta: {
    icon: string;
    link: string;
    noCache: boolean;
    title: string;
  };
  name: string;
  parentId: string;
  path: string;
  redirect: string;
}
