module.exports.init = (app) => {

  app.response.done = function (data = null, errorLevel = 0, msg = null){
    this.body = {
      err: {
        level: errorLevel,
        msg
      },
      data
    };
  };

  app.response.doneWithError = function (errMsg = null){
    this.done(null, 3, errMsg);
  };

  app.response.download = function (filepath){
    const fs = require('fs');
    const fileData = fs.readFileSync(filepath);
    let lastIndex = filepath.lastIndexOf('\\');
    lastIndex = lastIndex === -1 ? filepath.lastIndexOf('/') : lastIndex;
    const filename = lastIndex === -1 ? filepath : filepath.slice(lastIndex + 1);
    this.set('Content-disposition', 'attachment;filename=' + filename);
    this.body = fileData;
  };

  app.response.json = function (json){
    // util from https://github.com/koajs/is-json
    function isJSON(body) {
      if (!body) return false;
      if (typeof body === 'string') return false;
      if (typeof body.pipe === 'function') return false;
      if (Buffer.isBuffer(body)) return false;
      return true;
    }
    if(!isJSON(json))
      throw new TypeError('not valid json');
    else {
      if (!this.get('Content-Type')) {
        this.set('Content-Type', 'application/json');
      }
      this.body = json;
    }
  };

  app.response.send = function (data = ''){
    this.body = data;
  };

  app.response.with = function (setting){
    // HTTP STATUS
    if(setting.status)
      this.status = setting.status;
    // HTTP HEADER
    if(setting.header || setting.headers){
      const headers = setting.header || setting.headers;
      this.set(headers);
    }
    return this;
  };

  app.response.withStatus = function (statusCode){
    return this.with({
      status: statusCode
    });
  };

  app.response.withHeader = app.response.withHeaders = function (header){
    return this.with({
      header
    });
  };

};
