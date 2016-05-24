var r = require('rethinkdbdash')();

var prepareForLaunch = function(callback){
	r.table('likes').get(1).run().then(function(result){
		if (result == null) {
			r.table('likes').insert({id: 1, likeCount: 0}).run().then(function(result){
				console.log("Database has been created - launching...")
				launchChangeFeed(callback)
			})
		} else {
			console.log('Database exists - launching...')
			launchChangeFeed(callback)
		}
	}).error(function(err){
		r.tableCreate('likes').run().then(function(result){
			r.table('likes').insert({id: 1, likeCount: 0}).run().then(function(result){
				console.log("Database has been created - launching...")
				launchChangeFeed(callback)
			})
		})
	})
}

var launchChangeFeed = function(callback){
	r.table('likes').changes().run().then(function(result){
		console.log('Connected to Change Feed')
		result.each(function(err, row){
			console.log('Updating Clients...')
			callback(row)
		})
	})
}

module.exports.prepareForLaunch = prepareForLaunch;