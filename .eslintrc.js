module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    _: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/valid-v-slot': 'off',
  },
}