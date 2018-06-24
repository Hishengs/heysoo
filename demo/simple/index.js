const Heysoo = require('../../index.js');

const app = new Heysoo();

// app.use(async (ctx) => {
//   ctx.body = 'hello, world.';
// });

app.start(() => {
  app.console.info('server is start');
});
