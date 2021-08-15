const Koa = require('koa');
const config = require('../config');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(config.koa.port, () => {
  console.log(`koa is listening at ${config.koa.port}`);
});