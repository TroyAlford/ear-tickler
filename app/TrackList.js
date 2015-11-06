var React = require('react');
var TrackStore = require('./TrackStore.js');

var TrackList = React.createClass({
  render: function() {
    var listItems = this.props.tracks
      .filter(function(track) {
        var filter = this.props.filterText.toLowerCase();
        var trackName = track.name.toLowerCase();
        return trackName.indexOf(filter) > -1;
      }, this)
      .map(function(track) {
        return (
          <li key={track.id} track={track}>
            <i className="fa fa-music"></i>
            {track.name}
          </li>
        );
      }
    );

    return (
      <ul>{listItems}</ul>
    );
  }
});

module.exports = TrackList;
