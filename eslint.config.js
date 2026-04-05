
const { FlatCompat } = require("@eslint/eslintrc");
const nextPlugin = require("@next/eslint-plugin-next");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");

const compat = new FlatCompat();

module.exports = [
    {
        ignores: [
            ".next/**",
            "node_modules/**",
            "out/**",
        ]
    },
    {
        files: ['**/*.{js,jsx,mjs}'],
        plugins: {
            "@next/next": nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs["core-web-vitals"].rules,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            }
        }
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
        }
    },
    ...compat.extends("eslint-config-prettier").map(config => ({ ...config, files: ['**/*.{js,jsx,ts,tsx}'] })),
];
