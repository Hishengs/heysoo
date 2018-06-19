module.exports = (app) => {

  class IndexController extends app.Controller {

    index() {
      this.ctx.send('Hello World!');
    }

  }

  return IndexController;
};
