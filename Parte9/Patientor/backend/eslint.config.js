import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['**/dist/**', '**/node_modules/**'] },

    // JS Config
    {
        files: ['**/*.js'],
        extends: [js.configs.recommended],
        languageOptions: {
            globals: globals.node,
        }
    },

    // TS Config
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // '@typescript-eslint/semi': ['error'], // Causes crash in this environment
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/restrict-plus-operands': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],
            'no-case-declarations': 'off',
        },
    },
);