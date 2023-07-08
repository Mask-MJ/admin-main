import type { GlobalThemeOverrides } from 'naive-ui';
import { addColorAlpha, getColorPalette } from '@/utils/color';

type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active';
type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error';
type ColorKey = `${ColorType}Color${ColorScene}`;
type ThemeColor = Partial<Record<ColorKey, string>>;
interface ColorAction {
  scene: ColorScene;
  handler: (color: string) => string;
}

// 获取生成后的色阶 , 拼接成对应的naiveUI的主题颜色配置
function getThemeColors(colors: [ColorType, string][]) {
  // console.log(colors);
  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getColorPalette(color, 5) },
    { scene: 'Pressed', handler: (color) => getColorPalette(color, 7) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) },
  ];

  // 定义一个空对象 , 接收拼接后的naiveUI的主题颜色配置
  const themeColors: ThemeColor = {};

  // 遍历colors, 拼接成对应的naiveUI的主题颜色配置
  colors.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color;
      const colorKey: ColorKey = `${colorType}Color${action.scene}`;
      themeColors[colorKey] = action.handler(colorValue);
    });
  });

  return themeColors;
}

/** 获取naive的五种主题颜色对应的色阶, 并按照对应的格式输出 */
export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
  // console.log(colors);
  const { primary, success, warning, error, info } = colors;
  const themeColor = getThemeColors([
    ['primary', primary],
    ['info', info],
    ['success', success],
    ['warning', warning],
    ['error', error],
  ]);

  const colorLoading = primary;

  return {
    common: {
      ...themeColor,
    },
    LoadingBar: {
      colorLoading,
    },
  };
}
