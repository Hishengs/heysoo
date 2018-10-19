const path = require('path');
const { getFolderFiles } = require('./util.js');

exports.init = (appIns) => {
  let NodeSchedule;
  try {
    NodeSchedule = require('node-schedule');
  }catch (e){
    app.console.error('[ERROR] Please install node-schedule first.');
    throw e;
  }

  const app = appIns;
  const { config } = app;
  const schedulePath = `./${config.folder.app}/${config.folder.schedule}/`;
  const files = getFolderFiles(schedulePath);
  const scheduleModule = {};
  for(let i = 0, ilen = files.length; i < ilen; i++){
    const getScheduleObj = require(path.join(app.basePath, schedulePath + files[i]));
    scheduleModule[files[i].slice(0, -3)] = getScheduleObj(NodeSchedule, app);
  }
  app.schedule = app.context.schedule = scheduleModule;
  app.nodeSchedule = app.context.nodeSchedule = NodeSchedule;

  app.console.mark('schedule init done.');
};
