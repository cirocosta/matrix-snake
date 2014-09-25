#!/usr/bin/env node

'use strict';

var SnakeGame = require('../src/snake-game');
var DIR = require('../src/snake-array').DIR;
var game = SnakeGame.prepare(5,5);
var matrix;


setInterval(function () {
  matrix = game.next();
  console.log(matrix);
}, 500);
