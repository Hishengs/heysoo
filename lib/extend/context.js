const assert = require('assert');
const delegate = require('delegates');

module.exports.init = (app) => {

  // app.context.done = app.response.done;
  // app.context.doneWithError = app.response.doneWithError;
  // app.context.download = app.response.download;
  // app.context.json = app.response.json;
  // app.context.send = app.response.send;
  // app.context.with = app.response.with;
  // app.context.withStatus = app.response.withStatus;
  // app.context.withHeader = app.response.withHeader;
  // app.context.withHeaders = app.response.withHeaders;

  // get controller instance
  /*app.context.getController = function (name){
    assert(name !== undefined, 'controller name is required.');
    const Controller = app._controller._classes[name];
    assert(Controller !== undefined, `controller ${name} is not found.`);
    const controller = new Controller(this);
    return controller;
  };*/

  app.use(async (ctx, next) => {
    app.context.controller = new Proxy({}, {
      get: function(target, key, receiver){
        assert(key !== undefined, 'controller name is required.');
        const Controller = app._controller._classes[key];
        assert(Controller !== undefined, `controller ${key} is not found.`);
        const controller = new Controller(ctx);
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
    .method('render')
    .method('display')
    .method('send')
    .method('with')
    .method('withStatus')
    .method('withHeader')
    .method('withHeaders');

};
