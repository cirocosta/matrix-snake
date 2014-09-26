'use strict';

/**
 * SnakeGame encapsulates the main game logic,
 * i.e, the `prepare` high-order function and
 * the CbObj object.
 *
 * `prepare` will generate a closure that
 * contains all of the current game logic and
 * state, returning a `next` method that
 * corresponds to each iteration of the game.
 *
 * `CbObj` corresponds to an object that the
 * developer must instantiate to enable emitting
 * 'dir' events to the game through its
 * `emitDir` method.
 */

var Snake = require('./snake-array');
var EventEmitter = require('events').EventEmitter;
var genMatrix = require('./utils').genMatrix;
var inherits = require('util').inherits;

var DIR = Snake.DIR;
var move = Snake.move;
var stampOnMatrix = Snake.stampOnMatrix;
var slice = Function.prototype.call.bind(Array.prototype.slice);

/**
 * Constructor for the CallbackObject. This one
 * needs to be instantiated so that the game is
 * able to receive direction change feedback.
 */
function CbObj () {
  this.directions = [DIR.up, DIR.down, DIR.left, DIR.right];

  EventEmitter.call(this);
}

inherits(CbObj, EventEmitter);

/**
 * Emits the direction if valid
 * @param  {string} dir
 */
CbObj.prototype.emitDir = function(dir) {
  var dI = this.directions.indexOf(dir);

  if (!~dI)
    throw new Error('Invalid Direction');

  this.emit('dir', this.directions[dI]);
};

function _randomCoord (w, h) {
  return [Math.random()*w|0,Math.random()*h|0];
}

/**
 * Main execution loop. Holds state and logic
 * for processing moves.
 * @param {number} w
 * @param {number} h
 * @param {CbObj}
 * @param {Function} onFruitEaten
 * @param {Function} onCrash [description]
 */
function prepare (w, h, cbObj, onFruitEaten, onCrash) {
  var _INITIAL_MATRIX = genMatrix(w, h);
  var _snake = [[(Math.random() * w-1 | 0) + 1,
                (Math.random() * h-1 | 0) + 1]];
  var _fruit = _randomCoord(w, h);
  var _fruits = 0;
  var _crashed = false;
  var dir = [DIR.up, DIR.down, DIR.left, DIR.right][Math.random() * 4 | 0];
  var newDir = dir;

  cbObj.on('dir', function (dir) {
    newDir = dir;
  });

  return {
    next: function () {
      if (_crashed) {
        _snake[_snake.length - 1] = _crashed;
        return stampOnMatrix(_snake, _INITIAL_MATRIX, _fruit);
      }

      _snake = move(_snake, dir, newDir, w, h, _fruit, function () {
        _fruits++;
        _fruit = _randomCoord(w, h);
        onFruitEaten && onFruitEaten(_fruits);
      }, function (node) {
        _crashed = node;
        onCrash && onCrash();
      });
      newDir = newDir || dir;
      dir = newDir;

      return stampOnMatrix(_snake, _INITIAL_MATRIX, _fruit);
    }
  };
}

module.exports = {
  prepare: prepare,
  CbObj: CbObj
};
