# View 模板

<p class="hs-tip">
  模板功能默认不开启，你必须显式地在配置文件中开启它。
</p>

模板使用 [`koa-views`](https://github.com/queckezz/koa-views) 实现，支持多种模板引擎

详见：https://github.com/queckezz/koa-views

框架本身默认使用 `nunjucks` 作为模板引擎。

## 配置

在 `config.js` 中：

```js
module.exports = {
  view: {
    enabled: true,
  },
};
```

即可启用。

## 使用

在 `controller` 方法中，可以使用 `this.ctx.render` 或者 `this.ctx.display` 方法渲染对应的页面。

```js
module.exports = (app) => {
  class HomeController extends app.Controller {
    constructor() {
      super();
    }

    async index() {
      await this.ctx.render("index.html", { name: "Heysoo" });
    }
  }

  return HomeController;
};
```

> 注意，render 是一个异步操作函数，所以记得加上 await。

`index.html`

```js
<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <h1>{{ name }}</h1>
  </body>
</html>
```

## 修改配置

如果你不想使用默认的 `nunjucks` 模板引擎，或者想设置更详细的配置，可以通过在配置文件中配置 `root` 和 `opts` 参数：

```js
module.exports = {
  view: {
    enabled: true,
    root: "", // view 文件夹目录
    opts: {}, // 其他详细配置，见 https://github.com/queckezz/koa-views#api
  },
};
```

这里的参数基于 `koa-views` 的文档说明，详见：https://github.com/queckezz/koa-views#api

> 注意，修改其他模板引擎后需要先安装该模板引擎依赖包。

## 模板变量

框架默认会向模板传入 `ctx` 实例变量。
你也可以传入自己的变量到模板中：

```js
await this.ctx.render("index.html", { user: "Jack" });
```

如何在模板中引用变量请查看相应的模板引擎文档。

## API

### response.render

**简介** 渲染页面

**别名** `context.render, context.display, response.display`

**定义** `response.render(viewPath, params)`

**参数**

`viewPath | String | null | 模板路径`

`params | Object | {} | 模板参数`

**注意** 这是一个异步操作，使用时记得加上 await `await this.ctx.render('index.html')`
