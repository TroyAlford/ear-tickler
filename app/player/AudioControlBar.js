var React = require('react');
var Helper = require('../Helper.js');

var AudioControlBar = React.createClass({
  handleClick: function() {
    if (this.props.playState == 'playing')
      this.props.onPause();
    else
      this.props.onPlay();
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
        return 'hidden';
      case 'paused':
      case 'stopped':
      default:
        return 'play';
        return 'play';
    }
  },

  render: function() {
    var loop_toggle_id = Helper.guid();
    return (
      <div className="audio-control-bar">
        <button
          className={this.getButtonClass()}
          onClick={this.handleClick}
        >
          <i className={"fa fa-" + this.getButtonClass()}></i>
        </button>
        <input
          className="loop-toggle"
          id={loop_toggle_id}
          ref="loop_enabled"
          name="loop-toggle"
          type="checkbox"
          onChange={this.handleLoopToggle}
        />
        <label
          className="loop-toggle-label"
          htmlFor={loop_toggle_id}>
          <i className="fa fa-repeat"></i>
        </label>
      </div>
    );
  }
});

module.exports = AudioControlBar;
