const path = require('path');
const assert = require('assert');
const KoaRouter = require('koa-router');

// exports.init = (appIns) => {
//   const app = appIns;
//   const { config } = app;

//   // maintain koa-router instance
//   const krouter = new KoaRouter();
//   app.krouter = app.context.krouter = krouter;

//   // router extends koa-router
//   const router = getGroupRouter(app, {});
//   app.router = app.context.router = router;

//   // router group
//   router.group = function (gpOptions, routes){
//     assert(Object.prototype.toString.call(gpOptions).slice(8, -1).toLowerCase() === 'object', 'group options must be an Object');
//     assert(typeof routes === 'function', 'group router callback must be a function');
//     const groupRouter = getGroupRouter(app, gpOptions || {});
//     routes(groupRouter);
//   };

//   // get gen route by route name
//   router.getUrl = function (routeName, params){
//     return app.krouter.url(routeName, params);
//   };

//   // get current route
//   app.use(async (ctx, next) => {
//     app.router.currentRoute = function (){
//       return ctx._matchedRoute;
//     };
//     await next();
//   });

//   /* router.currentRoute = function(){
//     return this.ctx._matchedRoute;
//   } */

//   // get current route name
//   app.use(async (ctx, next) => {
//     router.currentRouteName = function (){
//       return ctx._matchedRouteName;
//     };
//     await next();
//   });

//   /* router.currentRouteName = function(){
//     return this.ctx._matchedRouteName;
//   } */

//   let routes = null;

//   try {
//     routes = require(path.join(app.basePath, `./${config.folder.app}/router.js`));
//   }catch (e){
//     e.message = '[error] router init failed, please check you router config.' + e.message;
//     throw e;
//   }

//   routes(app);

//   app.use(krouter.routes());
//   app.use(krouter.allowedMethods());

//   /* app.use(async (ctx,next) => {
//     ctx.router = ctx.app.router;
//     await next();
//   }); */

//   app.console.info('router init done.');

// };

// function getGroupRouter(app, gpOptions){
//   const methods = ['get', 'post', 'put', 'patch', 'delete'];
//   const router = {};

//   methods.forEach((method) => {
//     router[method] = function (route, controllerString, options){

//       options = options || {
//         // name: null,
//         // prefix: null,
//       };

//       // prefix
//       if(options.prefix || gpOptions.prefix)
//         route = (options.prefix || gpOptions.prefix) + route;

//       // 1. for string router like: app.router.get('/','home.index')
//       if(typeof controllerString === 'string'){

//         // controller
//         if(options.controller || gpOptions.controller)
//           controllerString = (options.controller || gpOptions.controller) + '.' + controllerString;

//         const splitedControllerString = controllerString.split('.');
//         let ObjController = app._controller.classes;
//         for(let i = 0, ilen = splitedControllerString.length - 1; i < ilen; i++){
//           assert(ObjController[splitedControllerString[i]] !== undefined, `undefined controller: ${controllerString}.`);
//           ObjController = ObjController[splitedControllerString[i]];
//         }
//         assert(ObjController !== app._controller.classes, 'no controller specified.');

//         const actionName = splitedControllerString[splitedControllerString.length - 1];
//         assert(actionName && ObjController.prototype[actionName], `undefined controller action: ${actionName}.`);
//         assert(typeof ObjController.prototype[actionName] === 'function', `controller action: ${actionName} must be a function.`);

//         const action = async (ctx) => {
//           const controller = new ObjController(ctx);
//           await controller[actionName]();
//         };
//         app.krouter[method].apply(app.krouter, [route, action]);

//       }
//       // 2. for direct function router
//       else if(typeof controllerString === 'function'){
//         // let action = controllerString;
//         // const actionName = action._name || action.name;
//         // // find obj controller
//         // const controllerNames = Object.getOwnPropertyNames(app.controller);
//         // let actionType = 'normal';
//         // for(let i = 0, ilen = controllerNames.length; i < ilen; i++){
//         //   // 2.1 for controller router
//         //   if(app.controller[controllerNames[i]][actionName] && app.controller[controllerNames[i]][actionName] === action){
//         //     action = action.bind(app.controller[controllerNames[i]]);
//         //     actionType = 'controller';
//         //     break;
//         //   }
//         // }
//         // 2.2 for normal router like:
//         /*app.router.get('/user',function (){
//           this.ctx.body = 'hi man';
//         })*/
//         // if(actionType === 'normal'){
//         //   app.krouter[method].apply(app.krouter, [route, async function (ctx){
//         //     const proto = app;
//         //     proto.ctx = ctx;
//         //     const _action = action.bind(proto);
//         //     await _action();
//         //   }]);
//         // }else app.krouter[method].apply(app.krouter, [route, action]);

//         const action = controllerString;
//         app.krouter[method].apply(app.krouter, [route, async function (ctx){
//           await action.bind({
//             ctx
//           })();
//         }]);

//       }else throw new Error('invalid router callback, which must be a function or existed controller action string.');
//       // chain use
//       return router;
//     };
//   });

//   // Util Methods

//   // 1. redirect
//   app.krouter.redirect = app.krouter.redirect.bind(app.krouter);
//   router.redirect = function (route1, route2){
//     if(gpOptions.prefix){
//       route1 = gpOptions.prefix + route1;
//       route2 = gpOptions.prefix + route2;
//     }
//     app.krouter.redirect(route1, route2);
//   };

//   // 2. render view
//   router.view = function (route, view){
//     this.get(route, async function (){
//       await this.ctx.render(view);
//     });
//   };

//   return router;
// }


module.exports.init = (app) => {

  const { config } = app;

  class Router extends KoaRouter {

    constructor (opts = {}){
      super(opts);
      this.supportMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'COPY', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'ALL'];
      // rewrite methods of koa-router, including 4 situations
      // 1. app.router.get('/home', 'home.index');
      // 2. app.router.get('home', '/home', 'home.index');
      // 3. app.router.get('/home', function(){});
      // 4. app.router.get('home', '/home', function(){});
      this.supportMethods.map(method => method.toLowerCase()).forEach((method) => {
        this[method] = (name, path, callback) => {
          if(callback){
            // three arguments(s2, s4)
            return super[method](name, path, this.getCallback(callback));
          }else {
            // two arguments(s1, s3)
            return super[method](name, this.getCallback(path));
          }
        };
      });
      this.redirect = this.redirect.bind(this);
    }

    // get callback
    getCallback (callback){
      if(typeof callback === 'string'){
        const keys = callback.split('.');
        const Controller = app._controller.classes[keys[0]];
        assert(Controller !== undefined, `controller: ${keys[0]} can not be found`);
        return async (ctx) => {
          const controller = new Controller(ctx);
          return controller[keys[1]]();
        };
      }else if(typeof callback === 'function'){
        return async function(ctx){
          await callback.bind({
            ctx,
          })();
        };
      }
    }

    // rewrite redirect
    redirect (source, dist, code){
      this.all(source, async function(){
        this.ctx.redirect(dist);
        // this.ctx.status = code || 301;
      });
    }

    // router group
    group (gpOptions, routes){
      assert(Object.prototype.toString.call(gpOptions).slice(8, -1).toLowerCase() === 'object', 'group options must be an Object');
      assert(typeof routes === 'function', 'group router callback must be a function');
      // build group router
      const groupRouter = {};
      this.supportMethods.map(method => method.toLowerCase()).forEach((method) => {
        groupRouter[method] = (name, path, callback) => {
          let realPath = callback ? path : name;
          let realCallback = callback ? callback : path;
          // same prefix
          realPath = gpOptions.prefix ? (gpOptions.prefix + realPath) : realPath;
          // same controller
          realCallback = gpOptions.controller && typeof realCallback === 'string' ? (gpOptions.controller + '.' + realCallback) : realCallback;
          if(callback){
            // three arguments(s2, s4)
            return super[method](name, realPath, this.getCallback(realCallback));
          }else {
            // two arguments(s1, s3)
            return super[method](realPath, this.getCallback(realCallback));
          }
        };
      });
      routes(groupRouter);
    }

    view (path, page){
      return this.all(path, async function(){
        await this.ctx.render(page);
      });
    }

    /*
    * get url of route
    * @params
    * - routeName {String} null name of route
    * - params    {Object} null params pass to
    */
    getRouteUrl (routeName, params){
      assert(typeof routeName === 'string', 'getRouteUrl: routeName must be String');
      return super.url(routeName, params);
    }

  }

  const router = new Router();

  app.router = app.context.router = router;

  // extra api
  app.use(async (ctx, next) => {
    router.currentRoute = function (){
      return ctx._matchedRoute;
    };
    router.currentRouteName = function (){
      return ctx._matchedRouteName;
    };
    await next();
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  let routes = null;

  try {
    routes = require(path.join(app.basePath, `./${config.folder.app}/router.js`));
  }catch (e){
    e.message = '[error] router init failed, please check you router config.' + e.message;
    throw e;
  }

  routes(app);

  app.console.info('router init done.');
};

