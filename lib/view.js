// --------- koa-views -----------

/*const path = require('path');
const koaViews = require('koa-views');

exports.init = (app) => {
  let config = app.config;
  let viewDir = path.join(app.basePath,`./${config.folder.app}/${config.folder.view}`);

  app.use(koaViews(viewDir,{
    map: {
      html: 'nunjucks'
    }
  }));

  app.debug('view init done.');
}*/

// 模板设置
// app.use(koaViews(path.join(app.basePath,`./${config.folder.app}/${config.folder.view}/`),{
//   map: {
//     html: config.view.engine
//   },
//   options: Object.assign({
//     autoescape: true,
//     noCache: true,
//     watch: true
//   },config.view.options)
// }));
// const { join, extname } = require('path');
// function render(template,params){
//   // let ext = path.extname(template) || config.view.extension || '.html';
//   let viewDir = path.join(app.basePath,config.folder.view);
//   return consolidate[config.view.engine](path.join(viewDir,template),params||{});
// }


// --------- nunjucks -----------

const path = require('path');
const consolidate = require('consolidate');

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;
  const viewDir = path.join(app.basePath, `./${config.folder.app}/${config.folder.view}`);

  /*app.context.render = app.response.render = app.context.display = app.response.display = async function(template,params={}){
    params = Object.assign({
      ctx: ctx
    },params);
    this.body = await consolidate[config.view.engine](path.join(viewDir,template),params);
  }*/

  function makeRender() {
    app.debug('makeRender');
    app.use(async (ctx, next) => {
      // ctx.render = ctx.response.render = ctx.display = ctx.response.display = async function (template, params = {}){
      ctx.response.render = ctx.response.display = async function (template, params = {}){
        params = Object.assign({
          ctx,
        }, params);
        ctx.body = await consolidate[config.view.engine](path.join(viewDir, template), params);
      };
      await next();
    });
  }

  function setEngine(engineIns) {
    app.debug('setEngine');
    consolidate.requires[config.view.engine] = engineIns;
    makeRender();
  }

  app.view = {
    setEngine,
  };

  if(!config.view.manual)
    makeRender();

  app.debug('view init done.');
};
