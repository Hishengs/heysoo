const path = require('path');
const assert = require('assert');
const KoaRouter = require('koa-router');

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;

  const krouter = new KoaRouter();
  // app.router = app.context.router = router;
  app.krouter = app.context.krouter = krouter;
  // app.router = app.context.router = {};
  const router = getGroupRouter(app, {});
  app.router = app.context.router = router;

  // router group
  router.group = function (gpOptions, routes){
    const grouter = getGroupRouter(app, gpOptions || {});
    routes(grouter);
  };

  // get gen route by route name
  router.getUrl = function (routeName, params){
    app.krouter.url(routeName, params);
  };

  // get current route
  app.use(async (ctx, next) => {
    app.router.currentRoute = function (){
      return ctx._matchedRoute;
    };
    await next();
  });

  /* router.currentRoute = function(){
    return this.ctx._matchedRoute;
  } */

  // get current route name
  app.use(async (ctx, next) => {
    router.currentRouteName = function (){
      return ctx._matchedRouteName;
    };
    await next();
  });

  /* router.currentRouteName = function(){
    return this.ctx._matchedRouteName;
  } */

  let routes = null;

  try {
    routes = require(path.join(app.basePath, `./${config.folder.app}/router.js`));
  }catch (e){
    e.message = '[error] router init failed, please check you router config.' + e.message;
    throw e;
  }

  routes(app);

  app.use(krouter.routes());
  app.use(krouter.allowedMethods());

  /* app.use(async (ctx,next) => {
    ctx.router = ctx.app.router;
    await next();
  }); */

  app.console.info('router init done.');

};

function getGroupRouter(app, gpOptions){
  const methods = ['get', 'post', 'put', 'patch', 'delete'];
  const router = {};

  methods.forEach((method) => {
    router[method] = function (route, controllerString, options){

      options = options || {
        // name: null,
        // prefix: null,
      };

      // prefix
      if(options.prefix || gpOptions.prefix)
        route = (options.prefix || gpOptions.prefix) + route;

      // 1. for string router like: app.router.get('/','home.index')
      if(typeof controllerString === 'string'){

        // controller
        if(options.controller || gpOptions.controller)
          controllerString = (options.controller || gpOptions.controller) + '.' + controllerString;

        const splitedControllerString = controllerString.split('.');
        let ObjController = app._controller._classes;
        for(let i = 0, ilen = splitedControllerString.length - 1; i < ilen; i++){
          assert(ObjController[splitedControllerString[i]] !== undefined, `undefined controller: ${controllerString}.`);
          ObjController = ObjController[splitedControllerString[i]];
        }
        assert(ObjController !== app._controller._classes, 'no controller specified.');

        const actionName = splitedControllerString[splitedControllerString.length - 1];
        assert(actionName && ObjController.prototype[actionName], `undefined controller action: ${actionName}.`);
        assert(typeof ObjController.prototype[actionName] === 'function', `controller action: ${actionName} must be a function.`);

        const action = async (ctx) => {
          const controller = new ObjController(ctx);
          await controller[actionName]();
        };
        app.krouter[method].apply(app.krouter, [route, action]);

      }
      // 2. for direct function router
      else if(typeof controllerString === 'function'){
        // let action = controllerString;
        // const actionName = action._name || action.name;
        // // find obj controller
        // const controllerNames = Object.getOwnPropertyNames(app.controller);
        // let actionType = 'normal';
        // for(let i = 0, ilen = controllerNames.length; i < ilen; i++){
        //   // 2.1 for controller router
        //   if(app.controller[controllerNames[i]][actionName] && app.controller[controllerNames[i]][actionName] === action){
        //     action = action.bind(app.controller[controllerNames[i]]);
        //     actionType = 'controller';
        //     break;
        //   }
        // }
        // 2.2 for normal router like:
        /*app.router.get('/user',function (){
          this.ctx.body = 'hi man';
        })*/
        // if(actionType === 'normal'){
        //   app.krouter[method].apply(app.krouter, [route, async function (ctx){
        //     const proto = app;
        //     proto.ctx = ctx;
        //     const _action = action.bind(proto);
        //     await _action();
        //   }]);
        // }else app.krouter[method].apply(app.krouter, [route, action]);

        const action = controllerString;
        app.krouter[method].apply(app.krouter, [route, async function (ctx){
          await action.bind({
            ctx
          })();
        }]);

      }else throw new Error('invalid router callback, which must be a function or existed controller action string.');
      // chain use
      return router;
    };
  });

  // Util Methods

  // 1. redirect
  app.krouter.redirect = app.krouter.redirect.bind(app.krouter);
  router.redirect = function (route1, route2){
    if(gpOptions.prefix){
      route1 = gpOptions.prefix + route1;
      route2 = gpOptions.prefix + route2;
    }
    app.krouter.redirect(route1, route2);
  };

  // 2. render view
  router.view = function (route, view){
    this.get(route, async function (){
      await this.ctx.render(view);
    });
  };

  return router;
}
