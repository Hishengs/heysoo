'use strict';

const path = require('path');
const getFolderFiles = require('./util.js').getFolderFiles;

exports.init = (app) => {
	const config = app.config;
	// get user controllers
	const controllerPath = `./${config.folder.app}/${config.folder.controller}/`;
  const files = getFolderFiles(controllerPath);
  let controllerModule = {};
  for(let i=0,ilen=files.length;i<ilen;i++){
    controllerModule[files[i].slice(0,-3)] = require(path.join(app.basePath,controllerPath+files[i]))(app);
  }
	app.controller = app.context.controller = controllerModule;

	app.debug('controller init done.');
}

exports.baseClass = class Controller {
	constructor (){
		this._name = 'Controller';
	}
}