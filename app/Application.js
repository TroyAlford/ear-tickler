var React = require('react');
var _ = require('lodash');

var FilteredTrackList = require('./components/navigation/FilteredTrackList.js');
var Oscilloscope = require('./components/visualization/Oscilloscope.js');
var SoundBoard = require('./components/soundboard/SoundBoard.js');

var Guid = require('./helpers/Guid.js');
var XHR = require('./helpers/XHR.js');

module.exports = React.createClass({
  getInitialState: function() {
    return ({
      allTracks: [],
      loadedTracks: [],
      offlineMode: false
    });
  },

  componentWillMount() {
    this.loadTrackList();
  },

  handleAddAudioPlayer: function(track_id) {
    var matches = this.state.allTracks.filter(function(track) {
      return track.id == track_id;
    });

    if (matches.length == 0) return;

    var track = _.extend({}, matches[0]);
    track.player_id = Guid.generate();

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

  formatTracks: function (tracks) {
    return tracks.map(function (track) {
      return _.extend({
        id: Guid.generate(),
        name: 'New Track',
        origin: ''
      }, track);
    }).sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  },

  loadTrackList: function () {
    var raw_tracks = [];
    if (this.state.offlineMode) {
      raw_tracks = JSON.parse(localStorage.getItem('tracks') || '[]');
      this.setState({ allTracks: this.formatTracks(raw_tracks) });
    } else {
      XHR.get('api/tracks', {
        success: function (response) {
          raw_tracks = response.message;
          this.setState({ allTracks: this.formatTracks(raw_tracks) });
        }.bind(this),
        failure: function (response) {
          this.setState({ offlineMode: true });
          this.loadTrackList();
        }.bind(this)
      });
    }
  },
  saveTrackList: function () {
    if (this.state.offlineMode) {
      localStorage.setItem('tracks', JSON.stringify(this.state.allTracks));
    } else {
      XHR.post('api/tracks', {
        data: this.tracks
      });
    }
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
