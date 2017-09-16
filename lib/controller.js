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

  // get user controllers
  const controllerPath = `./${config.folder.app}/${config.folder.controller}/`;
  const files = getFolderFiles(controllerPath);
  const controllerClasses = {};
  for(let i = 0, ilen = files.length; i < ilen; i++){
    controllerClasses[files[i].slice(0, -3)] = require(path.join(app.basePath, controllerPath + files[i]))(app);
  }
  app.controller = app.context.controller = {
    _classes: controllerClasses,
    _base: app.Controller
  };

  app.debug('controller init done.');
};
