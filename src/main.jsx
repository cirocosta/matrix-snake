/**
 * @jsx React.DOM
 */

'use strict';

require('../bower_components/react-matrix/dist/react-matrix.css');
require('./raf-shim');

var React = require('react/addons');
var Matrix = require('../bower_components/react-matrix/dist/react-matrix');
var SnakeGame = require('./snake-game');
var keymaster = require('keymaster');

var _fruits = 0;
var cbObj = new SnakeGame.CbObj();

var handleFruitEat = (fruits) => {
  _fruits = fruits;
};

var handleCrash = () => {
  alert('Crash! Press refresh for playing again!');
}


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

var game = SnakeGame.prepare(10, 10, cbObj, handleFruitEat, handleCrash);

var App = React.createClass({

  getInitialState () {
    return {
      matrix: game.next()
    };
  },

  gameTick () {
    setTimeout(() => {
      this.setState({
        matrix: game.next()
      });
      requestAnimationFrame(this.gameTick);
    }, 100);
  },

  componentDidMount () {
    this.gameTick();
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
