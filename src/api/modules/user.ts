import { defHttp } from '@/api';
import type { RoleStatus } from './types/user.type';
// 获取用户列表
export function getUserList(params?: any) {
  return defHttp.get({ url: 'system/user/list', params });
}
// 修改用户状态
export function setRoleStatus(params: RoleStatus) {
  return defHttp.put({ url: 'system/user/changeStatus', params });
}
// 新增用户
export function addUser(params: any) {
  return defHttp.post({ url: 'system/user', params });
}
// 删除用户
export function delUser(userIds: string) {
  return defHttp.delete({ url: `system/user/${userIds}` });
}
// 修改用户密码
export function changePwd(params: { userId: string; password: string }) {
  return defHttp.put({ url: 'system/user/resetPwd', params });
}
