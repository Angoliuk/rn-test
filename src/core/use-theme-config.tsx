import type { Theme } from '@react-navigation/native';

import colors from '@/ui/colors';
import { DarkTheme as _DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    background: colors.charcoal[950],
    border: colors.charcoal[500],
    card: colors.charcoal[850],
    primary: colors.primary[200],
    text: colors.charcoal[100],
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
    primary: colors.primary[400],
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
