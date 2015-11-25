var React = require('react');
var AudioPlayer = require('../playback/AudioPlayer.js');

module.exports = React.createClass({
  handleCloseClicked: function(id) {
    this.props.onCloseClicked(id);
  },

  render: function() {
    return (
      <div className="sound-board">{this.renderPlayers()}</div>
    );
  },
  renderPlayers: function() {
    return (
      this.props.players.map(function(player) {
        return (
          <AudioPlayer
            id={player.id} key={player.id}
            title={player.title}
            track={player.track}
            url={player.url}
            onClose={this.handleCloseClicked.bind(null, player.id)}
          />
        );
      }, this)
    );
  }
});
