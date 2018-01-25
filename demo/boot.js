const Heysoo = require('../index.js');

const app = new Heysoo();

// app.hook((app) => {
//   const nunjucks = require('nunjucks');
//   app.view.setEngine(nunjucks.configure({
//     autoescape: true,
//     noCache: true
//   }));
// });

app.beforeStart(async (app) => {
	app.console.warn('this is a hook before app start, needs 3 seconds');
	await new Promise((r, j) => {
		setTimeout(() => {
			app.console.success('done, go next');
			r();
		}, 3000);
	});
});
app.beforeStart(async (app) => {
	app.console.warn('this is a hook before app start, needs 5 seconds');
	await new Promise((r, j) => {
		setTimeout(() => {
			app.console.success('done, go next');
			r();
		}, 5000);
	});
});

app.afterStart(async (app) => {
	app.console.warn('this is a hook after app start, needs 2 seconds');
	await new Promise((r, j) => {
		setTimeout(() => {
			app.console.success('done, go next');
			r();
		}, 2000);
	});
});

app.start(() => {
	console.log('server is start');
});
