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
  app.context.getController = function (name){
    const Controller = app.controller._classes[name];
    assert(name !== undefined, 'controller name is required.');
    assert(Controller !== undefined, `controller ${name} is not found.`);
    const controller = new Controller(this);
    return controller;
  };

  delegate(app.context, 'response')
    .method('done')
    .method('doneWithError')
    .method('download')
    .method('json')
    .method('send')
    .method('with')
    .method('withStatus')
    .method('withHeader')
    .method('withHeaders');

};
