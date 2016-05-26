import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client'
const socket = io.connect(window.location.host)

var App = React.createClass({
	getInitialState: function() {
		return {likesCount: 0, connectionCount: 0};
	},
	onLike: function() {
		socket.emit('like');
	},
	componentDidMount: function() {
		socket.on('updateClient', this._updateClient);
	},
	_updateClient: function(data){
		this.setState({[data.action]: data.value});
	},
  render: function() {
    return (
    <div>
    	<p>React Component 1</p>
        <p>Active Connections: {this.state.connectionCount}</p>
    	<p>Likes : {this.state.likesCount}</p>
    	<div>
    		<button onClick={this.onLike}>Like Me</button>
    	</div>
    </div>
    )
  }
})

render(<App/>, document.getElementById('app'));