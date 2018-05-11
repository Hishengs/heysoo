const Koa = require('koa');
const path = require('path');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;
  // 静态文件伺服
  const staticServer = new Koa();

  // multi static server(supported since @0.0.6)
  if(config.static.map){
    const staticPaths = Object.keys(config.static.map);
    for(const staticPath of staticPaths){
      staticServer.use(koaStatic(path.join(app.basePath, `./${config.folder.app}/${config.static.map[staticPath]}`)));
      app.use(koaMount(staticPath, staticServer));
    }
  }else {
    staticServer.use(koaStatic(path.join(app.basePath, `./${config.folder.app}/${config.folder.static}/`)));
    app.use(koaMount(config.static.path, staticServer));
  }

  app.console.info('static init done.');
};
