import { defHttp } from '@/api';

export function getCode() {
  return defHttp.get({ url: 'code' });
}
