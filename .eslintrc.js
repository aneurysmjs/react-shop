require('@babel/register')

module.exports = {
  env: {
    browser: true
  },
  parserOptions: {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  parser: "babel-eslint",
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack-config/index.js"
      }
    },
    "react": {
      "version": "detect",
      "flow": "0.97.0"
    }
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  plugins: [
    "import",
    "flowtype",
    "react"
  ],
  rules: {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "semi": ["error", "always"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
  }
};
