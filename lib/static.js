'use strict';

const Koa = require('koa');
const path = require('path');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

exports.init = (app) => {
	const config = app.config;
	// 静态文件伺服
	const staticServer = new Koa();
	staticServer.use(koaStatic(path.join(app.basePath,`./${config.folder.app}/${config.folder.static}/`)));
	app.use(koaMount('/'+config.static.path,staticServer));

	app.debug('static init done.');
}