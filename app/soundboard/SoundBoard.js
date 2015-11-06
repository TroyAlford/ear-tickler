var React = require('react');
var AudioPlayer = require('../player/AudioPlayer.js');

var SoundBoard = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    var tracks = [];
    this.props.tracks.forEach(function(track) {
      tracks.push(
        <AudioPlayer
          track={track}
        />
      );
    });
    return (
      <div className="sound-board">{tracks}</div>
    );
  }
});

module.exports = SoundBoard;
