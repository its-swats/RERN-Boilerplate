var r = require('rethinkdbdash')();

var attachSocket = function(io){
    io.on('connection', function(socket){
        socket.on('like', function(){
            r.table('likes').get(1).update({
                likeCount: r.row("likeCount").add(1)
            }).run();
        });
    });
};

module.exports = attachSocket;