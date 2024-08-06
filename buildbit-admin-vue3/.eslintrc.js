module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'vue/multi-word-component-names': 'warn',
    // TODO 11
    'vue/no-unused-components': 'warn',
    'no-unused-vars': 'warn',
  },
};
