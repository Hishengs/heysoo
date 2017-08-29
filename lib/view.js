'use strict';

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

exports.init = (app) => {
	let config = app.config;
	let viewDir = path.join(app.basePath,`./${config.folder.app}/${config.folder.view}`);

	app.context.render = async function(template,params){
		this.body = await consolidate[config.view.engine](path.join(viewDir,template),params||{});
	}

	app.debug('view init done.');
}