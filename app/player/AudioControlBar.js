var React = require('react');

var AudioControlBar = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="audio-control-bar">
        <button className="play" value="Play" />
      </div>
    );
  }
});

module.exports = AudioControlBar;
