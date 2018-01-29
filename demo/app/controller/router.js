module.exports = (app) => {

  class RouterController extends app.Controller {

    async index() {
      this.ctx.send('[router test] index');
    }

    controller (){
      this.ctx.send('[router test] controller');
    }

    routeName (){
      this.ctx.send('[router test] routeName');
      // this.ctx.send(this.ctx.router.currentRouteName());
    }

    redirect (){
      this.ctx.send('[router test] redirect');
    }

    group (){
      this.ctx.send('[router test] group controller');
    }

    groupMixinA (){
      this.ctx.send('[router test] groupMixinA');
    }

    groupMixinB (){
      this.ctx.send('[router test] groupMixinB');
    }

  }

  return RouterController;
};
