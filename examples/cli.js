#!/usr/bin/env node

'use strict';

var SnakeGame = require('../src/snake-game');
var DIR = require('../src/snake-array').DIR;
var cbObj = new SnakeGame.CbObj();
var matrix;

setInterval(function () {
  cbObj.emitDir(['up', 'left','right', 'down'][Math.random() * 4 | 0]);
}, 1500);

var game = SnakeGame.prepare(5,5, cbObj);

setInterval(function () {
  matrix = game.next();
  console.log(matrix);
}, 500);
