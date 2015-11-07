var React = require('react');
var Helper = require('../Helper.js');

var AudioVolumeBar = React.createClass({
  componentWillMount: function() {
    this.loadVisualizer();
    this.refresh = setInterval(this.updateOscilloscope, 1000);
    this.updateOscilloscope();
  },
  componentWillUnmount: function() {
    clearInterval(this.refresh);
    this.unloadVisualizer();
  },
  analyser: null, // The Web Audio API Analyzer object
  refresh: null,  // Interval for refreshing oscilloscope

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

  loadVisualizer: function() {
    var node = this.props.audioNode;
    var context = this.props.audioNode.context;
    if (!context)
      return;

    this.analyser = context.createAnalyser();
    node.connect(this.analyser);
    //this.analyser.connect(node);
  },
  unloadVisualizer: function() {
  },
  updateOscilloscope: function() {
    if (this.props.playState !== 'playing')
      return;

    var canvas = this.refs.oscilloscope.getDOMNode();
    var context = canvas.getContext("2d");

    var height = canvas.height;
    var width  = canvas.width;

    context.fillStyle = '#ccc';
    context.fillRect(0, 0, width, height);

    this.analyser.fftSize = 2048;
    var bufferLength = this.analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var analyser = this.analyser;
    function draw() {
      var drawVisual = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      context.fillRect(0, 0, width, height);

      context.lineWidth = 2;
      context.strokeStyle = '#336699';

      var sliceWidth = width / bufferLength;
      var x = 0;
      context.moveTo(x, height / 2);
      context.beginPath();
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * height / 2;
        context.lineTo(x, y);
        x += sliceWidth;
      }
      context.lineTo(width, height / 2);
      context.stroke();
    };
    draw();
  },

  render: function() {
    var mute_button_id = Helper.guid();
    return (
      <div className="audio-volume-wrapper">
        <i className={"fa fa-volume-off " + (this.props.muted ? "muted" : "")}
           onClick={this.handleMuteToggle}
        ></i>
        <i className="fa fa-volume-down"
           onClick={this.handleVolumeDown}
        ></i>
        <div
          className="audio-volume-bar"
          ref="volume_bar"
          onClick={this.handleClick}>
          <canvas
            className="audio-volume-bar-fill"
            ref="oscilloscope"
            height="100"
            width="100"
            style={{width: (this.props.volume * 100) + '%'}}
          >
          </canvas>
        </div>
        <i className="fa fa-volume-up"
           onClick={this.handleVolumeUp}
        ></i>
      </div>
    );
  }
});

module.exports = AudioVolumeBar;
