# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).


```shell
# init program
npm init vite@latest # 选择js框架，选择是否使用ts
cd program

# style
npm install --save-dev sass # 安装sass

# husky 代码提交规范
npm install --save-dev husky # 安装husky
git init # 初始化仓库
npx husky install # 初始化husky
npx husky add .husky/commit-msg "node scripts/verifyCommit.js" # 新增commit msg钩子
# commit之前eslint校验和test
npx husky add .husky/pre-commit "npm run lint"
npx husky add .husky/pre-commit "npm test"


# 代码校验
npm install eslint --save-dev # 安装eslint
npx eslint --init # 初始化eslint配置

# 单元测试
npm i -D jest @vue/vue3-jest @vue/test-utils # jest自动集成了babel-jest
npm i -D @babel/core @babel/preset-env # babel转换编译
npm i -D ts-jest @types/jest # jest ts
npm i -D jest-environment-jsdom # jest28开始，单独下载jsdom配置
npm i -D @babel/preset-typescript # babel ts
npm i -D eslint-plugin-jest # eslint jest 插件
npx ts-jest config:init # 初始化jest

# 表单验证
npm i async-validator
```

```json
{
  scripts: {
    "lint": "eslint --fix --ext .js.jsx.vue.ts.tsx src/",
    "test:collect": "jest --config jest.config.js --cache=false",
    "test": "jest --config jest.config.js --collectCoverage=false --cache=false",
    "test:update": "jest --config jest.config.js --cache=false -u",
  }
}
```

```js
// vite.config.js
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});

```

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }],
}

```

```js
// .eslintrc.js
const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

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
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
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

```

```js
// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom', // 用于操作dom
  transform: {
    // 不同文件使用不同测试插件
    // .vue使用 vue-jest处理
    '^.+\\.vue$': '@vue/vue3-jest',
    // .js或.jsx使用 babel-jest处理
    '^.+\\.jsx$': 'babel-jest',
    // .ts文件用  ts-jest处理
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/'], // 忽略测试地址
  collectCoverage: true, // 收集代码覆盖率
  coverageReporters: ['json', 'html'], // 返回收集显示类型
  // collectCoverageFrom: [
  //   'tests/**/*.ts',
  //   '!tests/type.test.tsx',
  //   '!tests/interface.{ts,tsx}',
  //   'src/**/*.{ts,tsx}',
  //   '!src/*/style/index.tsx',
  //   '!src/style/index.tsx',
  //   '!src/*/locale/index.tsx',
  //   '!src/*/__tests__/type.test.tsx',
  //   '!src/**/*/interface.{ts,tsx}',
  //   '!src/*/__tests__/image.test.{ts,tsx}',
  // ], // 收集表单
  // transformIgnorePatterns: ['/dist/'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'], // node默认 确保可使用 ESModule
    // customExportConditions: ['browser'], // jsdom默认
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  } 
};


```

```js
// babel.config.js

// 处理js ts
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript'
  ]
};
```