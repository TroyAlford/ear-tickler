var React = require('react');
var AudioControlBar  = require('./AudioControlBar.js');
var AudioProgressBar = require('./AudioProgressBar.js');
var AudioVolumeBar   = require('./AudioVolumeBar.js');

var Howl = require('howler').Howl;

module.exports = React.createClass({
  dispatch: function(type, payload) {
    flux.dispatcher.dispatch({type: type, payload: payload});
  },

  getInitialState: function() {
    return {
      loop: false,
      muted: false,
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

  audio: { _duration: 0 },   // The Howler.js Howl object
  refresh: null,             // Interval for refreshing play time & progress

  loadAudio: function() {
    var url = this.props.track.url;
    /*
     var parser = document.createElement('a');
     parser.href = url;
     if (parser.host !== window.location.host) {
     url = window.location.origin + '/stream?url=' + url;
     }
     */
    this.audio = new Howl({
      src: [url],
      html5: false, // Force HTML5 Audio & buffered-loading
      loop: this.state.loop,
      volume: this.state.volume,
      onload: this.handleAudioLoaded,
      onend: this.handleAudioEnded
    });
    this.props.player.howl = this.audio;
    this.setState({
      playState: this.audio._loaded ? 'paused' : 'loading',
      duration: this.audio._duration
    });
  },

  handleAudioLoaded: function() {
    this.setState({
      playState: 'paused',
      duration: this.audio._duration
    });
  },
  clearAudio: function() {
    this.handleStop();
  },

  handleClose: function() {
    this.props.onClose(this.props.player_id);
  },
  handleMuteToggle: function(muteSetting) {
    if (muteSetting)
      this.audio.mute();
    else
      this.audio.unmute();
    this.setState({ muted: muteSetting });
  },
  handlePause: function() {
    this.setState({ playState: 'paused' });
    this.audio.pause();
    clearInterval(this.refresh || 0);
    this.updatePosition();
  },
  handlePlay: function() {
    this.setState({ playState: 'playing' });
    this.audio.play();
    this.refresh = setInterval(this.updatePosition, 100);
  },
  handleSeek: function(percent) {
    this.audio.seek(this.state.duration * percent);
  },
  handleStop: function() {
    this.setState({ playState: 'stopped' });
    this.audio.stop();
    clearInterval(this.refresh || 0);
    this.updatePosition();
  },
  handleLoopToggle: function(loopSetting) {
    if (this.state.playState == 'playing') {
      // This is necessary due to a bug in Howler.js.
      // * Setting .loop(true) while playing doesn't cause it to loop at the end.
      //   Subsequent plays will honor the setting, though - so we simply force it
      //   once to overcome the limitation.
      this.setState({forceLoop: loopSetting});
    }

    this.setState({ loop: loopSetting });
    this.audio.loop(loopSetting);
  },
  handleSetVolume: function(volume) {
    this.setState({
      volume: volume,
      muted: false
    });
    this.audio.volume(volume);
  },

  handleAudioEnded: function() {
    this.audio.seek(0);
    if (this.state.playState == 'playing' && this.audio.loop() && this.state.forceLoop) {
      // This is necessary due to a bug in Howler.js.
      // * Setting .loop(true) while playing doesn't cause it to loop at the end.
      //   Subsequent plays will honor the setting, though - so we simply force it
      //   once to overcome the limitation.
      this.audio.stop();
      this.audio.play();
      this.setState({forceLoop: null}); // Only force it once.
    } else if (this.state.playState == 'playing' && !this.audio.loop() && !this.state.forceLoop) {
      this.audio.stop();
      this.setState({
        forceLoop: null,
        playState: 'paused'
      }); // Only force stopping once.
    } else if (!this.audio.loop())
      this.setState({playState: 'paused'});
  },

  updatePosition: function() {
    this.setState({ position: this.audio.seek() });
  },

  render: function() {
    return (
      <div className={"audio-player " + this.state.playState}>
        <div className="track-name">{this.props.title}</div>
        <i
          className="tickle-close close-button"
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
        <AudioVolumeBar
          muted={this.state.muted}
          onMuteToggle={this.handleMuteToggle}
          onSetVolume={this.handleSetVolume}
          playState={this.state.playState}
          volume={this.state.volume}
        />
      </div>
    );
  }
});
