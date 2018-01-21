const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');

// extends for Koa
const request = require('./extend/request.js');
const response = require('./extend/response.js');
const context = require('./extend/context.js');

// core modules
const db = require('./db.js');
const view = require('./view.js');
const router = require('./router.js');
const logger = require('./logger.js');
const service = require('./service.js');
const schedule = require('./schedule.js');
const staticServer = require('./static.js');
const controller = require('./controller.js');

const merge  = require('lodash/merge');
const defaultConfig = require('./default-config.js');
const packageInfo = require(path.join(__dirname, '../package.json'));

module.exports = class Heysoo extends Koa {

  constructor(opts) {
    super();

    this.opts = Object.assign({
      // debugFlag: 'Heysoo',
    }, opts || {});

    this.version = packageInfo.version;
    this.name = 'Heysoo';
    this.author = 'Hisheng';

    // the base path of the running app
    this.basePath = process.cwd();

    this.hooks = [];

    this.middlewares = [];

    this.initConfig();

    // logger go first
    logger.init(this);

    // extends
    request.init(this);
    response.init(this);
    context.init(this);
  }

  initConfig() {
    let config = {};

    try {
      config = require(path.join(this.basePath, './config.js'));
    }catch(e) {
      throw new ReferenceError('can not find config file.');
    }

    this.context.config = this.config = merge(defaultConfig, config);
  }

  hook(hook) {
    if(typeof hook !== 'function')throw TypeError('Hook must be a function.');
    this.hooks.push(hook);
  }

  init() {
    this.logger.info('app init');

    service.init(this);

    controller.init(this);

    if(this.config.view && this.config.view.enabled){
      view.init(this);
    }

    if(this.config.static && this.config.static.enabled){
      staticServer.init(this);
    }

    if(this.config.database && this.config.database.enabled){
      db.init(this);
    }

    if(this.config.schedule && this.config.schedule.enabled){
      schedule.init(this);
    }

    // invoke hooks
    this.hooks.forEach((hook) => {
      hook(this);
    });

    // middlewares
    this.use(koaBody());

    if(this.config.logRequestTime){
      this.use(async (ctx, next) => {
        const timestampIn = new Date().getTime();
        this.logger.info(`before request: ${timestampIn}`);
        await next();
        const timestampOut = new Date().getTime();
        const timestampGap = this.logger.color.green(`+${timestampOut - timestampIn} ms`);
        this.logger.info(`after  request: ${timestampOut} ${timestampGap}`);
      });
    }

    // router must be the last
    router.init(this);
  }

  start() {
    this.logger.info('app start');

    this.init();

    this.logger.info(`app is listenning at ${this.config.host}:${this.config.port}`);

    return this.listen(this.config.port, this.config.host);
  }

  // get application config
  getConfig (){
    return this.config;
  }

};
