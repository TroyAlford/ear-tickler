var Fluxxor = require('fluxxor'),
          _ = require('lodash');

var Guid = require('../helpers/Guid.js');

var events = {
  Add:    'store.player.add',
  Remove: 'store.player.delete',
  Update: 'store.player.update'
};

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.players = {};
    this.actions = {
      addPlayer: function(track) {
        track = track || {};
        this.dispatch(events.Add, {
          name: track.name,
          url:  track.url || track.origin,
          tags: track.tags || []
        });
      },
      removePlayer: function(id) {
        this.dispatch(events.Remove, id);
      },
      updatePlayer: function(track) {
        track = track || {};
        this.dispatch(events.Update, {
          id:   track.id,
          name: track.name,
          url:  track.url || track.origin,
          tags: track.tags || []
        });
      }
    },

    this.bindActions(
      events.Add,    this.onAddPlayer,
      events.Remove, this.onRemovePlayer,
      events.Update, this.onUpdatePlayer
    );
  },

  onAddPlayer: function(player) {
    var id = Guid.generate();
    this.players[player.id] = _.extend({}, player, { id: id });;
    this.emit('change');
  },
  onRemovePlayer: function(id) {
    delete this.players[id];
    this.emit('change');
  },
  onUpdatePlayer: function(player) {
    this.players[player.id] = player;
    this.emit('change');
  }
});
