/**
 * @see https://github.com/vercel/next.js/issues/64409
 */

import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginReadableTailwind from 'eslint-plugin-readable-tailwind';
// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsEslint from 'typescript-eslint';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
});

const pluginsToPatch = [
  '@next/next',
  // Other plugins to patch, example :
  'react',
  'react-hooks',
];

const compatConfig = [...compat.extends('next/core-web-vitals')];

const patchedConfig = compatConfig.map((entry) => {
  const plugins = entry.plugins;

  for (const key in plugins) {
    if (Object.prototype.hasOwnProperty.call(plugins, key) && pluginsToPatch.includes(key)) {
      plugins[key] = fixupPluginRules(plugins[key]);
    }
  }

  return entry;
});

const config = [...patchedConfig, { ignores: ['.next/*'] }];

export default tsEslint.config(
  eslint.configs.recommended,
  prettierRecommended,
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  ...config,
  {
    ignores: ['node_modules', 'playwright-report'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      parser: tsEslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
  },
  {
    files: [
      'eslint.config.mjs',
      'next.config.mjs',
      'prettier.config.mjs',
      'postcss.config.mjs',
      'playwright-report/**/**',
    ],
    ...tsEslint.configs.disableTypeChecked,
  },
  {
    files: ['**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'readable-tailwind': eslintPluginReadableTailwind,
      perfectionist,
    },
    rules: {
      // enable all recommended rules to warn
      ...eslintPluginReadableTailwind.configs.warning.rules,
      // enable all recommended rules to error
      ...eslintPluginReadableTailwind.configs.error.rules,

      // or configure rules individually
      // 'readable-tailwind/multiline': ['warn', { printWidth: 100 }],

      //

      '@typescript-eslint/no-import-type-side-effects': 'error',
      //
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-union-types': ['error'],
      'perfectionist/sort-objects': ['error'],
      'perfectionist/sort-intersection-types': ['error'],
      'perfectionist/sort-sets': ['error'],
    },
  },
);
