var r = require('rethinkdbdash')();

var attachSocket = function(io, activeConnections){
  //Increases active connections and emits initial state data to client
  var initializeClient = function(socket, id){
    activeConnections += 1
    socket.join(id)
    io.emit('updateClient', {action: 'connectionCount', value: activeConnections})   
    r.table('likes').get(1).run().then(function(result){
      io.to(socket.id).emit('updateClient', {action: 'likesCount', value: result.likeCount})
    });    
  };

  io.on('connection', function(socket){
    //Calls initialize state method for each client that connects
    initializeClient(socket, socket.id)


    //Increments 'like' count, triggering changefeed
    socket.on('like', function(){
      r.table('likes').get(1).update({
        likeCount: r.row("likeCount").add(1)
      }).run();
    });

    //Decrement active users and update clients on disconnection
    socket.on('disconnect', function(){
      activeConnections -= 1;
      io.emit('updateClient', {action: 'connectionCount', 'value': activeConnections});
    });
  });
};



module.exports = attachSocket;