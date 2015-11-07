(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d:\\git\\ear-tickler\\app\\App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('./data/TrackStore.js');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var SoundBoard = require('./soundboard/SoundBoard.js');

var App = React.createClass({
  displayName: 'App',

  tracks: TrackStore.getTracks(),

  changeState: function changeState() {
    this.setState({});
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'ear-tickler application' },
      React.createElement(
        'div',
        { className: 'header-bar' },
        React.createElement(
          'div',
          { className: 'title' },
          React.createElement('i', { className: 'fa fa-headphones' }),
          ' Ear Tickler'
        )
      ),
      React.createElement(FilteredTrackList, {
        tracks: this.props.trackStore.getTracks()
      }),
      React.createElement(SoundBoard, {
        tracks: [this.tracks[5]]
      })
    );
  }
});

module.exports = App;

},{"./data/TrackStore.js":"d:\\git\\ear-tickler\\app\\data\\TrackStore.js","./navigation/FilteredTrackList.js":"d:\\git\\ear-tickler\\app\\navigation\\FilteredTrackList.js","./soundboard/SoundBoard.js":"d:\\git\\ear-tickler\\app\\soundboard\\SoundBoard.js","react":"react"}],"d:\\git\\ear-tickler\\app\\Helper.js":[function(require,module,exports){
'use strict';

module.exports = {
    extend: function extend(a, b) {
        for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
        return a;
    },
    guid: function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
};

},{}],"d:\\git\\ear-tickler\\app\\data\\TrackStore.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var Helper = require('../Helper.js');

module.exports = (function () {
    var raw_tracks = require('./Tracks.js').sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
    var tracks = raw_tracks.map(function (track) {
        return Helper.extend({
            id: Helper.guid(),
            name: 'New Track',
            url: '../audio/default.mp3',
            origin: 'Unknown Origin'
        }, track);
    });

    return flux.createStore({
        tracks: tracks,
        upsertTrack: function upsertTrack(track) {
            this.tracks.push(track);
            this.emit('tracks.updated');
        },
        deleteTrack: function deleteTrack(id) {
            tracks = tracks.filter(function (el) {
                return el.id !== id;
            });
            this.emit('tracks.deleted');
        },
        exports: {
            getTracks: function getTracks() {
                return this.tracks;
            },
            removeTrack: function removeTrack(id) {
                this.deleteTrack(id);
            },
            addTrack: function addTrack(track) {
                this.upsertTrack(track);
            }
        }
    });
})();

},{"../Helper.js":"d:\\git\\ear-tickler\\app\\Helper.js","./Tracks.js":"d:\\git\\ear-tickler\\app\\data\\Tracks.js","flux-react":"flux-react"}],"d:\\git\\ear-tickler\\app\\data\\Tracks.js":[function(require,module,exports){
'use strict';

module.exports = [{
  name: 'Birds (Light)',
  origin: 'https://www.freesound.org/data/previews/1/1050_1112-hq.mp3'
}, {
  name: 'Birds (Sparse)',
  origin: 'https://www.freesound.org/data/previews/158/158527_2783336-hq.mp3'
}, {
  name: 'Crickets',
  origin: 'https://www.freesound.org/data/previews/39/39829_28216-hq.mp3'
}, {
  name: 'Roar - Dragon (Fast)',
  origin: 'https://www.freesound.org/data/previews/85/85568_1206321-hq.mp3'
}, {
  name: 'Fast River',
  origin: 'https://www.freesound.org/data/previews/39/39831_28216-hq.mp3'
}, {
  name: 'Magic (Fast)',
  origin: 'https://www.freesound.org/data/previews/221/221683_1015240-hq.mp3'
}, {
  name: 'Thunder Storm',
  origin: 'https://www.freesound.org/data/previews/2/2523_1112-hq.mp3'
}, {
  name: 'Roar, Monster (Slow)',
  origin: 'https://www.freesound.org/data/previews/267/267454_3415022-hq.mp3'
}, {
  name: 'Roar, Ogre',
  origin: 'https://www.freesound.org/data/previews/103/103534_1757489-hq.mp3'
}, {
  name: 'Roar, Ogre 2',
  origin: 'https://www.freesound.org/data/previews/103/103535_1757489-hq.mp3'
}];

},{}],"d:\\git\\ear-tickler\\app\\main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

var trackStore = require('./data/TrackStore.js');
React.render(React.createElement(App, {
  trackStore: trackStore
}), document.getElementById('application'));

},{"./App.js":"d:\\git\\ear-tickler\\app\\App.js","./data/TrackStore.js":"d:\\git\\ear-tickler\\app\\data\\TrackStore.js","react":"react"}],"d:\\git\\ear-tickler\\app\\mixins\\TimeFormatterMixin.js":[function(require,module,exports){
"use strict";

module.exports = {
  secondsToTime: function secondsToTime(secs) {
    secs = Math.round(secs);
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var time = "";

    if (hours > 0) {
      time += hours + ":";
    }

    time += this.timeUnitFormat(minutes) + ":";
    time += this.timeUnitFormat(seconds);
    return time;
  },

  timeUnitFormat: function timeUnitFormat(time) {
    if (time < 1) {
      return "00";
    } else if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  }
};

},{}],"d:\\git\\ear-tickler\\app\\navigation\\FilteredTrackList.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackSearchBar = require('./TrackSearchBar.js');
var TrackList = require('./TrackList.js');

var FilteredTrackList = React.createClass({
    displayName: 'FilteredTrackList',

    getInitialState: function getInitialState() {
        return {
            filterText: ''
        };
    },
    handleFilterChange: function handleFilterChange(filterText) {
        this.setState({
            filterText: filterText
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'filtered-track-list' },
            React.createElement(TrackSearchBar, {
                filterText: this.state.filterText,
                onFilterChange: this.handleFilterChange
            }),
            React.createElement(TrackList, {
                filterText: this.state.filterText,
                tracks: this.props.tracks
            })
        );
    }
});

module.exports = FilteredTrackList;

},{"./TrackList.js":"d:\\git\\ear-tickler\\app\\navigation\\TrackList.js","./TrackSearchBar.js":"d:\\git\\ear-tickler\\app\\navigation\\TrackSearchBar.js","react":"react"}],"d:\\git\\ear-tickler\\app\\navigation\\TrackList.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('../data/TrackStore.js');

var TrackList = React.createClass({
  displayName: 'TrackList',

  render: function render() {
    var listItems = this.props.tracks.filter(function (track) {
      var filter = this.props.filterText.toLowerCase();
      var trackName = track.name.toLowerCase();
      return trackName.indexOf(filter) > -1;
    }, this).map(function (track) {
      return React.createElement(
        'li',
        { key: track.id, track: track },
        React.createElement('i', { className: 'fa fa-music' }),
        track.name
      );
    });

    return React.createElement(
      'ul',
      null,
      listItems
    );
  }
});

module.exports = TrackList;

},{"../data/TrackStore.js":"d:\\git\\ear-tickler\\app\\data\\TrackStore.js","react":"react"}],"d:\\git\\ear-tickler\\app\\navigation\\TrackSearchBar.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('../data/TrackStore.js');

var TrackList = React.createClass({
    displayName: 'TrackList',

    handleFilterChange: function handleFilterChange() {
        var filterText = this.refs.searchBox.getDOMNode().value;
        this.props.onFilterChange(filterText);
    },
    render: function render() {
        return React.createElement('input', {
            type: 'text',
            placeholder: 'Search...',
            value: this.props.filterText,
            ref: 'searchBox',
            onChange: this.handleFilterChange
        });
    }
});

module.exports = TrackList;

},{"../data/TrackStore.js":"d:\\git\\ear-tickler\\app\\data\\TrackStore.js","react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioControlBar.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('../Helper.js');

var AudioControlBar = React.createClass({
  displayName: 'AudioControlBar',

  handleClick: function handleClick() {
    switch (this.props.playState) {
      case 'loading':
        break;
      case 'playing':
        this.props.onPause();
        break;
      default:
        this.props.onPlay();
    }
  },
  handleLoopToggle: function handleLoopToggle() {
    this.props.onLoopToggle(this.refs.loop_enabled.getDOMNode().checked);
  },

  getButtonClass: function getButtonClass() {
    switch (this.props.playState) {
      case 'playing':
        return 'pause';
      case 'loading':
        return 'spinner';
      case 'paused':
      case 'stopped':
      default:
        return 'play';
        return 'play';
    }
  },
  getButtonIconClass: function getButtonIconClass() {
    var button_class = this.getButtonClass();
    switch (button_class) {
      case 'spinner':
        return 'spinner fa-spin';
      default:
        return button_class;
    }
  },

  render: function render() {
    var loop_toggle_id = Helper.guid();
    return React.createElement(
      'div',
      { className: 'audio-control-bar' },
      React.createElement(
        'button',
        {
          className: this.getButtonClass(),
          onClick: this.handleClick
        },
        React.createElement('i', { className: "fa fa-" + this.getButtonIconClass() })
      ),
      React.createElement('input', {
        id: loop_toggle_id,
        className: 'loop-toggle',
        type: 'checkbox',
        ref: 'loop_enabled',
        onChange: this.handleLoopToggle
      }),
      React.createElement(
        'label',
        {
          className: 'loop-toggle-label',
          htmlFor: loop_toggle_id },
        React.createElement('i', { className: 'fa fa-repeat' })
      )
    );
  }
});

module.exports = AudioControlBar;

},{"../Helper.js":"d:\\git\\ear-tickler\\app\\Helper.js","react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioPlayer.js":[function(require,module,exports){
'use strict';

var React = require('react');
var AudioControlBar = require('./AudioControlBar.js');
var AudioProgressBar = require('./AudioProgressBar.js');
var AudioVolumeBar = require('./AudioVolumeBar.js');

var Howl = require('howler').Howl;

var AudioPlayer = React.createClass({
  displayName: 'AudioPlayer',

  getInitialState: function getInitialState() {
    return {
      loop: false,
      muted: false,
      playState: 'loading',
      position: 0,
      duration: 0,
      volume: 1.0
    };
  },
  componentWillMount: function componentWillMount() {
    this.loadAudio();
  },
  componentWillUnmount: function componentWillUnmount() {
    this.clearAudio();
  },

  audio: null, // The Howler.js Howl object
  refresh: null, // Interval for refreshing play time & progress

  loadAudio: function loadAudio() {
    this.clearAudio();
    this.setState({ playState: 'loading' });

    this.audio = new Howl({
      urls: [this.props.track.origin],
      loop: this.state.loop,
      volume: this.state.volume,
      onload: this.handleAudioLoaded,
      onend: this.handleAudioEnded
    });
  },

  handleAudioLoaded: function handleAudioLoaded() {
    this.setState({
      playState: 'paused',
      duration: this.audio._duration
    });
  },
  clearAudio: function clearAudio() {
    if (this.audio) {
      this.audio.stop();
      this.audio = {};
    }
  },

  handleClose: function handleClose() {
    // TODO: allow the close-button to work.
  },
  handleMuteToggle: function handleMuteToggle(muteSetting) {
    if (muteSetting) this.audio.mute();else this.audio.unmute();
    this.setState({ muted: muteSetting });
  },
  handlePause: function handlePause() {
    this.setState({ playState: 'paused' });
    this.audio.pause();
    clearInterval(this.refresh || 0);
    this.updatePosition();
  },
  handlePlay: function handlePlay() {
    this.setState({ playState: 'playing' });
    this.audio.play();
    this.refresh = setInterval(this.updatePosition, 200);
  },
  handleSeek: function handleSeek(percent) {
    this.audio.pos(this.state.duration * percent);
  },
  handleStop: function handleStop() {
    this.setState({ playState: 'stopped' });
    this.audio.stop();
    clearInterval(this.refresh || 0);
    this.updatePosition();
  },
  handleLoopToggle: function handleLoopToggle(loopSetting) {
    if (this.state.playState == 'playing') {
      // This is necessary due to a bug in Howler.js.
      // * Setting .loop(true) while playing doesn't cause it to loop at the end.
      //   Subsequent plays will honor the setting, though - so we simply force it
      //   once to overcome the limitation.
      this.setState({ forceLoop: loopSetting });
    }

    this.setState({ loop: loopSetting });
    this.audio.loop(loopSetting);
  },
  handleSetVolume: function handleSetVolume(volume) {
    this.setState({
      volume: volume,
      muted: false
    });
    this.audio.volume(volume);
  },

  handleAudioEnded: function handleAudioEnded() {
    this.audio.pos(0);
    if (this.state.playState == 'playing' && this.audio.loop() && this.state.forceLoop) {
      // This is necessary due to a bug in Howler.js.
      // * Setting .loop(true) while playing doesn't cause it to loop at the end.
      //   Subsequent plays will honor the setting, though - so we simply force it
      //   once to overcome the limitation.
      this.audio.stop();
      this.audio.play();
      this.setState({ forceLoop: null }); // Only force it once.
    } else if (this.state.playState == 'playing' && !this.audio.loop() && !this.state.forceLoop) {
        this.audio.stop();
        this.setState({
          forceLoop: null,
          playState: 'paused'
        }); // Only force stopping once.
      } else if (!this.audio.loop()) this.setState({ playState: 'paused' });
  },

  updatePosition: function updatePosition() {
    this.setState({ position: this.audio.pos() });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: "audio-player " + this.state.playState },
      React.createElement(
        'div',
        { className: 'track-name' },
        this.props.track.name
      ),
      React.createElement('i', {
        className: 'fa fa-close close-button',
        onClick: this.handleClose }),
      React.createElement(AudioControlBar, {
        playState: this.state.playState,
        onPause: this.handlePause,
        onPlay: this.handlePlay,
        onLoopToggle: this.handleLoopToggle
      }),
      React.createElement(AudioProgressBar, {
        percentage: this.state.position / this.state.duration,
        position: this.state.position,
        duration: this.state.duration,
        onSeek: this.handleSeek
      }),
      React.createElement(AudioVolumeBar, {
        audioNode: this.audio._audioNode[0],
        muted: this.state.muted,
        onMuteToggle: this.handleMuteToggle,
        onSetVolume: this.handleSetVolume,
        playState: this.state.playState,
        volume: this.state.volume
      })
    );
  }
});

module.exports = AudioPlayer;

},{"./AudioControlBar.js":"d:\\git\\ear-tickler\\app\\player\\AudioControlBar.js","./AudioProgressBar.js":"d:\\git\\ear-tickler\\app\\player\\AudioProgressBar.js","./AudioVolumeBar.js":"d:\\git\\ear-tickler\\app\\player\\AudioVolumeBar.js","howler":"d:\\git\\ear-tickler\\node_modules\\howler\\howler.js","react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioProgressBar.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TimeFormatterMixin = require('../mixins/TimeFormatterMixin.js');

var AudioProgressBar = React.createClass({
  displayName: 'AudioProgressBar',

  mixins: [TimeFormatterMixin],
  handleClick: function handleClick(event) {
    var bar_el = this.getDOMNode(),
        coords = bar_el.getClientRects()[0],
        click_x = event.pageX - coords.left,
        percent = click_x / (coords.right - coords.left);

    this.props.onSeek(percent);
  },
  render: function render() {
    var current = this.secondsToTime(this.props.position);
    var duration = this.secondsToTime(this.props.duration);
    return React.createElement(
      'div',
      {
        className: 'audio-progress-bar',
        onClick: this.handleClick },
      React.createElement(
        'div',
        { className: 'audio-timer' },
        current,
        ' / ',
        duration
      ),
      React.createElement(
        'div',
        {
          className: 'audio-progress-bar-fill',
          style: { width: this.props.percentage * 100 + '%' }
        },
        React.createElement(
          'div',
          { className: 'audio-timer' },
          current,
          ' / ',
          duration
        )
      )
    );
  }
});

module.exports = AudioProgressBar;

},{"../mixins/TimeFormatterMixin.js":"d:\\git\\ear-tickler\\app\\mixins\\TimeFormatterMixin.js","react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioVolumeBar.js":[function(require,module,exports){
'use strict';

var React = require('react');
var Helper = require('../Helper.js');

var AudioVolumeBar = React.createClass({
  displayName: 'AudioVolumeBar',

  componentWillMount: function componentWillMount() {
    this.loadVisualizer();
    this.refresh = setInterval(this.updateOscilloscope, 1000);
    this.updateOscilloscope();
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.refresh);
    this.unloadVisualizer();
  },
  analyser: null, // The Web Audio API Analyzer object
  refresh: null, // Interval for refreshing oscilloscope

  handleClick: function handleClick(event) {
    var bar_el = this.refs.volume_bar.getDOMNode(),
        coords = bar_el.getClientRects()[0],
        click_x = event.pageX - coords.left,
        percent = click_x / (coords.right - coords.left);

    this.props.onSetVolume(percent);
  },
  handleMuteToggle: function handleMuteToggle() {
    this.props.onMuteToggle(!this.props.muted);
  },
  handleVolumeDown: function handleVolumeDown(event) {
    var volume = this.props.volume - .1;
    if (volume < 0.0) volume = 0.0;

    this.props.onSetVolume(volume);
  },
  handleVolumeUp: function handleVolumeUp(event) {
    var volume = this.props.volume + .1;
    if (volume > 1.0) volume = 1.0;

    this.props.onSetVolume(volume);
  },

  loadVisualizer: function loadVisualizer() {
    var node = this.props.audioNode;
    var context = this.props.audioNode.context;
    if (!context) return;

    this.analyser = context.createAnalyser();
    node.connect(this.analyser);
    //this.analyser.connect(node);
  },
  unloadVisualizer: function unloadVisualizer() {},
  updateOscilloscope: function updateOscilloscope() {
    if (this.props.playState !== 'playing') return;

    var canvas = this.refs.oscilloscope.getDOMNode();
    var context = canvas.getContext("2d");

    var height = canvas.height;
    var width = canvas.width;

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

  render: function render() {
    var mute_button_id = Helper.guid();
    return React.createElement(
      'div',
      { className: 'audio-volume-wrapper' },
      React.createElement('i', { className: "fa fa-volume-off " + (this.props.muted ? "muted" : ""),
        onClick: this.handleMuteToggle
      }),
      React.createElement('i', { className: 'fa fa-volume-down',
        onClick: this.handleVolumeDown
      }),
      React.createElement(
        'div',
        {
          className: 'audio-volume-bar',
          ref: 'volume_bar',
          onClick: this.handleClick },
        React.createElement('canvas', {
          className: 'audio-volume-bar-fill',
          ref: 'oscilloscope',
          height: '100',
          width: '100',
          style: { width: this.props.volume * 100 + '%' }
        })
      ),
      React.createElement('i', { className: 'fa fa-volume-up',
        onClick: this.handleVolumeUp
      })
    );
  }
});

module.exports = AudioVolumeBar;

},{"../Helper.js":"d:\\git\\ear-tickler\\app\\Helper.js","react":"react"}],"d:\\git\\ear-tickler\\app\\soundboard\\SoundBoard.js":[function(require,module,exports){
'use strict';

var React = require('react');
var AudioPlayer = require('../player/AudioPlayer.js');

var SoundBoard = React.createClass({
  displayName: 'SoundBoard',

  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    var tracks = [];
    this.props.tracks.forEach(function (track) {
      tracks.push(React.createElement(AudioPlayer, {
        key: track.id,
        track: track
      }));
    });
    return React.createElement(
      'div',
      { className: 'sound-board' },
      tracks
    );
  }
});

module.exports = SoundBoard;

},{"../player/AudioPlayer.js":"d:\\git\\ear-tickler\\app\\player\\AudioPlayer.js","react":"react"}],"d:\\git\\ear-tickler\\node_modules\\howler\\howler.js":[function(require,module,exports){
/*!
 *  howler.js v1.1.28
 *  howlerjs.com
 *
 *  (c) 2013-2015, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

(function() {
  // setup
  var cache = {};

  // setup the audio context
  var ctx = null,
    usingWebAudio = true,
    noAudio = false;
  try {
    if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
    } else {
      usingWebAudio = false;
    }
  } catch(e) {
    usingWebAudio = false;
  }

  if (!usingWebAudio) {
    if (typeof Audio !== 'undefined') {
      try {
        new Audio();
      } catch(e) {
        noAudio = true;
      }
    } else {
      noAudio = true;
    }
  }

  // create a master gain node
  if (usingWebAudio) {
    var masterGain = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }

  // create global controller
  var HowlerGlobal = function(codecs) {
    this._volume = 1;
    this._muted = false;
    this.usingWebAudio = usingWebAudio;
    this.ctx = ctx;
    this.noAudio = noAudio;
    this._howls = [];
    this._codecs = codecs;
    this.iOSAutoEnable = true;
  };
  HowlerGlobal.prototype = {
    /**
     * Get/set the global volume for all sounds.
     * @param  {Float} vol Volume from 0.0 to 1.0.
     * @return {Howler/Float}     Returns self or current volume.
     */
    volume: function(vol) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        if (usingWebAudio) {
          masterGain.gain.value = vol;
        }

        // loop through cache and change volume of all nodes that are using HTML5 Audio
        for (var key in self._howls) {
          if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
            // loop through the audio nodes
            for (var i=0; i<self._howls[key]._audioNode.length; i++) {
              self._howls[key]._audioNode[i].volume = self._howls[key]._volume * self._volume;
            }
          }
        }

        return self;
      }

      // return the current global volume
      return (usingWebAudio) ? masterGain.gain.value : self._volume;
    },

    /**
     * Mute all sounds.
     * @return {Howler}
     */
    mute: function() {
      this._setMuted(true);

      return this;
    },

    /**
     * Unmute all sounds.
     * @return {Howler}
     */
    unmute: function() {
      this._setMuted(false);

      return this;
    },

    /**
     * Handle muting and unmuting globally.
     * @param  {Boolean} muted Is muted or not.
     */
    _setMuted: function(muted) {
      var self = this;

      self._muted = muted;

      if (usingWebAudio) {
        masterGain.gain.value = muted ? 0 : self._volume;
      }

      for (var key in self._howls) {
        if (self._howls.hasOwnProperty(key) && self._howls[key]._webAudio === false) {
          // loop through the audio nodes
          for (var i=0; i<self._howls[key]._audioNode.length; i++) {
            self._howls[key]._audioNode[i].muted = muted;
          }
        }
      }
    },

    /**
     * Check for codec support.
     * @param  {String} ext Audio file extention.
     * @return {Boolean}
     */
    codecs: function(ext) {
      return this._codecs[ext];
    },

    /**
     * iOS will only allow audio to be played after a user interaction.
     * Attempt to automatically unlock audio on the first user interaction.
     * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
     * @return {Howler}
     */
    _enableiOSAudio: function() {
      var self = this;

      // only run this on iOS if audio isn't already eanbled
      if (ctx && (self._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
        return;
      }

      self._iOSEnabled = false;

      // call this method on touch start to create and play a buffer,
      // then check if the audio actually played to determine if
      // audio has now been unlocked on iOS
      var unlock = function() {
        // create an empty buffer
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);

        // play the empty buffer
        if (typeof source.start === 'undefined') {
          source.noteOn(0);
        } else {
          source.start(0);
        }

        // setup a timeout to check that we are unlocked on the next event loop
        setTimeout(function() {
          if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
            // update the unlocked state and prevent this check from happening again
            self._iOSEnabled = true;
            self.iOSAutoEnable = false;

            // remove the touch start listener
            window.removeEventListener('touchend', unlock, false);
          }
        }, 0);
      };

      // setup a touch start listener to attempt an unlock in
      window.addEventListener('touchend', unlock, false);

      return self;
    }
  };

  // check for browser codec support
  var audioTest = null;
  var codecs = {};
  if (!noAudio) {
    audioTest = new Audio();
    codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
  }

  // allow access to the global audio controls
  var Howler = new HowlerGlobal(codecs);

  // setup the audio object
  var Howl = function(o) {
    var self = this;

    // setup the defaults
    self._autoplay = o.autoplay || false;
    self._buffer = o.buffer || false;
    self._duration = o.duration || 0;
    self._format = o.format || null;
    self._loop = o.loop || false;
    self._loaded = false;
    self._sprite = o.sprite || {};
    self._src = o.src || '';
    self._pos3d = o.pos3d || [0, 0, -0.5];
    self._volume = o.volume !== undefined ? o.volume : 1;
    self._urls = o.urls || [];
    self._rate = o.rate || 1;

    // allow forcing of a specific panningModel ('equalpower' or 'HRTF'),
    // if none is specified, defaults to 'equalpower' and switches to 'HRTF'
    // if 3d sound is used
    self._model = o.model || null;

    // setup event functions
    self._onload = [o.onload || function() {}];
    self._onloaderror = [o.onloaderror || function() {}];
    self._onend = [o.onend || function() {}];
    self._onpause = [o.onpause || function() {}];
    self._onplay = [o.onplay || function() {}];

    self._onendTimer = [];

    // Web Audio or HTML5 Audio?
    self._webAudio = usingWebAudio && !self._buffer;

    // check if we need to fall back to HTML5 Audio
    self._audioNode = [];
    if (self._webAudio) {
      self._setupAudioNode();
    }

    // automatically try to enable audio on iOS
    if (typeof ctx !== 'undefined' && ctx && Howler.iOSAutoEnable) {
      Howler._enableiOSAudio();
    }

    // add this to an array of Howl's to allow global control
    Howler._howls.push(self);

    // load the track
    self.load();
  };

  // setup all of the methods
  Howl.prototype = {
    /**
     * Load an audio file.
     * @return {Howl}
     */
    load: function() {
      var self = this,
        url = null;

      // if no audio is available, quit immediately
      if (noAudio) {
        self.on('loaderror');
        return;
      }

      // loop through source URLs and pick the first one that is compatible
      for (var i=0; i<self._urls.length; i++) {
        var ext, urlItem;

        if (self._format) {
          // use specified audio format if available
          ext = self._format;
        } else {
          // figure out the filetype (whether an extension or base64 data)
          urlItem = self._urls[i];
          ext = /^data:audio\/([^;,]+);/i.exec(urlItem);
          if (!ext) {
            ext = /\.([^.]+)$/.exec(urlItem.split('?', 1)[0]);
          }

          if (ext) {
            ext = ext[1].toLowerCase();
          } else {
            self.on('loaderror');
            return;
          }
        }

        if (codecs[ext]) {
          url = self._urls[i];
          break;
        }
      }

      if (!url) {
        self.on('loaderror');
        return;
      }

      self._src = url;

      if (self._webAudio) {
        loadBuffer(self, url);
      } else {
        var newNode = new Audio();

        // listen for errors with HTML5 audio (http://dev.w3.org/html5/spec-author-view/spec.html#mediaerror)
        newNode.addEventListener('error', function () {
          if (newNode.error && newNode.error.code === 4) {
            HowlerGlobal.noAudio = true;
          }

          self.on('loaderror', {type: newNode.error ? newNode.error.code : 0});
        }, false);

        self._audioNode.push(newNode);

        // setup the new audio node
        newNode.src = url;
        newNode._pos = 0;
        newNode.preload = 'auto';
        newNode.volume = (Howler._muted) ? 0 : self._volume * Howler.volume();

        // setup the event listener to start playing the sound
        // as soon as it has buffered enough
        var listener = function() {
          // round up the duration when using HTML5 Audio to account for the lower precision
          self._duration = Math.ceil(newNode.duration * 10) / 10;

          // setup a sprite if none is defined
          if (Object.getOwnPropertyNames(self._sprite).length === 0) {
            self._sprite = {_default: [0, self._duration * 1000]};
          }

          if (!self._loaded) {
            self._loaded = true;
            self.on('load');
          }

          if (self._autoplay) {
            self.play();
          }

          // clear the event listener
          newNode.removeEventListener('canplaythrough', listener, false);
        };
        newNode.addEventListener('canplaythrough', listener, false);
        newNode.load();
      }

      return self;
    },

    /**
     * Get/set the URLs to be pulled from to play in this source.
     * @param  {Array} urls  Arry of URLs to load from
     * @return {Howl}        Returns self or the current URLs
     */
    urls: function(urls) {
      var self = this;

      if (urls) {
        self.stop();
        self._urls = (typeof urls === 'string') ? [urls] : urls;
        self._loaded = false;
        self.load();

        return self;
      } else {
        return self._urls;
      }
    },

    /**
     * Play a sound from the current time (0 by default).
     * @param  {String}   sprite   (optional) Plays from the specified position in the sound sprite definition.
     * @param  {Function} callback (optional) Returns the unique playback id for this sound instance.
     * @return {Howl}
     */
    play: function(sprite, callback) {
      var self = this;

      // if no sprite was passed but a callback was, update the variables
      if (typeof sprite === 'function') {
        callback = sprite;
      }

      // use the default sprite if none is passed
      if (!sprite || typeof sprite === 'function') {
        sprite = '_default';
      }

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.play(sprite, callback);
        });

        return self;
      }

      // if the sprite doesn't exist, play nothing
      if (!self._sprite[sprite]) {
        if (typeof callback === 'function') callback();
        return self;
      }

      // get the node to playback
      self._inactiveNode(function(node) {
        // persist the sprite being played
        node._sprite = sprite;

        // determine where to start playing from
        var pos = (node._pos > 0) ? node._pos : self._sprite[sprite][0] / 1000;

        // determine how long to play for
        var duration = 0;
        if (self._webAudio) {
          duration = self._sprite[sprite][1] / 1000 - node._pos;
          if (node._pos > 0) {
            pos = self._sprite[sprite][0] / 1000 + pos;
          }
        } else {
          duration = self._sprite[sprite][1] / 1000 - (pos - self._sprite[sprite][0] / 1000);
        }

        // determine if this sound should be looped
        var loop = !!(self._loop || self._sprite[sprite][2]);

        // set timer to fire the 'onend' event
        var soundId = (typeof callback === 'string') ? callback : Math.round(Date.now() * Math.random()) + '',
          timerId;
        (function() {
          var data = {
            id: soundId,
            sprite: sprite,
            loop: loop
          };
          timerId = setTimeout(function() {
            // if looping, restart the track
            if (!self._webAudio && loop) {
              self.stop(data.id).play(sprite, data.id);
            }

            // set web audio node to paused at end
            if (self._webAudio && !loop) {
              self._nodeById(data.id).paused = true;
              self._nodeById(data.id)._pos = 0;

              // clear the end timer
              self._clearEndTimer(data.id);
            }

            // end the track if it is HTML audio and a sprite
            if (!self._webAudio && !loop) {
              self.stop(data.id);
            }

            // fire ended event
            self.on('end', soundId);
          }, duration * 1000);

          // store the reference to the timer
          self._onendTimer.push({timer: timerId, id: data.id});
        })();

        if (self._webAudio) {
          var loopStart = self._sprite[sprite][0] / 1000,
            loopEnd = self._sprite[sprite][1] / 1000;

          // set the play id to this node and load into context
          node.id = soundId;
          node.paused = false;
          refreshBuffer(self, [loop, loopStart, loopEnd], soundId);
          self._playStart = ctx.currentTime;
          node.gain.value = self._volume;

          if (typeof node.bufferSource.start === 'undefined') {
            loop ? node.bufferSource.noteGrainOn(0, pos, 86400) : node.bufferSource.noteGrainOn(0, pos, duration);
          } else {
            loop ? node.bufferSource.start(0, pos, 86400) : node.bufferSource.start(0, pos, duration);
          }
        } else {
          if (node.readyState === 4 || !node.readyState && navigator.isCocoonJS) {
            node.readyState = 4;
            node.id = soundId;
            node.currentTime = pos;
            node.muted = Howler._muted || node.muted;
            node.volume = self._volume * Howler.volume();
            setTimeout(function() { node.play(); }, 0);
          } else {
            self._clearEndTimer(soundId);

            (function(){
              var sound = self,
                playSprite = sprite,
                fn = callback,
                newNode = node;
              var listener = function() {
                sound.play(playSprite, fn);

                // clear the event listener
                newNode.removeEventListener('canplaythrough', listener, false);
              };
              newNode.addEventListener('canplaythrough', listener, false);
            })();

            return self;
          }
        }

        // fire the play event and send the soundId back in the callback
        self.on('play');
        if (typeof callback === 'function') callback(soundId);

        return self;
      });

      return self;
    },

    /**
     * Pause playback and save the current position.
     * @param {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    pause: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pause(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = self.pos(null, id);

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;
          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else {
          activeNode.pause();
        }
      }

      self.on('pause');

      return self;
    },

    /**
     * Stop playback and reset to start.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl}
     */
    stop: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.stop(id);
        });

        return self;
      }

      // clear 'onend' timer
      self._clearEndTimer(id);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        activeNode._pos = 0;

        if (self._webAudio) {
          // make sure the sound has been created
          if (!activeNode.bufferSource || activeNode.paused) {
            return self;
          }

          activeNode.paused = true;

          if (typeof activeNode.bufferSource.stop === 'undefined') {
            activeNode.bufferSource.noteOff(0);
          } else {
            activeNode.bufferSource.stop(0);
          }
        } else if (!isNaN(activeNode.duration)) {
          activeNode.pause();
          activeNode.currentTime = 0;
        }
      }

      return self;
    },

    /**
     * Mute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    mute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.mute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = 0;
        } else {
          activeNode.muted = true;
        }
      }

      return self;
    },

    /**
     * Unmute this sound.
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl}
     */
    unmute: function(id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.unmute(id);
        });

        return self;
      }

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (self._webAudio) {
          activeNode.gain.value = self._volume;
        } else {
          activeNode.muted = false;
        }
      }

      return self;
    },

    /**
     * Get/set volume of this sound.
     * @param  {Float}  vol Volume from 0.0 to 1.0.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}     Returns self or current volume.
     */
    volume: function(vol, id) {
      var self = this;

      // make sure volume is a number
      vol = parseFloat(vol);

      if (vol >= 0 && vol <= 1) {
        self._volume = vol;

        // if the sound hasn't been loaded, add it to the event queue
        if (!self._loaded) {
          self.on('play', function() {
            self.volume(vol, id);
          });

          return self;
        }

        var activeNode = (id) ? self._nodeById(id) : self._activeNode();
        if (activeNode) {
          if (self._webAudio) {
            activeNode.gain.value = vol;
          } else {
            activeNode.volume = vol * Howler.volume();
          }
        }

        return self;
      } else {
        return self._volume;
      }
    },

    /**
     * Get/set whether to loop the sound.
     * @param  {Boolean} loop To loop or not to loop, that is the question.
     * @return {Howl/Boolean}      Returns self or current looping value.
     */
    loop: function(loop) {
      var self = this;

      if (typeof loop === 'boolean') {
        self._loop = loop;

        return self;
      } else {
        return self._loop;
      }
    },

    /**
     * Get/set sound sprite definition.
     * @param  {Object} sprite Example: {spriteName: [offset, duration, loop]}
     *                @param {Integer} offset   Where to begin playback in milliseconds
     *                @param {Integer} duration How long to play in milliseconds
     *                @param {Boolean} loop     (optional) Set true to loop this sprite
     * @return {Howl}        Returns current sprite sheet or self.
     */
    sprite: function(sprite) {
      var self = this;

      if (typeof sprite === 'object') {
        self._sprite = sprite;

        return self;
      } else {
        return self._sprite;
      }
    },

    /**
     * Get/set the position of playback.
     * @param  {Float}  pos The position to move current playback to.
     * @param  {String} id  (optional) The play instance ID.
     * @return {Howl/Float}      Returns self or current playback position.
     */
    pos: function(pos, id) {
      var self = this;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.pos(pos);
        });

        return typeof pos === 'number' ? self : self._pos || 0;
      }

      // make sure we are dealing with a number for pos
      pos = parseFloat(pos);

      var activeNode = (id) ? self._nodeById(id) : self._activeNode();
      if (activeNode) {
        if (pos >= 0) {
          self.pause(id);
          activeNode._pos = pos;
          self.play(activeNode._sprite, id);

          return self;
        } else {
          return self._webAudio ? activeNode._pos + (ctx.currentTime - self._playStart) : activeNode.currentTime;
        }
      } else if (pos >= 0) {
        return self;
      } else {
        // find the first inactive node to return the pos for
        for (var i=0; i<self._audioNode.length; i++) {
          if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
            return (self._webAudio) ? self._audioNode[i]._pos : self._audioNode[i].currentTime;
          }
        }
      }
    },

    /**
     * Get/set the 3D position of the audio source.
     * The most common usage is to set the 'x' position
     * to affect the left/right ear panning. Setting any value higher than
     * 1.0 will begin to decrease the volume of the sound as it moves further away.
     * NOTE: This only works with Web Audio API, HTML5 Audio playback
     * will not be affected.
     * @param  {Float}  x  The x-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  y  The y-position of the playback from -1000.0 to 1000.0
     * @param  {Float}  z  The z-position of the playback from -1000.0 to 1000.0
     * @param  {String} id (optional) The play instance ID.
     * @return {Howl/Array}   Returns self or the current 3D position: [x, y, z]
     */
    pos3d: function(x, y, z, id) {
      var self = this;

      // set a default for the optional 'y' & 'z'
      y = (typeof y === 'undefined' || !y) ? 0 : y;
      z = (typeof z === 'undefined' || !z) ? -0.5 : z;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('play', function() {
          self.pos3d(x, y, z, id);
        });

        return self;
      }

      if (x >= 0 || x < 0) {
        if (self._webAudio) {
          var activeNode = (id) ? self._nodeById(id) : self._activeNode();
          if (activeNode) {
            self._pos3d = [x, y, z];
            activeNode.panner.setPosition(x, y, z);
            activeNode.panner.panningModel = self._model || 'HRTF';
          }
        }
      } else {
        return self._pos3d;
      }

      return self;
    },

    /**
     * Fade a currently playing sound between two volumes.
     * @param  {Number}   from     The volume to fade from (0.0 to 1.0).
     * @param  {Number}   to       The volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback (optional) Fired when the fade is complete.
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fade: function(from, to, len, callback, id) {
      var self = this,
        diff = Math.abs(from - to),
        dir = from > to ? 'down' : 'up',
        steps = diff / 0.01,
        stepTime = len / steps;

      // if the sound hasn't been loaded, add it to the event queue
      if (!self._loaded) {
        self.on('load', function() {
          self.fade(from, to, len, callback, id);
        });

        return self;
      }

      // set the volume to the start position
      self.volume(from, id);

      for (var i=1; i<=steps; i++) {
        (function() {
          var change = self._volume + (dir === 'up' ? 0.01 : -0.01) * i,
            vol = Math.round(1000 * change) / 1000,
            toVol = to;

          setTimeout(function() {
            self.volume(vol, id);

            if (vol === toVol) {
              if (callback) callback();
            }
          }, stepTime * i);
        })();
      }
    },

    /**
     * [DEPRECATED] Fade in the current sound.
     * @param  {Float}    to      Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len     Time in milliseconds to fade.
     * @param  {Function} callback
     * @return {Howl}
     */
    fadeIn: function(to, len, callback) {
      return this.volume(0).play().fade(0, to, len, callback);
    },

    /**
     * [DEPRECATED] Fade out the current sound and pause when finished.
     * @param  {Float}    to       Volume to fade to (0.0 to 1.0).
     * @param  {Number}   len      Time in milliseconds to fade.
     * @param  {Function} callback
     * @param  {String}   id       (optional) The play instance ID.
     * @return {Howl}
     */
    fadeOut: function(to, len, callback, id) {
      var self = this;

      return self.fade(self._volume, to, len, function() {
        if (callback) callback();
        self.pause(id);

        // fire ended event
        self.on('end');
      }, id);
    },

    /**
     * Get an audio node by ID.
     * @return {Howl} Audio node.
     */
    _nodeById: function(id) {
      var self = this,
        node = self._audioNode[0];

      // find the node with this ID
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].id === id) {
          node = self._audioNode[i];
          break;
        }
      }

      return node;
    },

    /**
     * Get the first active audio node.
     * @return {Howl} Audio node.
     */
    _activeNode: function() {
      var self = this,
        node = null;

      // find the first playing node
      for (var i=0; i<self._audioNode.length; i++) {
        if (!self._audioNode[i].paused) {
          node = self._audioNode[i];
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      return node;
    },

    /**
     * Get the first inactive audio node.
     * If there is none, create a new one and add it to the pool.
     * @param  {Function} callback Function to call when the audio node is ready.
     */
    _inactiveNode: function(callback) {
      var self = this,
        node = null;

      // find first inactive node to recycle
      for (var i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused && self._audioNode[i].readyState === 4) {
          // send the node back for use by the new play instance
          callback(self._audioNode[i]);
          node = true;
          break;
        }
      }

      // remove excess inactive nodes
      self._drainPool();

      if (node) {
        return;
      }

      // create new node if there are no inactives
      var newNode;
      if (self._webAudio) {
        newNode = self._setupAudioNode();
        callback(newNode);
      } else {
        self.load();
        newNode = self._audioNode[self._audioNode.length - 1];

        // listen for the correct load event and fire the callback
        var listenerEvent = navigator.isCocoonJS ? 'canplaythrough' : 'loadedmetadata';
        var listener = function() {
          newNode.removeEventListener(listenerEvent, listener, false);
          callback(newNode);
        };
        newNode.addEventListener(listenerEvent, listener, false);
      }
    },

    /**
     * If there are more than 5 inactive audio nodes in the pool, clear out the rest.
     */
    _drainPool: function() {
      var self = this,
        inactive = 0,
        i;

      // count the number of inactive nodes
      for (i=0; i<self._audioNode.length; i++) {
        if (self._audioNode[i].paused) {
          inactive++;
        }
      }

      // remove excess inactive nodes
      for (i=self._audioNode.length-1; i>=0; i--) {
        if (inactive <= 5) {
          break;
        }

        if (self._audioNode[i].paused) {
          // disconnect the audio source if using Web Audio
          if (self._webAudio) {
            self._audioNode[i].disconnect(0);
          }

          inactive--;
          self._audioNode.splice(i, 1);
        }
      }
    },

    /**
     * Clear 'onend' timeout before it ends.
     * @param  {String} soundId  The play instance ID.
     */
    _clearEndTimer: function(soundId) {
      var self = this,
        index = 0;

      // loop through the timers to find the one associated with this sound
      for (var i=0; i<self._onendTimer.length; i++) {
        if (self._onendTimer[i].id === soundId) {
          index = i;
          break;
        }
      }

      var timer = self._onendTimer[index];
      if (timer) {
        clearTimeout(timer.timer);
        self._onendTimer.splice(index, 1);
      }
    },

    /**
     * Setup the gain node and panner for a Web Audio instance.
     * @return {Object} The new audio node.
     */
    _setupAudioNode: function() {
      var self = this,
        node = self._audioNode,
        index = self._audioNode.length;

      // create gain node
      node[index] = (typeof ctx.createGain === 'undefined') ? ctx.createGainNode() : ctx.createGain();
      node[index].gain.value = self._volume;
      node[index].paused = true;
      node[index]._pos = 0;
      node[index].readyState = 4;
      node[index].connect(masterGain);

      // create the panner
      node[index].panner = ctx.createPanner();
      node[index].panner.panningModel = self._model || 'equalpower';
      node[index].panner.setPosition(self._pos3d[0], self._pos3d[1], self._pos3d[2]);
      node[index].panner.connect(node[index]);

      return node[index];
    },

    /**
     * Call/set custom events.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Function to call.
     * @return {Howl}
     */
    on: function(event, fn) {
      var self = this,
        events = self['_on' + event];

      if (typeof fn === 'function') {
        events.push(fn);
      } else {
        for (var i=0; i<events.length; i++) {
          if (fn) {
            events[i].call(self, fn);
          } else {
            events[i].call(self);
          }
        }
      }

      return self;
    },

    /**
     * Remove a custom event.
     * @param  {String}   event Event type.
     * @param  {Function} fn    Listener to remove.
     * @return {Howl}
     */
    off: function(event, fn) {
      var self = this,
        events = self['_on' + event],
        fnString = fn ? fn.toString() : null;

      if (fnString) {
        // loop through functions in the event for comparison
        for (var i=0; i<events.length; i++) {
          if (fnString === events[i].toString()) {
            events.splice(i, 1);
            break;
          }
        }
      } else {
        self['_on' + event] = [];
      }

      return self;
    },

    /**
     * Unload and destroy the current Howl object.
     * This will immediately stop all play instances attached to this sound.
     */
    unload: function() {
      var self = this;

      // stop playing any active nodes
      var nodes = self._audioNode;
      for (var i=0; i<self._audioNode.length; i++) {
        // stop the sound if it is currently playing
        if (!nodes[i].paused) {
          self.stop(nodes[i].id);
          self.on('end', nodes[i].id);
        }

        if (!self._webAudio) {
          // remove the source if using HTML5 Audio
          nodes[i].src = '';
        } else {
          // disconnect the output from the master gain
          nodes[i].disconnect(0);
        }
      }

      // make sure all timeouts are cleared
      for (i=0; i<self._onendTimer.length; i++) {
        clearTimeout(self._onendTimer[i].timer);
      }

      // remove the reference in the global Howler object
      var index = Howler._howls.indexOf(self);
      if (index !== null && index >= 0) {
        Howler._howls.splice(index, 1);
      }

      // delete this sound from the cache
      delete cache[self._src];
      self = null;
    }

  };

  // only define these functions when using WebAudio
  if (usingWebAudio) {

    /**
     * Buffer a sound from URL (or from cache) and decode to audio source (Web Audio API).
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var loadBuffer = function(obj, url) {
      // check if the buffer has already been cached
      if (url in cache) {
        // set the duration from the cache
        obj._duration = cache[url].duration;

        // load the sound into this object
        loadSound(obj);
        return;
      }
      
      if (/^data:[^;]+;base64,/.test(url)) {
        // Decode base64 data-URIs because some browsers cannot load data-URIs with XMLHttpRequest.
        var data = atob(url.split(',')[1]);
        var dataView = new Uint8Array(data.length);
        for (var i=0; i<data.length; ++i) {
          dataView[i] = data.charCodeAt(i);
        }
        
        decodeAudioData(dataView.buffer, obj, url);
      } else {
        // load the buffer from the URL
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          decodeAudioData(xhr.response, obj, url);
        };
        xhr.onerror = function() {
          // if there is an error, switch the sound to HTML Audio
          if (obj._webAudio) {
            obj._buffer = true;
            obj._webAudio = false;
            obj._audioNode = [];
            delete obj._gainNode;
            delete cache[url];
            obj.load();
          }
        };
        try {
          xhr.send();
        } catch (e) {
          xhr.onerror();
        }
      }
    };

    /**
     * Decode audio data from an array buffer.
     * @param  {ArrayBuffer} arraybuffer The audio data.
     * @param  {Object} obj The Howl object for the sound to load.
     * @param  {String} url The path to the sound file.
     */
    var decodeAudioData = function(arraybuffer, obj, url) {
      // decode the buffer into an audio source
      ctx.decodeAudioData(
        arraybuffer,
        function(buffer) {
          if (buffer) {
            cache[url] = buffer;
            loadSound(obj, buffer);
          }
        },
        function(err) {
          obj.on('loaderror');
        }
      );
    };

    /**
     * Finishes loading the Web Audio API sound and fires the loaded event
     * @param  {Object}  obj    The Howl object for the sound to load.
     * @param  {Objecct} buffer The decoded buffer sound source.
     */
    var loadSound = function(obj, buffer) {
      // set the duration
      obj._duration = (buffer) ? buffer.duration : obj._duration;

      // setup a sprite if none is defined
      if (Object.getOwnPropertyNames(obj._sprite).length === 0) {
        obj._sprite = {_default: [0, obj._duration * 1000]};
      }

      // fire the loaded event
      if (!obj._loaded) {
        obj._loaded = true;
        obj.on('load');
      }

      if (obj._autoplay) {
        obj.play();
      }
    };

    /**
     * Load the sound back into the buffer source.
     * @param  {Object} obj   The sound to load.
     * @param  {Array}  loop  Loop boolean, pos, and duration.
     * @param  {String} id    (optional) The play instance ID.
     */
    var refreshBuffer = function(obj, loop, id) {
      // determine which node to connect to
      var node = obj._nodeById(id);

      // setup the buffer source for playback
      node.bufferSource = ctx.createBufferSource();
      node.bufferSource.buffer = cache[obj._src];
      node.bufferSource.connect(node.panner);
      node.bufferSource.loop = loop[0];
      if (loop[0]) {
        node.bufferSource.loopStart = loop[1];
        node.bufferSource.loopEnd = loop[1] + loop[2];
      }
      node.bufferSource.playbackRate.value = obj._rate;
    };

  }

  /**
   * Add support for AMD (Asynchronous Module Definition) libraries such as require.js.
   */
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return {
        Howler: Howler,
        Howl: Howl
      };
    });
  }

  /**
   * Add support for CommonJS libraries such as browserify.
   */
  if (typeof exports !== 'undefined') {
    exports.Howler = Howler;
    exports.Howl = Howl;
  }

  // define globally in case AMD is not available or available but not used

  if (typeof window !== 'undefined') {
    window.Howler = Howler;
    window.Howl = Howl;
  }

})();

},{}]},{},["d:\\git\\ear-tickler\\app\\main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0FwcC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvSGVscGVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9kYXRhL1RyYWNrU3RvcmUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL2RhdGEvVHJhY2tzLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9tYWluLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9taXhpbnMvVGltZUZvcm1hdHRlck1peGluLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9uYXZpZ2F0aW9uL0ZpbHRlcmVkVHJhY2tMaXN0LmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9uYXZpZ2F0aW9uL1RyYWNrTGlzdC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvbmF2aWdhdGlvbi9UcmFja1NlYXJjaEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvQ29udHJvbEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvUGxheWVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9wbGF5ZXIvQXVkaW9Qcm9ncmVzc0Jhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvVm9sdW1lQmFyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9zb3VuZGJvYXJkL1NvdW5kQm9hcmQuanMiLCJub2RlX21vZHVsZXMvaG93bGVyL2hvd2xlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2pELElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDckUsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7O0FBRXZELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMxQixRQUFNLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRTs7QUFFOUIsYUFBVyxFQUFFLHVCQUFZO0FBQ3ZCLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7R0FDbkI7QUFDRCxRQUFNLEVBQUUsa0JBQVc7QUFDakIsV0FDRTs7UUFBSyxTQUFTLEVBQUMseUJBQXlCO01BQ3RDOztVQUFLLFNBQVMsRUFBQyxZQUFZO1FBQ3pCOztZQUFLLFNBQVMsRUFBQyxPQUFPO1VBQ3BCLDJCQUFHLFNBQVMsRUFBQyxrQkFBa0IsR0FBSzs7U0FDaEM7T0FDRjtNQUNOLG9CQUFDLGlCQUFpQjtBQUNoQixjQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEFBQUM7UUFDMUM7TUFDRixvQkFBQyxVQUFVO0FBQ1QsY0FBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDO1FBQ3pCO0tBQ0UsQ0FDTjtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7OztBQzlCckIsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNiLFVBQU0sRUFBRSxnQkFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQ25CLGFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUNaLElBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFDcEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixlQUFPLENBQUMsQ0FBQztLQUNaO0FBQ0QsUUFBSSxFQUFFLGdCQUFXO0FBQ2IsZUFBTyxzQ0FBc0MsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQ3ZFLGdCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxHQUFDLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFJLENBQUMsR0FBQyxHQUFHLEdBQUMsR0FBRyxBQUFDLENBQUM7QUFDM0QsbUJBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7S0FDTjtDQUNKLENBQUE7Ozs7O0FDYkQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2pDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFBLFlBQVc7QUFDMUIsUUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUNwQyxJQUFJLENBQUMsVUFBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25CLGVBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JDLENBQUMsQ0FBQztBQUNMLFFBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDeEMsZUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2pCLGNBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ2pCLGdCQUFJLEVBQUUsV0FBVztBQUNqQixlQUFHLEVBQUUsc0JBQXNCO0FBQzNCLGtCQUFNLEVBQUUsZ0JBQWdCO1NBQzNCLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDYixDQUFDLENBQUM7O0FBRUgsV0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ3RCLGNBQU0sRUFBRSxNQUFNO0FBQ2QsbUJBQVcsRUFBRSxxQkFBUyxLQUFLLEVBQUU7QUFDekIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDL0I7QUFDRCxtQkFBVyxFQUFFLHFCQUFTLEVBQUUsRUFBRTtBQUN0QixrQkFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBUyxFQUFFLEVBQUU7QUFBRSx1QkFBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUFFLENBQUMsQ0FBQztBQUM5RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQy9CO0FBQ0QsZUFBTyxFQUFFO0FBQ0wscUJBQVMsRUFBRSxxQkFBVztBQUNsQix1QkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3RCO0FBQ0QsdUJBQVcsRUFBRSxxQkFBUyxFQUFFLEVBQUU7QUFDdEIsb0JBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDeEI7QUFDRCxvQkFBUSxFQUFFLGtCQUFTLEtBQUssRUFBRTtBQUN0QixvQkFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtTQUNKO0tBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQSxFQUFFLENBQUM7Ozs7O0FDdkNKLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQztBQUNoQixNQUFJLEVBQUUsZUFBZTtBQUNyQixRQUFNLEVBQUUsNERBQTREO0NBQ3JFLEVBQUM7QUFDQSxNQUFJLEVBQUUsZ0JBQWdCO0FBQ3RCLFFBQU0sRUFBRSxtRUFBbUU7Q0FDNUUsRUFBQztBQUNBLE1BQUksRUFBRSxVQUFVO0FBQ2hCLFFBQU0sRUFBRSwrREFBK0Q7Q0FDeEUsRUFBQztBQUNBLE1BQUksRUFBRSxzQkFBc0I7QUFDNUIsUUFBTSxFQUFFLGlFQUFpRTtDQUMxRSxFQUFDO0FBQ0EsTUFBSSxFQUFFLFlBQVk7QUFDbEIsUUFBTSxFQUFFLCtEQUErRDtDQUN4RSxFQUFDO0FBQ0EsTUFBSSxFQUFFLGNBQWM7QUFDcEIsUUFBTSxFQUFFLG1FQUFtRTtDQUM1RSxFQUFDO0FBQ0EsTUFBSSxFQUFFLGVBQWU7QUFDckIsUUFBTSxFQUFFLDREQUE0RDtDQUNyRSxFQUFDO0FBQ0EsTUFBSSxFQUFFLHNCQUFzQjtBQUM1QixRQUFNLEVBQUUsbUVBQW1FO0NBQzVFLEVBQUM7QUFDQSxNQUFJLEVBQUUsWUFBWTtBQUNsQixRQUFNLEVBQUUsbUVBQW1FO0NBQzVFLEVBQUM7QUFDQSxNQUFJLEVBQUUsY0FBYztBQUNwQixRQUFNLEVBQUUsbUVBQW1FO0NBQzVFLENBQUMsQ0FBQzs7Ozs7QUM5QkgsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDakQsS0FBSyxDQUFDLE1BQU0sQ0FDVixvQkFBQyxHQUFHO0FBQ0YsWUFBVSxFQUFFLFVBQVUsQUFBQztFQUN2QixFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQzNDLENBQUM7Ozs7O0FDUkYsTUFBTSxDQUFDLE9BQU8sR0FBSTtBQUNoQixlQUFhLEVBQUUsdUJBQVMsSUFBSSxFQUFFO0FBQzVCLFFBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLFFBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDLENBQUM7O0FBRXpDLFFBQUksbUJBQW1CLEdBQUcsSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDO0FBQzNDLFFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsRUFBRSxDQUFDLENBQUM7O0FBRW5ELFFBQUksbUJBQW1CLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0FBQ25ELFFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs7QUFFN0MsUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVkLFFBQUcsS0FBSyxHQUFHLENBQUMsRUFBRTtBQUNaLFVBQUksSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQ3JCOztBQUVELFFBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQyxRQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxXQUFPLElBQUksQ0FBQztHQUNiOztBQUVELGdCQUFjLEVBQUMsd0JBQVMsSUFBSSxFQUFFO0FBQzVCLFFBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtBQUNaLGFBQU8sSUFBSSxDQUFDO0tBQ2IsTUFBTSxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUU7QUFDcEIsYUFBTyxHQUFHLEdBQUcsSUFBSSxDQUFDO0tBQ25CLE1BQU07QUFDTCxhQUFPLElBQUksQ0FBQztLQUNiO0dBQ0Y7Q0FDRixDQUFDOzs7OztBQy9CRixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRTFDLElBQUksaUJBQWlCLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3RDLG1CQUFlLEVBQUUsMkJBQVc7QUFDeEIsZUFBTztBQUNILHNCQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO0tBQ0w7QUFDRCxzQkFBa0IsRUFBRSw0QkFBUyxVQUFVLEVBQUU7QUFDckMsWUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNWLHNCQUFVLEVBQUUsVUFBVTtTQUN6QixDQUFDLENBQUM7S0FDTjtBQUNELFVBQU0sRUFBRSxrQkFBVztBQUNmLGVBQ0k7O2NBQUssU0FBUyxFQUFDLHFCQUFxQjtZQUNoQyxvQkFBQyxjQUFjO0FBQ1gsMEJBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQUFBQztBQUNsQyw4QkFBYyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQUFBQztjQUMxQztZQUNGLG9CQUFDLFNBQVM7QUFDTiwwQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDO0FBQ2xDLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEFBQUM7Y0FDNUI7U0FDQSxDQUNSO0tBQ0w7Q0FDSixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQzs7Ozs7QUMvQm5DLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFbEQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ2hDLFFBQU0sRUFBRSxrQkFBVztBQUNqQixRQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDOUIsTUFBTSxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ3RCLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pELFVBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDekMsYUFBTyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDLEVBQUUsSUFBSSxDQUFDLENBQ1AsR0FBRyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQ25CLGFBQ0U7O1VBQUksR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEFBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxBQUFDO1FBQzlCLDJCQUFHLFNBQVMsRUFBQyxhQUFhLEdBQUs7UUFDOUIsS0FBSyxDQUFDLElBQUk7T0FDUixDQUNMO0tBQ0gsQ0FDRixDQUFDOztBQUVGLFdBQ0U7OztNQUFLLFNBQVM7S0FBTSxDQUNwQjtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztBQzNCM0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUVsRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDOUIsc0JBQWtCLEVBQUUsOEJBQVc7QUFDM0IsWUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQ3hELFlBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3pDO0FBQ0QsVUFBTSxFQUFFLGtCQUFXO0FBQ2YsZUFDSTtBQUNJLGdCQUFJLEVBQUMsTUFBTTtBQUNYLHVCQUFXLEVBQUMsV0FBVztBQUN2QixpQkFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDO0FBQzdCLGVBQUcsRUFBQyxXQUFXO0FBQ2Ysb0JBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEFBQUM7VUFDcEMsQ0FDSjtLQUNMO0NBQ0osQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztBQ3JCM0IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFckMsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3RDLGFBQVcsRUFBRSx1QkFBVztBQUN0QixZQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztBQUMxQixXQUFLLFNBQVM7QUFDWixjQUFNO0FBQUEsQUFDUixXQUFLLFNBQVM7QUFDWixZQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JCLGNBQU07QUFBQSxBQUNSO0FBQ0UsWUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUFBLEtBQ3ZCO0dBQ0Y7QUFDRCxrQkFBZ0IsRUFBRSw0QkFBVztBQUMzQixRQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUM1QyxDQUFDO0dBQ0g7O0FBRUQsZ0JBQWMsRUFBRSwwQkFBVztBQUN6QixZQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztBQUMxQixXQUFLLFNBQVM7QUFDWixlQUFPLE9BQU8sQ0FBQztBQUFBLEFBQ2pCLFdBQUssU0FBUztBQUNaLGVBQU8sU0FBUyxDQUFDO0FBQUEsQUFDbkIsV0FBSyxRQUFRLENBQUM7QUFDZCxXQUFLLFNBQVMsQ0FBQztBQUNmO0FBQ0UsZUFBTyxNQUFNLENBQUM7QUFDZCxlQUFPLE1BQU0sQ0FBQztBQUFBLEtBQ2pCO0dBQ0Y7QUFDRCxvQkFBa0IsRUFBRSw4QkFBVztBQUM3QixRQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDekMsWUFBUSxZQUFZO0FBQ2xCLFdBQUssU0FBUztBQUNaLGVBQU8saUJBQWlCLENBQUM7QUFBQSxBQUMzQjtBQUNFLGVBQU8sWUFBWSxDQUFDO0FBQUEsS0FDdkI7R0FDRjs7QUFFRCxRQUFNLEVBQUUsa0JBQVc7QUFDakIsUUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ25DLFdBQ0U7O1FBQUssU0FBUyxFQUFDLG1CQUFtQjtNQUNoQzs7O0FBQ0UsbUJBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEFBQUM7QUFDakMsaUJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDOztRQUUxQiwyQkFBRyxTQUFTLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxBQUFDLEdBQUs7T0FDakQ7TUFDVDtBQUNFLFVBQUUsRUFBRSxjQUFjLEFBQUM7QUFDbkIsaUJBQVMsRUFBQyxhQUFhO0FBQ3ZCLFlBQUksRUFBQyxVQUFVO0FBQ2YsV0FBRyxFQUFDLGNBQWM7QUFDbEIsZ0JBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7UUFDaEM7TUFDRjs7O0FBQ0UsbUJBQVMsRUFBQyxtQkFBbUI7QUFDN0IsaUJBQU8sRUFBRSxjQUFjLEFBQUM7UUFDeEIsMkJBQUcsU0FBUyxFQUFDLGNBQWMsR0FBSztPQUMxQjtLQUNKLENBQ047R0FDSDtDQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQzs7Ozs7QUN2RWpDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLGVBQWUsR0FBSSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUN2RCxJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3hELElBQUksY0FBYyxHQUFLLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDOztBQUV0RCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDOztBQUVsQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDbEMsaUJBQWUsRUFBRSwyQkFBVztBQUMxQixXQUFPO0FBQ0wsVUFBSSxFQUFFLEtBQUs7QUFDWCxXQUFLLEVBQUUsS0FBSztBQUNaLGVBQVMsRUFBRSxTQUFTO0FBQ3BCLGNBQVEsRUFBRSxDQUFDO0FBQ1gsY0FBUSxFQUFFLENBQUM7QUFDWCxZQUFNLEVBQUUsR0FBRztLQUNaLENBQUM7R0FDSDtBQUNELG9CQUFrQixFQUFFLDhCQUFXO0FBQzdCLFFBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztHQUNsQjtBQUNELHNCQUFvQixFQUFFLGdDQUFXO0FBQy9CLFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztHQUNuQjs7QUFFRCxPQUFLLEVBQUUsSUFBSTtBQUNYLFNBQU8sRUFBRSxJQUFJOztBQUViLFdBQVMsRUFBRSxxQkFBVztBQUNwQixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOztBQUV4QyxRQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDO0FBQ3BCLFVBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUMvQixVQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO0FBQ3JCLFlBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07QUFDekIsWUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7QUFDOUIsV0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0I7S0FDN0IsQ0FBQyxDQUFDO0dBQ0o7O0FBRUQsbUJBQWlCLEVBQUUsNkJBQVc7QUFDNUIsUUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGVBQVMsRUFBRSxRQUFRO0FBQ25CLGNBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7S0FDL0IsQ0FBQyxDQUFDO0dBQ0o7QUFDRCxZQUFVLEVBQUUsc0JBQVc7QUFDckIsUUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2QsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUNqQjtHQUNGOztBQUVELGFBQVcsRUFBRSx1QkFBVzs7R0FFdkI7QUFDRCxrQkFBZ0IsRUFBRSwwQkFBUyxXQUFXLEVBQUU7QUFDdEMsUUFBSSxXQUFXLEVBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztHQUN2QztBQUNELGFBQVcsRUFBRSx1QkFBVztBQUN0QixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFDdkMsUUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQixpQkFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDakMsUUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0dBQ3ZCO0FBQ0QsWUFBVSxFQUFFLHNCQUFXO0FBQ3JCLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN4QyxRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLFFBQUksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDdEQ7QUFDRCxZQUFVLEVBQUUsb0JBQVMsT0FBTyxFQUFFO0FBQzVCLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0dBQy9DO0FBQ0QsWUFBVSxFQUFFLHNCQUFXO0FBQ3JCLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztBQUN4QyxRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLGlCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqQyxRQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDdkI7QUFDRCxrQkFBZ0IsRUFBRSwwQkFBUyxXQUFXLEVBQUU7QUFDdEMsUUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxTQUFTLEVBQUU7Ozs7O0FBS3JDLFVBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztLQUN6Qzs7QUFFRCxRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDckMsUUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDOUI7QUFDRCxpQkFBZSxFQUFFLHlCQUFTLE1BQU0sRUFBRTtBQUNoQyxRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osWUFBTSxFQUFFLE1BQU07QUFDZCxXQUFLLEVBQUUsS0FBSztLQUNiLENBQUMsQ0FBQztBQUNILFFBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQzNCOztBQUVELGtCQUFnQixFQUFFLDRCQUFXO0FBQzNCLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLFFBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Ozs7O0FBS2xGLFVBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7S0FDbEMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtBQUMzRixZQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixtQkFBUyxFQUFFLElBQUk7QUFDZixtQkFBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQyxDQUFDO09BQ0osTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0dBQ3hDOztBQUVELGdCQUFjLEVBQUUsMEJBQVc7QUFDekIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztHQUMvQzs7QUFFRCxRQUFNLEVBQUUsa0JBQVc7QUFDakIsV0FDRTs7UUFBSyxTQUFTLEVBQUUsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDO01BQ3JEOztVQUFLLFNBQVMsRUFBQyxZQUFZO1FBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSTtPQUFPO01BQ3pEO0FBQ0UsaUJBQVMsRUFBQywwQkFBMEI7QUFDcEMsZUFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUMsR0FDeEI7TUFDSixvQkFBQyxlQUFlO0FBQ2QsaUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQUFBQztBQUNoQyxlQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQUFBQztBQUMxQixjQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQUFBQztBQUN4QixvQkFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQztRQUNwQztNQUNGLG9CQUFDLGdCQUFnQjtBQUNmLGtCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUM7QUFDdEQsZ0JBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQztBQUM5QixnQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQzlCLGNBQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDO1FBQ3hCO01BQ0Ysb0JBQUMsY0FBYztBQUNiLGlCQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEFBQUM7QUFDcEMsYUFBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxBQUFDO0FBQ3hCLG9CQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO0FBQ3BDLG1CQUFXLEVBQUUsSUFBSSxDQUFDLGVBQWUsQUFBQztBQUNsQyxpQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDO0FBQ2hDLGNBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQUFBQztRQUMxQjtLQUNFLENBQ047R0FDSDtDQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQzs7Ozs7QUNqSzdCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDOztBQUVwRSxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUN2QyxRQUFNLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztBQUM1QixhQUFXLEVBQUUscUJBQVMsS0FBSyxFQUFFO0FBQzNCLFFBQUksTUFBTSxHQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDM0IsTUFBTSxHQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUk7UUFDbkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUEsQUFBQyxDQUFDOztBQUVyRCxRQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUM1QjtBQUNELFFBQU0sRUFBRSxrQkFBVztBQUNqQixRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsUUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZELFdBQ0U7OztBQUNFLGlCQUFTLEVBQUMsb0JBQW9CO0FBQzlCLGVBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO01BQzFCOztVQUFLLFNBQVMsRUFBQyxhQUFhO1FBQUUsT0FBTzs7UUFBZSxRQUFRO09BQU87TUFDbkU7OztBQUNFLG1CQUFTLEVBQUMseUJBQXlCO0FBQ25DLGVBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxBQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBSSxHQUFHLEVBQUMsQUFBQzs7UUFFcEQ7O1lBQUssU0FBUyxFQUFDLGFBQWE7VUFBRSxPQUFPOztVQUFlLFFBQVE7U0FBTztPQUMvRDtLQUNGLENBQ047R0FDSDtDQUNGLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDOzs7OztBQ2hDbEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFckMsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3JDLG9CQUFrQixFQUFFLDhCQUFXO0FBQzdCLFFBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixRQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUQsUUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7R0FDM0I7QUFDRCxzQkFBb0IsRUFBRSxnQ0FBVztBQUMvQixpQkFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1QixRQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztHQUN6QjtBQUNELFVBQVEsRUFBRSxJQUFJO0FBQ2QsU0FBTyxFQUFFLElBQUk7O0FBRWIsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE1BQU0sR0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7UUFDM0MsTUFBTSxHQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUk7UUFDbkMsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUEsQUFBQyxDQUFDOztBQUVyRCxRQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUNqQztBQUNELGtCQUFnQixFQUFFLDRCQUFXO0FBQzNCLFFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUM1QztBQUNELGtCQUFnQixFQUFFLDBCQUFTLEtBQUssRUFBRTtBQUNoQyxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDcEMsUUFBSSxNQUFNLEdBQUcsR0FBRyxFQUNkLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRWYsUUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDaEM7QUFDRCxnQkFBYyxFQUFFLHdCQUFTLEtBQUssRUFBRTtBQUM5QixRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDcEMsUUFBSSxNQUFNLEdBQUcsR0FBRyxFQUNkLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRWYsUUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDaEM7O0FBRUQsZ0JBQWMsRUFBRSwwQkFBVztBQUN6QixRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUNoQyxRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFDM0MsUUFBSSxDQUFDLE9BQU8sRUFDVixPQUFPOztBQUVULFFBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3pDLFFBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztHQUU3QjtBQUNELGtCQUFnQixFQUFFLDRCQUFXLEVBQzVCO0FBQ0Qsb0JBQWtCLEVBQUUsOEJBQVc7QUFDN0IsUUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQ3BDLE9BQU87O0FBRVQsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDakQsUUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdEMsUUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMzQixRQUFJLEtBQUssR0FBSSxNQUFNLENBQUMsS0FBSyxDQUFDOztBQUUxQixXQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUMzQixXQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUV0QyxRQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDN0IsUUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQztBQUNuRCxRQUFJLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzs7QUFFN0MsUUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM3QixhQUFTLElBQUksR0FBRztBQUNkLFVBQUksVUFBVSxHQUFHLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLGNBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFMUMsYUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFdEMsYUFBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDdEIsYUFBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7O0FBRWhDLFVBQUksVUFBVSxHQUFHLEtBQUssR0FBRyxZQUFZLENBQUM7QUFDdEMsVUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsYUFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzlCLGFBQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNwQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFlBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDN0IsWUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDdkIsZUFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDckIsU0FBQyxJQUFJLFVBQVUsQ0FBQztPQUNqQjtBQUNELGFBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsQyxhQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbEIsQ0FBQztBQUNGLFFBQUksRUFBRSxDQUFDO0dBQ1I7O0FBRUQsUUFBTSxFQUFFLGtCQUFXO0FBQ2pCLFFBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNuQyxXQUNFOztRQUFLLFNBQVMsRUFBQyxzQkFBc0I7TUFDbkMsMkJBQUcsU0FBUyxFQUFFLG1CQUFtQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUEsQUFBQyxBQUFDO0FBQ25FLGVBQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7UUFDN0I7TUFDTCwyQkFBRyxTQUFTLEVBQUMsbUJBQW1CO0FBQzdCLGVBQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEFBQUM7UUFDN0I7TUFDTDs7O0FBQ0UsbUJBQVMsRUFBQyxrQkFBa0I7QUFDNUIsYUFBRyxFQUFDLFlBQVk7QUFDaEIsaUJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO1FBQzFCO0FBQ0UsbUJBQVMsRUFBQyx1QkFBdUI7QUFDakMsYUFBRyxFQUFDLGNBQWM7QUFDbEIsZ0JBQU0sRUFBQyxLQUFLO0FBQ1osZUFBSyxFQUFDLEtBQUs7QUFDWCxlQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsQUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUksR0FBRyxFQUFDLEFBQUM7VUFFekM7T0FDTDtNQUNOLDJCQUFHLFNBQVMsRUFBQyxpQkFBaUI7QUFDM0IsZUFBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7UUFDM0I7S0FDRCxDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Ozs7O0FDaEloQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRXRELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNqQyxpQkFBZSxFQUFFLDJCQUFXO0FBQzFCLFdBQU8sRUFBRSxDQUFDO0dBQ1g7O0FBRUQsUUFBTSxFQUFFLGtCQUFXO0FBQ2pCLFFBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDeEMsWUFBTSxDQUFDLElBQUksQ0FDVCxvQkFBQyxXQUFXO0FBQ1YsV0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDZCxhQUFLLEVBQUUsS0FBSyxBQUFDO1FBQ2IsQ0FDSCxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0gsV0FDRTs7UUFBSyxTQUFTLEVBQUMsYUFBYTtNQUFFLE1BQU07S0FBTyxDQUMzQztHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDOzs7QUN4QjVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi9kYXRhL1RyYWNrU3RvcmUuanMnKTtcclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gcmVxdWlyZSgnLi9uYXZpZ2F0aW9uL0ZpbHRlcmVkVHJhY2tMaXN0LmpzJyk7XHJcbnZhciBTb3VuZEJvYXJkID0gcmVxdWlyZSgnLi9zb3VuZGJvYXJkL1NvdW5kQm9hcmQuanMnKTtcclxuXHJcbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgdHJhY2tzOiBUcmFja1N0b3JlLmdldFRyYWNrcygpLFxyXG5cclxuICBjaGFuZ2VTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7fSk7XHJcbiAgfSxcclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImVhci10aWNrbGVyIGFwcGxpY2F0aW9uXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoZWFkZXItYmFyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWhlYWRwaG9uZXNcIj48L2k+IEVhciBUaWNrbGVyXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8RmlsdGVyZWRUcmFja0xpc3RcclxuICAgICAgICAgIHRyYWNrcz17dGhpcy5wcm9wcy50cmFja1N0b3JlLmdldFRyYWNrcygpfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPFNvdW5kQm9hcmRcclxuICAgICAgICAgIHRyYWNrcz17W3RoaXMudHJhY2tzWzVdXX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHRcclxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAoYSwgYil7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYilcclxuICAgICAgICAgICAgaWYoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSxcclxuICAgIGd1aWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpKjE2fDAsIHYgPSBjID09ICd4JyA/IHIgOiAociYweDN8MHg4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xyXG52YXIgSGVscGVyID0gcmVxdWlyZSgnLi4vSGVscGVyLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciByYXdfdHJhY2tzID0gcmVxdWlyZSgnLi9UcmFja3MuanMnKVxyXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICByZXR1cm4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKTtcclxuICAgIH0pO1xyXG4gIHZhciB0cmFja3MgPSByYXdfdHJhY2tzLm1hcChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICByZXR1cm4gSGVscGVyLmV4dGVuZCh7XHJcbiAgICAgICAgICBpZDogSGVscGVyLmd1aWQoKSxcclxuICAgICAgICAgIG5hbWU6ICdOZXcgVHJhY2snLFxyXG4gICAgICAgICAgdXJsOiAnLi4vYXVkaW8vZGVmYXVsdC5tcDMnLFxyXG4gICAgICAgICAgb3JpZ2luOiAnVW5rbm93biBPcmlnaW4nXHJcbiAgICAgIH0sIHRyYWNrKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZsdXguY3JlYXRlU3RvcmUoe1xyXG4gICAgdHJhY2tzOiB0cmFja3MsXHJcbiAgICB1cHNlcnRUcmFjazogZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ3RyYWNrcy51cGRhdGVkJyk7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVHJhY2s6IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdHJhY2tzID0gdHJhY2tzLmZpbHRlcihmdW5jdGlvbihlbCkgeyByZXR1cm4gZWwuaWQgIT09IGlkOyB9KTtcclxuICAgICAgICB0aGlzLmVtaXQoJ3RyYWNrcy5kZWxldGVkJyk7XHJcbiAgICB9LFxyXG4gICAgZXhwb3J0czoge1xyXG4gICAgICAgIGdldFRyYWNrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNrcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVRyYWNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVRyYWNrKGlkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZFRyYWNrOiBmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnVwc2VydFRyYWNrKHRyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0oKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbe1xyXG4gIG5hbWU6ICdCaXJkcyAoTGlnaHQpJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMS8xMDUwXzExMTItaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQmlyZHMgKFNwYXJzZSknLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xNTgvMTU4NTI3XzI3ODMzMzYtaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQ3JpY2tldHMnLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8zOS8zOTgyOV8yODIxNi1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdSb2FyIC0gRHJhZ29uIChGYXN0KScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzg1Lzg1NTY4XzEyMDYzMjEtaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnRmFzdCBSaXZlcicsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzM5LzM5ODMxXzI4MjE2LWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ01hZ2ljIChGYXN0KScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzIyMS8yMjE2ODNfMTAxNTI0MC1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdUaHVuZGVyIFN0b3JtJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMi8yNTIzXzExMTItaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnUm9hciwgTW9uc3RlciAoU2xvdyknLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8yNjcvMjY3NDU0XzM0MTUwMjItaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnUm9hciwgT2dyZScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzEwMy8xMDM1MzRfMTc1NzQ4OS1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdSb2FyLCBPZ3JlIDInLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xMDMvMTAzNTM1XzE3NTc0ODktaHEubXAzJ1xyXG59XTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XHJcblxyXG52YXIgdHJhY2tTdG9yZSA9IHJlcXVpcmUoJy4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblJlYWN0LnJlbmRlcihcclxuICA8QXBwXHJcbiAgICB0cmFja1N0b3JlPXt0cmFja1N0b3JlfVxyXG4gIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwbGljYXRpb24nKVxyXG4pOyIsIm1vZHVsZS5leHBvcnRzID0gIHtcclxuICBzZWNvbmRzVG9UaW1lOiBmdW5jdGlvbihzZWNzKSB7XHJcbiAgICBzZWNzID0gTWF0aC5yb3VuZChzZWNzKTtcclxuICAgIHZhciBob3VycyA9IE1hdGguZmxvb3Ioc2VjcyAvICg2MCAqIDYwKSk7XHJcblxyXG4gICAgdmFyIGRpdmlzb3JfZm9yX21pbnV0ZXMgPSBzZWNzICUgKDYwICogNjApO1xyXG4gICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKGRpdmlzb3JfZm9yX21pbnV0ZXMgLyA2MCk7XHJcblxyXG4gICAgdmFyIGRpdmlzb3JfZm9yX3NlY29uZHMgPSBkaXZpc29yX2Zvcl9taW51dGVzICUgNjA7XHJcbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguY2VpbChkaXZpc29yX2Zvcl9zZWNvbmRzKTtcclxuXHJcbiAgICB2YXIgdGltZSA9IFwiXCI7XHJcblxyXG4gICAgaWYoaG91cnMgPiAwKSB7XHJcbiAgICAgIHRpbWUgKz0gaG91cnMgKyBcIjpcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lICs9IHRoaXMudGltZVVuaXRGb3JtYXQobWludXRlcykgKyBcIjpcIjtcclxuICAgIHRpbWUgKz0gdGhpcy50aW1lVW5pdEZvcm1hdChzZWNvbmRzKTtcclxuICAgIHJldHVybiB0aW1lO1xyXG4gIH0sXHJcblxyXG4gIHRpbWVVbml0Rm9ybWF0OmZ1bmN0aW9uKHRpbWUpIHtcclxuICAgIGlmICh0aW1lIDwgMSkge1xyXG4gICAgICByZXR1cm4gXCIwMFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aW1lIDwgMTApIHtcclxuICAgICAgcmV0dXJuIFwiMFwiICsgdGltZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVHJhY2tTZWFyY2hCYXIgPSByZXF1aXJlKCcuL1RyYWNrU2VhcmNoQmFyLmpzJyk7XHJcbnZhciBUcmFja0xpc3QgPSByZXF1aXJlKCcuL1RyYWNrTGlzdC5qcycpO1xyXG5cclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWx0ZXJUZXh0OiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbihmaWx0ZXJUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGZpbHRlclRleHQ6IGZpbHRlclRleHRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdHJhY2stbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPFRyYWNrU2VhcmNoQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbHRlckNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VHJhY2tMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcz17dGhpcy5wcm9wcy50cmFja3N9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmlsdGVyZWRUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbGlzdEl0ZW1zID0gdGhpcy5wcm9wcy50cmFja3NcclxuICAgICAgLmZpbHRlcihmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSB0aGlzLnByb3BzLmZpbHRlclRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2YXIgdHJhY2tOYW1lID0gdHJhY2submFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiB0cmFja05hbWUuaW5kZXhPZihmaWx0ZXIpID4gLTE7XHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICAgIC5tYXAoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpIGtleT17dHJhY2suaWR9IHRyYWNrPXt0cmFja30+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLW11c2ljXCI+PC9pPlxyXG4gICAgICAgICAgICB7dHJhY2submFtZX1cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+e2xpc3RJdGVtc308L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlsdGVyVGV4dCA9IHRoaXMucmVmcy5zZWFyY2hCb3guZ2V0RE9NTm9kZSgpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25GaWx0ZXJDaGFuZ2UoZmlsdGVyVGV4dCk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlclRleHR9XHJcbiAgICAgICAgICAgICAgICByZWY9XCJzZWFyY2hCb3hcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBIZWxwZXIgPSByZXF1aXJlKCcuLi9IZWxwZXIuanMnKTtcclxuXHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBsYXlTdGF0ZSkge1xyXG4gICAgICBjYXNlICdsb2FkaW5nJzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGxheWluZyc6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBhdXNlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBsYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGhhbmRsZUxvb3BUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbkxvb3BUb2dnbGUoXHJcbiAgICAgIHRoaXMucmVmcy5sb29wX2VuYWJsZWQuZ2V0RE9NTm9kZSgpLmNoZWNrZWRcclxuICAgICk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QnV0dG9uQ2xhc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBsYXlTdGF0ZSkge1xyXG4gICAgICBjYXNlICdwbGF5aW5nJzpcclxuICAgICAgICByZXR1cm4gJ3BhdXNlJztcclxuICAgICAgY2FzZSAnbG9hZGluZyc6XHJcbiAgICAgICAgcmV0dXJuICdzcGlubmVyJztcclxuICAgICAgY2FzZSAncGF1c2VkJzpcclxuICAgICAgY2FzZSAnc3RvcHBlZCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuICdwbGF5JztcclxuICAgICAgICByZXR1cm4gJ3BsYXknO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QnV0dG9uSWNvbkNsYXNzOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBidXR0b25fY2xhc3MgPSB0aGlzLmdldEJ1dHRvbkNsYXNzKCk7XHJcbiAgICBzd2l0Y2ggKGJ1dHRvbl9jbGFzcykge1xyXG4gICAgICBjYXNlICdzcGlubmVyJzpcclxuICAgICAgICByZXR1cm4gJ3NwaW5uZXIgZmEtc3Bpbic7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbl9jbGFzcztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGxvb3BfdG9nZ2xlX2lkID0gSGVscGVyLmd1aWQoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tY29udHJvbC1iYXJcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0QnV0dG9uQ2xhc3MoKX1cclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPXtcImZhIGZhLVwiICsgdGhpcy5nZXRCdXR0b25JY29uQ2xhc3MoKX0+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgaWQ9e2xvb3BfdG9nZ2xlX2lkfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibG9vcC10b2dnbGVcIlxyXG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgIHJlZj1cImxvb3BfZW5hYmxlZFwiXHJcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVMb29wVG9nZ2xlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJsb29wLXRvZ2dsZS1sYWJlbFwiXHJcbiAgICAgICAgICBodG1sRm9yPXtsb29wX3RvZ2dsZV9pZH0+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1yZXBlYXRcIj48L2k+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQ29udHJvbEJhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEF1ZGlvQ29udHJvbEJhciAgPSByZXF1aXJlKCcuL0F1ZGlvQ29udHJvbEJhci5qcycpO1xyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vQXVkaW9Qcm9ncmVzc0Jhci5qcycpO1xyXG52YXIgQXVkaW9Wb2x1bWVCYXIgICA9IHJlcXVpcmUoJy4vQXVkaW9Wb2x1bWVCYXIuanMnKTtcclxuXHJcbnZhciBIb3dsID0gcmVxdWlyZSgnaG93bGVyJykuSG93bDtcclxuXHJcbnZhciBBdWRpb1BsYXllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgIG11dGVkOiBmYWxzZSxcclxuICAgICAgcGxheVN0YXRlOiAnbG9hZGluZycsXHJcbiAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgdm9sdW1lOiAxLjBcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2FkQXVkaW8oKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY2xlYXJBdWRpbygpO1xyXG4gIH0sXHJcblxyXG4gIGF1ZGlvOiBudWxsLCAgIC8vIFRoZSBIb3dsZXIuanMgSG93bCBvYmplY3RcclxuICByZWZyZXNoOiBudWxsLCAvLyBJbnRlcnZhbCBmb3IgcmVmcmVzaGluZyBwbGF5IHRpbWUgJiBwcm9ncmVzc1xyXG5cclxuICBsb2FkQXVkaW86IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jbGVhckF1ZGlvKCk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGxheVN0YXRlOiAnbG9hZGluZycgfSk7XHJcblxyXG4gICAgdGhpcy5hdWRpbyA9IG5ldyBIb3dsKHtcclxuICAgICAgdXJsczogW3RoaXMucHJvcHMudHJhY2sub3JpZ2luXSxcclxuICAgICAgbG9vcDogdGhpcy5zdGF0ZS5sb29wLFxyXG4gICAgICB2b2x1bWU6IHRoaXMuc3RhdGUudm9sdW1lLFxyXG4gICAgICBvbmxvYWQ6IHRoaXMuaGFuZGxlQXVkaW9Mb2FkZWQsXHJcbiAgICAgIG9uZW5kOiB0aGlzLmhhbmRsZUF1ZGlvRW5kZWRcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUF1ZGlvTG9hZGVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBwbGF5U3RhdGU6ICdwYXVzZWQnLFxyXG4gICAgICBkdXJhdGlvbjogdGhpcy5hdWRpby5fZHVyYXRpb25cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY2xlYXJBdWRpbzogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5hdWRpbykge1xyXG4gICAgICB0aGlzLmF1ZGlvLnN0b3AoKTtcclxuICAgICAgdGhpcy5hdWRpbyA9IHt9O1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgIC8vIFRPRE86IGFsbG93IHRoZSBjbG9zZS1idXR0b24gdG8gd29yay5cclxuICB9LFxyXG4gIGhhbmRsZU11dGVUb2dnbGU6IGZ1bmN0aW9uKG11dGVTZXR0aW5nKSB7XHJcbiAgICBpZiAobXV0ZVNldHRpbmcpXHJcbiAgICAgIHRoaXMuYXVkaW8ubXV0ZSgpO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLmF1ZGlvLnVubXV0ZSgpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IG11dGVkOiBtdXRlU2V0dGluZyB9KTtcclxuICB9LFxyXG4gIGhhbmRsZVBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5U3RhdGU6ICdwYXVzZWQnIH0pO1xyXG4gICAgdGhpcy5hdWRpby5wYXVzZSgpO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2ggfHwgMCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgfSxcclxuICBoYW5kbGVQbGF5OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5U3RhdGU6ICdwbGF5aW5nJyB9KTtcclxuICAgIHRoaXMuYXVkaW8ucGxheSgpO1xyXG4gICAgdGhpcy5yZWZyZXNoID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQb3NpdGlvbiwgMjAwKTtcclxuICB9LFxyXG4gIGhhbmRsZVNlZWs6IGZ1bmN0aW9uKHBlcmNlbnQpIHtcclxuICAgIHRoaXMuYXVkaW8ucG9zKHRoaXMuc3RhdGUuZHVyYXRpb24gKiBwZXJjZW50KTtcclxuICB9LFxyXG4gIGhhbmRsZVN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBsYXlTdGF0ZTogJ3N0b3BwZWQnIH0pO1xyXG4gICAgdGhpcy5hdWRpby5zdG9wKCk7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaCB8fCAwKTtcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9LFxyXG4gIGhhbmRsZUxvb3BUb2dnbGU6IGZ1bmN0aW9uKGxvb3BTZXR0aW5nKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5wbGF5U3RhdGUgPT0gJ3BsYXlpbmcnKSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IGR1ZSB0byBhIGJ1ZyBpbiBIb3dsZXIuanMuXHJcbiAgICAgIC8vICogU2V0dGluZyAubG9vcCh0cnVlKSB3aGlsZSBwbGF5aW5nIGRvZXNuJ3QgY2F1c2UgaXQgdG8gbG9vcCBhdCB0aGUgZW5kLlxyXG4gICAgICAvLyAgIFN1YnNlcXVlbnQgcGxheXMgd2lsbCBob25vciB0aGUgc2V0dGluZywgdGhvdWdoIC0gc28gd2Ugc2ltcGx5IGZvcmNlIGl0XHJcbiAgICAgIC8vICAgb25jZSB0byBvdmVyY29tZSB0aGUgbGltaXRhdGlvbi5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9yY2VMb29wOiBsb29wU2V0dGluZ30pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb29wOiBsb29wU2V0dGluZyB9KTtcclxuICAgIHRoaXMuYXVkaW8ubG9vcChsb29wU2V0dGluZyk7XHJcbiAgfSxcclxuICBoYW5kbGVTZXRWb2x1bWU6IGZ1bmN0aW9uKHZvbHVtZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHZvbHVtZTogdm9sdW1lLFxyXG4gICAgICBtdXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hdWRpby52b2x1bWUodm9sdW1lKTtcclxuICB9LFxyXG5cclxuICBoYW5kbGVBdWRpb0VuZGVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYXVkaW8ucG9zKDApO1xyXG4gICAgaWYgKHRoaXMuc3RhdGUucGxheVN0YXRlID09ICdwbGF5aW5nJyAmJiB0aGlzLmF1ZGlvLmxvb3AoKSAmJiB0aGlzLnN0YXRlLmZvcmNlTG9vcCkge1xyXG4gICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBkdWUgdG8gYSBidWcgaW4gSG93bGVyLmpzLlxyXG4gICAgICAvLyAqIFNldHRpbmcgLmxvb3AodHJ1ZSkgd2hpbGUgcGxheWluZyBkb2Vzbid0IGNhdXNlIGl0IHRvIGxvb3AgYXQgdGhlIGVuZC5cclxuICAgICAgLy8gICBTdWJzZXF1ZW50IHBsYXlzIHdpbGwgaG9ub3IgdGhlIHNldHRpbmcsIHRob3VnaCAtIHNvIHdlIHNpbXBseSBmb3JjZSBpdFxyXG4gICAgICAvLyAgIG9uY2UgdG8gb3ZlcmNvbWUgdGhlIGxpbWl0YXRpb24uXHJcbiAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xyXG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9yY2VMb29wOiBudWxsfSk7IC8vIE9ubHkgZm9yY2UgaXQgb25jZS5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wbGF5U3RhdGUgPT0gJ3BsYXlpbmcnICYmICF0aGlzLmF1ZGlvLmxvb3AoKSAmJiAhdGhpcy5zdGF0ZS5mb3JjZUxvb3ApIHtcclxuICAgICAgdGhpcy5hdWRpby5zdG9wKCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGZvcmNlTG9vcDogbnVsbCxcclxuICAgICAgICBwbGF5U3RhdGU6ICdwYXVzZWQnXHJcbiAgICAgIH0pOyAvLyBPbmx5IGZvcmNlIHN0b3BwaW5nIG9uY2UuXHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmF1ZGlvLmxvb3AoKSlcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxheVN0YXRlOiAncGF1c2VkJ30pO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwb3NpdGlvbjogdGhpcy5hdWRpby5wb3MoKSB9KTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYXVkaW8tcGxheWVyIFwiICsgdGhpcy5zdGF0ZS5wbGF5U3RhdGV9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhY2stbmFtZVwiPnt0aGlzLnByb3BzLnRyYWNrLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGlcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlIGNsb3NlLWJ1dHRvblwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cclxuICAgICAgICA8L2k+XHJcbiAgICAgICAgPEF1ZGlvQ29udHJvbEJhclxyXG4gICAgICAgICAgcGxheVN0YXRlPXt0aGlzLnN0YXRlLnBsYXlTdGF0ZX1cclxuICAgICAgICAgIG9uUGF1c2U9e3RoaXMuaGFuZGxlUGF1c2V9XHJcbiAgICAgICAgICBvblBsYXk9e3RoaXMuaGFuZGxlUGxheX1cclxuICAgICAgICAgIG9uTG9vcFRvZ2dsZT17dGhpcy5oYW5kbGVMb29wVG9nZ2xlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvUHJvZ3Jlc3NCYXJcclxuICAgICAgICAgIHBlcmNlbnRhZ2U9e3RoaXMuc3RhdGUucG9zaXRpb24gLyB0aGlzLnN0YXRlLmR1cmF0aW9ufVxyXG4gICAgICAgICAgcG9zaXRpb249e3RoaXMuc3RhdGUucG9zaXRpb259XHJcbiAgICAgICAgICBkdXJhdGlvbj17dGhpcy5zdGF0ZS5kdXJhdGlvbn1cclxuICAgICAgICAgIG9uU2Vlaz17dGhpcy5oYW5kbGVTZWVrfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvVm9sdW1lQmFyXHJcbiAgICAgICAgICBhdWRpb05vZGU9e3RoaXMuYXVkaW8uX2F1ZGlvTm9kZVswXX1cclxuICAgICAgICAgIG11dGVkPXt0aGlzLnN0YXRlLm11dGVkfVxyXG4gICAgICAgICAgb25NdXRlVG9nZ2xlPXt0aGlzLmhhbmRsZU11dGVUb2dnbGV9XHJcbiAgICAgICAgICBvblNldFZvbHVtZT17dGhpcy5oYW5kbGVTZXRWb2x1bWV9XHJcbiAgICAgICAgICBwbGF5U3RhdGU9e3RoaXMuc3RhdGUucGxheVN0YXRlfVxyXG4gICAgICAgICAgdm9sdW1lPXt0aGlzLnN0YXRlLnZvbHVtZX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9QbGF5ZXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUaW1lRm9ybWF0dGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvVGltZUZvcm1hdHRlck1peGluLmpzJyk7XHJcblxyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBtaXhpbnM6IFtUaW1lRm9ybWF0dGVyTWl4aW5dLFxyXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJhcl9lbCAgPSB0aGlzLmdldERPTU5vZGUoKSxcclxuICAgICAgICBjb29yZHMgID0gYmFyX2VsLmdldENsaWVudFJlY3RzKClbMF0sXHJcbiAgICAgICAgY2xpY2tfeCA9IGV2ZW50LnBhZ2VYIC0gY29vcmRzLmxlZnQsXHJcbiAgICAgICAgcGVyY2VudCA9IGNsaWNrX3ggLyAoY29vcmRzLnJpZ2h0IC0gY29vcmRzLmxlZnQpO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25TZWVrKHBlcmNlbnQpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjdXJyZW50ID0gdGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMucG9zaXRpb24pO1xyXG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMuZHVyYXRpb24pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImF1ZGlvLXByb2dyZXNzLWJhclwiXHJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby10aW1lclwiPntjdXJyZW50fSZuYnNwOy8mbmJzcDt7ZHVyYXRpb259PC9kaXY+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXVkaW8tcHJvZ3Jlc3MtYmFyLWZpbGxcIlxyXG4gICAgICAgICAgc3R5bGU9e3t3aWR0aDogKHRoaXMucHJvcHMucGVyY2VudGFnZSAqIDEwMCkgKyAnJSd9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdGltZXJcIj57Y3VycmVudH0mbmJzcDsvJm5ic3A7e2R1cmF0aW9ufTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9Qcm9ncmVzc0JhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEhlbHBlciA9IHJlcXVpcmUoJy4uL0hlbHBlci5qcycpO1xyXG5cclxudmFyIEF1ZGlvVm9sdW1lQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxvYWRWaXN1YWxpemVyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2ggPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZU9zY2lsbG9zY29wZSwgMTAwMCk7XHJcbiAgICB0aGlzLnVwZGF0ZU9zY2lsbG9zY29wZSgpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2gpO1xyXG4gICAgdGhpcy51bmxvYWRWaXN1YWxpemVyKCk7XHJcbiAgfSxcclxuICBhbmFseXNlcjogbnVsbCwgLy8gVGhlIFdlYiBBdWRpbyBBUEkgQW5hbHl6ZXIgb2JqZWN0XHJcbiAgcmVmcmVzaDogbnVsbCwgIC8vIEludGVydmFsIGZvciByZWZyZXNoaW5nIG9zY2lsbG9zY29wZVxyXG5cclxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBiYXJfZWwgID0gdGhpcy5yZWZzLnZvbHVtZV9iYXIuZ2V0RE9NTm9kZSgpLFxyXG4gICAgICAgIGNvb3JkcyAgPSBiYXJfZWwuZ2V0Q2xpZW50UmVjdHMoKVswXSxcclxuICAgICAgICBjbGlja194ID0gZXZlbnQucGFnZVggLSBjb29yZHMubGVmdCxcclxuICAgICAgICBwZXJjZW50ID0gY2xpY2tfeCAvIChjb29yZHMucmlnaHQgLSBjb29yZHMubGVmdCk7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNldFZvbHVtZShwZXJjZW50KTtcclxuICB9LFxyXG4gIGhhbmRsZU11dGVUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbk11dGVUb2dnbGUoIXRoaXMucHJvcHMubXV0ZWQpO1xyXG4gIH0sXHJcbiAgaGFuZGxlVm9sdW1lRG93bjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB2b2x1bWUgPSB0aGlzLnByb3BzLnZvbHVtZSAtIC4xO1xyXG4gICAgaWYgKHZvbHVtZSA8IDAuMClcclxuICAgICAgdm9sdW1lID0gMC4wO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25TZXRWb2x1bWUodm9sdW1lKTtcclxuICB9LFxyXG4gIGhhbmRsZVZvbHVtZVVwOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHZvbHVtZSA9IHRoaXMucHJvcHMudm9sdW1lICsgLjE7XHJcbiAgICBpZiAodm9sdW1lID4gMS4wKVxyXG4gICAgICB2b2x1bWUgPSAxLjA7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNldFZvbHVtZSh2b2x1bWUpO1xyXG4gIH0sXHJcblxyXG4gIGxvYWRWaXN1YWxpemVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBub2RlID0gdGhpcy5wcm9wcy5hdWRpb05vZGU7XHJcbiAgICB2YXIgY29udGV4dCA9IHRoaXMucHJvcHMuYXVkaW9Ob2RlLmNvbnRleHQ7XHJcbiAgICBpZiAoIWNvbnRleHQpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgbm9kZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG4gICAgLy90aGlzLmFuYWx5c2VyLmNvbm5lY3Qobm9kZSk7XHJcbiAgfSxcclxuICB1bmxvYWRWaXN1YWxpemVyOiBmdW5jdGlvbigpIHtcclxuICB9LFxyXG4gIHVwZGF0ZU9zY2lsbG9zY29wZTogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5wbGF5U3RhdGUgIT09ICdwbGF5aW5nJylcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBjYW52YXMgPSB0aGlzLnJlZnMub3NjaWxsb3Njb3BlLmdldERPTU5vZGUoKTtcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHZhciB3aWR0aCAgPSBjYW52YXMud2lkdGg7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2NjYyc7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuYW5hbHlzZXIuZmZ0U2l6ZSA9IDIwNDg7XHJcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgIHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xyXG5cclxuICAgIHZhciBhbmFseXNlciA9IHRoaXMuYW5hbHlzZXI7XHJcbiAgICBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgICB2YXIgZHJhd1Zpc3VhbCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XHJcblxyXG4gICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgY29udGV4dC5saW5lV2lkdGggPSAyO1xyXG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMzMzY2OTknO1xyXG5cclxuICAgICAgdmFyIHNsaWNlV2lkdGggPSB3aWR0aCAvIGJ1ZmZlckxlbmd0aDtcclxuICAgICAgdmFyIHggPSAwO1xyXG4gICAgICBjb250ZXh0Lm1vdmVUbyh4LCBoZWlnaHQgLyAyKTtcclxuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XHJcbiAgICAgICAgdmFyIHkgPSB2ICogaGVpZ2h0IC8gMjtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyh4LCB5KTtcclxuICAgICAgICB4ICs9IHNsaWNlV2lkdGg7XHJcbiAgICAgIH1cclxuICAgICAgY29udGV4dC5saW5lVG8od2lkdGgsIGhlaWdodCAvIDIpO1xyXG4gICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgfTtcclxuICAgIGRyYXcoKTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG11dGVfYnV0dG9uX2lkID0gSGVscGVyLmd1aWQoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdm9sdW1lLXdyYXBwZXJcIj5cclxuICAgICAgICA8aSBjbGFzc05hbWU9e1wiZmEgZmEtdm9sdW1lLW9mZiBcIiArICh0aGlzLnByb3BzLm11dGVkID8gXCJtdXRlZFwiIDogXCJcIil9XHJcbiAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNdXRlVG9nZ2xlfVxyXG4gICAgICAgID48L2k+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdm9sdW1lLWRvd25cIlxyXG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVm9sdW1lRG93bn1cclxuICAgICAgICA+PC9pPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImF1ZGlvLXZvbHVtZS1iYXJcIlxyXG4gICAgICAgICAgcmVmPVwidm9sdW1lX2JhclwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cclxuICAgICAgICAgIDxjYW52YXNcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXVkaW8tdm9sdW1lLWJhci1maWxsXCJcclxuICAgICAgICAgICAgcmVmPVwib3NjaWxsb3Njb3BlXCJcclxuICAgICAgICAgICAgaGVpZ2h0PVwiMTAwXCJcclxuICAgICAgICAgICAgd2lkdGg9XCIxMDBcIlxyXG4gICAgICAgICAgICBzdHlsZT17e3dpZHRoOiAodGhpcy5wcm9wcy52b2x1bWUgKiAxMDApICsgJyUnfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvY2FudmFzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXZvbHVtZS11cFwiXHJcbiAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVWb2x1bWVVcH1cclxuICAgICAgICA+PC9pPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9Wb2x1bWVCYXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBBdWRpb1BsYXllciA9IHJlcXVpcmUoJy4uL3BsYXllci9BdWRpb1BsYXllci5qcycpO1xyXG5cclxudmFyIFNvdW5kQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHRyYWNrcyA9IFtdO1xyXG4gICAgdGhpcy5wcm9wcy50cmFja3MuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICB0cmFja3MucHVzaChcclxuICAgICAgICA8QXVkaW9QbGF5ZXJcclxuICAgICAgICAgIGtleT17dHJhY2suaWR9XHJcbiAgICAgICAgICB0cmFjaz17dHJhY2t9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzb3VuZC1ib2FyZFwiPnt0cmFja3N9PC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvdW5kQm9hcmQ7XHJcbiIsIi8qIVxuICogIGhvd2xlci5qcyB2MS4xLjI4XG4gKiAgaG93bGVyanMuY29tXG4gKlxuICogIChjKSAyMDEzLTIwMTUsIEphbWVzIFNpbXBzb24gb2YgR29sZEZpcmUgU3R1ZGlvc1xuICogIGdvbGRmaXJlc3R1ZGlvcy5jb21cbiAqXG4gKiAgTUlUIExpY2Vuc2VcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gIC8vIHNldHVwXG4gIHZhciBjYWNoZSA9IHt9O1xuXG4gIC8vIHNldHVwIHRoZSBhdWRpbyBjb250ZXh0XG4gIHZhciBjdHggPSBudWxsLFxuICAgIHVzaW5nV2ViQXVkaW8gPSB0cnVlLFxuICAgIG5vQXVkaW8gPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN0eCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3ZWJraXRBdWRpb0NvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdHggPSBuZXcgd2Via2l0QXVkaW9Db250ZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzaW5nV2ViQXVkaW8gPSBmYWxzZTtcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIHVzaW5nV2ViQXVkaW8gPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghdXNpbmdXZWJBdWRpbykge1xuICAgIGlmICh0eXBlb2YgQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQXVkaW8oKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBub0F1ZGlvID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbm9BdWRpbyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLy8gY3JlYXRlIGEgbWFzdGVyIGdhaW4gbm9kZVxuICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgIHZhciBtYXN0ZXJHYWluID0gKHR5cGVvZiBjdHguY3JlYXRlR2FpbiA9PT0gJ3VuZGVmaW5lZCcpID8gY3R4LmNyZWF0ZUdhaW5Ob2RlKCkgOiBjdHguY3JlYXRlR2FpbigpO1xuICAgIG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IDE7XG4gICAgbWFzdGVyR2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gIH1cblxuICAvLyBjcmVhdGUgZ2xvYmFsIGNvbnRyb2xsZXJcbiAgdmFyIEhvd2xlckdsb2JhbCA9IGZ1bmN0aW9uKGNvZGVjcykge1xuICAgIHRoaXMuX3ZvbHVtZSA9IDE7XG4gICAgdGhpcy5fbXV0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnVzaW5nV2ViQXVkaW8gPSB1c2luZ1dlYkF1ZGlvO1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMubm9BdWRpbyA9IG5vQXVkaW87XG4gICAgdGhpcy5faG93bHMgPSBbXTtcbiAgICB0aGlzLl9jb2RlY3MgPSBjb2RlY3M7XG4gICAgdGhpcy5pT1NBdXRvRW5hYmxlID0gdHJ1ZTtcbiAgfTtcbiAgSG93bGVyR2xvYmFsLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSBnbG9iYWwgdm9sdW1lIGZvciBhbGwgc291bmRzLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSB2b2wgVm9sdW1lIGZyb20gMC4wIHRvIDEuMC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXIvRmxvYXR9ICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCB2b2x1bWUuXG4gICAgICovXG4gICAgdm9sdW1lOiBmdW5jdGlvbih2b2wpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gbWFrZSBzdXJlIHZvbHVtZSBpcyBhIG51bWJlclxuICAgICAgdm9sID0gcGFyc2VGbG9hdCh2b2wpO1xuXG4gICAgICBpZiAodm9sID49IDAgJiYgdm9sIDw9IDEpIHtcbiAgICAgICAgc2VsZi5fdm9sdW1lID0gdm9sO1xuXG4gICAgICAgIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgICAgICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gdm9sO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGNhY2hlIGFuZCBjaGFuZ2Ugdm9sdW1lIG9mIGFsbCBub2RlcyB0aGF0IGFyZSB1c2luZyBIVE1MNSBBdWRpb1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5faG93bHMpIHtcbiAgICAgICAgICBpZiAoc2VsZi5faG93bHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBzZWxmLl9ob3dsc1trZXldLl93ZWJBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYXVkaW8gbm9kZXNcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgc2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlW2ldLnZvbHVtZSA9IHNlbGYuX2hvd2xzW2tleV0uX3ZvbHVtZSAqIHNlbGYuX3ZvbHVtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gcmV0dXJuIHRoZSBjdXJyZW50IGdsb2JhbCB2b2x1bWVcbiAgICAgIHJldHVybiAodXNpbmdXZWJBdWRpbykgPyBtYXN0ZXJHYWluLmdhaW4udmFsdWUgOiBzZWxmLl92b2x1bWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgYWxsIHNvdW5kcy5cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXJ9XG4gICAgICovXG4gICAgbXV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zZXRNdXRlZCh0cnVlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubXV0ZSBhbGwgc291bmRzLlxuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICB1bm11dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc2V0TXV0ZWQoZmFsc2UpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIG11dGluZyBhbmQgdW5tdXRpbmcgZ2xvYmFsbHkuXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbXV0ZWQgSXMgbXV0ZWQgb3Igbm90LlxuICAgICAqL1xuICAgIF9zZXRNdXRlZDogZnVuY3Rpb24obXV0ZWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgc2VsZi5fbXV0ZWQgPSBtdXRlZDtcblxuICAgICAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICAgICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gbXV0ZWQgPyAwIDogc2VsZi5fdm9sdW1lO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2VsZi5faG93bHMpIHtcbiAgICAgICAgaWYgKHNlbGYuX2hvd2xzLmhhc093blByb3BlcnR5KGtleSkgJiYgc2VsZi5faG93bHNba2V5XS5fd2ViQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBhdWRpbyBub2Rlc1xuICAgICAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZVtpXS5tdXRlZCA9IG11dGVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3IgY29kZWMgc3VwcG9ydC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGV4dCBBdWRpbyBmaWxlIGV4dGVudGlvbi5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNvZGVjczogZnVuY3Rpb24oZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29kZWNzW2V4dF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGlPUyB3aWxsIG9ubHkgYWxsb3cgYXVkaW8gdG8gYmUgcGxheWVkIGFmdGVyIGEgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgKiBBdHRlbXB0IHRvIGF1dG9tYXRpY2FsbHkgdW5sb2NrIGF1ZGlvIG9uIHRoZSBmaXJzdCB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqIENvbmNlcHQgZnJvbTogaHR0cDovL3BhdWxiYWthdXMuY29tL3R1dG9yaWFscy9odG1sNS93ZWItYXVkaW8tb24taW9zL1xuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICBfZW5hYmxlaU9TQXVkaW86IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBvbmx5IHJ1biB0aGlzIG9uIGlPUyBpZiBhdWRpbyBpc24ndCBhbHJlYWR5IGVhbmJsZWRcbiAgICAgIGlmIChjdHggJiYgKHNlbGYuX2lPU0VuYWJsZWQgfHwgIS9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9pT1NFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgIC8vIGNhbGwgdGhpcyBtZXRob2Qgb24gdG91Y2ggc3RhcnQgdG8gY3JlYXRlIGFuZCBwbGF5IGEgYnVmZmVyLFxuICAgICAgLy8gdGhlbiBjaGVjayBpZiB0aGUgYXVkaW8gYWN0dWFsbHkgcGxheWVkIHRvIGRldGVybWluZSBpZlxuICAgICAgLy8gYXVkaW8gaGFzIG5vdyBiZWVuIHVubG9ja2VkIG9uIGlPU1xuICAgICAgdmFyIHVubG9jayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjcmVhdGUgYW4gZW1wdHkgYnVmZmVyXG4gICAgICAgIHZhciBidWZmZXIgPSBjdHguY3JlYXRlQnVmZmVyKDEsIDEsIDIyMDUwKTtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgc291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgc291cmNlLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICAvLyBwbGF5IHRoZSBlbXB0eSBidWZmZXJcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2Uuc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgc291cmNlLm5vdGVPbigwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzb3VyY2Uuc3RhcnQoMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXR1cCBhIHRpbWVvdXQgdG8gY2hlY2sgdGhhdCB3ZSBhcmUgdW5sb2NrZWQgb24gdGhlIG5leHQgZXZlbnQgbG9vcFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgoc291cmNlLnBsYXliYWNrU3RhdGUgPT09IHNvdXJjZS5QTEFZSU5HX1NUQVRFIHx8IHNvdXJjZS5wbGF5YmFja1N0YXRlID09PSBzb3VyY2UuRklOSVNIRURfU1RBVEUpKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHVubG9ja2VkIHN0YXRlIGFuZCBwcmV2ZW50IHRoaXMgY2hlY2sgZnJvbSBoYXBwZW5pbmcgYWdhaW5cbiAgICAgICAgICAgIHNlbGYuX2lPU0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5pT1NBdXRvRW5hYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgdG91Y2ggc3RhcnQgbGlzdGVuZXJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9jaywgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBzZXR1cCBhIHRvdWNoIHN0YXJ0IGxpc3RlbmVyIHRvIGF0dGVtcHQgYW4gdW5sb2NrIGluXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB1bmxvY2ssIGZhbHNlKTtcblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNoZWNrIGZvciBicm93c2VyIGNvZGVjIHN1cHBvcnRcbiAgdmFyIGF1ZGlvVGVzdCA9IG51bGw7XG4gIHZhciBjb2RlY3MgPSB7fTtcbiAgaWYgKCFub0F1ZGlvKSB7XG4gICAgYXVkaW9UZXN0ID0gbmV3IEF1ZGlvKCk7XG4gICAgY29kZWNzID0ge1xuICAgICAgbXAzOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vbXBlZzsnKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgb3B1czogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwib3B1c1wiJykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG9nZzogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgd2F2OiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgYWFjOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBtNGE6ICEhKGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8veC1tNGE7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tNGE7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBtcDQ6ICEhKGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8veC1tcDQ7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tcDQ7JykgfHwgYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICB3ZWJhOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpXG4gICAgfTtcbiAgfVxuXG4gIC8vIGFsbG93IGFjY2VzcyB0byB0aGUgZ2xvYmFsIGF1ZGlvIGNvbnRyb2xzXG4gIHZhciBIb3dsZXIgPSBuZXcgSG93bGVyR2xvYmFsKGNvZGVjcyk7XG5cbiAgLy8gc2V0dXAgdGhlIGF1ZGlvIG9iamVjdFxuICB2YXIgSG93bCA9IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBzZXR1cCB0aGUgZGVmYXVsdHNcbiAgICBzZWxmLl9hdXRvcGxheSA9IG8uYXV0b3BsYXkgfHwgZmFsc2U7XG4gICAgc2VsZi5fYnVmZmVyID0gby5idWZmZXIgfHwgZmFsc2U7XG4gICAgc2VsZi5fZHVyYXRpb24gPSBvLmR1cmF0aW9uIHx8IDA7XG4gICAgc2VsZi5fZm9ybWF0ID0gby5mb3JtYXQgfHwgbnVsbDtcbiAgICBzZWxmLl9sb29wID0gby5sb29wIHx8IGZhbHNlO1xuICAgIHNlbGYuX2xvYWRlZCA9IGZhbHNlO1xuICAgIHNlbGYuX3Nwcml0ZSA9IG8uc3ByaXRlIHx8IHt9O1xuICAgIHNlbGYuX3NyYyA9IG8uc3JjIHx8ICcnO1xuICAgIHNlbGYuX3BvczNkID0gby5wb3MzZCB8fCBbMCwgMCwgLTAuNV07XG4gICAgc2VsZi5fdm9sdW1lID0gby52b2x1bWUgIT09IHVuZGVmaW5lZCA/IG8udm9sdW1lIDogMTtcbiAgICBzZWxmLl91cmxzID0gby51cmxzIHx8IFtdO1xuICAgIHNlbGYuX3JhdGUgPSBvLnJhdGUgfHwgMTtcblxuICAgIC8vIGFsbG93IGZvcmNpbmcgb2YgYSBzcGVjaWZpYyBwYW5uaW5nTW9kZWwgKCdlcXVhbHBvd2VyJyBvciAnSFJURicpLFxuICAgIC8vIGlmIG5vbmUgaXMgc3BlY2lmaWVkLCBkZWZhdWx0cyB0byAnZXF1YWxwb3dlcicgYW5kIHN3aXRjaGVzIHRvICdIUlRGJ1xuICAgIC8vIGlmIDNkIHNvdW5kIGlzIHVzZWRcbiAgICBzZWxmLl9tb2RlbCA9IG8ubW9kZWwgfHwgbnVsbDtcblxuICAgIC8vIHNldHVwIGV2ZW50IGZ1bmN0aW9uc1xuICAgIHNlbGYuX29ubG9hZCA9IFtvLm9ubG9hZCB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbmxvYWRlcnJvciA9IFtvLm9ubG9hZGVycm9yIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29uZW5kID0gW28ub25lbmQgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25wYXVzZSA9IFtvLm9ucGF1c2UgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25wbGF5ID0gW28ub25wbGF5IHx8IGZ1bmN0aW9uKCkge31dO1xuXG4gICAgc2VsZi5fb25lbmRUaW1lciA9IFtdO1xuXG4gICAgLy8gV2ViIEF1ZGlvIG9yIEhUTUw1IEF1ZGlvP1xuICAgIHNlbGYuX3dlYkF1ZGlvID0gdXNpbmdXZWJBdWRpbyAmJiAhc2VsZi5fYnVmZmVyO1xuXG4gICAgLy8gY2hlY2sgaWYgd2UgbmVlZCB0byBmYWxsIGJhY2sgdG8gSFRNTDUgQXVkaW9cbiAgICBzZWxmLl9hdWRpb05vZGUgPSBbXTtcbiAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgIHNlbGYuX3NldHVwQXVkaW9Ob2RlKCk7XG4gICAgfVxuXG4gICAgLy8gYXV0b21hdGljYWxseSB0cnkgdG8gZW5hYmxlIGF1ZGlvIG9uIGlPU1xuICAgIGlmICh0eXBlb2YgY3R4ICE9PSAndW5kZWZpbmVkJyAmJiBjdHggJiYgSG93bGVyLmlPU0F1dG9FbmFibGUpIHtcbiAgICAgIEhvd2xlci5fZW5hYmxlaU9TQXVkaW8oKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdGhpcyB0byBhbiBhcnJheSBvZiBIb3dsJ3MgdG8gYWxsb3cgZ2xvYmFsIGNvbnRyb2xcbiAgICBIb3dsZXIuX2hvd2xzLnB1c2goc2VsZik7XG5cbiAgICAvLyBsb2FkIHRoZSB0cmFja1xuICAgIHNlbGYubG9hZCgpO1xuICB9O1xuXG4gIC8vIHNldHVwIGFsbCBvZiB0aGUgbWV0aG9kc1xuICBIb3dsLnByb3RvdHlwZSA9IHtcbiAgICAvKipcbiAgICAgKiBMb2FkIGFuIGF1ZGlvIGZpbGUuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBsb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgdXJsID0gbnVsbDtcblxuICAgICAgLy8gaWYgbm8gYXVkaW8gaXMgYXZhaWxhYmxlLCBxdWl0IGltbWVkaWF0ZWx5XG4gICAgICBpZiAobm9BdWRpbykge1xuICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBsb29wIHRocm91Z2ggc291cmNlIFVSTHMgYW5kIHBpY2sgdGhlIGZpcnN0IG9uZSB0aGF0IGlzIGNvbXBhdGlibGVcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl91cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBleHQsIHVybEl0ZW07XG5cbiAgICAgICAgaWYgKHNlbGYuX2Zvcm1hdCkge1xuICAgICAgICAgIC8vIHVzZSBzcGVjaWZpZWQgYXVkaW8gZm9ybWF0IGlmIGF2YWlsYWJsZVxuICAgICAgICAgIGV4dCA9IHNlbGYuX2Zvcm1hdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBmaWd1cmUgb3V0IHRoZSBmaWxldHlwZSAod2hldGhlciBhbiBleHRlbnNpb24gb3IgYmFzZTY0IGRhdGEpXG4gICAgICAgICAgdXJsSXRlbSA9IHNlbGYuX3VybHNbaV07XG4gICAgICAgICAgZXh0ID0gL15kYXRhOmF1ZGlvXFwvKFteOyxdKyk7L2kuZXhlYyh1cmxJdGVtKTtcbiAgICAgICAgICBpZiAoIWV4dCkge1xuICAgICAgICAgICAgZXh0ID0gL1xcLihbXi5dKykkLy5leGVjKHVybEl0ZW0uc3BsaXQoJz8nLCAxKVswXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV4dCkge1xuICAgICAgICAgICAgZXh0ID0gZXh0WzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2RlY3NbZXh0XSkge1xuICAgICAgICAgIHVybCA9IHNlbGYuX3VybHNbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fc3JjID0gdXJsO1xuXG4gICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgbG9hZEJ1ZmZlcihzZWxmLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgQXVkaW8oKTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyB3aXRoIEhUTUw1IGF1ZGlvIChodHRwOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3NwZWMuaHRtbCNtZWRpYWVycm9yKVxuICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChuZXdOb2RlLmVycm9yICYmIG5ld05vZGUuZXJyb3IuY29kZSA9PT0gNCkge1xuICAgICAgICAgICAgSG93bGVyR2xvYmFsLm5vQXVkaW8gPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicsIHt0eXBlOiBuZXdOb2RlLmVycm9yID8gbmV3Tm9kZS5lcnJvci5jb2RlIDogMH0pO1xuICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgc2VsZi5fYXVkaW9Ob2RlLnB1c2gobmV3Tm9kZSk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIG5ldyBhdWRpbyBub2RlXG4gICAgICAgIG5ld05vZGUuc3JjID0gdXJsO1xuICAgICAgICBuZXdOb2RlLl9wb3MgPSAwO1xuICAgICAgICBuZXdOb2RlLnByZWxvYWQgPSAnYXV0byc7XG4gICAgICAgIG5ld05vZGUudm9sdW1lID0gKEhvd2xlci5fbXV0ZWQpID8gMCA6IHNlbGYuX3ZvbHVtZSAqIEhvd2xlci52b2x1bWUoKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gc3RhcnQgcGxheWluZyB0aGUgc291bmRcbiAgICAgICAgLy8gYXMgc29vbiBhcyBpdCBoYXMgYnVmZmVyZWQgZW5vdWdoXG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHJvdW5kIHVwIHRoZSBkdXJhdGlvbiB3aGVuIHVzaW5nIEhUTUw1IEF1ZGlvIHRvIGFjY291bnQgZm9yIHRoZSBsb3dlciBwcmVjaXNpb25cbiAgICAgICAgICBzZWxmLl9kdXJhdGlvbiA9IE1hdGguY2VpbChuZXdOb2RlLmR1cmF0aW9uICogMTApIC8gMTA7XG5cbiAgICAgICAgICAvLyBzZXR1cCBhIHNwcml0ZSBpZiBub25lIGlzIGRlZmluZWRcbiAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc2VsZi5fc3ByaXRlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNlbGYuX3Nwcml0ZSA9IHtfZGVmYXVsdDogWzAsIHNlbGYuX2R1cmF0aW9uICogMTAwMF19O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgICAgICBzZWxmLl9sb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5vbignbG9hZCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLl9hdXRvcGxheSkge1xuICAgICAgICAgICAgc2VsZi5wbGF5KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2xlYXIgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICBuZXdOb2RlLmxvYWQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIFVSTHMgdG8gYmUgcHVsbGVkIGZyb20gdG8gcGxheSBpbiB0aGlzIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gdXJscyAgQXJyeSBvZiBVUkxzIHRvIGxvYWQgZnJvbVxuICAgICAqIEByZXR1cm4ge0hvd2x9ICAgICAgICBSZXR1cm5zIHNlbGYgb3IgdGhlIGN1cnJlbnQgVVJMc1xuICAgICAqL1xuICAgIHVybHM6IGZ1bmN0aW9uKHVybHMpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHVybHMpIHtcbiAgICAgICAgc2VsZi5zdG9wKCk7XG4gICAgICAgIHNlbGYuX3VybHMgPSAodHlwZW9mIHVybHMgPT09ICdzdHJpbmcnKSA/IFt1cmxzXSA6IHVybHM7XG4gICAgICAgIHNlbGYuX2xvYWRlZCA9IGZhbHNlO1xuICAgICAgICBzZWxmLmxvYWQoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl91cmxzO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQbGF5IGEgc291bmQgZnJvbSB0aGUgY3VycmVudCB0aW1lICgwIGJ5IGRlZmF1bHQpLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBzcHJpdGUgICAob3B0aW9uYWwpIFBsYXlzIGZyb20gdGhlIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgc291bmQgc3ByaXRlIGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIChvcHRpb25hbCkgUmV0dXJucyB0aGUgdW5pcXVlIHBsYXliYWNrIGlkIGZvciB0aGlzIHNvdW5kIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgcGxheTogZnVuY3Rpb24oc3ByaXRlLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiBubyBzcHJpdGUgd2FzIHBhc3NlZCBidXQgYSBjYWxsYmFjayB3YXMsIHVwZGF0ZSB0aGUgdmFyaWFibGVzXG4gICAgICBpZiAodHlwZW9mIHNwcml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IHNwcml0ZTtcbiAgICAgIH1cblxuICAgICAgLy8gdXNlIHRoZSBkZWZhdWx0IHNwcml0ZSBpZiBub25lIGlzIHBhc3NlZFxuICAgICAgaWYgKCFzcHJpdGUgfHwgdHlwZW9mIHNwcml0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzcHJpdGUgPSAnX2RlZmF1bHQnO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wbGF5KHNwcml0ZSwgY2FsbGJhY2spO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhlIHNwcml0ZSBkb2Vzbid0IGV4aXN0LCBwbGF5IG5vdGhpbmdcbiAgICAgIGlmICghc2VsZi5fc3ByaXRlW3Nwcml0ZV0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aGUgbm9kZSB0byBwbGF5YmFja1xuICAgICAgc2VsZi5faW5hY3RpdmVOb2RlKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgLy8gcGVyc2lzdCB0aGUgc3ByaXRlIGJlaW5nIHBsYXllZFxuICAgICAgICBub2RlLl9zcHJpdGUgPSBzcHJpdGU7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXJlIHRvIHN0YXJ0IHBsYXlpbmcgZnJvbVxuICAgICAgICB2YXIgcG9zID0gKG5vZGUuX3BvcyA+IDApID8gbm9kZS5fcG9zIDogc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBob3cgbG9uZyB0byBwbGF5IGZvclxuICAgICAgICB2YXIgZHVyYXRpb24gPSAwO1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICBkdXJhdGlvbiA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzFdIC8gMTAwMCAtIG5vZGUuX3BvcztcbiAgICAgICAgICBpZiAobm9kZS5fcG9zID4gMCkge1xuICAgICAgICAgICAgcG9zID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwICsgcG9zO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkdXJhdGlvbiA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzFdIC8gMTAwMCAtIChwb3MgLSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIHRoaXMgc291bmQgc2hvdWxkIGJlIGxvb3BlZFxuICAgICAgICB2YXIgbG9vcCA9ICEhKHNlbGYuX2xvb3AgfHwgc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMl0pO1xuXG4gICAgICAgIC8vIHNldCB0aW1lciB0byBmaXJlIHRoZSAnb25lbmQnIGV2ZW50XG4gICAgICAgIHZhciBzb3VuZElkID0gKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3N0cmluZycpID8gY2FsbGJhY2sgOiBNYXRoLnJvdW5kKERhdGUubm93KCkgKiBNYXRoLnJhbmRvbSgpKSArICcnLFxuICAgICAgICAgIHRpbWVySWQ7XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGlkOiBzb3VuZElkLFxuICAgICAgICAgICAgc3ByaXRlOiBzcHJpdGUsXG4gICAgICAgICAgICBsb29wOiBsb29wXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIGlmIGxvb3BpbmcsIHJlc3RhcnQgdGhlIHRyYWNrXG4gICAgICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvICYmIGxvb3ApIHtcbiAgICAgICAgICAgICAgc2VsZi5zdG9wKGRhdGEuaWQpLnBsYXkoc3ByaXRlLCBkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHdlYiBhdWRpbyBub2RlIHRvIHBhdXNlZCBhdCBlbmRcbiAgICAgICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbyAmJiAhbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLl9ub2RlQnlJZChkYXRhLmlkKS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLl9ub2RlQnlJZChkYXRhLmlkKS5fcG9zID0gMDtcblxuICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgZW5kIHRpbWVyXG4gICAgICAgICAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGVuZCB0aGUgdHJhY2sgaWYgaXQgaXMgSFRNTCBhdWRpbyBhbmQgYSBzcHJpdGVcbiAgICAgICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8gJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgc2VsZi5zdG9wKGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmaXJlIGVuZGVkIGV2ZW50XG4gICAgICAgICAgICBzZWxmLm9uKCdlbmQnLCBzb3VuZElkKTtcbiAgICAgICAgICB9LCBkdXJhdGlvbiAqIDEwMDApO1xuXG4gICAgICAgICAgLy8gc3RvcmUgdGhlIHJlZmVyZW5jZSB0byB0aGUgdGltZXJcbiAgICAgICAgICBzZWxmLl9vbmVuZFRpbWVyLnB1c2goe3RpbWVyOiB0aW1lcklkLCBpZDogZGF0YS5pZH0pO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIHZhciBsb29wU3RhcnQgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDAsXG4gICAgICAgICAgICBsb29wRW5kID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwO1xuXG4gICAgICAgICAgLy8gc2V0IHRoZSBwbGF5IGlkIHRvIHRoaXMgbm9kZSBhbmQgbG9hZCBpbnRvIGNvbnRleHRcbiAgICAgICAgICBub2RlLmlkID0gc291bmRJZDtcbiAgICAgICAgICBub2RlLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgIHJlZnJlc2hCdWZmZXIoc2VsZiwgW2xvb3AsIGxvb3BTdGFydCwgbG9vcEVuZF0sIHNvdW5kSWQpO1xuICAgICAgICAgIHNlbGYuX3BsYXlTdGFydCA9IGN0eC5jdXJyZW50VGltZTtcbiAgICAgICAgICBub2RlLmdhaW4udmFsdWUgPSBzZWxmLl92b2x1bWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbG9vcCA/IG5vZGUuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsIHBvcywgODY0MDApIDogbm9kZS5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCwgcG9zLCBkdXJhdGlvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvb3AgPyBub2RlLmJ1ZmZlclNvdXJjZS5zdGFydCgwLCBwb3MsIDg2NDAwKSA6IG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0KDAsIHBvcywgZHVyYXRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAobm9kZS5yZWFkeVN0YXRlID09PSA0IHx8ICFub2RlLnJlYWR5U3RhdGUgJiYgbmF2aWdhdG9yLmlzQ29jb29uSlMpIHtcbiAgICAgICAgICAgIG5vZGUucmVhZHlTdGF0ZSA9IDQ7XG4gICAgICAgICAgICBub2RlLmlkID0gc291bmRJZDtcbiAgICAgICAgICAgIG5vZGUuY3VycmVudFRpbWUgPSBwb3M7XG4gICAgICAgICAgICBub2RlLm11dGVkID0gSG93bGVyLl9tdXRlZCB8fCBub2RlLm11dGVkO1xuICAgICAgICAgICAgbm9kZS52b2x1bWUgPSBzZWxmLl92b2x1bWUgKiBIb3dsZXIudm9sdW1lKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBub2RlLnBsYXkoKTsgfSwgMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoc291bmRJZCk7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICB2YXIgc291bmQgPSBzZWxmLFxuICAgICAgICAgICAgICAgIHBsYXlTcHJpdGUgPSBzcHJpdGUsXG4gICAgICAgICAgICAgICAgZm4gPSBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBuZXdOb2RlID0gbm9kZTtcbiAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc291bmQucGxheShwbGF5U3ByaXRlLCBmbik7XG5cbiAgICAgICAgICAgICAgICAvLyBjbGVhciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXJlIHRoZSBwbGF5IGV2ZW50IGFuZCBzZW5kIHRoZSBzb3VuZElkIGJhY2sgaW4gdGhlIGNhbGxiYWNrXG4gICAgICAgIHNlbGYub24oJ3BsYXknKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soc291bmRJZCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBhdXNlIHBsYXliYWNrIGFuZCBzYXZlIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgcGF1c2U6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBhdXNlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyICdvbmVuZCcgdGltZXJcbiAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoaWQpO1xuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBhY3RpdmVOb2RlLl9wb3MgPSBzZWxmLnBvcyhudWxsLCBpZCk7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBzb3VuZCBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICAgICAgaWYgKCFhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZSB8fCBhY3RpdmVOb2RlLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgIGlmICh0eXBlb2YgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLm5vdGVPZmYoMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AoMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZWxmLm9uKCdwYXVzZScpO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcCBwbGF5YmFjayBhbmQgcmVzZXQgdG8gc3RhcnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHN0b3A6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnN0b3AoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgJ29uZW5kJyB0aW1lclxuICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihpZCk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IDA7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBzb3VuZCBoYXMgYmVlbiBjcmVhdGVkXG4gICAgICAgICAgaWYgKCFhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZSB8fCBhY3RpdmVOb2RlLnBhdXNlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKGFjdGl2ZU5vZGUuZHVyYXRpb24pKSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZSgpO1xuICAgICAgICAgIGFjdGl2ZU5vZGUuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNdXRlIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgbXV0ZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYubXV0ZShpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLmdhaW4udmFsdWUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU5vZGUubXV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm11dGUgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICB1bm11dGU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnVubXV0ZShpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLmdhaW4udmFsdWUgPSBzZWxmLl92b2x1bWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5tdXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHZvbHVtZSBvZiB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgdm9sIFZvbHVtZSBmcm9tIDAuMCB0byAxLjAuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Zsb2F0fSAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgdm9sdW1lLlxuICAgICAqL1xuICAgIHZvbHVtZTogZnVuY3Rpb24odm9sLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdm9sdW1lIGlzIGEgbnVtYmVyXG4gICAgICB2b2wgPSBwYXJzZUZsb2F0KHZvbCk7XG5cbiAgICAgIGlmICh2b2wgPj0gMCAmJiB2b2wgPD0gMSkge1xuICAgICAgICBzZWxmLl92b2x1bWUgPSB2b2w7XG5cbiAgICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudm9sdW1lKHZvbCwgaWQpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmdhaW4udmFsdWUgPSB2b2w7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUudm9sdW1lID0gdm9sICogSG93bGVyLnZvbHVtZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3ZvbHVtZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB3aGV0aGVyIHRvIGxvb3AgdGhlIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGxvb3AgVG8gbG9vcCBvciBub3QgdG8gbG9vcCwgdGhhdCBpcyB0aGUgcXVlc3Rpb24uXG4gICAgICogQHJldHVybiB7SG93bC9Cb29sZWFufSAgICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IGxvb3BpbmcgdmFsdWUuXG4gICAgICovXG4gICAgbG9vcDogZnVuY3Rpb24obG9vcCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIGxvb3AgPT09ICdib29sZWFuJykge1xuICAgICAgICBzZWxmLl9sb29wID0gbG9vcDtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9sb29wO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHNvdW5kIHNwcml0ZSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gc3ByaXRlIEV4YW1wbGU6IHtzcHJpdGVOYW1lOiBbb2Zmc2V0LCBkdXJhdGlvbiwgbG9vcF19XG4gICAgICogICAgICAgICAgICAgICAgQHBhcmFtIHtJbnRlZ2VyfSBvZmZzZXQgICBXaGVyZSB0byBiZWdpbiBwbGF5YmFjayBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0ludGVnZXJ9IGR1cmF0aW9uIEhvdyBsb25nIHRvIHBsYXkgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogICAgICAgICAgICAgICAgQHBhcmFtIHtCb29sZWFufSBsb29wICAgICAob3B0aW9uYWwpIFNldCB0cnVlIHRvIGxvb3AgdGhpcyBzcHJpdGVcbiAgICAgKiBAcmV0dXJuIHtIb3dsfSAgICAgICAgUmV0dXJucyBjdXJyZW50IHNwcml0ZSBzaGVldCBvciBzZWxmLlxuICAgICAqL1xuICAgIHNwcml0ZTogZnVuY3Rpb24oc3ByaXRlKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2Ygc3ByaXRlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBzZWxmLl9zcHJpdGUgPSBzcHJpdGU7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fc3ByaXRlO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSBwb3NpdGlvbiBvZiBwbGF5YmFjay5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHBvcyBUaGUgcG9zaXRpb24gdG8gbW92ZSBjdXJyZW50IHBsYXliYWNrIHRvLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bC9GbG9hdH0gICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbi5cbiAgICAgKi9cbiAgICBwb3M6IGZ1bmN0aW9uKHBvcywgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucG9zKHBvcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eXBlb2YgcG9zID09PSAnbnVtYmVyJyA/IHNlbGYgOiBzZWxmLl9wb3MgfHwgMDtcbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBzdXJlIHdlIGFyZSBkZWFsaW5nIHdpdGggYSBudW1iZXIgZm9yIHBvc1xuICAgICAgcG9zID0gcGFyc2VGbG9hdChwb3MpO1xuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBpZiAocG9zID49IDApIHtcbiAgICAgICAgICBzZWxmLnBhdXNlKGlkKTtcbiAgICAgICAgICBhY3RpdmVOb2RlLl9wb3MgPSBwb3M7XG4gICAgICAgICAgc2VsZi5wbGF5KGFjdGl2ZU5vZGUuX3Nwcml0ZSwgaWQpO1xuXG4gICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHNlbGYuX3dlYkF1ZGlvID8gYWN0aXZlTm9kZS5fcG9zICsgKGN0eC5jdXJyZW50VGltZSAtIHNlbGYuX3BsYXlTdGFydCkgOiBhY3RpdmVOb2RlLmN1cnJlbnRUaW1lO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHBvcyA+PSAwKSB7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZmluZCB0aGUgZmlyc3QgaW5hY3RpdmUgbm9kZSB0byByZXR1cm4gdGhlIHBvcyBmb3JcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkICYmIHNlbGYuX2F1ZGlvTm9kZVtpXS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICByZXR1cm4gKHNlbGYuX3dlYkF1ZGlvKSA/IHNlbGYuX2F1ZGlvTm9kZVtpXS5fcG9zIDogc2VsZi5fYXVkaW9Ob2RlW2ldLmN1cnJlbnRUaW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSAzRCBwb3NpdGlvbiBvZiB0aGUgYXVkaW8gc291cmNlLlxuICAgICAqIFRoZSBtb3N0IGNvbW1vbiB1c2FnZSBpcyB0byBzZXQgdGhlICd4JyBwb3NpdGlvblxuICAgICAqIHRvIGFmZmVjdCB0aGUgbGVmdC9yaWdodCBlYXIgcGFubmluZy4gU2V0dGluZyBhbnkgdmFsdWUgaGlnaGVyIHRoYW5cbiAgICAgKiAxLjAgd2lsbCBiZWdpbiB0byBkZWNyZWFzZSB0aGUgdm9sdW1lIG9mIHRoZSBzb3VuZCBhcyBpdCBtb3ZlcyBmdXJ0aGVyIGF3YXkuXG4gICAgICogTk9URTogVGhpcyBvbmx5IHdvcmtzIHdpdGggV2ViIEF1ZGlvIEFQSSwgSFRNTDUgQXVkaW8gcGxheWJhY2tcbiAgICAgKiB3aWxsIG5vdCBiZSBhZmZlY3RlZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHggIFRoZSB4LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB5ICBUaGUgeS1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeiAgVGhlIHotcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bC9BcnJheX0gICBSZXR1cm5zIHNlbGYgb3IgdGhlIGN1cnJlbnQgM0QgcG9zaXRpb246IFt4LCB5LCB6XVxuICAgICAqL1xuICAgIHBvczNkOiBmdW5jdGlvbih4LCB5LCB6LCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBzZXQgYSBkZWZhdWx0IGZvciB0aGUgb3B0aW9uYWwgJ3knICYgJ3onXG4gICAgICB5ID0gKHR5cGVvZiB5ID09PSAndW5kZWZpbmVkJyB8fCAheSkgPyAwIDogeTtcbiAgICAgIHogPSAodHlwZW9mIHogPT09ICd1bmRlZmluZWQnIHx8ICF6KSA/IC0wLjUgOiB6O1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wb3MzZCh4LCB5LCB6LCBpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICBpZiAoeCA+PSAwIHx8IHggPCAwKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICAgICAgc2VsZi5fcG9zM2QgPSBbeCwgeSwgel07XG4gICAgICAgICAgICBhY3RpdmVOb2RlLnBhbm5lci5zZXRQb3NpdGlvbih4LCB5LCB6KTtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUucGFubmVyLnBhbm5pbmdNb2RlbCA9IHNlbGYuX21vZGVsIHx8ICdIUlRGJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9wb3MzZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEZhZGUgYSBjdXJyZW50bHkgcGxheWluZyBzb3VuZCBiZXR3ZWVuIHR3byB2b2x1bWVzLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBmcm9tICAgICBUaGUgdm9sdW1lIHRvIGZhZGUgZnJvbSAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIHRvICAgICAgIFRoZSB2b2x1bWUgdG8gZmFkZSB0byAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGxlbiAgICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIChvcHRpb25hbCkgRmlyZWQgd2hlbiB0aGUgZmFkZSBpcyBjb21wbGV0ZS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGU6IGZ1bmN0aW9uKGZyb20sIHRvLCBsZW4sIGNhbGxiYWNrLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBkaWZmID0gTWF0aC5hYnMoZnJvbSAtIHRvKSxcbiAgICAgICAgZGlyID0gZnJvbSA+IHRvID8gJ2Rvd24nIDogJ3VwJyxcbiAgICAgICAgc3RlcHMgPSBkaWZmIC8gMC4wMSxcbiAgICAgICAgc3RlcFRpbWUgPSBsZW4gLyBzdGVwcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuZmFkZShmcm9tLCB0bywgbGVuLCBjYWxsYmFjaywgaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IHRoZSB2b2x1bWUgdG8gdGhlIHN0YXJ0IHBvc2l0aW9uXG4gICAgICBzZWxmLnZvbHVtZShmcm9tLCBpZCk7XG5cbiAgICAgIGZvciAodmFyIGk9MTsgaTw9c3RlcHM7IGkrKykge1xuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNoYW5nZSA9IHNlbGYuX3ZvbHVtZSArIChkaXIgPT09ICd1cCcgPyAwLjAxIDogLTAuMDEpICogaSxcbiAgICAgICAgICAgIHZvbCA9IE1hdGgucm91bmQoMTAwMCAqIGNoYW5nZSkgLyAxMDAwLFxuICAgICAgICAgICAgdG9Wb2wgPSB0bztcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnZvbHVtZSh2b2wsIGlkKTtcblxuICAgICAgICAgICAgaWYgKHZvbCA9PT0gdG9Wb2wpIHtcbiAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIHN0ZXBUaW1lICogaSk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFtERVBSRUNBVEVEXSBGYWRlIGluIHRoZSBjdXJyZW50IHNvdW5kLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgICB0byAgICAgIFZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBmYWRlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZUluOiBmdW5jdGlvbih0bywgbGVuLCBjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHRoaXMudm9sdW1lKDApLnBsYXkoKS5mYWRlKDAsIHRvLCBsZW4sIGNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogW0RFUFJFQ0FURURdIEZhZGUgb3V0IHRoZSBjdXJyZW50IHNvdW5kIGFuZCBwYXVzZSB3aGVuIGZpbmlzaGVkLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgICB0byAgICAgICBWb2x1bWUgdG8gZmFkZSB0byAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGxlbiAgICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGlkICAgICAgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlT3V0OiBmdW5jdGlvbih0bywgbGVuLCBjYWxsYmFjaywgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgcmV0dXJuIHNlbGYuZmFkZShzZWxmLl92b2x1bWUsIHRvLCBsZW4sIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgIHNlbGYucGF1c2UoaWQpO1xuXG4gICAgICAgIC8vIGZpcmUgZW5kZWQgZXZlbnRcbiAgICAgICAgc2VsZi5vbignZW5kJyk7XG4gICAgICB9LCBpZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBhdWRpbyBub2RlIGJ5IElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9IEF1ZGlvIG5vZGUuXG4gICAgICovXG4gICAgX25vZGVCeUlkOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlWzBdO1xuXG4gICAgICAvLyBmaW5kIHRoZSBub2RlIHdpdGggdGhpcyBJRFxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgYWN0aXZlIGF1ZGlvIG5vZGUuXG4gICAgICogQHJldHVybiB7SG93bH0gQXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfYWN0aXZlTm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBudWxsO1xuXG4gICAgICAvLyBmaW5kIHRoZSBmaXJzdCBwbGF5aW5nIG5vZGVcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXhjZXNzIGluYWN0aXZlIG5vZGVzXG4gICAgICBzZWxmLl9kcmFpblBvb2woKTtcblxuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgaW5hY3RpdmUgYXVkaW8gbm9kZS5cbiAgICAgKiBJZiB0aGVyZSBpcyBub25lLCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIHBvb2wuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgYXVkaW8gbm9kZSBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBfaW5hY3RpdmVOb2RlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gbnVsbDtcblxuICAgICAgLy8gZmluZCBmaXJzdCBpbmFjdGl2ZSBub2RlIHRvIHJlY3ljbGVcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQgJiYgc2VsZi5fYXVkaW9Ob2RlW2ldLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAvLyBzZW5kIHRoZSBub2RlIGJhY2sgZm9yIHVzZSBieSB0aGUgbmV3IHBsYXkgaW5zdGFuY2VcbiAgICAgICAgICBjYWxsYmFjayhzZWxmLl9hdWRpb05vZGVbaV0pO1xuICAgICAgICAgIG5vZGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIHNlbGYuX2RyYWluUG9vbCgpO1xuXG4gICAgICBpZiAobm9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNyZWF0ZSBuZXcgbm9kZSBpZiB0aGVyZSBhcmUgbm8gaW5hY3RpdmVzXG4gICAgICB2YXIgbmV3Tm9kZTtcbiAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICBuZXdOb2RlID0gc2VsZi5fc2V0dXBBdWRpb05vZGUoKTtcbiAgICAgICAgY2FsbGJhY2sobmV3Tm9kZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmxvYWQoKTtcbiAgICAgICAgbmV3Tm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtzZWxmLl9hdWRpb05vZGUubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciB0aGUgY29ycmVjdCBsb2FkIGV2ZW50IGFuZCBmaXJlIHRoZSBjYWxsYmFja1xuICAgICAgICB2YXIgbGlzdGVuZXJFdmVudCA9IG5hdmlnYXRvci5pc0NvY29vbkpTID8gJ2NhbnBsYXl0aHJvdWdoJyA6ICdsb2FkZWRtZXRhZGF0YSc7XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lckV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgIGNhbGxiYWNrKG5ld05vZGUpO1xuICAgICAgICB9O1xuICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXJFdmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlcmUgYXJlIG1vcmUgdGhhbiA1IGluYWN0aXZlIGF1ZGlvIG5vZGVzIGluIHRoZSBwb29sLCBjbGVhciBvdXQgdGhlIHJlc3QuXG4gICAgICovXG4gICAgX2RyYWluUG9vbDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGluYWN0aXZlID0gMCxcbiAgICAgICAgaTtcblxuICAgICAgLy8gY291bnQgdGhlIG51bWJlciBvZiBpbmFjdGl2ZSBub2Rlc1xuICAgICAgZm9yIChpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgaW5hY3RpdmUrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXhjZXNzIGluYWN0aXZlIG5vZGVzXG4gICAgICBmb3IgKGk9c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcbiAgICAgICAgaWYgKGluYWN0aXZlIDw9IDUpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgLy8gZGlzY29ubmVjdCB0aGUgYXVkaW8gc291cmNlIGlmIHVzaW5nIFdlYiBBdWRpb1xuICAgICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgICAgc2VsZi5fYXVkaW9Ob2RlW2ldLmRpc2Nvbm5lY3QoMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW5hY3RpdmUtLTtcbiAgICAgICAgICBzZWxmLl9hdWRpb05vZGUuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENsZWFyICdvbmVuZCcgdGltZW91dCBiZWZvcmUgaXQgZW5kcy5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHNvdW5kSWQgIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqL1xuICAgIF9jbGVhckVuZFRpbWVyOiBmdW5jdGlvbihzb3VuZElkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSB0aW1lcnMgdG8gZmluZCB0aGUgb25lIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNvdW5kXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fb25lbmRUaW1lci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fb25lbmRUaW1lcltpXS5pZCA9PT0gc291bmRJZCkge1xuICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdGltZXIgPSBzZWxmLl9vbmVuZFRpbWVyW2luZGV4XTtcbiAgICAgIGlmICh0aW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIudGltZXIpO1xuICAgICAgICBzZWxmLl9vbmVuZFRpbWVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBnYWluIG5vZGUgYW5kIHBhbm5lciBmb3IgYSBXZWIgQXVkaW8gaW5zdGFuY2UuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IGF1ZGlvIG5vZGUuXG4gICAgICovXG4gICAgX3NldHVwQXVkaW9Ob2RlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZSxcbiAgICAgICAgaW5kZXggPSBzZWxmLl9hdWRpb05vZGUubGVuZ3RoO1xuXG4gICAgICAvLyBjcmVhdGUgZ2FpbiBub2RlXG4gICAgICBub2RlW2luZGV4XSA9ICh0eXBlb2YgY3R4LmNyZWF0ZUdhaW4gPT09ICd1bmRlZmluZWQnKSA/IGN0eC5jcmVhdGVHYWluTm9kZSgpIDogY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgIG5vZGVbaW5kZXhdLmdhaW4udmFsdWUgPSBzZWxmLl92b2x1bWU7XG4gICAgICBub2RlW2luZGV4XS5wYXVzZWQgPSB0cnVlO1xuICAgICAgbm9kZVtpbmRleF0uX3BvcyA9IDA7XG4gICAgICBub2RlW2luZGV4XS5yZWFkeVN0YXRlID0gNDtcbiAgICAgIG5vZGVbaW5kZXhdLmNvbm5lY3QobWFzdGVyR2Fpbik7XG5cbiAgICAgIC8vIGNyZWF0ZSB0aGUgcGFubmVyXG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIgPSBjdHguY3JlYXRlUGFubmVyKCk7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIucGFubmluZ01vZGVsID0gc2VsZi5fbW9kZWwgfHwgJ2VxdWFscG93ZXInO1xuICAgICAgbm9kZVtpbmRleF0ucGFubmVyLnNldFBvc2l0aW9uKHNlbGYuX3BvczNkWzBdLCBzZWxmLl9wb3MzZFsxXSwgc2VsZi5fcG9zM2RbMl0pO1xuICAgICAgbm9kZVtpbmRleF0ucGFubmVyLmNvbm5lY3Qobm9kZVtpbmRleF0pO1xuXG4gICAgICByZXR1cm4gbm9kZVtpbmRleF07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGwvc2V0IGN1c3RvbSBldmVudHMuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGV2ZW50IEV2ZW50IHR5cGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgIEZ1bmN0aW9uIHRvIGNhbGwuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBvbjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGV2ZW50cyA9IHNlbGZbJ19vbicgKyBldmVudF07XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZXZlbnRzLnB1c2goZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgZXZlbnRzW2ldLmNhbGwoc2VsZiwgZm4pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudHNbaV0uY2FsbChzZWxmKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhIGN1c3RvbSBldmVudC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgZXZlbnQgRXZlbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgTGlzdGVuZXIgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgb2ZmOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZXZlbnRzID0gc2VsZlsnX29uJyArIGV2ZW50XSxcbiAgICAgICAgZm5TdHJpbmcgPSBmbiA/IGZuLnRvU3RyaW5nKCkgOiBudWxsO1xuXG4gICAgICBpZiAoZm5TdHJpbmcpIHtcbiAgICAgICAgLy8gbG9vcCB0aHJvdWdoIGZ1bmN0aW9ucyBpbiB0aGUgZXZlbnQgZm9yIGNvbXBhcmlzb25cbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChmblN0cmluZyA9PT0gZXZlbnRzW2ldLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGZbJ19vbicgKyBldmVudF0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubG9hZCBhbmQgZGVzdHJveSB0aGUgY3VycmVudCBIb3dsIG9iamVjdC5cbiAgICAgKiBUaGlzIHdpbGwgaW1tZWRpYXRlbHkgc3RvcCBhbGwgcGxheSBpbnN0YW5jZXMgYXR0YWNoZWQgdG8gdGhpcyBzb3VuZC5cbiAgICAgKi9cbiAgICB1bmxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBzdG9wIHBsYXlpbmcgYW55IGFjdGl2ZSBub2Rlc1xuICAgICAgdmFyIG5vZGVzID0gc2VsZi5fYXVkaW9Ob2RlO1xuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBzdG9wIHRoZSBzb3VuZCBpZiBpdCBpcyBjdXJyZW50bHkgcGxheWluZ1xuICAgICAgICBpZiAoIW5vZGVzW2ldLnBhdXNlZCkge1xuICAgICAgICAgIHNlbGYuc3RvcChub2Rlc1tpXS5pZCk7XG4gICAgICAgICAgc2VsZi5vbignZW5kJywgbm9kZXNbaV0uaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgc291cmNlIGlmIHVzaW5nIEhUTUw1IEF1ZGlvXG4gICAgICAgICAgbm9kZXNbaV0uc3JjID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZGlzY29ubmVjdCB0aGUgb3V0cHV0IGZyb20gdGhlIG1hc3RlciBnYWluXG4gICAgICAgICAgbm9kZXNbaV0uZGlzY29ubmVjdCgwKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBtYWtlIHN1cmUgYWxsIHRpbWVvdXRzIGFyZSBjbGVhcmVkXG4gICAgICBmb3IgKGk9MDsgaTxzZWxmLl9vbmVuZFRpbWVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzZWxmLl9vbmVuZFRpbWVyW2ldLnRpbWVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIHRoZSByZWZlcmVuY2UgaW4gdGhlIGdsb2JhbCBIb3dsZXIgb2JqZWN0XG4gICAgICB2YXIgaW5kZXggPSBIb3dsZXIuX2hvd2xzLmluZGV4T2Yoc2VsZik7XG4gICAgICBpZiAoaW5kZXggIT09IG51bGwgJiYgaW5kZXggPj0gMCkge1xuICAgICAgICBIb3dsZXIuX2hvd2xzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGRlbGV0ZSB0aGlzIHNvdW5kIGZyb20gdGhlIGNhY2hlXG4gICAgICBkZWxldGUgY2FjaGVbc2VsZi5fc3JjXTtcbiAgICAgIHNlbGYgPSBudWxsO1xuICAgIH1cblxuICB9O1xuXG4gIC8vIG9ubHkgZGVmaW5lIHRoZXNlIGZ1bmN0aW9ucyB3aGVuIHVzaW5nIFdlYkF1ZGlvXG4gIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG5cbiAgICAvKipcbiAgICAgKiBCdWZmZXIgYSBzb3VuZCBmcm9tIFVSTCAob3IgZnJvbSBjYWNoZSkgYW5kIGRlY29kZSB0byBhdWRpbyBzb3VyY2UgKFdlYiBBdWRpbyBBUEkpLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIHBhdGggdG8gdGhlIHNvdW5kIGZpbGUuXG4gICAgICovXG4gICAgdmFyIGxvYWRCdWZmZXIgPSBmdW5jdGlvbihvYmosIHVybCkge1xuICAgICAgLy8gY2hlY2sgaWYgdGhlIGJ1ZmZlciBoYXMgYWxyZWFkeSBiZWVuIGNhY2hlZFxuICAgICAgaWYgKHVybCBpbiBjYWNoZSkge1xuICAgICAgICAvLyBzZXQgdGhlIGR1cmF0aW9uIGZyb20gdGhlIGNhY2hlXG4gICAgICAgIG9iai5fZHVyYXRpb24gPSBjYWNoZVt1cmxdLmR1cmF0aW9uO1xuXG4gICAgICAgIC8vIGxvYWQgdGhlIHNvdW5kIGludG8gdGhpcyBvYmplY3RcbiAgICAgICAgbG9hZFNvdW5kKG9iaik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKC9eZGF0YTpbXjtdKztiYXNlNjQsLy50ZXN0KHVybCkpIHtcbiAgICAgICAgLy8gRGVjb2RlIGJhc2U2NCBkYXRhLVVSSXMgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGNhbm5vdCBsb2FkIGRhdGEtVVJJcyB3aXRoIFhNTEh0dHBSZXF1ZXN0LlxuICAgICAgICB2YXIgZGF0YSA9IGF0b2IodXJsLnNwbGl0KCcsJylbMV0pO1xuICAgICAgICB2YXIgZGF0YVZpZXcgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxkYXRhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgZGF0YVZpZXdbaV0gPSBkYXRhLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRlY29kZUF1ZGlvRGF0YShkYXRhVmlldy5idWZmZXIsIG9iaiwgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxvYWQgdGhlIGJ1ZmZlciBmcm9tIHRoZSBVUkxcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkZWNvZGVBdWRpb0RhdGEoeGhyLnJlc3BvbnNlLCBvYmosIHVybCk7XG4gICAgICAgIH07XG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3IsIHN3aXRjaCB0aGUgc291bmQgdG8gSFRNTCBBdWRpb1xuICAgICAgICAgIGlmIChvYmouX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBvYmouX2J1ZmZlciA9IHRydWU7XG4gICAgICAgICAgICBvYmouX3dlYkF1ZGlvID0gZmFsc2U7XG4gICAgICAgICAgICBvYmouX2F1ZGlvTm9kZSA9IFtdO1xuICAgICAgICAgICAgZGVsZXRlIG9iai5fZ2Fpbk5vZGU7XG4gICAgICAgICAgICBkZWxldGUgY2FjaGVbdXJsXTtcbiAgICAgICAgICAgIG9iai5sb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB4aHIub25lcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlY29kZSBhdWRpbyBkYXRhIGZyb20gYW4gYXJyYXkgYnVmZmVyLlxuICAgICAqIEBwYXJhbSAge0FycmF5QnVmZmVyfSBhcnJheWJ1ZmZlciBUaGUgYXVkaW8gZGF0YS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBUaGUgSG93bCBvYmplY3QgZm9yIHRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBwYXRoIHRvIHRoZSBzb3VuZCBmaWxlLlxuICAgICAqL1xuICAgIHZhciBkZWNvZGVBdWRpb0RhdGEgPSBmdW5jdGlvbihhcnJheWJ1ZmZlciwgb2JqLCB1cmwpIHtcbiAgICAgIC8vIGRlY29kZSB0aGUgYnVmZmVyIGludG8gYW4gYXVkaW8gc291cmNlXG4gICAgICBjdHguZGVjb2RlQXVkaW9EYXRhKFxuICAgICAgICBhcnJheWJ1ZmZlcixcbiAgICAgICAgZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgY2FjaGVbdXJsXSA9IGJ1ZmZlcjtcbiAgICAgICAgICAgIGxvYWRTb3VuZChvYmosIGJ1ZmZlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICBvYmoub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5pc2hlcyBsb2FkaW5nIHRoZSBXZWIgQXVkaW8gQVBJIHNvdW5kIGFuZCBmaXJlcyB0aGUgbG9hZGVkIGV2ZW50XG4gICAgICogQHBhcmFtICB7T2JqZWN0fSAgb2JqICAgIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7T2JqZWNjdH0gYnVmZmVyIFRoZSBkZWNvZGVkIGJ1ZmZlciBzb3VuZCBzb3VyY2UuXG4gICAgICovXG4gICAgdmFyIGxvYWRTb3VuZCA9IGZ1bmN0aW9uKG9iaiwgYnVmZmVyKSB7XG4gICAgICAvLyBzZXQgdGhlIGR1cmF0aW9uXG4gICAgICBvYmouX2R1cmF0aW9uID0gKGJ1ZmZlcikgPyBidWZmZXIuZHVyYXRpb24gOiBvYmouX2R1cmF0aW9uO1xuXG4gICAgICAvLyBzZXR1cCBhIHNwcml0ZSBpZiBub25lIGlzIGRlZmluZWRcbiAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmouX3Nwcml0ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG9iai5fc3ByaXRlID0ge19kZWZhdWx0OiBbMCwgb2JqLl9kdXJhdGlvbiAqIDEwMDBdfTtcbiAgICAgIH1cblxuICAgICAgLy8gZmlyZSB0aGUgbG9hZGVkIGV2ZW50XG4gICAgICBpZiAoIW9iai5fbG9hZGVkKSB7XG4gICAgICAgIG9iai5fbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgb2JqLm9uKCdsb2FkJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmouX2F1dG9wbGF5KSB7XG4gICAgICAgIG9iai5wbGF5KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgdGhlIHNvdW5kIGJhY2sgaW50byB0aGUgYnVmZmVyIHNvdXJjZS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiAgIFRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge0FycmF5fSAgbG9vcCAgTG9vcCBib29sZWFuLCBwb3MsIGFuZCBkdXJhdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICovXG4gICAgdmFyIHJlZnJlc2hCdWZmZXIgPSBmdW5jdGlvbihvYmosIGxvb3AsIGlkKSB7XG4gICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbm9kZSB0byBjb25uZWN0IHRvXG4gICAgICB2YXIgbm9kZSA9IG9iai5fbm9kZUJ5SWQoaWQpO1xuXG4gICAgICAvLyBzZXR1cCB0aGUgYnVmZmVyIHNvdXJjZSBmb3IgcGxheWJhY2tcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlID0gY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UuYnVmZmVyID0gY2FjaGVbb2JqLl9zcmNdO1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UuY29ubmVjdChub2RlLnBhbm5lcik7XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5sb29wID0gbG9vcFswXTtcbiAgICAgIGlmIChsb29wWzBdKSB7XG4gICAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3BTdGFydCA9IGxvb3BbMV07XG4gICAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3BFbmQgPSBsb29wWzFdICsgbG9vcFsyXTtcbiAgICAgIH1cbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZSA9IG9iai5fcmF0ZTtcbiAgICB9O1xuXG4gIH1cblxuICAvKipcbiAgICogQWRkIHN1cHBvcnQgZm9yIEFNRCAoQXN5bmNocm9ub3VzIE1vZHVsZSBEZWZpbml0aW9uKSBsaWJyYXJpZXMgc3VjaCBhcyByZXF1aXJlLmpzLlxuICAgKi9cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEhvd2xlcjogSG93bGVyLFxuICAgICAgICBIb3dsOiBIb3dsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzdXBwb3J0IGZvciBDb21tb25KUyBsaWJyYXJpZXMgc3VjaCBhcyBicm93c2VyaWZ5LlxuICAgKi9cbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGV4cG9ydHMuSG93bGVyID0gSG93bGVyO1xuICAgIGV4cG9ydHMuSG93bCA9IEhvd2w7XG4gIH1cblxuICAvLyBkZWZpbmUgZ2xvYmFsbHkgaW4gY2FzZSBBTUQgaXMgbm90IGF2YWlsYWJsZSBvciBhdmFpbGFibGUgYnV0IG5vdCB1c2VkXG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgd2luZG93Lkhvd2xlciA9IEhvd2xlcjtcbiAgICB3aW5kb3cuSG93bCA9IEhvd2w7XG4gIH1cblxufSkoKTtcbiJdfQ==
