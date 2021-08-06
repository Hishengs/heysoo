module.exports = {
  "extends": "airbnb-base",
  "rules": {
    // 强制使用2个空格
    "indent": ["error", 2, {
      "SwitchCase": 1,
    }],
    // 不允许使用 tab
    "no-tabs": "warn",
    "strict": ["error", "safe"],
    // 要求块作用域花括号前后必须有空行
    "padded-blocks": "off",
    // 不允许下划线开头的命名方式
    "no-underscore-dangle": "off",
    // 不允许尾逗号
    "comma-dangle": "off",
    // 不允许单行多变量声明赋值
    "no-multi-assign": "off",
    // 要求关键字前有空格
    "keyword-spacing": "warn",
    // 推荐使用字符串模板代替普通字符串变量连接
    "prefer-template": "off",
    // 要求在全局作用域进行 require
    "global-require": "warn",
    // 强制即使是单行逻辑也使用花括号
    "curly": "off",
    // 不允许使用递增运算符
    "no-plusplus": "off",
    // 要求块作用域花括号前有空格
    "space-before-blocks": "warn",
    // 限制单行代码最大长度
    "max-len": ["warn", {
      "code": 150,
      "ignoreComments": true,
    }],
    // 属性冒号前后是否留空格
    "key-spacing": ["warn", {
      "beforeColon": false,
      "afterColon": true,
    }],
    // 要求注释前有空格
    "spaced-comment": "off",
    // 声明前提前使用变量
    "no-use-before-define": ["warn", {
      "functions": false,
    }],
    // 禁止对函数参数重赋值
    "no-param-reassign": "warn",
    // 要求匿名函数也要有名称
    "func-names": "off",
    // 函数、判断语句等之后第一个花括号位置风格
    "brace-style": "warn",
    // 换行风格：\n(Linux) 或者 \r\n(windows)
    "linebreak-style": "off",
    // 强制使用单引号或者双引号
    "quotes": "off",
    "no-restricted-properties": "warn",
    // 强制使用严格相等(===)代替宽松相等(==)
    "eqeqeq": "warn",
    // 不允许定义未使用的函数参数
    "no-unused-vars": "warn",
    // 最后一个 import 后必须跟一个空行
    "import/newline-after-import": "warn",
    "import/first": "off",
    "import/no-extraneous-dependencies": "off",
    // 强制 import 文件时省略文件扩展名
    "import/extensions": "off",
    // 不允许动态 require
    "import/no-dynamic-require": "off",
    // 优先使用 export default
    'import/prefer-default-export' : 'off',
    // 函数参数括号前有空格
    "space-before-function-paren": "off",
    // 箭头函数参数必须带圆括号
    "arrow-parens": "off",
    // 对象花括号必须留空格
    "object-curly-spacing": "warn",
    // 不允许多个空格留白
    "no-multi-spaces": ["warn", {
      "ignoreEOLComments": true,
    }],
    // 数组、对象解构赋值设置
    "prefer-destructuring": ["warn", {
      "VariableDeclarator": {
        "array": true,
        "object": true
      },
      "AssignmentExpression": {
        "array": false,
        "object": true
      }
    }, {
      "enforceForRenamedProperties": false
    }],
    // 提交的代码不允许有 debugger
    "no-debugger": "error",
    "no-lonely-if": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "warn",
    // 要求箭头函数体使用大括号
    "arrow-body-style": "off",
    // 禁止 if 语句中 return 语句之后有 else 块
    "no-else-return": "off",
    // 强制在parseInt()使用基数参数
    "radix": "off",
    // 不允许嵌套的三元运算符
    "no-nested-ternary": "off",
    // 使用箭头函数代替普通函数
    "prefer-arrow-callback": "off",
    // 对象简写
    "object-shorthand": "warn",
    // 强制对象花括号换行
    "object-curly-newline": "off",
    // 强制将对象的属性放在不同的行上
    'object-property-newline': "off",
    // 对象属性名推荐不使用引号
    'quote-props': 'warn',
    // 文件以空行结尾
    'eol-last': 'off',
    // 不允许写 console
    'no-console': 'off',
    // 不允许短路表达式
    'no-unused-expressions': 'off',
    // 推荐尽可能地使用点号引用对象属性
    'dot-notation': 'off',
    // 要求 switch 语句中有 default 分支
    'default-case': 'warn',
    // 行末尾不允许有多余的空格
    "no-trailing-spaces": 'warn',
    // 要求函数必须要有返回值
    "consistent-return": "warn",
    "no-self-compare": "off",
    "no-continue": "warn",
    "space-before-function-paren": "off",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "import/newline-after-import": "warn",
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": "warn",
    "arrow-body-style": "off",
    "no-else-return": "off",
    "no-shadow": "warn",
    "no-unneeded-ternary": "off",
    "class-methods-use-this": "off",
    "consistent-return": "warn",
    "no-param-reassign": "off",
    "global-require": "off",
    "prefer-object-spread": "off",
  }
};
