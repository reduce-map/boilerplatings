module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/recommended',
        '@vue/prettier'
    ],
    rules: {
        // "indent": ["warn", 4],
        "vue/html-indent": ["warn", 4],
        // "vue/script-indent": ["warn", 4],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
