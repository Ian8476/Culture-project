import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // R1 / R9: el any rompe el tipado fuerte del dominio
      '@typescript-eslint/no-explicit-any': 'error',
      // Convención de imports: import type cuando solo es tipo
      '@typescript-eslint/consistent-type-imports': 'error',
      // R2: Zero Magic Numbers
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'warn',
        {
          ignore: [0, 1, -1],
          ignoreEnums: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true,
          ignoreArrayIndexes: true,
        },
      ],
    },
  },
  {
    // Scripts y configs no participan de las reglas de magic numbers de dominio
    files: ['scripts/**/*.ts', '*.config.{ts,mjs,js}'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },
  eslintConfigPrettier,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'coverage/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
