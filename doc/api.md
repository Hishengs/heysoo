> Heysoo 基于 koa 进行二次开发，因此具有 koa 拥有的所有 [API](http://koajs.com)，以下 API 是 Heysoo 框架特有的 API。

## application
> Heysoo 实例相关API

```js
const app = new Heysoo();
```

### app._version
当前版本

### app._author
作者

### app._config
当前配置

### app.start
启动 Heysoo 应用

### app.hook
应用钩子

### app.getConfig
获取当前配置

## context

## request
> 请求相关 API

## response
> 响应相关 API

### response.json
**简介** 输出一个 JSON 对象

**别名** `ctx.json`

**定义** `response.json(json)`


### response.render
**简介** 输出一个页面

**别名** `ctx.render`

**定义** `response.render(viewPath,params)`

**参数** 

`viewPath | String | null | 模板路径`

`params | Object | {} | 模板参数`

**注意** 这是一个异步操作，使用时记得加 await
```js
this.ctx.body = await this.ctx.render('index.html');
```

### response.done
**简介** 结束请求并输出数据

**别名** `ctx.done`

**定义** `response.done(data,errorLevel,msg)`

**参数** 

`data | Any | null | 发送的数据`

`errorLevel | Integer | 0 | 错误级别，0 无错误，1 提示，2 警告，3 错误`

`msg | String | '' | 携带的信息`

**示例** 

```js
const data = 'hello';
this.ctx.done(data);
```
**输出**
```js
{
	err: {
		level: 0, // 错误级别
		msg: '' // 说明信息
	},
	data: 'hello'
}
```

### response.doneWithError
**简介** 结束请求并输出错误信息，等同于 `this.ctx.done(null,3,errMsg)`

**别名** `ctx.doneWithError`

**定义** `response.doneWithError(errMsg)`

**参数** 

`errMsg | String | '' | 错误信息`

**示例** 
```js
const err = new Error('error info');
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

### response.download
**简介** 下载文件

**别名** `ctx.download & ctx.attachment`

**定义** response.download(filePath)

### response.endWithStatus
**简介** 设置 HTTP 状态码并结束请求

**别名** `ctx.endWithStatus`

**定义** response.endWithStatus(statusCode)


## router
> 路由相关 API

## logger
> 日志相关 API

## util
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
```