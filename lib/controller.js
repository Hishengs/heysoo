const path = require('path');
const { getFolderFiles } = require('./util.js');

// base controller class
class Controller {
  constructor(ctx) {
    this.ctx = ctx;
    this._name = 'Controller';
  }
}

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;

  app.Controller = Controller;

  // just save the controller classes but not new them
  // the needed controller instance will be new when request come in(see extend/context.js)
  const controllerPath = `./${config.folder.app}/${config.folder.controller}/`;
  const files = getFolderFiles(controllerPath);
  const controllerClasses = {};
  for(let i = 0, ilen = files.length; i < ilen; i++){
    controllerClasses[files[i].slice(0, -3)] = require(path.join(app.basePath, controllerPath + files[i]))(app);
  }

  app._controller = app.context._controller = {
    classes: controllerClasses,
    base: app.Controller
  };

  app.console.info('controller init done.');
};
