# API

Heysoo 基于 koa 进行二次开发，因此具有 koa 拥有的所有 [API](http://koajs.com)，以下 API 是 Heysoo 框架特有的 API。
同名的 API 以 Heysoo 的 API 为准。

### Koa 架构图

> 在深入了解 API 之前，你必须对 Koa 的架构有基本的了解，简单如下：

![koa 实例图示](https://www.hisheng.net/works/heysoo/imgs/structure.png "koa 实例图示")

## application

> Heysoo 实例相关 API

```js
const app = new Heysoo();
```

---

### 属性

#### app.version

当前版本

#### app.author

作者

#### app.config

当前配置

#### app.basePath

应用基础路径

---

### 方法

#### app.start

**简介** 启动 Heysoo 应用

**定义** `app.start(callback)`

**参数**

`callback | Function | null | 应用启动后的回调函数`

<br/>
#### app.beforeStart
**简介** 应用启动前的钩子

**定义** `app.beforeStart(hook)`

**参数**

`hook | Function | null | 应用之前的钩子函数`

**提示** 可以多次调用此方法来注册多个钩子函数

<br/>
#### app.afterStart
**简介** 应用启动后的钩子

**定义** `app.afterStart(hook)`

**参数**

`hook | Function | null | 应用之后的钩子函数`

**提示** 可以多次调用此方法来注册多个钩子函数

<br/>
#### app.getConfig
**简介** 获取当前配置

## context

单次请求时的上下文对象。

<!-- ### context.debug -->

### 别名 API

#### response 相关别名 API

```js
context.done;
context.doneWithError;
context.download;
context.json;
context.render, context.display;
context.send;
context.with;
context.withStatus;
context.withHeader, context.withHeaders;
```

## request

> 请求相关 API

### 方法

#### request.input

**简介** 获取表单参数

**定义** `request.input(name, defaultValue)`

**参数**

`name | String | '' | 参数名称`

`defaultValue | Any | null | 参数不存在时返回的默认值`

## response

> 响应相关 API

### response.done

**简介** 结束请求并输出数据

**别名** `context.done`

**定义** `response.done(data, errorLevel, msg)`

**参数**

`data | Any | null | 发送的数据`

`errorLevel | Integer | 0 | 错误级别，0 无错误，1 提示，2 警告，3 错误`

`msg | String | null | 携带的信息`

**示例**

```js
const data = "hello";
this.ctx.done(data);
```

**输出**

```js
{
  err: {
    level: 0,   // 错误级别
    msg: ''     // 说明信息
  },
  data: 'hello'
}
```

<br>
### response.doneWithError
**简介** 结束请求并输出错误信息，等同于 `this.ctx.done(null, 3, errMsg)`

**别名** `context.doneWithError`

**定义** `response.doneWithError(errMsg)`

**参数**

`errMsg | String | null | 错误信息`

**示例**

```js
const err = new Error("error info");
this.ctx.doneWithError(err.toString());
```

**输出**

```js
{
  err: {
    level: 3,
    msg: 'error info'
  },
  data: null
}
```

<br>
### response.download
**简介** 下载文件

**别名** `context.download`

**定义** `response.download(filePath)`

### response.json

**简介** 输出一个 JSON 对象

**别名** `context.json`

**定义** `response.json(json)`

<br>
### response.render
**简介** 渲染页面

**别名** `context.render, context.display, response.display`

**定义** `response.render(viewPath, params)`

**参数**

`viewPath | String | null | 模板路径`

`params | Object | {} | 模板参数`

**注意** 这是一个异步操作，使用时记得加上 await `await this.ctx.render('index.html')`

<br>
### response.send
**简介** 简单的数据输出，`this.ctx.body = data` 的简单封装

**别名** `context.send`

**定义** `response.send(data)`

<br>
### response.with
**简介** 响应设置

**别名** `context.with`

**定义** `response.with(setting)`

**参数**

`setting | Object | {} | 设置`

**可设置项**<br/>
`status` HTTP 状态码<br/>
`header || headers` HTTP 头部

**返回** 应用实例，支持链式调用

**示例**

```js
this.ctx
  .with({
    status: 200,
    header: {
      "Content-Type": "application/json",
    },
  })
  .send();
```

<br>
### response.withStatus
**简介** 设置 HTTP 状态码，等同于 `this.ctx.status = statusCode`

**别名** `context.withStatus`

**定义** `response.withStatus(statusCode)`

**返回** 应用实例，支持链式调用

<br>
### response.withHeader
**简介** 设置 HTTP 头部

**别名** `response.withHeaders, context.withHeader, context.withHeaders`

**定义** `response.withHeader(header)`

**参数**

`header | Object | {} | HTTP 头部`

**返回** 应用实例，支持链式调用

**示例**

```js
this.ctx
  .withHeader({
    "Content-Type": "application/json",
  })
  .send();
```

## router

> 路由相关 API（整理中）

<!-- ## logger
> 日志相关 API -->

<!-- ## util
> 辅助工具 API

### toFixed
**简介** 数字精度控制，类似 `Number.prototype.toFixed`，但最终结果还是数字而不是字符串。

**示例**
```js
console.log((12.3456).toFixed(2));
```
**输出**
```js
12.35
``` -->
