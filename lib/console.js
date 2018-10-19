'use strict';

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

  success(text, ...args) {
    console.log(this.color.green(this.padLeft), text, ...args);
  }

  info(text, ...args) {
    console.log(this.color.blue(this.padLeft), text, ...args);
  }

  log(text, ...args) {
    return this.info(text, ...args);
  }

  warn(text, ...args) {
    console.log(this.color.orange(this.padLeft), text, ...args);
  }

  error(text, ...args) {
    console.log(this.color.red(this.padLeft), text, ...args);
  }

  fail(text, ...args) {
    this.error(text, ...args);
  }

  /*
  * mark log with time
  * @since 0.0.8
  */
  mark(text, ...args) {
    const now = new Date().getTime();
    let timeGap = 0;
    if (this.lastLogTime) {
      timeGap = now - this.lastLogTime;
    }
    this.lastLogTime = now;
    return this.info(text, ...args, this.color.green(` +${timeGap}ms`));
  }

}

module.exports.init = (appIns) => {
  const app = appIns;
  app.console = new Console(app.config.debugFlag, appIns.startTime);
  app.context.console = app.console;
};
