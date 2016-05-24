#RERN Boilerplate
##What is it?
RERN Boilerplate is a very simple boilerplate set up with:

* RethinkDB
* Express
* React
* Node
* SocketIO

It's designed to be able to quickly begin working with Rethink's changefeeds in tandem with SocketIOs event emitters. 

As users push data in to the database, RethinkDB will alert the server that a change has occurred. This will cause SocketIO to emit a broadcast to all connected clients. React will receive the broadcast, and will then process it. 

The sample app is very simple - there is a 'like' button, and a counter. Whenever the button is pressed, the value will be incremented by 1 in the database. The new value will then be broadcast to all clients, who will then automatically update. AJAX is used to grab the initial value from the server. 

##Issues? What needs to be done? 

There's a lot of work left to do here, but this should be enough to get a project started.

* Database names and connections are currently hardcoded for localhost
* ~~Database will need to create a table if one does not already exist~~
* ~~On initial server launch, the table and entry will be created, but the server will need to be restarted before the changefeed will take effect~~
* Need to implement some sort of hot-loading for changes made to the server to go with thh React hot-loading

##Contributions
If you have anything to add, please do not hesitate to fork and submit a pull request. 
