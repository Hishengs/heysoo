const Heysoo = require('../../index.js');

const app = new Heysoo();

app.start(() => {
  app.console.info('server is start');
});
