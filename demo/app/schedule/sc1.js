module.exports = (schedule, app) => {
  return {
    run () {
      schedule.scheduleJob('5/* * * * * *', () => {
        app.console.info(`I am ${app.name}`);
      });
    },
  };
};
