import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client'
const socket = io.connect(window.location.host)

var App = React.createClass({
	getInitialState: function() {
		return {likesCount: 0};
	},
	onLike: function() {
		socket.emit('like');
	},
	componentDidMount: function() {
		socket.on('setLikes', this._setLikes);

		this.serverRequest = $.ajax({
			url: '/likes',
			method: 'GET'
		}).done(function(data){
			console.log(data)
			this.setState({likesCount: data.likes})
		}.bind(this));
	},
	_setLikes: function(newLikeCount){
		this.setState({likesCount: newLikeCount});
	},
  render: function() {
    return (
    <div>
    	<p>React Component 1</p>
    	<p>Likes : {this.state.likesCount}</p>
    	<div>
    		<button onClick={this.onLike}>Like Me</button>
    	</div>
    </div>
    )
  }
})

render(<App/>, document.getElementById('app'));