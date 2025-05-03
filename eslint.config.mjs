import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    ignores: ['webpack*.js', 'babel.config.js'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended', eslintConfigPrettier],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'module' } },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['tests/*.test.js'],
    plugins: ['jest'],
    extends: ['plugin:jest/recommended'],
    env: {
      jest: true,
    },
  },
])
