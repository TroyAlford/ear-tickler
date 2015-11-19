var Fluxxor = require('fluxxor'),
          _ = require('lodash');

var Guid = require('../helpers/Guid.js'),
     XHR = require('../helpers/XHR.js');

var messages = {
  Add:    'store.track.add',
  Remove: 'store.track.delete',
  Update: 'store.track.update',

  Clear:  'store.tracks.clear',

  LoadList: 'store.track.load-list',
  SaveList: 'store.track.save-list'
};

module.exports = Fluxxor.createStore({
  initialize: function() {
    this.tracks = {};
    this.actions = {
      addTrack: function(track) {
        track = track || {};
        this.dispatch(messages.Add, {
          name: track.name,
          url:  track.url || track.origin,
          tags: track.tags || []
        });
      },
      clearTracks: function() {
        this.dispatch(messages.Clear);
      },
      removeTrack: function(id) {
        this.dispatch(messages.Remove, id);
      },
      updateTrack: function(track) {
        track = track || {};
        this.dispatch(messages.Update, {
          id:   track.id,
          name: track.name,
          url:  track.url || track.origin,
          tags: track.tags || []
        });
      },

      loadTracks: function() {
        this.dispatch(messages.LoadList);
      },
      saveTracks: function() {
        this.dispatch(messages.SaveList);
      }
    };
    Object.keys(this.actions).forEach(function(key) {
      this.actions[key] = this.actions[key].bind(this);
    }.bind(this));

    this.bindActions(
      messages.Add,    this.onAddTrack,
      messages.Clear,  this.onClearTracks,
      messages.Remove, this.onRemoveTrack,
      messages.Update, this.onUpdateTrack,

      messages.LoadList, this.onLoadTracks,
      messages.SaveList, this.onSaveTracks
    );

    this.onLoadTracks();
  },
  dispatch: function(type, payload) {
    flux.dispatcher.dispatch({type: type, payload: payload});
  },

  onAddTrack: function(track) {
    track.id = track.id || Guid.generate();
    this.tracks[track.id] = track;
    this.emit('change');
    if (!this.loading) {
      this.actions.saveTracks();
    }
  },
  onClearTracks: function() {
    this.clearing = true;
    Object.keys(this.tracks).forEach(function(key) {
      this.onRemoveTrack(key);
    });
    this.clearing = false;
  },
  onRemoveTrack: function(id) {
    delete this.tracks[id];
    this.emit('change');
    if (!this.clearing) {
      this.actions.saveTracks();
    }
  },
  onUpdateTrack: function(track) {
    this.tracks[track.id] = track;
    this.emit('change');
    this.actions.saveTracks();
  },

  // Loads the user's list of tracks from the API
  // - if unavailable, falls back to LocalStorage
  onLoadTracks: function() {
    this.loading = true;
    if (this.useLocalStorage) {
      this.onClearTracks(); // Clear first.
      JSON.parse(localStorage.getItem('tracks') || '[]').forEach(function(track) {
        this.onAddTrack(track);
      }.bind(this))
    } else {
      XHR.get('api/tracks', {
        success: function (response) {
          this.onClearTracks(); // Clear first.
          if (response && Array.isArray(response.message)) {
            response.message.forEach(function(track) {
              this.onAddTrack(track);
            });
          }
        }.bind(this),
        failure: function (response) {
          this.useLocalStorage = true;
          this.onLoadTracks();
        }.bind(this)
      });
    }
    this.loading = false;
  },
  // Persists the user's list of tracks to the API
  // - if unavailable, falls back to LocalStorage
  onSaveTracks: function() {
    var tracks = Object.keys(this.tracks).map(function(key) {
      return this.tracks[key];
    });
    if (this.useLocalStorage) {
      localStorage.setItem('tracks', JSON.stringify(this.tracks));
    } else {
      XHR.post('api/tracks', {
        data: this.tracks
      });
    }
  },
});
