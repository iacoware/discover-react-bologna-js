require('babelify/polyfill');
var React = require("react/addons");

/*------------ helpers ------------*/
var getId = (function() {
	var id = 0;
	return function() {
		return id++;
	};
}());

var Footer = React.createClass({
	render: function() {
		return <h4 className="footer">{this.props.children}</h4>;
	}
});


/*-------- App components ---------*/
var TodoItem = React.createClass({
	toggleDone: function() {
		this.props.onToggleDone(this.props.item);
	},

	render: function(){
		var classes = this.props.item.done? 'done' : 'todo';

		return (
			<div className="todo-item">
				<span>
					<input onChange={this.toggleDone} type="checkbox" checked={this.props.item.done}/>
				</span>
				<span className={classes}>{this.props.item.text}</span>
			</div>
		);
	}
});

var TodoList = React.createClass({
	propTypes: {
		items: React.PropTypes.array.isRequired
	},

	render: function() {
		return (
			<div className="todo-list">
				{this.props.items.map(item => {
					return <TodoItem key={item.id} item={item}
									 onToggleDone={this.props.onToggleDone}/>;
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

		this.props.onAddTodo(this.state.text);
		this.setState({text: ''});
	},

	render: function() {
		return (
			<input
				onKeyDown={this.addTodo}
				className="todo-input"
				valueLink={this.linkState('text')}
				autoFocus={true} />
		);
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

	toggleDone: function(item) {
		var found = this.state.items.find(x => x.id === item.id);
		found.done = !found.done;
		this.setState(this.state.items);
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
        		<TodoList items={this.state.items} onToggleDone={this.toggleDone} />
        		<Footer>Discover React @Bologna JS</Footer>
        	</div>
        );
    }
});

React.render(<App/>, document.getElementById('example'));