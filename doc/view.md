## 说明
> 视图使用 [`consolidate`](https://github.com/tj/consolidate.js) 实现，支持多种模板引擎，详见：https://github.com/tj/consolidate.js


以下以 `nunjucks` 为例介绍具体的使用方法。

## 配置
在 `config.js` 中：
```js
module.exports = {
	view: {
		engine: 'nunjucks',
		options: {
			autoescape: true,
			noCache: true,
			watch: true
		},
		extension: '.html',
	},
}
```

## 使用
在 `controller` 方法中，可以以 `this.ctx.render` 的方式渲染对应的页面。
```js
module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			await this.ctx.render('index.html');
		}

	}
	return new HomeController();
}
```