var React = require('react');
var _ = require('lodash');

var Guid = require('../../helpers/Guid.js');

module.exports = React.createClass({
  componentDidMount: function() {
    this.loadVisualizer();
    this.start();
  },
  componentWillUnmount: function() {
    this.stop();
    this.unloadVisualizer();
  },

  uniqueId: 'oscilloscope.' + Guid.generate(),
  analyzer: null,       // A Web Audio API AnalyserNode object, for analyzing audio output
  merger: null,         // A Web Audio API ChannelMergerNode, for combining Audio outputs to analyze

  canvas: null,         // The <canvas> element to render to
  drawingContext: null, // The canvas 2d drawing context to render with

  attachInterval: null, // Interval for attaching to new AudioNode objects
  animationFrame: null, // Identifier for the drawing's Animation Frame

  refreshAudioNodes: function() {
    _.flatten(Howler._howls.map(function(howl) {
      // Get all current howler nodes ...
      return howl._audioNode;
    })).forEach(function(node) {
      // ... and for each one that isn't attached to this oscilloscope ...
      if (node.oscilloscopeId !== this.uniqueId) {
        // ... attach it, and mark it as attached.
        node.connect(this.merger);
        node.oscilloscopeId = this.uniqueId;
      }
    }, this);
  },

  getAnimationFrame: (
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame
  ).bind(window),

  cancelAnimationFrame: (
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame
  ).bind(window),

  start: function() {
    this.stop();
    this.attachInterval = setInterval(this.refreshAudioNodes, 500);
    this.updateInterval = setInterval(this.updateCanvas, 33); // 30 fps
  },
  stop: function() {
    clearInterval(this.attachInterval || 0);
    clearInterval(this.updateInterval || 0);
  },

  updateCanvas: function() {
    var canvasHeight = this.canvas.height,
        canvasWidth = this.canvas.width;

    var bufferLength = this.analyzer.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    this.analyzer.getByteTimeDomainData(dataArray);

    this.drawingContext.clearRect(0, 0, canvasWidth, canvasHeight);

    var sliceWidth = canvasWidth / bufferLength;
    var x = 0;
    this.drawingContext.moveTo(x, canvasHeight / 2);
    this.drawingContext.beginPath();

    dataArray.forEach(function (entry) {
      var distance = entry - 128;
      var y = (canvasHeight / 2) + (distance * 1.5);
      this.drawingContext.lineTo(x, y);
      x += sliceWidth;
    }, this);
    this.drawingContext.lineTo(canvasWidth, canvasHeight / 2);
    this.drawingContext.stroke();
  },

  loadVisualizer: function() {
    this.audioContext = Howler.ctx;
    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = 2048; // Default setting

    this.merger = this.audioContext.createChannelMerger(2);
    this.merger.connect(this.analyzer);

    this.canvas = this.refs.canvas;
    this.drawingContext = this.canvas.getContext('2d');
    this.drawingContext.imageSmoothingEnabled = true;
    this.drawingContext.lineWidth = 5;
    var gradient = this.drawingContext.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0.00,'red');
        gradient.addColorStop(0.16,'orange');
        gradient.addColorStop(0.33,'yellow');
        gradient.addColorStop(0.50,'green');
        gradient.addColorStop(0.66,'blue');
        gradient.addColorStop(0.83,'indigo');
        gradient.addColorStop(1.00,'violet');
    this.drawingContext.strokeStyle = gradient;
    this.drawingContext.fillStyle = 'rgba('
  },
  unloadVisualizer: function() {
    clearInterval(this.refresh || 0);
  },

  render: function() {
    return (
      <div className="audio-visualizer">
        <canvas
          className="oscilloscope"
          ref="canvas"
          height="200"
          width="1000"
        ></canvas>
      </div>
    );
  }
});
