// const DOMGlobals = ['window', 'document'];
// const NodeGlobals = ['module', 'require'];

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser', // Parsing error: '＞' expected
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'jest'],
  rules: {
    // 'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'arrow-parens': ['error', 'always'],
    // vue相关
    'vue/multi-word-component-names': 0, // 不校验单个单词组件
  },
  overrides: [
    // 不校验入口文件的comment问题（本身也没问题）
    {
      files: ['./index.html'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
  ],
};