'use strict';

/**
 * Snake:  ---[(i,j)]-[(i,j)]-[(i,j)]--:>
 */

var OPPOSE = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
};

var DIR = {
  right: 'right',
  up: 'up',
  left: 'left',
  down: 'down'
};

var CRASH = 'CRASHHHH!';

var _slice = Function.prototype.call.bind(Array.prototype.slice);

function genMatrix (w, h) {
  var matrix = [];
  var row = [];

  while (w--)
    row.push(0);

  while (h--)
    matrix.push(_slice(row));

  return matrix;
}

function _getNext (node, lastDir, newDir, w, h) {
  var next;

  newDir = newDir || lastDir;

  switch (newDir) {
    case DIR.right:
      next = node[0] + 1;

      if (next >= w)
        node[0] = 0;
      else
        node[0] = next;
      break;

    case DIR.left:
      next = node[0] - 1;

      if (next < 0)
        node[0] = w - 1;
      else
        node[0] = next;
      break;

    case DIR.down:
      next = node[1] + 1;

      if (next < h)
        node[1] = next;
      else
        node[1] = 0;
      break;

    case DIR.up:
      next = node[1] - 1;

      if (next < 0)
        node[1] = h - 1;
      else
        node[1] = next;
      break;

    default:
      throw new Error(newDir + ' direction is not supported.');
  }

  return node;
}

function _arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;)
      if(arr1[i] !== arr2[i])
        return false;

  return true;
}

function _arrayIn (node, array) {
  return array.some(function (elem) {
    return _arraysEqual(node, elem) ? true : false;
  });
}

/**
 * Given a snake and a direction, computs the
 * next one
 * @param  {array} snake
 * @param  {string} lastDir
 * @param  {string} newDir
 */
function move (snake, lastDir, newDir, w, h) {
  var N = snake.length;
  var next;

  return snake.map(function (node, i, arr) {
    if (snake[i+1])
      return snake[i+1];

    next = _getNext(_slice(node), lastDir, newDir, w, h);

    if (_arrayIn(next, snake))
      return CRASH;

    return next;
  });
}

/**
 * Stamps the snake on the matrix (mutating it).
 * It assumes that snake will fit into the
 * matrix.
 * @param  {[type]} snake  [description]
 * @param  {[type]} matrix [description]
 * @return {[type]}        [description]
 */
function stampOnMatrix (snake, matrix) {
  for (var key in snake)
    matrix[snake[key][1]][snake[key][0]] = 1;

  return matrix;
}

/**
 * Main execution loop. Holds state and logic
 * for processing moves.
 */
// function MainLoop (w, h) {
//   var matrix = [];
//   var snake = [];
//   var dir;
//   var arr;

//   for (var i = 0; i < h; i++) {
//     arr = [];
//     for (var j = 0; j < w; j++)
//       arr.push(0);
//     matrix.push(arr);
//   }

//   snake.push([(Math.random() * w-1 | 0) + 1, (Math.random() * h-1 | 0) + 1]);
//   dir = ['up', 'down', 'left', 'right'][Math.random() * 4 | 0];


//   return {
//     next: function (newDir) {
//       move(snake, dir, newDir, 10, 10);
//       return stampOnMatrix(matrix, snake);
//     }
//   };
// }

/**
 * Bind the loop caller to the interval (might
 * be rAF ... sI ... whatever)
 */
// var game = MainLoop(10, 10);
// setInterval(function () {
//   console.log(game.next('up'));
// }, 500);

module.exports = {
  genMatrix: genMatrix,
  stampOnMatrix: stampOnMatrix,
  move: move,
  DIR: DIR,
  CRASH: CRASH
};
