var React = require('react');
var AudioPlayer = require('../playback/AudioPlayer.js');

module.exports = React.createClass({
  handleCloseClicked: function(player_id) {
    this.props.onCloseClicked(player_id);
  },

  render: function() {
    return (
      <div className="sound-board">{this.renderPlayers()}</div>
    );
  },
  renderPlayers: function() {
    return (
      this.props.tracks.map(function(track) {
        return (
          <AudioPlayer
            player_id={track.player_id} key={track.player_id}
            track={track}
            onClose={this.handleCloseClicked.bind(null, track.player_id)}
          />
        );
      }, this)
    );
  }
});
