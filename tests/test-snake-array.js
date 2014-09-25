'use strict';

var Snake = require('../src/snake-array');
var assert = require('assert');
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

    describe('w/ one node,', function() {
      it('move to any dir if no last dir passed', function() {
        var snake = [[1,1]];

        snake = move(snake, null, DIR.right, 3, 3);
        assert.deepEqual(snake, [[2,1]]);

        snake = move(snake, null, DIR.up, 3, 3);
        assert.deepEqual(snake, [[2,0]]);

        snake = move(snake, null, DIR.left, 3, 3);
        assert.deepEqual(snake, [[1,0]]);

        snake = move(snake, null, DIR.down, 3, 3);
        assert.deepEqual(snake, [[1,1]]);
      });

      describe('when passing through walls,', function() {
        it('pass through the right', function() {
          var snake = [[2,0]];

          snake = move(snake, null, DIR.right, 3, 3);
          assert.deepEqual(snake, [[0,0]]);
        });

        it('pass through the left', function() {
          var snake = [[0,0]];

          snake = move(snake, null, DIR.left, 3, 3);
          assert.deepEqual(snake, [[2,0]]);
        });

        it('pass through the top', function() {
          var snake = [[0,0]];

          snake = move(snake, null, DIR.up, 3, 3);
          assert.deepEqual(snake, [[0,2]]);
        });

        it('pass through the bottom', function() {
          var snake = [[0,2]];

          snake = move(snake, null, DIR.down, 3, 3);
          assert.deepEqual(snake, [[0,0]]);
        });
      });
    });

    describe('w/ two nodes,', function() {
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

      describe('passing through walls,', function() {
        it('pass by the right', function() {
          var snake = [[2,0], [3,0]];

          snake = move(snake, null, DIR.right, 4, 4);
          assert.deepEqual(snake, [[3,0], [0,0]]);
        });

        it('pass by the top', function() {
          var snake = [[0,1], [0,0]];

          snake = move(snake, null, DIR.up, 4, 4);
          assert.deepEqual(snake, [[0,0], [0,3]]);
        });

        it('pass by the left', function() {
          var snake = [[1,0], [0,0]];

          snake = move(snake, null, DIR.left, 4, 4);
          assert.deepEqual(snake, [[0,0], [3,0]]);
        });

        it('pass by the bottom', function() {
          var snake = [[0,2], [0,3]];

          snake = move(snake, null, DIR.down, 4, 4);
          assert.deepEqual(snake, [[0,3], [0,0]]);
        });
      });
    });

    describe('w/ big num of nodes,', function() {
      it('change direcion', function() {
        var snake = [[0,0], [1,0], [2,0]];

        snake = move(snake, null, DIR.down, 3, 3);
        assert.deepEqual(snake, [[1,0], [2,0], [2,1]]);
      });

      it('colide in itself and detect the colision', function() {
        var snake = [[0,0], [1,0], [2,0], [2,1], [1,1]];

        snake = move(snake, null, DIR.up, 3, 3);
        assert.deepEqual(snake, [[1,0],[2,0],[2,1],[1,1],"CRASHHHH!"]);
      });
    });

  });
});
