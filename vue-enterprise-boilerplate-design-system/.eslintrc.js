module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'script',
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
        'plugin:vue/recommended',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard',
        // https://github.com/prettier/eslint-config-prettier
        'prettier',
        'prettier/standard',
    ],
    rules: {
        // Only allow debugger in development
        'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
        // Only allow `console.log` in development
        'no-console': process.env.PRE_COMMIT
            ? ['error', { allow: ['warn', 'error'] }]
            : 'off',

        'vue/multiline-html-element-content-newline': 'error',
        'vue/singleline-html-element-content-newline': 'error',
        'vue/no-spaces-around-equal-signs-in-attribute': 'error',

        // rules indentation
        'vue/script-indent': ['off', 4, { baseIndent: 0 }], // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md
        'vue/html-indent': ['off', 4], // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-indent.md#wrench-options
        semi: [2, 'never'], // https://eslint.org/docs/1.0.0/rules/semi

        // rules to write better code
        'getter-return': 'error', // https://eslint.org/docs/rules/getter-return
        eqeqeq: 'error', // https://eslint.org/docs/rules/eqeqeq
        'no-compare-neg-zero': 'error', // https://eslint.org/docs/rules/no-compare-neg-zero
    },
    overrides: [
        {
            files: ['src/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
            excludedFiles: 'app.config.js',
            parserOptions: {
                parser: 'babel-eslint',
                sourceType: 'module',
            },
            env: {
                browser: true,
            },
        },
        {
            files: ['**/*.unit.js'],
            parserOptions: {
                parser: 'babel-eslint',
                sourceType: 'module',
            },
            env: { jest: true },
            globals: {
                mount: false,
                shallowMount: false,
                shallowMountView: false,
                createComponentMocks: false,
                createModuleStore: false,
            },
        },
    ],
}
