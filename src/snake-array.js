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

function getNext (node, lastDir, newDir, w, h) {
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

    next = getNext(Array.prototype.slice.call(node), lastDir, newDir, w, h);

    if (~snake.indexOf(next))
      return CRASH;

    return next;
  });
}

/**
 * Stamps the snake on the matrix (mutating it)
 * @param  {[type]} snake  [description]
 * @param  {[type]} matrix [description]
 * @return {[type]}        [description]
 */
function stampSnakeInMatrix (snake, matrix) {
  var w = matrix[0].length;
  var h = matrix.length;

  for (var key in snake)
    matrix[snake[key][0]][snake[key][0]] = 1;

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
//       return stampSnakeInMatrix(matrix, snake);
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
  move: move,
  getNext: getNext,
  DIR: DIR,
  CRASH: CRASH
};
