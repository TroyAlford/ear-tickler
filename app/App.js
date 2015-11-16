var React = require('react');
var Ajax = require('./ajax/AjaxHelper.js');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var Helper = require('./Helper.js');
var Oscilloscope = require('./visualization/Oscilloscope.js');
var SoundBoard = require('./soundboard/SoundBoard.js');

var App = React.createClass({
  getInitialState: function() {
    this.loadTrackList();
    return ({
      allTracks: [],
      loadedTracks: []
    });
  },

  handleAddAudioPlayer: function(track_id) {
    var matches = this.state.allTracks.filter(function(track) {
      return track.id == track_id;
    });

    if (matches.length == 0) return;

    var track = Helper.extend({}, matches[0]);
    track.player_id = Helper.guid();

    this.setState({
      loadedTracks: this.state.loadedTracks.concat(track)
    });
  },
  handleCloseAudioPlayer: function(player_id) {
    this.setState({
      loadedTracks: this.state.loadedTracks.filter(function(track) {
        return track.player_id !== player_id;
      })
    });
  },

  handleTrackDelete: function() {},
  handleTrackInsert: function() {},
  handleTrackUpdate: function() {},

  loadTrackList: function () {
    Ajax.get('api/tracks', {
      success: function (response) {
        var raw_tracks = [];
        if ("string" === typeof(response.message)) {
          try {
            raw_tracks = JSON.parse(response.message);
          } catch (e) {
            raw_tracks = [];
          }
        } else if (Array.isArray(response.message)) {
          raw_tracks = response.message;
        }

        var tracks = raw_tracks.map(function (track) {
          return Helper.extend({
            id: Helper.guid(),
            name: 'New Track',
            origin: ''
          }, track);
        }).sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });

        this.setState({allTracks: tracks});
      }.bind(this),
      failure: function (response) {
        this.setState({allTracks: []});
      }.bind(this)
    });
  },
  saveTrackList: function () {
    Ajax.post('api/tracks', {
      data: this.tracks
    });
  },

  render: function() {
    var addedTrackIds = this.state.loadedTracks.map(function(track) {
      return track.id;
    });
    return(
      <div className="ear-tickler application">
        <div className="header-bar">
          <div className="title">
            <i className="tickle-logo"></i> Ear Tickler
          </div>
          <Oscilloscope
            tracks={this.state.loadedTracks}
          />
        </div>
        <FilteredTrackList
          tracks={this.state.allTracks}
          addedTrackIds={addedTrackIds}
          onAddClicked={this.handleAddAudioPlayer}
        />
        <SoundBoard
          tracks={this.state.loadedTracks}
          onCloseClicked={this.handleCloseAudioPlayer}
        />
      </div>
    );
  }
});
	
module.exports = App;
