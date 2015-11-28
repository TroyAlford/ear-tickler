var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
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

  render: function() {
    if (!this.props.width || !this.props.height || !this.props.data.length) {
      return (
        <path d="M0,25L1000,25" stroke="red" strokeWidth="2" fill="none" />
      );
    }

    var sliceWidth = (this.props.width / this.props.data.length)
    var hCenter    = (this.props.height / 2);

    var coordinates = _.map(this.props.data, function(value, index) {
      var offsetY = (value - 128);
      var coords = {
        x: Math.round(sliceWidth * index),
        y: Math.round(hCenter + (offsetY * 1.5))
      };

      return [coords.x, coords.y].join(',');
    }.bind(this));

    return (
      <path d={'M' + coordinates.join('L')} stroke="red" strokeWidth="2" fill="none" />
    );
  }
});
