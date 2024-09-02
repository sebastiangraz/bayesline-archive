import js from '@eslint/js';
import sort from 'eslint-plugin-sort-exports';
import reactrefresh from 'eslint-plugin-react-refresh';
import hooks from 'eslint-plugin-react-hooks';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.tsx', 'src/**/*.ts'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      sort,
      hooks,
      tseslint,
      reactrefresh
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'tseslint/no-unused-vars': 'off',
      'hooks/rules-of-hooks': 'off',
      'hooks/exhaustive-deps': 'warn',
      'sort/sort-exports': 'error',
      'reactrefresh/only-export-components': 'warn'
      // "react-hooks/exhaustive-deps": "off", TODO: remove this later when react-eslint-plugin supports exhaustive-deps
    }
  }
];
