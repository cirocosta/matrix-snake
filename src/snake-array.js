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

/**
 * Given a snake and a direction, computs the
 * next one
 * @param  {array} snake
 * @param  {string} lastDir
 * @param  {string} newDir
 */
function move (snake, lastDir, newDir, w, h) {
  var N = snake.length;

  newDir = newDir || lastDir;

  switch (newDir) {
    case DIR.right:
      snake.map(function (x) {
        if (!(w && h))
          return x[0]++;

        var next = x[0] + 1;

        if (next >= w)
          return x[0] = 0;
      });
      break;

    case DIR.left:
      snake.map(function (x) { return x[0]--;});
      break;

    case DIR.down:
      snake.map(function (x) { return x[1]++;});
      break;

    case DIR.up:
      snake.map(function (x) { return x[1]--;});
      break;
    }

  return snake;
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
  DIR: DIR
};
