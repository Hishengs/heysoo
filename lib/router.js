'use strict';

const path = require('path');
const koaRouter = require('koa-router');

exports.init = (app) => {

	let config = app.config;

	const router = new koaRouter();
  app.router = app.context.router = router;

  const methods = ['get', 'post', 'put', 'patch', 'delete'];
  
  methods.forEach(method => {
    app[method] = function(route,controllerString){
      // let args = Array.prototype.slice.call(arguments);
      if(typeof controllerString === 'string'){
        let splitedControllerString = controllerString.split('.');
        let objController = app.controller;
        for(let i=0,ilen=splitedControllerString.length-1;i<ilen;i++){
          if(!objController[splitedControllerString[i]])throw ReferenceError('undefined controller.');
          objController = objController[splitedControllerString[i]];
        }
        let actionName = splitedControllerString[splitedControllerString.length-1];
        if(!objController[actionName])throw ReferenceError('undefined controller action.');
        let controller = async ctx => {
          await objController[actionName]();
        }
        router[method].apply(router,[route,controller]);
      }else if(typeof controllerString === 'function'){
        let action = controllerString;
        let actionName = action._name || action.name;
        // find obj controller
        let controllerNames = Object.getOwnPropertyNames(app.controller);
        // app.debug('controllerNames',controllerNames);
        for(let i=0,ilen=controllerNames.length;i<ilen;i++){
          if(app.controller[controllerNames[i]][actionName] && app.controller[controllerNames[i]][actionName] === action){
            // app.debug('got it');
            action = action.bind(app.controller[controllerNames[i]]);
            break;
          }
          /*let actionNames = Object.getOwnPropertyNames(app.controller[controllerNames[i]]);
          app.debug('actionNames',actionNames);
          let index = actionNames.indexOf(actionName);
          if(index >= 0){
            let objAction = app.controller[controllerNames[i]][actionNames[index]];
            if(typeof objAction === 'function' && objAction === action){
              action = action.bind(app.controller[controllerNames[i]]);
              break;
            }
          }*/
        }
        router[method].apply(router,[route,action]);
      }
    }
  });

  let routes = null;

  try {
  	routes = require(path.join(app.basePath,`./${config.folder.app}/router.js`));
  }catch (e){
  	e.message = '[error] router init failed, please check you router config.' + e.message;
  	throw e;
  }

  routes(app);

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.debug('router init done.');

}