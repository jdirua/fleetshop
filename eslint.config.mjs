
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import { resolve } from 'path';

export default [
  next,
  prettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: resolve(process.cwd(), 'tsconfig.json'),
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
