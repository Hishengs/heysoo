// default config of Application

module.exports = {
  host: 'localhost',
  port: 86,
  folder: {
    app: 'app',
    controller: 'controller',
    service: 'service',
    model: 'model',
    view: 'view',
    static: 'static',
    schedule: 'schedule',
  },
  database: {
    enabled: false, 			// not enabled by default
    orm: 'sequelize', 		// default sequelize, options：sequelize, bookshelf
    type: 'mysql', 				// database type, options: mysql | sqlite | postgres | mssql
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    dbname: '',
  },
  view: {
    enabled: false, 			// not enabled by default
    engine: 'nunjucks',
    options: {
      autoescape: true,
      noCache: true,
      watch: true
    },
    extension: '.html',
  },
  static: {
    enabled: false, 			// not enabled by default
    path: 'static',
  },
  schedule: {
    enabled: false, 			// not enabled by default
  },
  debugFlag: 'Heysoo',
  logRequestTime: false
};