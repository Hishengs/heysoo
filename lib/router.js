'use strict';

const path = require('path');
const koaRouter = require('koa-router');

exports.init = (app) => {

	const config = app.config;

	const krouter = new koaRouter();
  // app.router = app.context.router = router;
  app.krouter = app.context.krouter = krouter;
  app.router = app.context.router = {};

  const methods = ['get', 'post', 'put', 'patch', 'delete'];
  
  methods.forEach(method => {
    app.router[method] = function(route,controllerString,options){

      options = options || {
        // name: null,
        // prefix: null,
      };
      
      // for router like: app.router.get('/','home.index')
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
        krouter[method].apply(krouter,[route,controller]);
      }else if(typeof controllerString === 'function'){
        let action = controllerString;
        let actionName = action._name || action.name;
        // find obj controller
        let controllerNames = Object.getOwnPropertyNames(app.controller);
        let actionType = 'normal';
        for(let i=0,ilen=controllerNames.length;i<ilen;i++){
          if(app.controller[controllerNames[i]][actionName] && app.controller[controllerNames[i]][actionName] === action){
            action = action.bind(app.controller[controllerNames[i]]);
            actionType = 'controllerMethod'
            break;
          }
        }
        // for normal router like: 
        // app.router.get('/user',function (){
        //   this.ctx.body = 'hi man';
        // })
        if(actionType === 'normal'){
          krouter[method].apply(krouter,[route,async function(ctx){
            let proto = app;
            proto.ctx = ctx;
            let _action = action.bind(proto);
            await _action();
          }]);
        }else krouter[method].apply(krouter,[route,action]);
      }
      // chain use
      return app.router;
    }
  });

  // Util Methods

  // 1. redirect
  app.router.redirect = krouter.redirect = krouter.redirect.bind(krouter);

  // 2. render view
  app.router.view = function(route,view){
    this.get(route,async function(){
      await this.ctx.render(view);
    })
  }

  // 3. router group
  /*app.router.group = function(options,func){
    func = func.bind(app.router);
  }*/

  let routes = null;

  try {
  	routes = require(path.join(app.basePath,`./${config.folder.app}/router.js`));
  }catch (e){
  	e.message = '[error] router init failed, please check you router config.' + e.message;
  	throw e;
  }

  routes(app);

  app.use(krouter.routes());
  app.use(krouter.allowedMethods());

  app.debug('router init done.');

}