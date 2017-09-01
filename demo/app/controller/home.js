module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			// this.ctx.body = 'Heysoo';
			await this.ctx.render('index.html');
		}

	}
	return new HomeController();
}