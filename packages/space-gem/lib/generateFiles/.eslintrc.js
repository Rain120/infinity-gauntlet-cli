module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: [
      'standard'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018
    },
    plugins: [
      '@typescript-eslint',
      'prettier'
    ],
    rules: {
      'no-var': 'error',
      'semi': ['error', 'always'],
      'indent': [ 'error', 2 ],
      'quotes': [ 'error', 'single' ],
      'no-extra-semi': 'error',
      'prettier/prettier': 'error',
      "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "never"
      }],
      "comma-dangle": ["error", {
        "arrays": "always-multiline",
        "exports": "always-multiline",
        "functions": "never",
        "imports": "always-multiline",
        "objects": "always-multiline",
      }]
    }
  }
  