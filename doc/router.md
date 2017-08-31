# 路由
> 路由一般与对应控制器方法一一映射，通过路由映射将请求交给对应的控制器方法处理。

## 路由配置
在应用根目录(`/app`)下创建 `router.js`
```js
module.exports = app => {
	app.router.get('/', app.get('/',app.controller.home.index))
}
```
在控制器目录(`/app/controller`)下创建 `home.js`
```js
module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			this.ctx.body = 'Heysoo';
		}

	}
	return new HomeController();
}
```

## 支持方法
`GET, POST, PUT, DELETE, PATCH`

## 匹配模式

### 直接指定方法
```js
app.router.get('/', function (){
	this.ctx.body = 'hello, world';
})
```

### 控制器实例
可以通过直接指定控制器方法的方式设置路由：
```js
app.router.get('/', app.controller.home.index)
```

### 控制器字符串
通过字符串方式指定匹配的控制器：
```js
app.router.get('/', 'home.index')
```

### 正则匹配

### 重定向
```js
app.router.redirect('/a', '/b')
```

### 输出页面
```js
app.router.view('/login', 'login')
```

## API
在 `controller`, `service` 方法中可以通过 `this.ctx.router[methodName]` 的方式引用相关的 API 方法。

### redirectTo