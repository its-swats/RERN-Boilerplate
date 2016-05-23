var express = require('express')
var app = express();
var r = require('rethinkdb')
var connection = null
var server = app.listen(3000, function(){
	console.log('listening on :3000')
})
var io = require('socket.io').listen(server);


app.use(express.static('src/client'));

r.connect({host: 'localhost'}, function(err, conn){
	if (err) throw err;
	connection = conn
	r.table('likes').changes().run(conn, function(err, cursor){
		cursor.each(function(err, row){
			if (err) throw err;
			console.log('Updating Clients...')
			io.emit('setLikes', row.new_val.likeCount);
		})
	})
})

io.on('connection', function(socket){
	socket.on('like', function(){
		r.table('likes').get(1).update({
			likeCount: r.row("likeCount").add(1)
		}).run(connection)
	})
})

app.get('/', function(req, res){
	res.sendFile(__dirname, 'index.html')
})


