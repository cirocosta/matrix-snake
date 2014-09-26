/**
 * @jsx React.DOM
 */

'use strict';

require('../bower_components/react-matrix/dist/react-matrix.css');

var React = require('react/addons');
var Matrix = require('../bower_components/react-matrix/dist/react-matrix');
var SnakeGame = require('./snake-game');
var keymaster = require('keymaster');

var _fruits = 0;
var cbObj = new SnakeGame.CbObj();

var handleFruitEat = function (fruits) {
  _fruits = fruits;
};

keymaster('w,a,s,d', function (e, obj) {
  switch (obj.shortcut) {
    case 'w':
    cbObj.emitDir('up');
    break;
    case 's':
    cbObj.emitDir('down');
    break;
    case 'a':
    cbObj.emitDir('left');
    break;
    case 'd':
    cbObj.emitDir('right');
    break;
  }
});

var game = SnakeGame.prepare(10, 10, cbObj, handleFruitEat);

var App = React.createClass({

  getInitialState () {
    return {
      matrix: game.next()
    };
  },

  componentDidMount () {
    setInterval(() => {
      this.setState({
        matrix: game.next()
      });
    }, 150);
  },

  handleKeyPress () {
    console.log('wow');
  },

  render () {
    return (
      <div onKeyPress={this.handleKeyPress}>
        <Matrix squareSize={20} matrix={this.state.matrix} />
      </div>
    );
  }
});

React.renderComponent(
  <App />,
  document.body
);

window.React = React;
