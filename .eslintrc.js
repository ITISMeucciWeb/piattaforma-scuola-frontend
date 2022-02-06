module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "no-unused-vars": 0,
    "vue/multi-word-component-names": 0,
    "vue/no-mutating-props": 0
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
