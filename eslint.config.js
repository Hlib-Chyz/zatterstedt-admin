import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import json from 'eslint-plugin-json';

const ignores = [
    'dist/',
    'tmp/',
    'out-tsc/',
    'bazel-out/',
    'node_modules/',
    '.idea/',
    '.vscode/',
    '.history/',
    'coverage/',
    'coverage-ts/',
    'package-lock.json',
];

export default tseslint.config(
    {
        ignores,
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.eslint.json'],
            },
        },
        rules: {
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: {
                        memberTypes: [
                            // Index signature
                            'signature',
                            'call-signature',

                            // Fields
                            'public-static-field',
                            'protected-static-field',
                            'private-static-field',
                            '#private-static-field',

                            'public-decorated-field',
                            'protected-decorated-field',
                            'private-decorated-field',

                            'private-instance-field',
                            '#private-instance-field',
                            'public-instance-field',
                            'protected-instance-field',

                            'public-abstract-field',
                            'protected-abstract-field',

                            'private-field',
                            '#private-field',
                            'public-field',
                            'protected-field',

                            'static-field',
                            'instance-field',
                            'abstract-field',

                            'decorated-field',

                            'field',

                            // Static initialization
                            'static-initialization',

                            // Constructors
                            'public-constructor',
                            'protected-constructor',
                            'private-constructor',

                            'constructor',

                            // Accessors
                            'public-static-accessor',
                            'protected-static-accessor',
                            'private-static-accessor',
                            '#private-static-accessor',

                            'public-decorated-accessor',
                            'protected-decorated-accessor',
                            'private-decorated-accessor',

                            'public-instance-accessor',
                            'protected-instance-accessor',
                            'private-instance-accessor',
                            '#private-instance-accessor',

                            'public-abstract-accessor',
                            'protected-abstract-accessor',

                            'public-accessor',
                            'protected-accessor',
                            'private-accessor',
                            '#private-accessor',

                            'static-accessor',
                            'instance-accessor',
                            'abstract-accessor',

                            'decorated-accessor',

                            'accessor',

                            // Getters
                            'public-static-get',
                            'protected-static-get',
                            'private-static-get',
                            '#private-static-get',

                            'public-decorated-get',
                            'protected-decorated-get',
                            'private-decorated-get',

                            'public-instance-get',
                            'protected-instance-get',
                            'private-instance-get',
                            '#private-instance-get',

                            'public-abstract-get',
                            'protected-abstract-get',

                            'public-get',
                            'protected-get',
                            'private-get',
                            '#private-get',

                            'static-get',
                            'instance-get',
                            'abstract-get',

                            'decorated-get',

                            'get',

                            // Setters
                            'public-static-set',
                            'protected-static-set',
                            'private-static-set',
                            '#private-static-set',

                            'public-decorated-set',
                            'protected-decorated-set',
                            'private-decorated-set',

                            'public-instance-set',
                            'protected-instance-set',
                            'private-instance-set',
                            '#private-instance-set',

                            'public-abstract-set',
                            'protected-abstract-set',

                            'public-set',
                            'protected-set',
                            'private-set',
                            '#private-set',

                            'static-set',
                            'instance-set',
                            'abstract-set',

                            'decorated-set',

                            'set',

                            // Methods
                            'public-static-method',
                            'protected-static-method',
                            'private-static-method',
                            '#private-static-method',

                            'public-decorated-method',
                            'protected-decorated-method',
                            'private-decorated-method',

                            'public-instance-method',
                            'protected-instance-method',
                            'private-instance-method',
                            '#private-instance-method',

                            'public-abstract-method',
                            'protected-abstract-method',

                            'public-method',
                            'protected-method',
                            'private-method',
                            '#private-method',

                            'static-method',
                            'instance-method',
                            'abstract-method',

                            'decorated-method',

                            'method',
                        ],
                    },
                },
            ],
            '@typescript-eslint/ban-ts-comment': ['error', { minimumDescriptionLength: 10 }],
            '@typescript-eslint/no-array-constructor': 'error',
            '@typescript-eslint/no-duplicate-enum-values': 'error',
            '@typescript-eslint/no-empty-object-type': 'error',
            '@typescript-eslint/no-extra-non-null-assertion': 'error',
            '@typescript-eslint/no-misused-new': 'error',
            '@typescript-eslint/no-namespace': 'error',
            '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
            '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-this-alias': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-unsafe-declaration-merging': 'error',
            '@typescript-eslint/no-unsafe-function-type': 'error',
            '@typescript-eslint/no-unused-expressions': 'error',
            '@typescript-eslint/no-useless-constructor': 'error',
            '@typescript-eslint/no-wrapper-object-types': 'error',
            '@typescript-eslint/prefer-as-const': 'error',
            '@typescript-eslint/prefer-namespace-keyword': 'error',
            '@typescript-eslint/triple-slash-reference': 'error',
            'no-array-constructor': 'off',
            'no-useless-constructor': 'off',
            'no-return-await': 'error',
            'no-useless-catch': 'error',
            'no-unused-labels': 'error',
            'no-unneeded-ternary': 'error',
            'no-undefined': 'error',
            'no-undef-init': 'error',
            'no-regex-spaces': 'error',
            'no-proto': 'error',
            'no-new-wrappers': 'error',
            'no-unused-private-class-members': 'error',
            'no-invalid-regexp': 'error',
            curly: ['error', 'all'],
            '@typescript-eslint/restrict-template-expressions': 'error',
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/adjacent-overload-signatures': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            'no-console': ['warn'],
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
            'no-unused-vars': 'off',
            'no-duplicate-imports': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-invalid-void-type': 'error',
            '@typescript-eslint/indent': 0,
            '@typescript-eslint/member-delimiter-style': 0,
            '@typescript-eslint/no-var-requires': 0,
            '@typescript-eslint/no-use-before-define': 0,
            'prefer-const': 1,
            'prefer-spread': 1,
            'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: true,
                    },
                },
            ],
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/prefer-default-export': 'off',
            'no-underscore-dangle': 'off',
            'class-methods-use-this': 'off',
            'lines-between-class-members': [
                'error',
                {
                    enforce: [
                        { blankLine: 'never', prev: 'field', next: 'field' },
                        { blankLine: 'always', prev: 'field', next: 'method' },
                        { blankLine: 'always', prev: 'method', next: 'method' },
                    ],
                },
            ],
            'no-return-assign': 'off',
            'no-param-reassign': [
                'error',
                {
                    props: false,
                },
            ],
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                {
                    assertionStyle: 'as',
                },
            ],
            'no-plusplus': ['off'],
            '@typescript-eslint/unbound-method': 'off',
            'import/no-cycle': 'off',
            'import/extensions': 'off',
            '@angular-eslint/no-output-on-prefix': 'off',
            '@typescript-eslint/adjacent-overload-signatures': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['../*', './*'],
                },
            ],
        },
    },
    {
        files: ['**/*.js'],
        extends: [eslint.configs.recommended],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
            },
        },
        rules: {},
    },
    {
        files: ['**/*.json'],
        extends: [json.configs.recommended],
        rules: {},
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {
            '@angular-eslint/template/click-events-have-key-events': 'off',
            '@angular-eslint/template/interactive-supports-focus': 'off',
            '@angular-eslint/template/label-has-associated-control': 'off',
            '@angular-eslint/template/elements-content': 'off',
        },
    }
);
