## 介绍

Heysoo 是一个底层基于 [Koa](http://koajs.com) 进行开发的轻量级 MVC 框架。它内置了一个 MVC 框架所需的元素，包括模型(M)、视图(V)、控制器(C)，以及路由，静态资源等等。在 Heysoo 框架中，我们通过配置来加载我们需要的功能，实现可插拔式的应用。我们相信，通过良好的配置及约定，能够构建出稳定有序的服务。

[![npm][npm-image]][npm-url]

[npm-image]: https://badge.fury.io/js/heysoo.svg
[npm-url]: https://www.npmjs.com/package/heysoo

## 安装
```bash
npm install heysoo --save
```

## Quick Start
通过 Heysoo 启动一个 web 服务十分简单。
```js
const Heysoo = require('heysoo');
const app = new Heysoo();

app.use(ctx => {
  ctx.body = 'hello, world.';
});

app.start();
```
此时访问 localhost:86 即可。

## 深入配置
以下是一个典型的 Heysoo 项目的目录结构：
```js
—— root
   ├── app              // 应用主目录
   |   ├── controller
   |   ├── service
   |   ├── view
   |   ├── model
   |   ├── static
   |   ├── router.js    // 路由配置
   ├── node_modules
   ├── index.js         // 应用启动入口
   ├── config.js        // 应用配置文件
   ├── package.json
```
下面我们通过一步一步修改的方式完成以上所有功能的配置。
首先，编写一个简单的配置文件 `config.js`：
```js
module.exports = {
  host: 'localhost',
  port: 91,                 // 默认端口是86，此处修改为你自己的端口
  folder: {                 // 我们可以通过 folder 配置参数修改我们的应用目录及子模块目录名称
    app: 'application',     // 默认 app
    controller: 'c',        // 默认 controller
    service: 's',           // 默认 service
    model: 'm',             // 默认 model
    view: 'v',              // 默认 view
    static: 'p',            // 默认 static
  }
}
```
> 更详细的配置参见 [`配置`](http://www.hisheng.net/works/heysoo/doc/index.html#/config) 模块。

此时，我们的项目目录结构变成这样：
```js
── root
   ├── application
   |   ├── c
   |   ├── s
   |   ├── v
   |   ├── m
   |   ├── p
   |   ├── sc
   |   ├── router.js
   ├── node_modules
   ├── index.js
   ├── config.js
```
> 注意：所有的目录都不是必要的，在此示例中我们仅仅会拿 c(控制器) 这个目录来作介绍。

接着，编写路由配置文件 `application/router.js`：
```js
module.exports = app => {
  app.get('/', 'home.index');
}
```
在这里，我们简单地将根路径指向 home 控制器对应的方法 `index`，输出一句问候语。在 c 目录下添加我们的控制器文件 `application/c/home.js`：
```js
module.exports = app => {
  class HomeController extends app.Controller {

    constructor (){
      super();
    }

    index (){
      this.ctx.body = 'Hello, Heysoo';
    }
  }
  return HomeController;
}
```

启动我们的应用 `node index.js`，访问 `http://localhost:91`，将看到浏览器输出 `Hello, Heysoo`。


## 依赖说明
Node
> Heysoo 对 Node 版本最低要求是 7.6.0 +（为了使用最新的 async/await 特性）。
如果你的 Node 版本比较低，可以考虑通过 babel 进行 polyfill，参见 [如何 polyfill？](http://www.hisheng.net/works/heysoo/doc/index.html#/FAQ?id=%E5%A6%82%E4%BD%95-polyfill%EF%BC%9F)。

> Node 最新 LTS 版本已经到了 8.12.0，后端语言不像浏览器，建议尽可能升级到比较新的版本并拥抱新的语言特性。

## 特性
#### ![](http://www.hisheng.net/works/heysoo/doc/imgs/icons/config.png) 可配置，可拆卸
Heysoo 最大的特点是所有的功能模块几乎都可以配置，可拆卸，是否使用可以完全由你自己决定，不需要的功能模块在应用启动时并不会加载。假设你将所有的功能模块禁用，那它就只是一个简单的增强版的 Koa，仅此而已。

#### ![](http://www.hisheng.net/works/heysoo/doc/imgs/icons/giant.png) 站在巨人的肩膀上
Heysoo 并不是一个重新造轮子的 MVC 框架，我们的目标是尽可能地使用优秀的开源库来实现我们想要的功能。Heysoo 的基础功能是基于 Koa 实现的，在其基础上进行功能增强，而所有的这些功能都是可以拆卸的。

#### ![](http://www.hisheng.net/works/heysoo/doc/imgs/icons/plugin.png) 插件化
你可以通过 Heysoo 提供的插件机制来引入你自己实现的插件。例如如果你觉得 Heysoo 自带的数据库功能不是你想要的，你完全可以禁用它，之后引入你自己实现的数据库插件模块。

#### ![](http://www.hisheng.net/works/heysoo/doc/imgs/icons/future.png) 拥抱 ES2015 和 async/await
在 Node 环境下编写代码，我们没有理由不使用 ES2015+，同时通过适当的配置（babel）我们就可以使用更加方便的 async/await 特性代替繁琐的 promise / generator / co 等。


## 详细文档
更详细的文档说明见： [Heysoo](http://www.hisheng.net/works/heysoo)

<!-- ## TODO
- [ ] CSRF 验证
- [ ] Session 插件
- [ ] Mock 插件
- [ ] HTTP Client 插件
- [ ] Master/Worker 模式 -->
