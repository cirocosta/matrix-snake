module.exports = {
  entry: './src/snake-game.js',
  output: {
    path: __dirname + '/dist',
    filename: 'matrix-snake.js',
    libraryTarget: 'umd',
    library: 'SnakeGame'
  }
};
