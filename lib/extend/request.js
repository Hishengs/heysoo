module.exports.init = (app) => {

  app.request.input = function (name, defaultValue = null){
    return this.body[name] || defaultValue;
  };

};
