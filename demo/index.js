require('babel-core/register')({
  // "presets": ['es2015'],
  plugins: ["transform-async-to-generator"]
});

require('./boot.js');
