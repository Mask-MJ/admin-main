import type { App } from 'vue';
import type { Locale } from 'vue-i18n';
import { createI18n } from 'vue-i18n';

// 创建i18n实例
export const i18n = createI18n({
  legacy: false, // legacy模式下，VueI18n 会自动将你的语言标识符转换为小写
  locale: '', // locale默认值
  messages: {}, // messages 默认值
});

//定义一个对象，用于存储所有的语言包
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('./lang/*.yml')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.yml$/)?.[1],
    loadLocale,
  ]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>;

// availableLocales 用于存储所有的语言包的key
export const availableLocales = Object.keys(localesMap);

// loadedLanguages 用于存储已经加载过的语言包的key
const loadedLanguages: string[] = [];

// setI18nLanguage 函数用于设置当前语言
function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any;
  if (typeof document !== 'undefined') document.querySelector('html')?.setAttribute('lang', lang);
  return lang;
}

// loadLanguageAsync 函数用于加载语言包
export async function loadLanguageAsync(lang: string): Promise<Locale> {
  //如果当前语言和要加载的语言相同，则直接返回
  if (i18n.global.locale.value === lang) return setI18nLanguage(lang);

  //如果当前语言已经加载过了，则直接返回
  if (loadedLanguages.includes(lang)) return setI18nLanguage(lang);

  // 如果当前语言没有加载过，则加载当前语言
  const messages = await localesMap[lang]();
  i18n.global.setLocaleMessage(lang, messages.default);
  loadedLanguages.push(lang);
  return setI18nLanguage(lang);
}

// setupI18n 函数用于设置i18n
export function setupI18n(app: App) {
  app.use(i18n);
  loadLanguageAsync('zh-CN');
}
