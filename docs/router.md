# Router 路由

路由一般与对应控制器方法一一映射，通过路由映射将请求交给对应的控制器方法处理。

## 路由配置

在应用根目录(`/app`)下创建 `router.js`

```js
module.exports = (app) => {
  app.router.get("/", "home.index");
};
```

在控制器目录(`/app/controller`)下创建 `home.js`

```js
module.exports = (app) => {
  class HomeController extends app.Controller {
    async index() {
      this.ctx.body = "Heysoo";
    }
  }
  return HomeController;
};
```

## 支持的方法

- `GET`
- `POST`
- `PUT`
- `DELETE`
- `PATCH`
- `OPTIONS`
- `COPY`
- `LINK`
- `UNLINK`
- `PURGE`
- `LOCK`
- `UNLOCK`
- `PROPFIND`

## 使用方式

### 直接指定回调

> app.router.METHOD(path, callback);

```js
app.router.get("/", function () {
  this.ctx.body = "hello, world";
});
```

> 注意，如果回调函数包含异步操作，必须将回调函数声明为异步（async）。

> 请不要使用箭头函数（丢失上下文）。

### 控制器方法映射

> app.router.METHOD(path, controllerActionString)

> 通过字符串方式指定匹配的控制器方法。

```js
app.router.get("/", "home.index");
```

### 正则

```js
app.router.get(/ab?cd/, function () {
  this.ctx.body = "ab?cd";
});
```

### 重定向

> router.redirect(from, to);

> from 和 to 都可以是路由路径或路由名

```js
app.router.redirect("/a", "/b");
app.router.redirect("/a", "/b", 301); // 指定状态码
```

### 给路由指定名称

```js
app.router.get("homepage", "/user", "user.index");
```

### 输出页面

```js
app.router.view("/index", "index.html");
// 等同于
app.router.all("/index", function () {
  this.ctx.display("index.html");
});
```

### 链式调用

```js
app.router
  .get("/", "home.index")
  .get("/user", "user.index")
  .post("/info", "user.info");
```

## 路由分组

```js
app.router.group(options, (router) => {
  router.get("/name", "user.getName");
});
```

通过 `options` 可以对分组进行更加详细的设置，主要有以下几类：

### 控制器分组

```js
app.router.group(
  {
    controller: "home",
  },
  (router) => {
    router.get("/car", "car"); // equals 'home.car'
    router.get("/van", "van"); // equals 'home.van'
  }
);
```

### 前缀分组

```js
app.router.group(
  {
    prefix: "/user",
  },
  (router) => {
    router.view("/", "user.html");
    router.redirect("/home", "/");
    router.get("/name", function () {
      this.ctx.body = "user group: name";
    });
    router.get("/info", function () {
      this.ctx.body = "user group: info";
    });
  }
);
```

### 混合分组

```js
app.router.group(
  {
    controller: "user",
    prefix: "/user",
  },
  (router) => {
    router.get("/group-mixin-a", "groupMixinA");
    router.get("/group-mixin-b", "groupMixinB");
  }
);
```

## 路由参数

### 命名参数

```js
app.router.get("/user/:id", function () {
  this.ctx.body = "user " + this.ctx.params.id;
});
```

> 在控制器方法中可以通过 `this.ctx.params` 获取参数。

### 查询参数

```js
app.router.get("/user", function () {
  this.ctx.body = "user: " + (this.ctx.query.name || "none");
});
```

> 在控制器方法中可以通过 `this.ctx.query` 获取参数。

## API

在 `controller`, `service` 方法中可以通过 `this.ctx.app.router[methodName]` 的方式引用相关的 API 方法。

### getRouteUrl

**简介** 通过路由名称获取路径

**定义** `getRouteUrl(routeName, params)`

**参数**

`routeName | String | null | 路由名称`

`params | Object | null | 传递给路由的参数`

**示例**

```js
this.router.getUrl("userInfo"); // '/user/info'
this.router.getUrl("user", { id: 2333 }); // '/user/2333'
```

### currentRoute

> 取得当前路由。

### currentRouteName

> 取得当前路由名称。
