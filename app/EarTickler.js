var React    = require('react');
var ReactDOM = require('react-dom');
var Fluxxor  = require('fluxxor');
var _        = require('lodash');

var Application     = require('./Application.js');
var TrackStore      = require('./stores/TrackStore.js');
var PlayerStore     = require('./stores/PlayerStore.js');
var VisualizerStore = require('./stores/VisualizerStore.js');

var stores = {
  PlayerStore: new PlayerStore(),
  TrackStore: new TrackStore(),
  VisualizerStore: new VisualizerStore()
};
var actions = {};
Object.keys(stores).forEach(function(key) {
  _.extend(actions, stores[key].actions);
});

window.flux = new Fluxxor.Flux(stores, actions);
flux.on('dispatch', function(type, payload) {
  console && console.log && console.log('[Dispatch]', type, payload);
});

ReactDOM.render(<Application flux={flux} />, document.getElementById('application'));