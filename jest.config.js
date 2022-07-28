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
