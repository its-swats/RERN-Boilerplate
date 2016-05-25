var express = require('express');
var app = express();
var r = require('rethinkdbdash')();
var server = app.listen(3000, function(){
	console.log('listening on :3000');
})
var io = require('socket.io').listen(server);
var attachSocket = require('./src/server/socket.js')
var databaseSetup = require('./src/server/database.js');

app.use(express.static('src/client'));
databaseSetup.prepareForLaunch(function(row){
	io.emit('setLikes', row.new_val.likeCount);
});
attachSocket(io);

app.use('/', require('./src/server/routes'))

