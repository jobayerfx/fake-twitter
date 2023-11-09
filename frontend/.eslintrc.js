module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 'latest'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:nuxt/recommended',
    'plugin:vuetify/recommended'
  ],
  rules: {
    camelcase: 'off',
    'no-console': 'warn',
    'max-len': [
      'error',
      {
        code: 80,
        ignorePattern: 'class="([\\s\\S]*?)"|d="([\\s\\S]*?)"', // ignore classes or svg draw attributes
        ignoreUrls: true
      }
    ],
    'no-useless-escape': 'off',
    'space-before-function-paren': ['error', 'never'],
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off'
    // 'vue/no-template-shadow': 'off',
    // 'no-debugger': 'off',
    // 'no-mixed-spaces-and-tabs': 'off',
    // 'vue/no-lone-template': 'off',
    // 'no-async-promise-executor': 'off',
    // 'no-prototype-builtins': 'off',
  }
}
