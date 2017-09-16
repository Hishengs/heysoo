module.exports = (app) => {

  class HomeController extends app.Controller {

    async index() {
      const userController = this.ctx.getController('user');
      await userController.index();
      // await this.ctx.render('index.html');
    }

    van() {
      this.ctx.body = this.ctx.app.router.currentRoute();
    }

    car() {
      this.ctx.body = 'car';
    }

  }

  return HomeController;
};
