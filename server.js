var express = require('express');
var app = express();
var r = require('rethinkdbdash')();
var connection = null
var server = app.listen(3000, function(){
	console.log('listening on :3000')
})
var io = require('socket.io').listen(server);


app.use(express.static('src/client'));


r.table('likes').get(1).run().then(function(result){
	if (result == null) {
		r.table('likes').insert({id: 1, likeCount: 0}).run()
	}
})

r.table('likes').changes().run().then(function(result){
	result.each(function(err, row){
		console.log('Updating Clients...')
		io.emit('setLikes', row.new_val.likeCount);
	})
})


io.on('connection', function(socket){
	socket.on('like', function(){
		r.table('likes').get(1).update({
			likeCount: r.row("likeCount").add(1)
		}).run(connection)
	})
})

app.get('/likes', function(req, res){
	r.table('likes').get(1).run().then(function(result){
		res.json({likes: result.likeCount})
	})
})

app.get('/', function(req, res){
	res.sendFile(__dirname, 'index.html')
})


