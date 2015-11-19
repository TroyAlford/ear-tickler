var React = require('react');
var App = require('./App.js');
window._ = require('lodash');
window.Ajax = require('./ajax/AjaxHelper.js');

React.render(<App />, document.getElementById('application'));