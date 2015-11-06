var React = require('react');
var TrackStore = require('./TrackStore.js');
var FilteredTrackList = require('./FilteredTrackList.js');
var SoundBoard = require('./soundboard/SoundBoard.js');
var actions = require('./actions.js');

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
          <div className="title">Ear Tickler</div>
        </div>
        <FilteredTrackList
          tracks={this.props.trackStore.getTracks()}
        />
        <SoundBoard
          tracks={[]}
        />
      </div>
    );
  }
});
	
module.exports = App;
