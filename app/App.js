var React = require('react');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var Helper = require('./Helper.js');
var SoundBoard = require('./soundboard/SoundBoard.js');
var TrackStore = require('./data/TrackStore.js');

var App = React.createClass({
  getInitialState: function() {
    return ({
      tracks_all: TrackStore.getTracks(),
      tracks_playing: []
    });
  },

  handleAddAudioPlayer: function(track_id) {
    var matches = this.state.tracks_all.filter(function(track) {
      return track.id == track_id;
    });

    if (matches.length == 0) return;

    var track = Helper.extend({}, matches[0]);
    track.player_id = Helper.guid();

    this.setState({
      tracks_playing: this.state.tracks_playing.concat(track)
    });
  },
  handleCloseAudioPlayer: function(player_id) {
    this.setState({
      tracks_playing: this.state.tracks_playing.filter(function(track) {
        return track.player_id !== player_id;
      })
    });
  },

  render: function() {
    var addedTrackIds = this.state.tracks_playing.map(function(track) {
      return track.id;
    });
    return(
      <div className="ear-tickler application">
        <div className="header-bar">
          <div className="title">
            <i className="fa fa-headphones"></i> Ear Tickler
          </div>
        </div>
        <FilteredTrackList
          tracks={this.state.tracks_all}
          addedTrackIds={addedTrackIds}
          onAddClicked={this.handleAddAudioPlayer}
        />
        <SoundBoard
          tracks={this.state.tracks_playing}
          onCloseClicked={this.handleCloseAudioPlayer}
        />
      </div>
    );
  }
});
	
module.exports = App;
