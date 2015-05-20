var React = require("react");

var App = React.createClass({
    render() {
        return <h1>Hello React</h1>;
    }
})

React.render(<App/>, document.getElementById('example'));