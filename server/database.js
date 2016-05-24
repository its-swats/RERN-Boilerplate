var r = require('rethinkdb')

var databaseSetup = function(){
	r.connect({host: 'localhost'}, function(err, conn){
		if (err) throw err;
		connection = conn
		r.table('likes').get(1).run(conn, function(err, cursor){
			if (cursor == null) {
				r.table('likes').insert({id: 1, likeCount: 0}).run(conn)
			}
		})
		r.table('likes').changes().run(conn, function(err, cursor){
			cursor.each(function(err, row){
				if (err) throw err;
				console.log('Updating Clients...')
				io.emit('setLikes', row.new_val.likeCount);
			})
		})
	})
}

module.exports.databaseSetup = databaseSetup