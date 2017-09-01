module.exports = app => {
	app.router.get('/greet',async function(){
		this.ctx.body = 'hello,world'
	}).get('/name',async function(){
		this.ctx.body = 'Hisheng'
	})
	app.router.get('/','home.index')
	app.router.redirect('/hi','/greet')
	app.router.view('/index','index.html')
	app.router.get('/user/:id',function(){
		this.ctx.body = 'user ' + this.ctx.params.id;
	})
}