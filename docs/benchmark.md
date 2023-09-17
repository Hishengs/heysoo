# Benchmark

与其他框架性能对比，结果如下

> win7, RAM 16G, CPU: Intel-Core-i5-10400F

> node-v14.15.0, npm-v6.14.8

framework | req per sec
--- | ---
koa | 2580.20/s
nest(fastify) | 2555.48/s
heysoo(cluster) | 2518.01/s
heysoo | 2487.11/s
egg | 2246.51/s
express | 2181.27/s

## 对比代码

简单的 hello world 程序

### koa

```js
const Koa = require('koa');
const config = require('../config');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(config.koa.port, () => {
  console.log(`koa is listening at ${config.koa.port}`);
});
```
