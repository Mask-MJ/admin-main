import { defHttp } from '@/api';
import type { RoleMenuTree } from './types/role.type';

// 获取角色列表
export function getRoleList(params?: any) {
  return defHttp.get({ url: 'system/role/list', params });
}

// 修改角色状态
export function setRoleStatus(params: any) {
  return defHttp.put({ url: 'system/role/changeStatus', params });
}

// 新增用户
export function addRole(params: any) {
  return defHttp.post({ url: 'system/role', params });
}

// 编辑用户
export function changeRole(params: any) {
  return defHttp.put({ url: 'system/role', params });
}
// 获取菜单权限列表
export const getRoleMenuTree = () =>
  defHttp.get<RoleMenuTree[]>({ url: '/system/menu/treeselect' });

// 获取对应的数据权限列表
export const getRoleUserMenuTree = (id: string) =>
  defHttp.get({ url: '/system/menu/roleMenuTreeselect/' + id });

// 删除角色
export const delRole = (id: string) => defHttp.delete({ url: '/system/role/' + id });
