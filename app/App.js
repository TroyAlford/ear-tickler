var React = require('react');
var TrackStore = require('./data/TrackStore.js');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var SoundBoard = require('./soundboard/SoundBoard.js');

var App = React.createClass({
  getInitialState: function () {
    return {}; // tracks: TrackStore.getTracks() };
  },
  tracks: TrackStore.getTracks(),
  componentWillMount: function () {
    //Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function () {
    //Store.removeChangeListener(this.changeState);
  },
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
          tracks={this.props.trackStore.getTracks()}
        />
      </div>
    );
  }
});
	
module.exports = App;
