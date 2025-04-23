import path from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import pluginJs from '@eslint/js';
import parser from '@typescript-eslint/parser';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                module: 'readonly',
                __dirname: 'readonly',
                ym: 'readonly',
            },
            parser: parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                tsconfigRootDir: __dirname,
                project: [path.join(__dirname, 'tsconfig.eslint.json')],
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            'no-unused-vars': 'error',
            'object-shorthand': ['error', 'always'],
            curly: ['error', 'all'],
            'no-redeclare': 'error',
            quotes: ['error', 'single'],
            'keyword-spacing': [
                'error',
                {
                    before: true,
                    after: true,
                },
            ],
            eqeqeq: ['error', 'always'],
            'no-unreachable': 'error',
            'prefer-const': [
                'error',
                {
                    destructuring: 'all',
                    ignoreReadBeforeAssign: false,
                },
            ],
        },
        ignores: [
            'eslint.config.js',
            'prettier.config.js',
            'stylelint.config.js',
            'vite.config.ts',
            'src/firebase.ts',
        ],
    },
    pluginJs.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                tsconfigRootDir: __dirname,
                project: [path.join(__dirname, 'tsconfig.eslint.json')],
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTypescript,
            react,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['error'],
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
        },
        ignores: [
            'eslint.config.js',
            'prettier.config.js',
            'stylelint.config.js',
            'vite.config.ts',
            'src/firebase.ts',
        ],
    },
];
