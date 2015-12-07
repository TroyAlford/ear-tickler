var React = require('react');
var _ = require('lodash');
var Guid = require('../../helpers/Guid.js');

var Oscilloscope = require('./Oscilloscope.js');

module.exports = React.createClass({
  componentDidMount: function() {
    this.loadVisualizer();
    this.onResize();
    window.addEventListener('resize', this.onResize);

    this.start();
  },
  componentWillUnmount: function() {
    this.stop();
    this.unloadVisualizer();
  },
  getInitialState: function() {
    return {
      timeData: [],
      frequencyData: []
    };
  },
  onResize: _.throttle(function() {
    this.setState({
      height: this.refs.svg.offsetHeight,
      width:  this.refs.svg.offsetWidth
    })
  }),

  attachInterval: null, // Interval for attaching to new AudioNode objects

  analyzer: null,       // A Web Audio API AnalyserNode object, for analyzing audio output
  merger: null,         // A Web Audio API ChannelMergerNode, for combining Audio outputs to analyze

  svg: null,         // The <svg> element to render to

  uniqueId: 'visualizer.' + Guid.generate(),

  onAudioLoaded: function(player) {
    player.howl._sounds.forEach(function(sound) {
      if (player.howl._webAudio) {
        sound._node.connect(this.merger);
      } else if (player.howl._html5) {
        sound.crossOrigin = "anonymous";
        sound.webAudioNode = this.audioContext.createMediaElementSource(sound._node);
        sound.webAudioNode.connect(this.merger);
      }
      player._merger = this.merger;
    }.bind(this));
  },

  start: function() {
    this.stop();
    this.updateInterval = setInterval(this.redraw, 33); // 30 fps
  },
  stop: function() {
    clearInterval(this.updateInterval || 0);
  },

  redraw: function() {
    var bufferLength = this.analyzer.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    this.analyzer.getByteTimeDomainData(dataArray);
    this.setState({ timeData: dataArray });
  },

  loadVisualizer: function() {
    this.audioContext = Howler.ctx;
    this.analyzer = this.audioContext.createAnalyser();
    this.analyzer.fftSize = 2048; // Default setting

    this.merger = this.audioContext.createChannelMerger(2);
    this.merger.connect(this.analyzer);

    this.svg = this.refs.svg;
  },
  unloadVisualizer: function() {
    clearInterval(this.refresh || 0);
  },

  componentWillReceiveProps: function(nextProps) {
    this.props.players.filter(function(player) {
      return player.howl !== undefined && player._merger === undefined;
    }.bind(this)).forEach(function(player) {
      this.onAudioLoaded(player);
    }.bind(this));
  },

  render: function() {
    var gradient_id = "rainbow";
    return (
      <svg className="visualizer" ref="svg">
        <linearGradient id={gradient_id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   style={{ stopOpacity: 1, stopColor: "red" }}    />
          <stop offset="16%"  style={{ stopOpacity: 1, stopColor: "orange" }} />
          <stop offset="33%"  style={{ stopOpacity: 1, stopColor: "yellow" }} />
          <stop offset="50%"  style={{ stopOpacity: 1, stopColor: "green" }}  />
          <stop offset="66%"  style={{ stopOpacity: 1, stopColor: "blue" }}   />
          <stop offset="83%"  style={{ stopOpacity: 1, stopColor: "indigo" }} />
          <stop offset="100%" style={{ stopOpacity: 1, stopColor: "violet" }} />
        </linearGradient>
        <Oscilloscope
          data={this.state.timeData}
          stroke={'#' + gradient_id}
          height={this.state.height}
          width={this.state.width}
        />
      </svg>
    );
  }
});
