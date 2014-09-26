'use strict';

var _slice = Function.prototype.call.bind(Array.prototype.slice);

/**
 * Generates a matrix given Width and Height
 * @param  {number} w
 * @param  {number} h
 * @return {array}
 */
function _genMatrix (w, h) {
  var matrix = [];
  var row = [];

  while (w--)
    row.push(0);

  while (h--)
    matrix.push(_slice(row));

  return matrix;
}

/**
 * Deeply compares two arrays
 * @param  {array} arr1
 * @param  {array} arr2
 * @return {bool}
 */
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

module.exports = {
  slice: _slice,
  arrayIn: _arrayIn,
  arraysEqual: _arraysEqual,
  genMatrix: _genMatrix
};
