'use strict';

var Snake = require('./snake-array');
var EventEmitter = require('events').EventEmitter;
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

/**
 * Main execution loop. Holds state and logic
 * for processing moves.
 * @param {number} w [description]
 * @param {number} h [description]
 * @param {CbObj}
 */
function prepare (w, h, cbObj) {
  var INITIAL_MATRIX = Snake.genMatrix(w, h);
  var matrix;
  var snake = [[(Math.random() * w-1 | 0) + 1,
                (Math.random() * h-1 | 0) + 1]];
  var dir = [DIR.up, DIR.down, DIR.left, DIR.right][Math.random() * 4 | 0];
  var newDir = dir;

  cbObj.on('dir', function (dir) {
    newDir = dir;
  });

  return {
    next: function () {
      snake = move(snake, dir, newDir, w, h);
      newDir = newDir || dir;
      dir = newDir;

      return stampOnMatrix(snake, INITIAL_MATRIX);
    }
  };
}

module.exports = {
  prepare: prepare,
  CbObj: CbObj
};
