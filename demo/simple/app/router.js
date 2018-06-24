module.exports = (app) => {
  app.router.get('/', 'index.index');
  // app.router.get('/', function () {
  //   this.ctx.send('Hello World!');
  // });
};
