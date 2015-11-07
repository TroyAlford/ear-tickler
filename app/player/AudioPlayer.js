var React = require('react');
var AudioControlBar = require('./AudioControlBar.js');
var AudioProgressBar = require('./AudioProgressBar.js');

var Howl = require('howler').Howl;

var AudioPlayer = React.createClass({
  getInitialState: function() {
    return {
      loop: false,
      playState: 'loading',
      position: 0,
      duration: 0,
      volume: 1.0
    };
  },
  componentWillMount: function() {
    this.loadAudio();
  },
  componentWillUnmount: function() {
    this.clearAudio();
  },

  audio: null,   // The Howler.js Howl object
  refresh: null, // Interval for refreshing play time & progress

  loadAudio: function() {
    this.clearAudio();
    this.setState({ playState: 'loading' });

    this.audio = new Howl({
      urls: [this.props.track.url],
      loop: this.state.loop,
      volume: this.state.volume,
      onload: this.handleAudioLoaded,
      onend: this.handleAudioEnded
    });
  },

  handleAudioLoaded: function() {
    this.setState({
      playState: 'paused',
      duration: this.audio._duration
    });
  },
  clearAudio: function() {
    if (this.audio) {
      this.audio.stop();
      this.audio = {};
    }
  },

  handleClose: function() {
    console.log('close');
  },
  handlePause: function() {
    this.setState({ playState: 'paused' });
    this.audio.pause();
    clearInterval(this.refresh || 0);
  },
  handlePlay: function() {
    this.setState({ playState: 'playing' });
    this.audio.play();
    this.refresh = setInterval(this.updatePosition, 200);
  },
  handleSeek: function(percent) {
    this.audio.pos(this.state.duration * percent);
  },
  handleStop: function() {
    this.audio.stop();
    clearInterval(this.refresh || 0);
    this.setState({ playState: 'stopped' });
  },
  handleLoopToggle: function(loopSetting) {
    if (this.state.playState == 'playing') {
      // This is necessary due to a bug in Howler.js.
      // * Setting .loop(true) while playing doesn't cause it to loop at the end.
      //   Subsequent plays will honor the setting, though - so we simply force it
      //   once to overcome the limitation.
      this.setState({forceLoop: true});
    }

    this.setState({ loop: loopSetting });
    this.audio.loop(loopSetting);
  },

  handleAudioEnded: function() {
    this.audio.pos(0);
    if (this.audio.loop() && this.state.forceLoop) {
      // This is necessary due to a bug in Howler.js.
      // * Setting .loop(true) while playing doesn't cause it to loop at the end.
      //   Subsequent plays will honor the setting, though - so we simply force it
      //   once to overcome the limitation.
      this.audio.stop();
      this.audio.play();
      this.setState({ forceLoop: false }); // Only force it once.
    } else if (!this.audio.loop())
      this.setState({playState: 'paused'});
  },

  updatePosition: function() {
    this.setState({ position: this.audio.pos() });
  },

  render: function() {
    return (
      <div className={"audio-player " + this.state.playState}>
        <div className="track-name">{this.props.track.name}</div>
        <i
          className="fa fa-close close-button"
          onClick={this.handleClose}>
        </i>
        <AudioControlBar
          playState={this.state.playState}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onLoopToggle={this.handleLoopToggle}
        />
        <AudioProgressBar
          percentage={this.state.position / this.state.duration}
          position={this.state.position}
          duration={this.state.duration}
          onSeek={this.handleSeek}
        />
      </div>
    );
  }
});

module.exports = AudioPlayer;
