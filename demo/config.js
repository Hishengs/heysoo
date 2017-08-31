module.exports = {
  host: 'localhost',
  port: 86,
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
    engine: 'nunjucks',
    options: {
      autoescape: true,
      noCache: true,
      watch: true
    },
    extension: '.html',
  },
  static: {
    path: 'static', // 路径
  }
}
