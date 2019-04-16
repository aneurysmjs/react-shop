const paths = require('./config/paths');

module.exports = {
  parserOptions: {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  parser: "babel-eslint",
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  plugins: [
    "flowtype",
    "react"
  ],
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"]
  }
};
