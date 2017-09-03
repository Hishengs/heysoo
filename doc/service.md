## 定义
> 服务层目录下每一个文件就是一个基础服务模块。

```js
- service
	- user.js
	- account.js
```

## 应用场景
1. 为 controller 提供基础的服务接口。
2. 结合 ORM 进行提供数据服务。

## 调用方式
通过 `this.ctx.service.user` 可以调用相应的控制器及其方法。

## 示例