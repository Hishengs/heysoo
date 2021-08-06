function sleep (t) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, t * 1000);
  });
}

module.exports = (app) => {

  class IndexController extends app.Controller {

    /* async  */index() {
      // await sleep(0);
      this.ctx.send('Hello World!');
    }

  }

  return IndexController;
};
