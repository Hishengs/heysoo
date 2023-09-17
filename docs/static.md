# Static 静态文件

<p class="hs-tip">
  静态文件功能默认不开启，你必须显式地在配置文件中开启它。
</p>

在 `config.js` 中：

```js
module.exports = {
  static: {
    enabled: true,
    path: "static", // 对应的映射路径
  },
};
```

## 使用

在静态文件目录下放置一张照片 `xxx.png`，打开浏览器 `http://localhost:86/static/xxx.png` 可以直接访问。

## 多个映射目录

通常在我们的项目中，静态文件一般统一放在一个目录下即可。如果你有多个静态目录映射的需求，同样可以满足：

```js
{
  ...,
  static: {
    enabled: true,
    map: {
      '/static1': 'static1',
      '/static2': 'static2',
    },
  },
}
```

如上，分别将 `/static1` 和 `/static2` 映射到 `static1` 和 `static2` 目录。
