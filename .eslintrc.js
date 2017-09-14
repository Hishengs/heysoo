module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "indent": ["warn", 2],
    "no-tabs": ["off"],
    "strict": ["error", "safe"],
    "no-console": ["error",{
      "allow": ["log", "info", "warn", "error"]
    }],
    "linebreak-style": ["error", "windows"],
    "padded-blocks": ["off"],
    "no-underscore-dangle": ["off"],
    // "no-underscore-dangle":  ["warn", {
    //   "allowAfterThis": true
    // }],
    "comma-dangle": ["off", "always"],
    "no-multi-assign": ["off"],
    "keyword-spacing": ["off"],
    "prefer-template": ["off"],
    "global-require": ["off"],
    "import/no-dynamic-require": ["off"],
    "curly": ["off"],
    "no-plusplus": ["off"],
    "space-before-blocks": ["off"],
    "max-len": ["off"],
    "key-spacing": ["off"],
    "spaced-comment": ["off"],
    "no-use-before-define": ["off"],
    "no-param-reassign": ["off"],
    "func-names": ["warn","never"],
    "brace-style": ["off"],
    "arrow-body-style": ["error", "always"],
    // prefer
    "prefer-destructuring": ["warn", {
      "array": true,
      "object": true
    }]
  }
};
