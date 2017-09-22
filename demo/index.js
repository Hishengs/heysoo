require('babel-core/register');

const Heysoo = require('../index.js');

const app = new Heysoo();

app.hook(app => {
	const nunjucks = require('nunjucks');
	app.view.setEngine(nunjucks.configure({
		autoescape: true,
		noCache: true
	}));
});
	
app.start();