var Fluxxor = require('fluxxor'),
          _ = require('lodash');

var Guid = require('../helpers/Guid.js');

var messages = {
  AddPlayer:    'store.player.add',
  ClearPlayers: 'store.players.clear',
  RemovePlayer: 'store.player.remove',

  UpdateTrackInfo: 'store.track.update'
};

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.players = {};
    this.actions = {
      addPlayer: function(track) {
        track = track || {};
        this.dispatch(messages.AddPlayer, {
          track_id: track.id,
          title: track.name,
          url: track.url
        });
      },
      clearPlayers: function() {
        this.dispatch(messages.ClearPlayers);
      },
      removePlayer: function(id) {
        this.dispatch(messages.RemovePlayer, id);
      },
      trackUpdated: function(track) {
        track = track || {};
        this.dispatch(messages.UpdateTrackInfo, {
          track_id: track.id,
          title: track.name,
          url: track.url
        });
      }
    };
    Object.keys(this.actions).forEach(function(key) {
      this.actions[key] = this.actions[key].bind(this);
    }.bind(this));

    this.bindActions(
      messages.AddPlayer,    this.onAddPlayer,
      messages.ClearPlayers, this.onClearPlayers,
      messages.RemovePlayer, this.onRemovePlayer,
      messages.UpdateTrackInfo, this.onUpdateTrackInfo
    );
  },
  dispatch: function(type, payload) {
    flux.dispatcher.dispatch({type: type, payload: payload});
  },

  onAddPlayer: function(player) {
    player.id = Guid.generate();
    this.players[player.id] = player;
    this.emit('change');
  },
  onClearPlayers: function() {
    Object.keys(this.players).forEach(function(player) {
      delete this.players[player.id];
    }.bind(this));
    this.emit('change');
  },
  onRemovePlayer: function(id) {
    delete this.players[id];
    this.emit('change');
  },
  onUpdateTrackInfo: function(player) {
    this.players[player.id] = player;
    this.emit('change');
  }
});
