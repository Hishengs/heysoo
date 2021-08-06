// default config of Application

module.exports = {
  host: '127.0.0.1',
  port: 8686,
  folder: {
    app: 'app',
    controller: 'controller',
    service: 'service',
    model: 'model',
    view: 'view',
    static: 'static',
    schedule: 'schedule',
    middleware: 'middleware',
  },
  database: {
    enabled: false,     // not enabled by default
    orm: 'sequelize',   // default sequelize, options：sequelize, bookshelf
    type: 'mysql',      // database type, options: mysql | sqlite | postgres | mssql
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    dbname: '',
  },
  view: {
    enabled: false,     // not enabled by default
  },
  static: {
    enabled: false,     // not enabled by default
    path: '/static',
  },
  schedule: {
    enabled: false,     // not enabled by default
  },
  csrf: {
    enabled: false,
    disabledMethods: ['GET', 'HEAD', 'OPTIONS'],
    secret: '',
  },
  debugFlag: 'Heysoo',
  logRequestTime: false
};
