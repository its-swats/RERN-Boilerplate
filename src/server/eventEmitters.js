var r = require('rethinkdbdash')();

var attachSocket = function(io, activeConnections){
    io.on('connection', function(socket){
        activeConnections += 1
        socket.on('like', function(){
            r.table('likes').get(1).update({
                likeCount: r.row("likeCount").add(1)
            }).run();
        });
        socket.on('disconnect', function(){
            activeConnections -= 1
        })
    });
};

module.exports = attachSocket;