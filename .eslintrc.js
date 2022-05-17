module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  rules: {
    'no-console': 0,
    'vue/no-v-html': 0,
    'no-prototype-builtins': 0,
    'no-return-assign': 0,
    'vue/no-duplicate-attributes': 0,
    'nuxt/no-cjs-in-config': 0,
    'vue/no-mutating-props': 0,
    'no-new': 0,
    "indent": ["error", 2, {
      "SwitchCase": 1
    }]
  },
  globals: {
    // returnCitySN
  }
}
