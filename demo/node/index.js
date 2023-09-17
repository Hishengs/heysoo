const server = require('node:http').createServer(function (req, res) {
  res.end('hello world!');
});

server.listen(7008, () => {
  console.log('server is start at 7008');
});