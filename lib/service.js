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

  // load services but not new instance
  const servicePath = `./${config.folder.app}/${config.folder.service}/`;
  const files = getFolderFiles(servicePath);
  const serviceClasses = {};
  for (let i = 0, ilen = files.length; i < ilen; i++) {
    serviceClasses[files[i].slice(0, -3)] = require(path.join(app.basePath, servicePath + files[i]))(app);
  }

  app._service = app.context._service = {
    classes: serviceClasses,
    base: app.Service
  };

  app.console.mark('service init done.');
};
