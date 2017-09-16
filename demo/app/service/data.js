module.exports = (app) => {
  class DataService extends app.Service {

    constructor(ctx) {
      super(ctx);
      this.onlineUserNum = 2453700;
    }

    getOnlineUserNum() {
      return this.onlineUserNum;
    }

  }
  return DataService;
};
