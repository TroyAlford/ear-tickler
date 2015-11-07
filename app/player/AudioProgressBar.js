var React = require('react');
var TimeFormatterMixin = require('../mixins/TimeFormatterMixin.js');

var AudioProgressBar = React.createClass({
  mixins: [TimeFormatterMixin],
  handleClick: function(event) {
    var bar_el  = this.getDOMNode(),
        coords  = bar_el.getClientRects()[0],
        click_x = event.pageX - coords.left,
        percent = click_x / (coords.right - coords.left);

    this.props.onSeek(percent);
  },
  render: function() {
    var current = this.secondsToTime(this.props.position);
    var duration = this.secondsToTime(this.props.duration);
    return (
      <div
        className="audio-progress-bar"
        onClick={this.handleClick}>
        <div className="audio-timer">{current}&nbsp;/&nbsp;{duration}</div>
        <div
          className="audio-progress-bar-fill"
          style={{width: (this.props.percentage * 100) + '%'}}
        >
          <div className="audio-timer">{current}&nbsp;/&nbsp;{duration}</div>
        </div>
      </div>
    );
  }
});

module.exports = AudioProgressBar;
