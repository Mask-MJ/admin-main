// 判断是否生产环境
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

// 定义一个类型，用于存储环境变量
export interface GlobEnvConfig {
  // 项目名称
  VITE_GLOB_APP_TITLE: string;
  // 全局接口地址
  VITE_GLOB_API_URL: string;
  // 全局接口地址前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 上传地址
  VITE_GLOB_UPLOAD_URL?: string;
}

// getAppEnvConfig 函数用于获取环境变量
export function getAppEnvConfig(): GlobEnvConfig {
  // import.meta.env是一个全局变量，用于获取环境变量
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = import.meta.env;

  // 判断环境变量是否存在
  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      'VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.',
    );
  }

  // 返回环境变量
  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}
