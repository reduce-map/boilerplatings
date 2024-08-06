// https://github.com/vuejs/eslint-plugin-vue

module.exports = {
    // https://eslint.org/docs/user-guide/configuring#using-configuration-files-1
    // ESLint will automatically look for them in the directory of the file to be linted, and in successive
    // parent directories all the way up to the root directory of the filesystem (unless root: true is specified)
    root: true,

    // https://eslint.org/docs/2.0.0/developer-guide/working-with-plugins#environments-in-plugins
    env: {
        node: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
        'plugin:vue/recommended',
        '@vue/prettier',
    ],

    // https://github.com/vuejs/eslint-plugin-vue/tree/master/docs/rules
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // rules indentation
        'vue/script-indent': ['off', 4, { baseIndent: 0 }], // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/script-indent.md
        'vue/html-indent': [
            'off',
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ], // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-indent.md#wrench-options
        indent: ['warn', 4],
        semi: [2, 'never'], // https://eslint.org/docs/1.0.0/rules/semi

        // rules to write better code
        'getter-return': 'error', // https://eslint.org/docs/rules/getter-return
        eqeqeq: 'error', // https://eslint.org/docs/rules/eqeqeq
        'no-compare-neg-zero': 'error', // https://eslint.org/docs/rules/no-compare-neg-zero
    },

    // https://github.com/mysticatea/vue-eslint-parser#-options
    parserOptions: {
        parser: 'babel-eslint',
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
