# matrix-snake

> Play Snake Game in a Javascript Matrix (browser-ready)!

```sh
$ npm install --save snake-matrix
```

or

```sh
$ bower install --save snake-matrix
```

## SnakeGame

`SnakeGame` will expose one method and an object: `prepare` and `CbObj`, respectively.

### ::prepare(w, h, cbObj, onFruintEaten, onCrach)

`prepares` return a `game`, which is an object with only one method: `next`. `next` is what will tick the game so that the next state is generated (collision is detected, as well as new positions).

### ::cbObj

`cbObj` is an emitter object which will signalize whenever a new direction should be handled by the game. It exposes only the `emitDir` method, which takes one string as its argument: `up`, `left`, `right` or `down`.

## Example

Although this might seem a little bit complicated, this is how it works:

```javascript
var SnakeGame = require('../src/snake-game');
// creates an object that will notify our Snake
// Game whenever we want to change the direction
// of the snake.
var cbObj = new SnakeGame.CbObj();

// here we prepare the CbObj to receive, in a
// given interval of 1.5s, random directions.
setInterval(function () {
  cbObj.emitDir(['up', 'left','right', 'down'][Math.random() * 4 | 0]);
}, 1500);

// Prepare the initial gave (5x5 matrix)
var game = SnakeGame.prepare(5,5, cbObj);

// Let the game render itself in an interval of
// .5s
setInterval(function () {
  console.log(game.next());
}, 500);
```

By letting the dev decide how to tick the game and decide on how to signalize a new direction we provide freedom to the way the dev wants to perform this things.
