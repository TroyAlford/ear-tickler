var flux = require('flux-react');
var Helper = require('../Helper.js');

module.exports = function() {
  var raw_tracks = require('./Tracks.js');
  var tracks = raw_tracks.map(function(track) {
      return Helper.extend({
          id: Helper.guid(),
          name: 'New Track',
          url: '../audio/default.mp3',
          origin: 'Unknown Origin'
      }, track);
  });

  return flux.createStore({
    tracks: tracks,
    upsertTrack: function(track) {
        this.tracks.push(track);
        this.emit('tracks.updated');
    },
    deleteTrack: function(id) {
        tracks = tracks.filter(function(el) { return el.id !== id; });
        this.emit('tracks.deleted');
    },
    exports: {
        getTracks: function() {
            return this.tracks;
        },
        removeTrack: function(id) {
            this.deleteTrack(id);
        },
        addTrack: function(track) {
            this.upsertTrack(track);
        }
    }
  });
}();
