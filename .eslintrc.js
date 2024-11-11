const path = require('path');

module.exports = {
  // Configuration for JavaScript files
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  overrides: [
    // Configuration for TypeScript files
    {
      extends: [
        'plugin:perfectionist/recommended-natural-legacy',
        'plugin:tailwindcss/recommended',
        '@react-native-community',
        'plugin:prettier/recommended',
      ],
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['perfectionist', '@typescript-eslint', 'unused-imports', 'tailwindcss'],
      rules: {
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        '@typescript-eslint/no-unused-vars': 'off',
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        'max-lines-per-function': ['error', 70],
        'max-params': ['error', 3], // Limit the number of parameters in a function to use object instead
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            singleQuote: true,
          },
        ],
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'tailwindcss/classnames-order': [
          'warn',
          {
            officialSorting: true,
          },
        ], // Follow the same ordering as the official plugin `prettier-plugin-tailwindcss`
        'tailwindcss/no-custom-classname': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
      },
    },
    // Configuration for  translations files (i18next)
    {
      extends: ['plugin:i18n-json/recommended'],
      files: ['src/translations/*.json'],
      rules: {
        'i18n-json/identical-keys': [
          2,
          {
            filePath: path.resolve('./src/translations/en.json'),
          },
        ],
        'i18n-json/sorted-keys': [
          2,
          {
            indentSpaces: 2,
            order: 'asc',
          },
        ],
        'i18n-json/valid-json': 2,
        'i18n-json/valid-message-syntax': [
          2,
          {
            syntax: path.resolve('./scripts/i18next-syntax-validation.js'),
          },
        ],
        'prettier/prettier': [
          0,
          {
            endOfLine: 'auto',
            singleQuote: true,
          },
        ],
      },
    },
  ],
  plugins: ['unicorn'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
        ignore: ['/android', '/ios'],
      },
    ],
  },
};
