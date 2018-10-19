module.exports = (app) => {
  // app.router.get('/greet', async function (){
  //   this.ctx.body = 'hello,world';
  // }).get('/name', async function (){
  //   // this.ctx.body = 'Hisheng'
  //   /*this.ctx.with({
  //     status: 403,
  //     header: {
  //       'Content-Type': 'application/json',
  //       'hi': 'man'
  //     }
  //   }).send('hi man')*/
  //   console.log(typeof this.ctx.render);
  //   this.ctx.withStatus(404).send('hi man');
  // });
  // app.router.get('/', 'home.index');
  // app.router.redirect('/hi', '/greet');
  // app.router.view('/index', 'index.html');
  // /*app.router.get('/user/:id',function(){
  //   this.ctx.body = 'user ' + this.ctx.params.id;
  // })*/
  // // app.router.get('/user/:id',app.controller.home.user)
  // app.router.get(/ab?cd/, async function (){
  //   this.ctx.body = 'ab?cd';
  // });

  // app.router.group({
  //   prefix: '/user'
  // }, (router) => {
  //   router.view('/', 'user.html');
  //   router.redirect('/home', '/');
  //   router.get('/name', function (){
  //     // this.ctx.body = 'user group: name';
  //     this.ctx.send(this.ctx.service.data.getOnlineUserNum());
  //   });
  //   router.get('/info', function (){
  //     this.ctx.body = 'user group: info';
  //   });
  // });

  // app.router.group({
  //   controller: 'home'
  // }, (router) => {
  //   router.get('/car', 'car');
  //   router.get('/van', 'van');
  // });

  // app.router.get('/file', async function (){
  //   const path = require('path');
  //   this.ctx.download(path.join('./test.png'));
  // });

  // app.router.get('/logger-test', function (){
  //   const sentence = 'this is a logger test';
  //   this.ctx.logger.info(sentence);
  //   this.ctx.logger.success(sentence);
  //   this.ctx.logger.error(sentence);
  //   this.ctx.logger.warn(sentence);
  //   this.ctx.send(sentence);
  // });
  // app.router.get('/', app.controller.home.index);

  app.router.get('/home', 'home.index');

  // ===== test callback =====
  app.router.all('/', function() {
    this.ctx.send('hello world ' + this.ctx.csrf);
  });

  // ===== test controller =====
  app.router.get('/controller', 'router.controller');

  // ===== test route name =====
  app.router.get('router', '/router-name', 'router.routeName');

  // ===== test chain use =====
  app.router.get('/xxx', function(){
    this.ctx.send('[router test] chain xxx');
  }).get('/yyy', function(){
    this.ctx.send('[router test] chain yyy');
  });

  // ===== test regx =====
  app.router.get(/ab?cd/, function(){
    this.ctx.body = 'ab?cd';
  });

  // ===== test redirect =====
  app.router.get('/redirect-to', 'router.redirect');
  app.router.redirect('/redirect', '/redirect-to', 404);

  // ===== test view =====
  app.router.view('/home.index', 'index');

  // ===== test router group =====
  // 1. prefix
  app.router.group({
    prefix: '/user'
  }, (router) => {
    router.get('/', function(){
      this.ctx.send('[router test] group.prefix /user/');
    });
    router.get('/simon', function(){
      this.ctx.send('[router test] group.prefix /user/simon');
    });
  });
  // 2. controller
  app.router.group({
    controller: 'router'
  }, (router) => {
    router.get('/group-controller', 'group');
  });
  // 3. mixin
  app.router.group({
    controller: 'router',
    prefix: '/router',
  }, (router) => {
    router.get('/group-mixin-a', 'groupMixinA');
    router.get('/group-mixin-b', 'groupMixinB');
  });

  // ===== test API:getUrl =====
  app.router.get('/api/get-url', function(){
    this.ctx.send(this.ctx.router.getRouteUrl('router'));
  });

  // ===== test API:currentRoute =====
  app.router.get('/api/current-route', function(){
    this.ctx.send(this.ctx.router.currentRoute());
  });

  // ===== test API:getUrl =====
  app.router.get('/api/current-route-name', function(){
    this.ctx.send(this.ctx.router.currentRouteName());
  });
};
