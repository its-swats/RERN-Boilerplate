var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('src/client'));

app.get('/', function(req, res){
	res.sendFile(__dirname, '/src/client/index.html')
})

app.listen(3000, function(){
	console.log('listening on :3000')
})