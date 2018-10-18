'use strict';

module.exports.init = (app) => {

  /*
  * get input from body
  * @since 0.0.1
  */
  app.request.input = function (name, defaultValue = null) {
    return this.body[name] || defaultValue;
  };

};
