var React = require('react');
var TrackStore = require('./TrackStore.js');
var FilteredTrackList = require('./FilteredTrackList.js');
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
      <FilteredTrackList tracks={this.props.tracks}/>
    );
  }
});
	
module.exports = App;
