const fs = require('fs');
const path = require('path');
const assert = require('assert');

module.exports.init = (app) => {
  const { config } = app;
  const middlewarePath = `./${config.folder.app}/${config.folder.middleware}/`;
  // check if middleware folder existed
  assert(fs.existsSync(path.join(app.basePath, middlewarePath)), 'middleware folder not exists');

  const middlewareNames = config.middleware.use || [];
  assert(middlewareNames instanceof Array, 'middleware.use must be an array');

  for(const name of middlewareNames){
    const middleware = require(path.join(app.basePath, middlewarePath + name));
    app.use(middleware);
  }

  app.context.middleware = config.middleware;

  app.console.info('middleware init done.');
};
