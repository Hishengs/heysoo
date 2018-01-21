const path = require('path');
const Schedule = require('node-schedule');
const { getFolderFiles } = require('./util.js');

exports.init = (appIns) => {
  const app = appIns;
  const { config } = app;
  const schedulePath = `./${config.folder.app}/${config.folder.schedule}/`;
  const files = getFolderFiles(schedulePath);
  const scheduleModule = {};
  for(let i = 0, ilen = files.length; i < ilen; i++){
    const schedule = require(path.join(app.basePath, schedulePath + files[i]));
    scheduleModule[files[i].slice(0, -3)] = Schedule.scheduleJob(schedule.config.cron, schedule.getTask(app));
  }
  app.schedule = app.context.schedule = scheduleModule;

  app.logger.info('schedule init done.');
};
