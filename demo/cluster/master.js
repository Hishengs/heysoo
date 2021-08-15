const cluster = require('cluster');
// const http = require('http');
const CPU_NUM = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < CPU_NUM; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  require('./worker');
}