var React = require('react');
var Helper = require('../Helper.js');
var AudioPlayer = require('../player/AudioPlayer.js');

var SoundBoard = React.createClass({
  getInitialState: function() {
    var me = this;
    return {
      players: this.props.tracks.map(function (track) {
        var guid = Helper.guid();
        return (
          <AudioPlayer
            unique={guid} key={guid}
            track={track}
            onClose={me.removePlayer}
          />
        );
      })
    };
  },

  removePlayer: function(unique) {
    this.setState({
      players: this.state.players.filter(function(player) {
        return player.key !== unique;
      })
    });
  },

  render: function() {
    return (
      <div className="sound-board">{this.state.players}</div>
    );
  }
});

module.exports = SoundBoard;
