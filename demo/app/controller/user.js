module.exports = (app) => {

  class UserController extends app.Controller {

    async index() {
      await this.ctx.render('user.html');
    }

  }

  return UserController;
};
