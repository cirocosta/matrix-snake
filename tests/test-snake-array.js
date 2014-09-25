'use strict';

var Snake = require('../src/snake-array');
var assert = require('assert');
var fixtures = require('./fixtures');
var DIR = Snake.DIR;

describe('snake', function() {
	it('be defined', function() {
		assert(!!Snake);
	});

  describe('.move', function() {
    var move = Snake.move;

    it('be defined', function() {
      assert(!!move);
    });

    describe('w/ one node', function() {
      it('move to any dir if no last dir passed', function() {
        var snake = [[1,1]];

        snake = move(snake, null, DIR.right);
        assert.deepEqual(snake, [[2,1]]);

        snake = move(snake, null, DIR.up);
        assert.deepEqual(snake, [[2,0]]);

        snake = move(snake, null, DIR.left);
        assert.deepEqual(snake, [[1,0]]);

        snake = move(snake, null, DIR.down);
        assert.deepEqual(snake, [[1,1]]);
      });

      describe('when passing through walls', function() {
        it('pass through the right', function() {
          var snake = [[2,0]];

          snake = move(snake, null, DIR.right, 3, 3);
          assert.deepEqual(snake, [[0,0]]);
        });
      });
      it('pass through the left', function() {
        var snake = [[2,0]];

        snake = move(snake, null, DIR.right, 3, 3);
        assert.deepEqual(snake, [[0,0]]);
      });
    });

    describe('w/ two or more nodes', function() {
      it('move only to non oppose dir', function() {
        var snake = [[1,1], [2,1]];

        snake = move(snake, DIR.right, DIR.right);
        assert.deepEqual(snake, [[2,1], [3,1]]);

        snake = move(snake, DIR.left, DIR.right);
        assert.deepEqual(snake, [[3,1], [4,1]]);
      });

      it('continue going to the last dir if no newDir', function() {
        var snake = [[1,1], [2,1]];

        snake = move(snake, DIR.right);
        assert.deepEqual(snake, [[2,1], [3,1]]);
      });
    });
  });
});
