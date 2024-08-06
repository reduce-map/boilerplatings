module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@babel/eslint-parser",
        sourceType: "module",
        ecmaVersion: 2020
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended"
    ],
    rules: {
        // Ваши кастомные правила
    },
    globals: {
        defineProps: "readonly",
        defineExpose: "readonly"
    }
};
