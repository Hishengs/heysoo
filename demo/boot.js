const Heysoo = require('../index.js');

const app = new Heysoo();

app.hook((app) => {
  const nunjucks = require('nunjucks');
  app.view.setEngine(nunjucks.configure({
    autoescape: true,
    noCache: true
  }));
  /*app.use(async (ctx, next) => {
    console.log(ctx.status);
    if(ctx.status === 404){
      await ctx.render('404.html');
    }
    await next();
  });*/
});

app.start();
