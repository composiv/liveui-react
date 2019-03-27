'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/liveui-react.production.min.js');
} else {
  module.exports = require('./cjs/liveui-react.development.js');
}
