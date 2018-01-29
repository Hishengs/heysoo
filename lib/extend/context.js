const assert = require('assert');
const delegate = require('delegates');

module.exports.init = (app) => {

  // only new instance when required
  app.use(async (ctx, next) => {
    // cached services
    ctx.cachedServices = {};
    app.service = ctx.service = new Proxy({}, {
      get: function(target, key, receiver){
        assert(key !== undefined, 'service name is required.');
        if(ctx.cachedServices[key]){
          return ctx.cachedServices[key];
        }
        const ObjService = app._service.classes[key];
        assert(ObjService !== undefined, `service ${key} is not found.`);
        const service = new ObjService(ctx);
        ctx.cachedServices[key] = service;
        return service;
      },
    });
    // cached controllers
    ctx.cachedControllers = {};
    app.controller = ctx.controller = new Proxy({}, {
      get: function(target, key, receiver){
        assert(key !== undefined, 'controller name is required.');
        if(ctx.cachedControllers[key]){
          return ctx.cachedControllers[key];
        }
        const ObjController = app._controller.classes[key];
        assert(ObjController !== undefined, `controller ${key} is not found.`);
        const controller = new ObjController(ctx);
        ctx.cachedControllers[key] = service;
        return controller;
      },
    });
    await next();
  });

  delegate(app.context, 'response')
    .method('done')
    .method('doneWithError')
    .method('download')
    .method('json')
    // .method('render')
    // .method('display')
    .method('send')
    .method('with')
    .method('withStatus')
    .method('withHeader')
    .method('withHeaders');

};
