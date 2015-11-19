var React = require('react');
var Guid = require('../../helpers/Guid.js');

module.exports = React.createClass({
  handleClick: function(event) {
    var bar_el  = this.refs.volume_bar.getDOMNode(),
        coords  = bar_el.getClientRects()[0],
        click_x = event.pageX - coords.left,
        percent = click_x / (coords.right - coords.left);

    this.props.onSetVolume(percent);
  },
  handleMuteToggle: function() {
    this.props.onMuteToggle(!this.props.muted);
  },
  handleVolumeDown: function(event) {
    var volume = this.props.volume - .1;
    if (volume < 0.0)
      volume = 0.0;

    this.props.onSetVolume(volume);
  },
  handleVolumeUp: function(event) {
    var volume = this.props.volume + .1;
    if (volume > 1.0)
      volume = 1.0;

    this.props.onSetVolume(volume);
  },

  render: function() {
    return (
      <div className="audio-volume-wrapper">
        <i className={"tickle-volume-" + (this.props.muted ? "muted muted" : "mute")}
           onClick={this.handleMuteToggle}
        ></i>
        <i className="tickle-volume-down"
           onClick={this.handleVolumeDown}
        ></i>
        <div
          className="audio-volume-bar"
          ref="volume_bar"
          onClick={this.handleClick}>
          <div
            className="audio-volume-bar-fill"
            ref="oscilloscope"
            height="100"
            width="100"
            style={{width: (this.props.volume * 100) + '%'}}
          >
          </div>
        </div>
        <i className="tickle-volume-up"
           onClick={this.handleVolumeUp}
        ></i>
      </div>
    );
  }
});
