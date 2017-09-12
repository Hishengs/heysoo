module.exports = app => {
	app.router.get('/greet',async function(){
		this.ctx.body = 'hello,world'
	}).get('/name',async function(){
		// this.ctx.body = 'Hisheng'
		/*this.ctx.with({
			status: 403,
			header: {
				'Content-Type': 'application/json',
				'hi': 'man'
			}
		}).send('hi man')*/
		console.log(typeof this.ctx.render)
		this.ctx.withStatus(404).send('hi man')
	})
	app.router.get('/','home.index')
	app.router.redirect('/hi','/greet')
	app.router.view('/index','index.html')
	/*app.router.get('/user/:id',function(){
		this.ctx.body = 'user ' + this.ctx.params.id;
	})*/
	// app.router.get('/user/:id',app.controller.home.user)
	app.router.get(/ab?cd/,async function(){
		this.ctx.body = 'ab?cd'
	})

	app.router.group({
		prefix: '/user'
	}, router => {
		router.view('/','user.html');
		router.redirect('/home','/');
		router.get('/name',function(){
			this.ctx.body = 'user group: name'
		})
		router.get('/info',function(){
			this.ctx.body = 'user group: info'
		})
	})

	app.router.group({
		controller: 'home'
	}, router => {
		router.get('/car','car')
		router.get('/van','van')
	})

	app.router.get('/file',async function(){
		const path = require('path')
		this.ctx.download(path.join('./test.png'))
	})
}