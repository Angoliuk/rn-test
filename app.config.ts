/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';

import { ClientEnv, Env } from './env';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: '#2E3C4B',
      foregroundImage: './assets/adaptive-icon.png',
    },
    package: Env.PACKAGE,
  },
  assetBundlePatterns: ['**/*'],
  description: `${Env.NAME} Mobile App`,
  experiments: {
    typedRoutes: true,
  },
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
  icon: './assets/icon.png',
  ios: {
    bundleIdentifier: Env.BUNDLE_ID,
    supportsTablet: true,
  },
  name: Env.NAME,
  orientation: 'portrait',
  owner: Env.EXPO_ACCOUNT_OWNER,
  plugins: [
    [
      'expo-font',
      {
        fonts: ['./assets/fonts/Inter.ttf'],
      },
    ],
    'expo-localization',
    'expo-router',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.7.22', // this is for softinput package
        },
      },
    ],
    [
      'app-icon-badge',
      {
        badges: [
          {
            color: 'white',
            text: Env.APP_ENV,
            type: 'banner',
          },
          {
            color: 'white',
            text: Env.VERSION.toString(),
            type: 'ribbon',
          },
        ],
        enabled: Env.APP_ENV !== 'production',
      },
    ],
  ],
  scheme: Env.SCHEME,
  slug: 'obytesapp',
  splash: {
    backgroundColor: '#2E3C4B',
    image: './assets/splash.png',
    resizeMode: 'cover',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  userInterfaceStyle: 'automatic',
  version: Env.VERSION.toString(),
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
});
