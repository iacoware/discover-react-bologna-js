require('babelify/polyfill');

var React = require("react/addons");

var getId = (function() {
	var id = 0;
	return function() {
		return id++;
	};
}());


var TodoItem = React.createClass({
	markAsDone: function() {
		this.props.onDone(this.props.item);
	},

	render: function(){
		var classes = this.props.item.done? 'done' : 'todo';

		return (
			<div className="todo-item">
				<span>
					<input onChange={this.markAsDone} type="checkbox" checked={this.props.item.done}/>
				</span>
				<span className={classes}>{this.props.item.text}</span>
			</div>
		);
	}
});

var TodoList = React.createClass({
	render: function() {
		return (
			<div className="todo-list">
				{this.props.items.map(item => {
					return <TodoItem item={item} onDone={this.props.onDone}/>;
				})}
			</div>
		);
	}
});

var TodoInput = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function() {
		return { text: ''};
	},

	addTodo: function(e) {
		if (e.keyCode !== 13) { return; }
		if (!this.state.text) { return; }

		this.props.onAddTodo(this.state);
		this.setState({text: ''});
	},

	render: function() {
		return (
			<input onKeyDown={this.addTodo} className="todo-input" valueLink={this.linkState('text')} />
		);
	}
});

var Footer = React.createClass({
	render: function() {
		return <h4 style={{textAlign: 'right'}}>{this.props.children}</h4>;
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {
			items: [
				{id: getId(), text: 'Grab a beer', done: false},
				{id: getId(), text: 'Open it', done: false},
				{id: getId(), text: 'Drink it', done: false},
				{id: getId(), text: 'Repeat', done: false},
				{id: getId(), text: 'If you ever get here...', done: false},
				{id: getId(), text: '...you\'re probably drunk', done: false},
			]
		};
	},

	markAsDone: function(item) {
		var found = this.state.items.find(x => x.id === item.id);
		found.done = !found.done;
		this.setState({
			items: this.state.items
		});
	},

	addTodo: function(text) {
		this.state.items.push({id:getId(), text: text, done: false});
		this.setState(this.state);
	},

    render: function() {
        return (
        	<div>
				<h2>Todos</h2>
        		<TodoInput onAddTodo={this.addTodo}/>
        		<TodoList items={this.state.items} onDone={this.markAsDone} />
        		<Footer>Discover React @Bologna JS</Footer>
        	</div>
        );
    }
});

React.render(<App/>, document.getElementById('example'));