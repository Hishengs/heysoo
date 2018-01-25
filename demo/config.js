module.exports = {
  debugFlag: 'Hisheng',
  host: 'localhost',
  port: 8001,
  folder: {
    app: 'app',
    controller: 'controller',
    service: 'service',
    model: 'model',
    view: 'view',
    static: 'public',
    schedule: 'schedule'
  },
  view: {
    enabled: true,
    engine: 'nunjucks',
    manual: true
  },
  static: {
    enabled: true,
    path: 'static', // 路径
  },
  database: {
    enabled: false,
    orm: 'sequelize',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '8355189',
    dbname: 'gumi',
  },
  logRequestTime: false
};
