var React = require('react');
var Helper = require('../Helper.js');

var AudioControlBar = React.createClass({
  getInitialState: function() {
    return {
      loopToggleId: Helper.guid()
    };
  },

  handleClick: function() {
    switch (this.props.playState) {
      case 'loading':
        break;
      case 'playing':
        this.props.onPause();
        break;
      default:
        this.props.onPlay();
    }
  },
  handleLoopToggle: function() {
    this.props.onLoopToggle(
      this.refs.loop_enabled.getDOMNode().checked
    );
  },

  getButtonClass: function() {
    switch (this.props.playState) {
      case 'playing':
        return 'pause';
      case 'loading':
        return 'loading animate-spin';
      case 'paused':
      case 'stopped':
      default:
        return 'play';
        return 'play';
    }
  },

  render: function() {
    return (
      <div className="audio-control-bar">
        <i className={"play-button tickle-" + this.getButtonClass()}
           onClick={this.handleClick}>
        </i>
        <input
          id={this.state.loopToggleId}
          className="loop-toggle"
          type="checkbox"
          ref="loop_enabled"
          onChange={this.handleLoopToggle}
        />
        <label
          className="loop-toggle-label"
          htmlFor={this.state.loopToggleId}>
          <i className="tickle-loop"></i>
        </label>
      </div>
    );
  }
});

module.exports = AudioControlBar;
