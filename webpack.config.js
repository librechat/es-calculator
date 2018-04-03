var path = require('path')

module.exports = {
  entry: ['./controller/index'], // .js after index is optional
  output: {
    path: path.join(__dirname, 'controller'),
    filename: 'bundle.js'
  }
}