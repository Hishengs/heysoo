module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			// this.ctx.body = 'Heysoo';
			await this.ctx.render('index.html');
		}

		van (){
			// console.log(this.ctx.app.router)
			this.ctx.body = this.ctx.app.router.currentRoute()
		}

		car (){
			this.ctx.body = 'car'
		}

	}
	return new HomeController();
}