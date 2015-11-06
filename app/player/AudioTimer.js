var React = require('react');
var TimeFormatterMixin = require('../mixins/TimeFormatterMixin.js');

var AudioTimer = React.createClass({
  mixins: [TimeFormatterMixin],

  render: function() {
    return (
      <div className="audio-timer">
        {this.secondsToTime(this.props.seekCurrent)} /
        {this.secondsToTime(this.props.seekDuration)}
      </div>
    );
  }
});

module.exports = AudioTimer;
