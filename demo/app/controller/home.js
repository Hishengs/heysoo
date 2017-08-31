module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			this.ctx.body = 'Heysoo';
		}

	}
	return new HomeController();
}