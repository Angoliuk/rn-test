module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@env': './src/core/env.js',
          },
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          root: ['./'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
  };
};
