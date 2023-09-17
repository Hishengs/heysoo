const path = require('path');
const assert = require('assert');
const KoaRouter = require('koa-router');

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'COPY', 'LINK', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'ALL'];

module.exports.init = (app) => {
  class Router extends KoaRouter {

    constructor (opts = {}) {
      super(opts);
      this.supportedMethods = METHODS;
      // rewrite methods of koa-router, including 4 situations
      // 1. app.router.get('/home', 'home.index');
      // 2. app.router.get('home', '/home', 'home.index');
      // 3. app.router.get('/home', function(){});
      // 4. app.router.get('home', '/home', function(){});
      this.supportedMethods.map(method => method.toLowerCase()).forEach((method) => {
        this[method] = (name, path_, callback) => {
          if (callback) {
            // three arguments(s2, s4)
            return super[method](name, path_, this.getCallback(callback));
          } else {
            // two arguments(s1, s3)
            return super[method](name, this.getCallback(path_));
          }
        };
      });
      this.redirect = this.redirect.bind(this);
    }

    // get callback
    getCallback (callback) {
      if (typeof callback === 'string') {
        const keys = callback.split('.');
        const Controller = app._controller.classes[keys[0]];
        assert(Controller !== undefined, `controller: ${keys[0]} can not be found`);
        return async (ctx) => {
          const controller = new Controller(ctx);
          await controller[keys[1]]();
        };
      } else if (typeof callback === 'function') {
        return async function(ctx) {
          await callback.bind({
            ctx,
          })();
        };
      }
      return function () {};
    }

    // rewrite redirect
    redirect (source, dist/* , code */) {
      this.all(source, async function() {
        return this.ctx.redirect(dist);
        // this.ctx.status = code || 301;
      });
    }

    // router group
    group (gpOptions, routes) {
      assert(Object.prototype.toString.call(gpOptions).slice(8, -1).toLowerCase() === 'object', 'group options must be an Object');
      assert(typeof routes === 'function', 'group router callback must be a function');
      // build group router
      const groupRouter = {};
      this.supportedMethods.map(method => method.toLowerCase()).forEach((method) => {
        groupRouter[method] = (name, path_, callback) => {
          let realPath = callback ? path_ : name;
          let realCallback = callback ? callback : path_;
          // same prefix
          realPath = gpOptions.prefix ? (gpOptions.prefix + realPath) : realPath;
          // same controller
          realCallback = gpOptions.controller && typeof realCallback === 'string' ? (gpOptions.controller + '.' + realCallback) : realCallback;
          if (callback) {
            // three arguments(s2, s4)
            return super[method](name, realPath, this.getCallback(realCallback));
          } else {
            // two arguments(s1, s3)
            return super[method](realPath, this.getCallback(realCallback));
          }
        };
      });
      routes(groupRouter);
    }

    view (path_, page) {
      return this.all(path_, async function() {
        await this.ctx.render(page);
      });
    }

    /**
    * get url of route
    * @params
    * - routeName {String} null name of route
    * - params    {Object} null params pass to
    */
    getRouteUrl (routeName, params) {
      assert(typeof routeName === 'string', 'getRouteUrl: routeName must be String');
      return super.url(routeName, params);
    }

  }

  const router = new Router();

  app.router = app.context.router = router;

  app.console.mark('router init done.');
};

module.exports.start = (app) => {
  const { config } = app;

  // user defined routes
  let routes = null;

  try {
    routes = require(path.join(app.basePath, `./${config.folder.app}/router.js`));
    routes(app);
  } catch (e) {
    app.console.warn('[WARN] routes loaded failed, please check you router config.'/* , e.stack || e.message || '' */);
  }

  app.use(app.router.routes());
  app.use(app.router.allowedMethods());

  // extra api
  /* app.use(async (ctx, next) => {
    app.router.currentRoute = ctx._matchedRoute;
    app.router.currentRouteName = ctx._matchedRouteName;
    await next();
  }); */

  app.console.mark('routes loaded.');
};
