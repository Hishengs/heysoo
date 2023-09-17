# Heysoo

Heysoo 是一个底层基于 [Koa](http://koajs.com) 进行开发的典型 MVC 框架。它内置了一个 MVC 框架所需的元素，包括模型(M)、视图层(V)、控制器(C)，以及路由，静态文件等等。在 Heysoo 框架中，我们通过配置来加载我们需要的功能，实现可插拔式的应用。我们相信，通过良好的配置及约定，能够构建出稳定有序的服务。

## Install

```bash
npm install heysoo --save
```

## hello world

通过 heysoo 启动一个 web 服务十分简单。

```js
const Heysoo = require("heysoo");
const app = new Heysoo();

app.use(async (ctx) => {
  ctx.body = "hello, world.";
});

app.start();
```

此时访问 localhost:8686 即可。

## Configuration

首先介绍一下一个典型的 Heysoo 项目的目录结构：

```text
—— root
   ├── app                   // 主要应用目录
   |   ├── controller
   |   ├── service
   |   ├── view
   |   ├── model
   |   ├── static
   |   ├── router.js         // 全局路由配置
   ├── node_modules
   ├── index.js              // 启动文件
   ├── config.js             // 项目配置文件
   ├── package.json
```

下面我们通过一步一步修改的方式完成以上所有功能的配置。
首先，编写一个简单的配置文件 `config.js`：

```js
module.exports = {
  host: "localhost",
  port: 9191, // 默认端口是 8686，此处修改为你自己的端口
  folder: {
    // 我们可以通过 folder 配置参数修改我们的应用目录及子模块目录名称
    app: "application", // 默认 app
    controller: "c", // 默认 controller
    service: "s", // 默认 service
    model: "m", // 默认 model
    view: "v", // 默认 view
    static: "p", // 默认 static
  },
};
```

此时，我们的项目目录结构变成这样：

```text
── root
   ├── application
   |   ├── c
   |   ├── s
   |   ├── v
   |   ├── m
   |   ├── p
   |   ├── router.js
   ├── node_modules
   ├── index.js
   ├── config.js
```

> 注意：所有的目录都不是必要的，在此示例中我们仅仅会用到 c(控制器) 这个目录来作介绍。

接着，编写路由配置文件 `application/router.js`：

```js
module.exports = (app) => {
  app.get("/", "home.index");
};
```

在这里，我们简单地将根路径指向 home 控制器对应的方法，输出一句问候语。在 c 目录下添加我们的控制器文件 `application/c/home.js`：

```js
module.exports = (app) => {
  class HomeController extends app.Controller {
    constructor() {
      super();
    }

    index() {
      this.ctx.body = "hello, heysoo";
    }
  }
  return HomeController;
};
```

启动我们的应用 `node index.js`，访问 `http://localhost:9191`，将看到浏览器输出 `hello, heysoo`。