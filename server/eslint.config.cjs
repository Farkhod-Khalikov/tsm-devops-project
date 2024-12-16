const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const jsConfigs = require('@eslint/js').configs;
const tsConfigs = require('@typescript-eslint/eslint-plugin').configs;
const jestPlugin = require('eslint-plugin-jest');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // ignore files and dirs for linting
  {
    ignores: ['dist/**', 'eslint.config.cjs', 'jest.config.js'],
  },
  // Base configuration for JavaScript and TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Apply to JS and TS files
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        tsconfigRootDir: process.cwd(),
        project: ['./tsconfig.json'], // Specify TypeScript project
      },
      globals: {
        ...globals.node, // Add Node.js-specific globals
        ...globals.browser, // Browser globals if applicable
      },
    },
    rules: {
      'no-undef': 'error', // Error on undefined variables
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused vars
      eqeqeq: ['error', 'always'], // Require === and !==
      'no-console': 'off', // Warn for console usage
      'no-empty': ['warn', { allowEmptyCatch: true }], // Allow empty catches
      semi: ['error', 'always'], // Require semicolons
      quotes: ['error', 'single', { avoidEscape: true }], // Enforce single quotes
      indent: ['error', 2, { SwitchCase: 1 }], // 2 spaces, case indented
      'comma-dangle': ['error', 'always-multiline'], // Trailing commas for multiline
    },
  },

  // Apply JavaScript recommended rules
  {
    rules: {
      ...jsConfigs.recommended.rules,
    },
  },

  // Apply TypeScript recommended rules
  {
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsConfigs.recommended.rules,
    },
  },

  // Jest-specific rules for test files
  {
    files: ['**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: {
        ...globals.jest, // Jest-specific globals
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules, // Apply recommended Jest rules
      'jest/no-disabled-tests': 'warn', // Warn on disabled tests
      'jest/no-focused-tests': 'error', // Prevent focused tests in commits
      'jest/no-identical-title': 'error', // Unique test titles
      'jest/prefer-to-have-length': 'warn', // Encourage use of toHaveLength()
      'jest/valid-expect': 'error', // Validate expect() usage
    },
  },
];
