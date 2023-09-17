# Benchmark

测试环境：

- Machine: win7, RAM 16G, CPU: Intel-Core-i5-10400F

- Node: `v18.17.1`

- App: simple hello world

- Method: autocannon -c 100 -d 40 -p 10 localhost:3000

与其他框架性能对比，结果如下

framework | Version | Requests/s | Latency (ms) | Throughput/Mb
--- | --- | --- | --- | ---
node | 18.17.1 | 52488 | 18.56 ms | 7.09 MB
nest(fastify) | 10.0.0 | 45350.4 | 21.55 ms | 8.03 MB
koa | 2.14.2 | 42091.2 | 23.26 ms | 7.37 MB
heysoo | 0.0.8 | 34316.6 | 28.64 ms | 6.04 MB
egg | 3.17.4 | 26814.4 | 36.75 ms | 9.92 MB
express | 4.18.2 | 8829.5 | 112.63 ms | 2.11 MB
nest(express) | 10.0.0 | 8787.46 | 113.19 ms | 2.1 MB

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
