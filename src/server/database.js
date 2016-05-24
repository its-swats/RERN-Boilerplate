var r = require('rethinkdbdash')();

var prepareForLaunch = function(callback){
	r.tableList().run().then(function(result){
		if (result.length > 0) {
			launchChangeFeed(callback)
		} else {
			initializeDatabase(callback)
		}
	})
}

var launchChangeFeed = function(callback){
	r.table('likes').changes().run().then(function(result){
		console.log('Connected to Change Feed');
		result.each(function(err, row){
			console.log('Updating Clients...');
			callback(row);
		});
	});
}

var initializeDatabase = function(callback){
	r.tableCreate('likes').run().then(function(result){
		r.table('likes').insert({id: 1, likeCount: 0}).run().then(function(result){
			console.log("Database has been created - launching...");
			launchChangeFeed(callback);
		});
	})
}

	module.exports.prepareForLaunch = prepareForLaunch;