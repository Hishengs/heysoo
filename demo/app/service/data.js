module.exports = (app) => {
  class DataService extends app.Service {

    constructor(ctx) {
      super(ctx);
      this.onlineUserNum = 2453700;
    }

    getOnlineUserNum() {
      return this.onlineUserNum;
    }

    test (){
      this.ctx.send('this is a test from DataService');
    }

  }
  return DataService;
};
