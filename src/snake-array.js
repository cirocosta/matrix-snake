'use strict';

/** In our case, Snake is represented as a array
 * of arrays.
 *
 * Snake: ---[(i,j)]-[(i,j)]-[(i,j)]--:>
 *
 * For each array inside the Snake element, the
 * first element will correspond to the X and
 * the second to the Y coordinate, having the
 * (0,0) point fixed at the upper left of the
 * matrix that represents our coordinate system.
 *
 * One might notice that this is different from
 * the matrix representation that we generally
 * take in javascript, where the second element
 * in the array represents horizontal move in a
 * matrix and the first the vertical. For
 * converting snake notation to the convetional
 * we just have to swap the indexes (see
 * stampOnMatrix method).
 */

var utils = require('./utils');

/**
 * Constants
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

/**
 * Given the last direction and the new
 * direction (+ matrix width and height), get
 * the coordinates of the next position.
 * @param  {array} node
 * @param  {DIR} lastDir
 * @param  {DIR} newDir
 * @param  {number} w
 * @param  {number} h
 * @return {array}
 */
function _getNext (node, lastDir, newDir, w, h) {
  var next;

  newDir = newDir || lastDir;

  if (OPPOSE[lastDir] === newDir)
    newDir = lastDir;

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
 * Public
 */



/**
 * Given a snake and a direction, computs the
 * next representation of the snake. (immutable).
 * @param  {array} snake
 * @param  {string} lastDir
 * @param  {string} newDir
 * @param {array} fruit coordinate of the current fruit
 */
function move (snake, lastDir, newDir, w, h, fruit, onFruitEaten, crashCallback) {
  var next;
  var newSnake;
  var fruitEaten = false;

  newSnake = snake.map(function (node, i) {
    if (snake[i+1])
      return snake[i+1];

    next = _getNext(utils.slice(node), lastDir, newDir, w, h);

    if (utils.arrayIn(next, snake))
      return (crashCallback && crashCallback(), CRASH);

    if (fruit && utils.arraysEqual(fruit, next))
      (fruitEaten = true, onFruitEaten && onFruitEaten());

    return next;
  });

  if (fruitEaten)
    newSnake.unshift(snake[0]);

  return newSnake;
}

/**
 * Stamps the snake on the matrix.
 * It assumes that snake will fit into the
 * matrix. (Immutable).
 * @param  {[type]} snake
 * @param  {[type]} matrix
 * @return {[type]}
 */
function stampOnMatrix (snake, matrix, fruit) {
  var newMatrix = JSON.parse(JSON.stringify(matrix));

  for (var key in snake)
    newMatrix[snake[key][1]][snake[key][0]] = 1;
  fruit && (newMatrix[fruit[1]][fruit[0]] = 1);

  return newMatrix;
}


module.exports = {
  DIR: DIR,
  CRASH: CRASH,
  stampOnMatrix: stampOnMatrix,
  move: move
};
