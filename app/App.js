var React = require('react');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var Helper = require('./Helper.js');
var Oscilloscope = require('./visualization/Oscilloscope.js');
var SoundBoard = require('./soundboard/SoundBoard.js');
var TrackStore = require('./data/TrackStore.js');

var App = React.createClass({
  getInitialState: function() {
    return ({
      allTracks: TrackStore.getTracks(),
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
      tracks_playing: this.state.loadedTracks.filter(function(track) {
        return track.player_id !== player_id;
      })
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
            <i className="fa fa-headphones"></i> Ear Tickler
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
