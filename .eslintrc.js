module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    requireConfigFile: false
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "off",
    "no-lonely-if": 0,
    "no-unused-vars": "off"
  }
};
