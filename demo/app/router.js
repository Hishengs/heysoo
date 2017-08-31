module.exports = app => {
	app.router.get('/greet',async function(){
		this.ctx.body = 'hello,world'
	})
	app.router.get('/','home.index')
}