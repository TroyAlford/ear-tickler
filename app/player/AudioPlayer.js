var React = require('react');
var AudioControlBar = require('./AudioControlBar.js');
var AudioProgressBar = require('./AudioProgressBar.js');
var AudioTimer = require('./AudioTimer.js');

var AudioPlayer = React.createClass({
  getInitialState: function() {
    return {
      seekCurrent: 0,
      seekDuration: 0,
      seekPercentage: 0.0
    };
  },

  handleClose: function() {},
  handlePause: function() {},
  handlePlay:  function() {},
  handleStop:  function() {},

  render: function() {
    return (
      <div className="audio-player">
        <div className="track-name">{this.props.track.name}</div>
        <AudioProgressBar
          percentage={this.state.seekPercentage}
        />
        <AudioTimer
          currentSeconds={this.state.seekCurrent}
          maximumSeconds={this.state.seekDuration}
        />
        <AudioControlBar
          onClose={this.handleClose}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onStop={this.handleStop}
        />
      </div>
    );
  }
});

module.exports = AudioPlayer;
