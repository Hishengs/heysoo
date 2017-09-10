require('babel-core/register')({
  // "presets": ['es2015'],
  "plugins": ["transform-async-to-generator"]
});

const Heysoo = require('../index.js');

const app = new Heysoo();

/*app.use(async ctx => {
  ctx.body = 'hello, world.';
});*/

app.start();