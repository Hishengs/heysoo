<p class="tip">
  静态文件功能默认不开启，你必须显式地在配置文件中开启它。
</p>

## 配置
在 `config.js` 中：
```js
module.exports = {
  static: {
    enabled: true,
    path: 'static', // 对应的映射路径
  },
}
```