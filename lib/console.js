const chalk = require('chalk');

class Console {

  constructor(flag = 'Heysoo', startTime = null) {
    this.color = {
      red: chalk.hex('#f04134'),
      orange: chalk.hex('#ffbf00'),
      green: chalk.hex('#00a854'),
      blue: chalk.hex('#108ee9')
    };
    this.padLeft = `>>> ${flag} `;
    this.lastLogTime = startTime;
  }

  static get chalk() {
    return chalk;
  }

  success(text) {
    console.log(this.color.green(this.padLeft) + (text));
  }

  info(text) {
    const now = new Date().getTime();
    let timeGap = 0;
    if(this.lastLogTime){
      timeGap = now - this.lastLogTime;
    }
    this.lastLogTime = now;
    console.log(this.color.blue(this.padLeft) + (text) + ` +${timeGap}ms`);
  }

  log (text){
    return this.info(text);
  }

  warn(text) {
    console.log(this.color.orange(this.padLeft) + (text));
  }

  error(text) {
    console.log(this.color.red(this.padLeft) + (text));
  }

  fail(text) {
    this.error(text);
  }

}

module.exports.init = (appIns) => {
  const app = appIns;
  app.console = new Console(app.config.debugFlag, appIns.startTime);
  app.context.console = app.console;
};
