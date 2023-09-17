const Koa = require('koa');
const path = require('path');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const { isType } = require('./util.js');

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;
  // static server
  const staticServer = new Koa();

  // multi static server(supported since @0.0.6)
  if (config.static.path == null) {
    staticServer.use(koaStatic(path.join(app.basePath, `./${config.folder.app}/${config.folder.static}/`)));
    app.use(koaMount('/static', staticServer));
  } else if (isType(config.static.path, 'object')) {
    for (const [servePath, folder] of Object.entries(config.static.path)) {
      staticServer.use(koaStatic(path.join(app.basePath, `./${config.folder.app}/`, folder)));
      app.use(koaMount(servePath, staticServer));
    }
  } else {
    staticServer.use(koaStatic(path.join(app.basePath, `./${config.folder.app}/${config.folder.static}/`)));
    app.use(koaMount(config.static.path, staticServer));
  }

  app.console.mark('static init done.');
};
