/**
 * @jsx React.DOM
 */

'use strict';

require('../bower_components/react-matrix/dist/react-matrix.css');

var React = require('react/addons');
var Matrix = require('../bower_components/react-matrix/dist/react-matrix');
var update = React.addons.update;
var INITIAL_MATRIX = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];

var App = React.createClass({
  getInitialState () {
    return {
      matrix: INITIAL_MATRIX
    };
  },

  render () {
    return (
      <Matrix squareSize={20} matrix={this.state.matrix} />
    );
  }
});

React.renderComponent(
  <App />,
  document.getElementById('game')
);

window.React = React;
