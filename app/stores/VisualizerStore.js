var Fluxxor = require('fluxxor'),
          _ = require('lodash');

var Guid = require('../helpers/Guid.js');

var events = {
  Add:    'store.visualizer.add',
  Remove: 'store.visualizer.delete',
  Update: 'store.visualizer.update'
};

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.players = {};
    this.actions = {
      addVisualizer: function(visualizer) {
        visualizer = visualizer || {};
        this.dispatch(events.Add, {
          name: visualizer.name,
          url:  visualizer.url || visualizer.origin,
          tags: visualizer.tags || []
        });
      },
      removeVisualizer: function(id) {
        this.dispatch(events.Remove, id);
      },
      updateVisualizer: function(visualizer) {
        visualizer = visualizer || {};
        this.dispatch(events.Update, {
          id:   visualizer.id,
          name: visualizer.name,
          url:  visualizer.url || visualizer.origin,
          tags: visualizer.tags || []
        });
      }
    };

    this.bindActions(
      events.Add,    this.onAddVisualizer,
      events.Remove, this.onRemoveVisualizer,
      events.Update, this.onUpdateVisualizer
    );
  },

  onAddVisualizer: function(visualizer) {
    var id = Guid.generate();
    this.visualizers[visualizer.id] = _.extend({}, visualizer, { id: id });;
    this.emit('change');
  },
  onRemoveVisualizer: function(id) {
    delete this.visualizers[id];
    this.emit('change');
  },
  onUpdateVisualizer: function(visualizer) {
    this.visualizers[visualizer.id] = visualizer;
    this.emit('change');
  }
});
