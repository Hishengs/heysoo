const path = require('path');
const { getFolderFiles } = require('./util.js');

// base service class
class Service {
  constructor(ctx) {
    this.ctx = ctx;
    this._name = 'Service';
  }
}

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;

  app.Service = Service;

  // 获取 service 模块
  const servicePath = `./${config.folder.app}/${config.folder.service}/`;
  const files = getFolderFiles(servicePath);
  const serviceClasses = {};
  for(let i = 0, ilen = files.length; i < ilen; i++){
    serviceClasses[files[i].slice(0, -3)] = require(path.join(app.basePath, servicePath + files[i]))(app);
  }

  app._service = app.context._service = {
    _classes: serviceClasses,
    _base: app.Service
  };
  // load all serices for controller use.
  // app.use(async (ctx, next) => {
  //   const serviceNames = Object.getOwnPropertyNames(serviceClasses);
  //   for(let i = 0, ilen = serviceNames.length; i < ilen; i++){
  //     app.service[serviceNames[i]] = new serviceClasses[serviceNames[i]](ctx);
  //   }
  //   await next();
  // });

  app.logger.info('service init done.');
};
