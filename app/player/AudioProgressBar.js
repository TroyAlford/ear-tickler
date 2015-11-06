var React = require('react');

var AudioProgressBar = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="audio-progress-bar">
        <div
          className="audio-progress-bar-fill"
          style={"width: " + this.props.seekPercentage + "%;"}
        ></div>
      </div>
    );
  }
});

module.exports = AudioProgressBar;
