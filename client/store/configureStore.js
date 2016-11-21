if (process.env.NODE_ENV === 'production') {
  console.log(process.env.NODE_ENV);
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
