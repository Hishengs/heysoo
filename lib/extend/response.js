module.exports.init = (app) => {

  /*
  * ouput data with uniform format which like:
  * {
  *   err: {
  *     level: {Integer} level of err, 0: no err, 1: info, 2: warning, 3: error
  *     msg: {String|Error} message with any error level
  *   },
  *   data: {Any},
  * }
  * @since 0.0.1
  */
  app.response.done = function (data = null, errorLevel = 0, msg = null){
    msg = msg instanceof Error ? msg.stack : msg;
    this.body = {
      err: {
        level: errorLevel,
        msg
      },
      data
    };
  };

  /*
  * short hand of this.done(null, 3, errMsg)
  * @since 0.0.1
  */
  app.response.doneWithError = function (errMsg = null){
    this.done(null, 3, errMsg);
  };

  /*
  * download files
  * @since 0.0.1
  */
  app.response.download = function (filepath){
    const fs = require('fs');
    const fileData = fs.readFileSync(filepath);
    let lastIndex = filepath.lastIndexOf('\\');
    lastIndex = lastIndex === -1 ? filepath.lastIndexOf('/') : lastIndex;
    const filename = lastIndex === -1 ? filepath : filepath.slice(lastIndex + 1);
    this.set('Content-disposition', 'attachment;filename=' + filename);
    this.body = fileData;
  };

  /*
  * output json format data
  * @since 0.0.1
  */
  app.response.json = function (json){
    // util from https://github.com/koajs/is-json
    function isJSON(body) {
      if (!body) return false;
      if (typeof body === 'string') return false;
      if (typeof body.pipe === 'function') return false;
      if (Buffer.isBuffer(body)) return false;
      return true;
    }
    if(!isJSON(json)){
      throw new TypeError('not valid json');
    }else {
      if (!this.get('Content-Type')) {
        this.set('Content-Type', 'application/json');
      }
      this.body = json;
    }
  };

  /*
  * send data directly
  * @since 0.0.1
  */
  app.response.send = function (data = null){
    this.body = data;
  };

  /*
  * response with status code or header, chain use
  * @since 0.0.1
  */
  app.response.with = function (setting){
    // HTTP STATUS
    if(setting.status){
      this.status = setting.status;
    }
    // HTTP HEADER
    const headers = setting.header || setting.headers;
    if(headers){
      this.set(headers);
    }
    return this;
  };

  /*
  * response with status code
  * @since 0.0.1
  */
  app.response.withStatus = function (statusCode){
    return this.with({
      status: statusCode
    });
  };

  /*
  * response with status header
  * @since 0.0.1
  */
  app.response.withHeader = app.response.withHeaders = function (header){
    return this.with({
      header
    });
  };

};
