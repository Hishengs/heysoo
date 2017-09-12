'use strict';

const Koa = require('koa');
const path = require('path');
const debug = require('debug');
const koaBody = require('koa-body');

// extends for Koa
const request = require('./extend/request.js');
const response = require('./extend/response.js');
const context = require('./extend/context.js');

// core modules
const db = require('./db.js');
const view = require('./view.js');
const router = require('./router.js');
const service = require('./service.js');
const schedule = require('./schedule.js');
const staticServer = require('./static.js');
const controller = require('./controller.js');

module.exports = class Heysoo extends Koa {

  constructor (opts){
    super();

    this.opts = Object.assign({
      // debugFlag: 'Heysoo',
    },opts || {});

    this._version = '1.0.0';
    this._name = 'Heysoo';
    this._author = 'Hisheng';

    this.basePath = process.cwd();

    this.hooks = [];

    this.middlewares = [];

    // extends
    request.init(this);
    response.init(this);
    context.init(this);

    this.initConfig();

    this.initDebug();
  }

  initConfig (){
    const defaultConfig = {
      host: 'localhost',
      port: 86,
      folder: {
        app: 'app',
        controller: 'controller',
        service: 'service',
        model: 'model',
        view: 'view',
        static: 'static',
        schedule: 'schedule'
      },
      database: {
        enabled: false, // not enabled by default
        orm: 'sequelize', // default sequelize, options：sequelize, bookshelf
        type: 'mysql', // database type, options: mysql | sqlite | postgres | mssql
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        dbname: '',
      },
      view: {
        enabled: false, // not enabled by default
        engine: 'nunjucks',
        options: {
          autoescape: true,
          noCache: true,
          watch: true
        },
        extension: '.html',
      },
      static: {
        enabled: false, // not enabled by default
        path: 'static',
      },
      schedule: {
        enabled: false, // not enabled by default
      },
      debugFlag: 'Heysoo',
      logRequestTime: false
    }

    let config = {};

    try {
      config = require(path.join(this.basePath,`./config.js`));
    }catch (e){
      throw new ReferenceError('can not find config file.');
    }

    this.context.config = this.config = Object.assign(defaultConfig,config);
  }

  initDebug (){
    // process.env.DEBUG = 'heysoo,-not_this';
    this.context.debug = this.debug = debug(this.config.debugFlag+':app');
  }

  hook (hook){
    if(typeof hook !== 'function')throw TypeError('Hook must be a function.');
    this.hooks.push(hook);
  }

  init (){
    this.debug('app init');

    this.Service = service.baseClass;
    service.init(this);

    this.Controller = controller.baseClass;
    controller.init(this);

    if(this.config.view && this.config.view.enabled)
      view.init(this);

    if(this.config.static && this.config.static.enabled)
      staticServer.init(this);

    if(this.config.database && this.config.database.enabled)
      db.init(this);

    if(this.config.schedule && this.config.schedule.enabled)
      schedule.init(this);

    // invoke hooks
    this.hooks.forEach((hook) => {
      hook(this);
    });

    // middlewares
    this.use(koaBody());

    // ctx injection
    this.use(async (ctx,next) => {
      this.Controller.prototype.ctx = ctx;
      this.Service.prototype.ctx = ctx;
      await next();
    });

    if(this.config.logRequestTime)
      this.use(async (ctx,next) => {
        console.log(process.env.DEBUG);
        this.debug('before request =>',new Date().getTime());
        await next();
        this.debug('after request =>',new Date().getTime());
      });

    // router must be the last
    router.init(this);
  }

  start (){
    this.debug('app start');

    this.init();
    
    return this.listen(this.config.port,this.config.host);
  }

}