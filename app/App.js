var React = require('react');
var TrackStore = require('./data/TrackStore.js');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var SoundBoard = require('./soundboard/SoundBoard.js');

var App = React.createClass({
  tracks: TrackStore.getTracks(),

  changeState: function () {
    this.setState({});
  },
  render: function() {
    return(
      <div className="ear-tickler application">
        <div className="header-bar">
          <div className="title">
            <i className="fa fa-headphones"></i> Ear Tickler
          </div>
        </div>
        <FilteredTrackList
          tracks={this.props.trackStore.getTracks()}
        />
        <SoundBoard
          tracks={[this.tracks[5]]}
        />
      </div>
    );
  }
});
	
module.exports = App;
