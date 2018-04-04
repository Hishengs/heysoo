const Koa = require('koa');
const path = require('path');
const assert = require('assert');
const koaBody = require('koa-body');

// extends for Koa
const request = require('./extend/request.js');
const response = require('./extend/response.js');
const context = require('./extend/context.js');

// core modules
const db = require('./db.js');
const view = require('./view.js');
const router = require('./router.js');
const console = require('./console.js');
const service = require('./service.js');
const schedule = require('./schedule.js');
const staticServer = require('./static.js');
const controller = require('./controller.js');
const middleware = require('./middleware.js');

const merge = require('lodash/merge');
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
    // app's start time
    this.startTime = (new Date()).getTime();
    // saved csrf tokens
    this.csrfTokens = [];

    // hooks
    this._beforeHooks = [];
    this._afterHooks = [];

    this.initConfig();

    // console go first
    console.init(this);

    // extends
    request.init(this);
    response.init(this);
    context.init(this);
  }

  /*
  * init config
  * @since 0.0.1
  */
  initConfig() {
    let config = {};

    try {
      config = require(path.join(this.basePath, './config.js'));
    }catch(e) {
      throw new ReferenceError('can not find config file.');
    }

    this.context.config = this.config = merge(defaultConfig, config);
  }

  /*
  * do something before app start
  * @since 0.0.6
  */
  beforeStart (fn){
    assert(typeof fn === 'function', 'beforeStart args must be a function');
    this._beforeHooks.push(fn);
  }

  /*
  * do something after app start
  * @since 0.0.6
  */
  afterStart (fn){
    assert(typeof fn === 'function', 'afterStart args must be a function');
    this._afterHooks.push(fn);
  }

  /*
  * excute hooks, support async function
  * @since 0.0.6
  */
  async excuteHooks (hooks){
    for(const hook of hooks){
      await hook(this);
    }
  }

  /*
  * init app
  * @since 0.0.1
  */
  init() {
    this.console.info('app init');

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

    // middlewares
    this.use(koaBody());
    // log every request time
    if(this.config.logRequestTime){
      this.use(async (ctx, next) => {
        const timestampIn = new Date().getTime();
        this.console.info(`before request: ${timestampIn}`);
        await next();
        const timestampOut = new Date().getTime();
        const timestampGap = this.console.color.green(`+${timestampOut - timestampIn} ms`);
        this.console.info(`after  request: ${timestampOut} ${timestampGap}`);
      });
    }
    // csrf
    if(this.config.csrf.enabled){
      const crypto = require('crypto');
      this.use(async (ctx, next) => {
        const sha1 = crypto.createHash('sha1');
        sha1.update(new Date().getTime().toString());
        const token = sha1.digest('hex').slice(8, 24);
        ctx._csrf = token;
        ctx.app.csrfTokens.push(token);
        await next();
      });
    }

    if(this.config.middleware && this.config.middleware.enabled){
      middleware.init(this);
    }

    // router must be the last
    router.init(this);
  }

  /*
  * start app
  * @since 0.0.1
  * params {Function} callback
  */
  async start(callback) {
    callback = callback || function (){};
    assert(typeof callback === 'function', 'start callback must be a function');

    // invoke hooks before app start
    await this.excuteHooks(this._beforeHooks);

    this.console.info('app start');

    this.init();

    this.console.info(`app is listenning at ${this.config.host}:${this.config.port}`);

    return this.listen(this.config.port, this.config.host, async () => {
      // invoke hooks after app start
      await this.excuteHooks(this._afterHooks);
      // user's callback
      callback();
    });
  }

  /*
  * get app config
  * @since 0.0.1
  */
  getConfig (){
    return this.config;
  }

};
