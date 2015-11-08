var React = require('react');
var _ = require('lodash');
var TrackStore = require('../data/TrackStore.js');

var TrackList = React.createClass({
  handleAddClicked: function(track) {
    this.props.onAddClicked(track.id);
  },

  render: function() {
    var listItems = this.props.tracks
      .filter(function(track) {
        var filter = this.props.filterText.toLowerCase();
        var trackName = track.name.toLowerCase();
        return trackName.indexOf(filter) > -1;
      }, this)
      .map(function(track) {
        var className = [
          _.includes(this.props.addedTrackIds, track.id) ? 'added' : ''
        ].join(' ');

        return (
          <li key={track.id} track={track} className={className}>
            <i className="fa fa-music"></i>
            {track.name}
            <i className="fa fa-plus"
               onClick={this.handleAddClicked.bind(null, track)}
            ></i>
          </li>
        );
      }, this
    );

    return (
      <ul>{listItems}</ul>
    );
  }
});

module.exports = TrackList;
