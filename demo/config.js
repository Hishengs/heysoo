module.exports = {
  debugFlag: 'Hisheng',
  host: 'localhost',
  port: 8001,
  view: {
    enabled: true,
    engine: 'nunjucks',
    manual: true
  },
  static: {
    enabled: true,
    path: '/public', // 路径
    /* path: {
      '/static': 'static',
      '/static2': 'static2',
    }, */
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
  csrf: {
    enabled: true,
  },
  middleware: {
    enabled: true,
    use: ['mw1'],
    options: {
      tag: 'kfc'
    },
  },
  logRequestTime: false
};
