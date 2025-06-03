// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPromise from 'eslint-plugin-promise';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  globalIgnores(['**/node_modules', '**/dist', '**/build', '**/webpack.config.cjs']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      'jsx-quotes': ['warn', 'prefer-double'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          name: 'react-i18next',
          message:
            'Please use custom `hooks/useTranslation` instead of `react-i18next` directly.',
        },
      ],
    },
  },
);
