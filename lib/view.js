const path = require('path');
const koaViews = require('koa-views');

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;
  const viewDir = path.join(app.basePath, `./${config.folder.app}/${config.folder.view}`);

  app.use(koaViews(config.view.root || viewDir, config.view.opts || {
    map: {
      html: 'nunjucks'
    }
  }));

  app.use(async (ctx, next) => {
    ctx.display = ctx.render;
    await next();
  });

  app.console.info('view init done.');
};
