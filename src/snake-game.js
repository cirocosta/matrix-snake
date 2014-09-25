'use strict';

var Snake = require('./snake-array');
var DIR = Snake.DIR;
var move = Snake.move;
var stampOnMatrix = Snake.stampOnMatrix;
var slice = Function.prototype.call.bind(Array.prototype.slice);

/**
 * Main execution loop. Holds state and logic
 * for processing moves.
 */
function prepare (w, h, dirCallback) {
  var INITIAL_MATRIX = Snake.genMatrix(w, h);
  var matrix;
  var snake = [[(Math.random() * w-1 | 0) + 1,
                (Math.random() * h-1 | 0) + 1]];
  var dir = [DIR.up, DIR.down, DIR.left, DIR.right][Math.random() * 4 | 0];

  return {
    next: function (newDir) {
      snake = move(snake, dir, newDir, w, h);
      newDir = newDir || dir;
      dir = newDir;

      return stampOnMatrix(snake, INITIAL_MATRIX);
    }
  };
}

module.exports = {
  prepare: prepare
};
