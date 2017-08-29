'use strict';

const path = require('path');
const Schedule = require('node-schedule');
const getFolderFiles = require('./util.js').getFolderFiles;

exports.init = (app) => {
	let config = app.config;
	let schedulePath = `./${config.folder.app}/${config.folder.schedule}/`;
  let files = getFolderFiles(schedulePath);
  let scheduleModule = {};
  for(let i=0,ilen=files.length;i<ilen;i++){
    let schedule = require(path.join(app.basePath,schedulePath+files[i]))
    scheduleModule[files[i].slice(0,-3)] = Schedule.scheduleJob(schedule.config.cron,schedule.getTask(app));
  }
  app.schedule = app.context.schedule = scheduleModule;

  app.debug('schedule init done.');
}