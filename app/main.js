var React = require('react');
var App = require('./App.js');
window._ = require('lodash');

var trackStore = require('./data/TrackStore.js');
React.render(
  <App
    trackStore={trackStore}
  />, document.getElementById('application')
);