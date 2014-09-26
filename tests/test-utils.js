'use strict';

var utils = require('../src/utils');
var assert = require('assert');

describe('utils', function() {
  it('be defined', function() {
    assert(!!utils);
    assert(!!utils.genMatrix)
  });

  describe('genMatrix', function() {
    it('generate matrices', function() {
      var actual = utils.genMatrix(3,3);
      var expected = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
      ];

      assert.deepEqual(actual, expected);
    });
  });
});
