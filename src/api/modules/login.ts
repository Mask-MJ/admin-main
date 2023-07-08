import { defHttp } from '@/api';

// 获取验证码
export function getCode() {
  // url是相对路径,会根据proxy自动拼接baseURL
  return defHttp.get({ url: 'code' });
}

// 获取登陆token
export function login(data: any) {
  // url是相对路径,会根据proxy自动拼接baseURL
  return defHttp.post({ url: 'system/token/login', data });
}
