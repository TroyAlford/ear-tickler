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

  connectAudioNodes: function() {
    _.flatten(Howler._howls.map(function(howl) {
      return howl._audioNode;
    })).filter(function(howl) {
      return howl.visualizerId !== this.uniqueId;
    }.bind(this)).forEach(function(node) {
      if (node.toString() === '[object GainNode]') { 
        // Node is a WebAudioAPI node
        node.connect(this.merger);
        node.visualizerId = this.uniqueId;
      } else if (!node._webAudio) { 
        // Node is an <audio> element
        node.crossOrigin = "anonymous";
        var mediaElementSource = Howler.ctx.createMediaElementSource(node);
        node._mediaElementSource = mediaElementSource;
        mediaElementSource.connect(this.merger);
        node.visualizerId = this.uniqueId;
      }
    }, this);
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

  render: function() {
    this.connectAudioNodes();
    return (
      <svg className="visualizer" ref="svg">
        <Oscilloscope
          data={this.state.timeData}
          height={this.state.height}
          width={this.state.width}
        />
      </svg>
    );
  }
});
