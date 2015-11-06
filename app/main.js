var React = require('react');
var App = require('./App.js');
var TrackStore = require('./TrackStore.js');
React.render(<App tracks={TrackStore.getTracks()}/>, document.getElementById('application'));
