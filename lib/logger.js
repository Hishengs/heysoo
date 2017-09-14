const chalk = require('chalk');

class Logger {

  constructor() {
    this.color = {
      red: chalk.hex('#f04134'),
      orange: chalk.hex('#ffbf00'),
      green: chalk.hex('#00a854'),
      blue: chalk.hex('#108ee9')
      // red: chalk.keyword('red'),
      // orange: chalk.keyword('orange'),
      // green: chalk.keyword('green'),
      // blue: chalk.keyword('blue')
    };
  }

  static get chalk() {
    return chalk;
  }

  static padLeft() {
    return '  ';
  }

  success(text) {
    console.log(this.padLeft + this.color.green(text));
  }

  info(text) {
    console.log(this.padLeft + this.color.blue(text));
  }

  warn(text) {
    console.log(this.padLeft + this.color.orange(text));
  }

  error(text) {
    console.log(this.padLeft + this.color.red(text));
  }

  fail(text) {
    this.error(text);
  }

}

module.exports.init = (appIns) => {
  const app = appIns;
  app.logger = new Logger();
  app.context.logger = app.logger;
};
