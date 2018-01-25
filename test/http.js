const http = require('http');

const server = http.createServer(function(req, res){
	console.log('GET ' + req.url);
	res.end('hello world');
});
server.on('connect', function(){
	console.log('server on connect');
});
server.on('connection', function(){
	console.log('server on connection');
});
server.on('request', function(){
	console.log('server on request');
});
server.listen(2333, 'localhost', function(){
	console.log('server is listening at localhost:2333');
	console.log('server.listening: ', server.listening);
});