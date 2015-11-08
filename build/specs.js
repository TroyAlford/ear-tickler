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
}, {
  name: "BG: Forest @ Night",
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/69_Forest_Night.mp3'
}, {
  name: 'BG: Dungeon',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/65_Dungeon_I.mp3'
}, {
  name: 'BG: Stormy',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/60_Dark_and_Stormy.mp3'
}, {
  name: 'BG: Jungle',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/59_Dinotopia.mp3'
}, {
  name: 'BG: Ominous',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/58_Terror.mp3'
}, {
  name: 'BG: Medieval Town',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/56_Medieval_Town.mp3'
}, {
  name: 'BG: Windy Cavern',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/55_Ice_Cavern.mp3'
}, {
  name: 'BG: Quiet Tavern',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/54_Mountain_Tavern.mp3'
}, {
  name: 'BG: Monastic Chanting',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/46_Cathedral.mp3'
}, {
  name: 'BG: Swamp',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/35_Swamplandia.mp3'
}, {
  name: 'BG: Windy Desert',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/31_Frozen_Wastes.mp3'
}, {
  name: 'BG: Jungle @ Night',
  origin: 'https://s3-us-west-2.amazonaws.com/tta1/sounds/27_Xingu_Nights.mp3'
}];

},{}],"d:\\git\\ear-tickler\\app\\mixins\\TimeFormatterMixin.js":[function(require,module,exports){
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
    this.props.onClose(this);
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
var Helper = require('../Helper.js');
var AudioPlayer = require('../player/AudioPlayer.js');

var SoundBoard = React.createClass({
  displayName: 'SoundBoard',

  getInitialState: function getInitialState() {
    var me = this;
    return {
      players: this.props.tracks.map(function (track) {
        var guid = Helper.guid();
        return React.createElement(AudioPlayer, {
          unique: guid, key: guid,
          track: track,
          onClose: me.removePlayer
        });
      })
    };
  },

  removePlayer: function removePlayer(unique) {
    this.setState({
      players: this.state.players.filter(function (player) {
        return player.key !== unique;
      })
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'sound-board' },
      this.state.players
    );
  }
});

module.exports = SoundBoard;

},{"../Helper.js":"d:\\git\\ear-tickler\\app\\Helper.js","../player/AudioPlayer.js":"d:\\git\\ear-tickler\\app\\player\\AudioPlayer.js","react":"react"}],"d:\\git\\ear-tickler\\node_modules\\howler\\howler.js":[function(require,module,exports){
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

},{}],"d:\\git\\ear-tickler\\specs\\App-spec.js":[function(require,module,exports){
'use strict';

var App = require('./../app/App.js');
var TestUtils = require('react/addons').TestUtils;

describe("App", function () {

  it("should be wrapped with a div", function () {
    var app = TestUtils.renderIntoDocument(App());
    expect(app.getDOMNode().tagName).toEqual('DIV');
  });
});

},{"./../app/App.js":"d:\\git\\ear-tickler\\app\\App.js","react/addons":"react/addons"}]},{},["d:\\git\\ear-tickler\\specs\\App-spec.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0FwcC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvSGVscGVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9kYXRhL1RyYWNrU3RvcmUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL2RhdGEvVHJhY2tzLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9taXhpbnMvVGltZUZvcm1hdHRlck1peGluLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9uYXZpZ2F0aW9uL0ZpbHRlcmVkVHJhY2tMaXN0LmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9uYXZpZ2F0aW9uL1RyYWNrTGlzdC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvbmF2aWdhdGlvbi9UcmFja1NlYXJjaEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvQ29udHJvbEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvUGxheWVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9wbGF5ZXIvQXVkaW9Qcm9ncmVzc0Jhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvVm9sdW1lQmFyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9zb3VuZGJvYXJkL1NvdW5kQm9hcmQuanMiLCJub2RlX21vZHVsZXMvaG93bGVyL2hvd2xlci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9zcGVjcy9BcHAtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2pELElBQUksaUJBQWlCLEdBQUcsT0FB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QUFJLENBQUMsS0FBSyxDQUFDLE9BQU87S0FBTyxDQUN2RDtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDOzs7QUNwQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDejBDQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDOztBQUVsRCxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVc7O0FBRXpCLElBQUUsQ0FBQyw4QkFBOEIsRUFBRSxZQUFXO0FBQzVDLFFBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLFVBQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ2pELENBQUMsQ0FBQztDQUVKLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVHJhY2tTdG9yZSA9IHJlcXVpcmUoJy4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcbnZhciBGaWx0ZXJlZFRyYWNrTGlzdCA9IHJlcXVpcmUoJy4vbmF2aWdhdGlvbi9GaWx0ZXJlZFRyYWNrTGlzdC5qcycpO1xyXG52YXIgU291bmRCb2FyZCA9IHJlcXVpcmUoJy4vc291bmRib2FyZC9Tb3VuZEJvYXJkLmpzJyk7XHJcblxyXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHRyYWNrczogVHJhY2tTdG9yZS5nZXRUcmFja3MoKSxcclxuXHJcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe30pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybihcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlYXItdGlja2xlciBhcHBsaWNhdGlvblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWJhclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFkcGhvbmVzXCI+PC9pPiBFYXIgVGlja2xlclxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPEZpbHRlcmVkVHJhY2tMaXN0XHJcbiAgICAgICAgICB0cmFja3M9e3RoaXMucHJvcHMudHJhY2tTdG9yZS5nZXRUcmFja3MoKX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxTb3VuZEJvYXJkXHJcbiAgICAgICAgICB0cmFja3M9e1t0aGlzLnRyYWNrc1s1XV19XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblx0XHJcbm1vZHVsZS5leHBvcnRzID0gQXBwO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGV4dGVuZDogZnVuY3Rpb24gKGEsIGIpe1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGIpXHJcbiAgICAgICAgICAgIGlmKGIuaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH0sXHJcbiAgICBndWlkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSoxNnwwLCB2ID0gYyA9PSAneCcgPyByIDogKHImMHgzfDB4OCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJ2YXIgZmx1eCA9IHJlcXVpcmUoJ2ZsdXgtcmVhY3QnKTtcclxudmFyIEhlbHBlciA9IHJlcXVpcmUoJy4uL0hlbHBlci5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgcmF3X3RyYWNrcyA9IHJlcXVpcmUoJy4vVHJhY2tzLmpzJylcclxuICAgIC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgcmV0dXJuIGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSk7XHJcbiAgICB9KTtcclxuICB2YXIgdHJhY2tzID0gcmF3X3RyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgcmV0dXJuIEhlbHBlci5leHRlbmQoe1xyXG4gICAgICAgICAgaWQ6IEhlbHBlci5ndWlkKCksXHJcbiAgICAgICAgICBuYW1lOiAnTmV3IFRyYWNrJyxcclxuICAgICAgICAgIHVybDogJy4uL2F1ZGlvL2RlZmF1bHQubXAzJyxcclxuICAgICAgICAgIG9yaWdpbjogJ1Vua25vd24gT3JpZ2luJ1xyXG4gICAgICB9LCB0cmFjayk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBmbHV4LmNyZWF0ZVN0b3JlKHtcclxuICAgIHRyYWNrczogdHJhY2tzLFxyXG4gICAgdXBzZXJ0VHJhY2s6IGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgdGhpcy50cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCd0cmFja3MudXBkYXRlZCcpO1xyXG4gICAgfSxcclxuICAgIGRlbGV0ZVRyYWNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHRyYWNrcyA9IHRyYWNrcy5maWx0ZXIoZnVuY3Rpb24oZWwpIHsgcmV0dXJuIGVsLmlkICE9PSBpZDsgfSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCd0cmFja3MuZGVsZXRlZCcpO1xyXG4gICAgfSxcclxuICAgIGV4cG9ydHM6IHtcclxuICAgICAgICBnZXRUcmFja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFja3M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVUcmFjazogZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVUcmFjayhpZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRUcmFjazogZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy51cHNlcnRUcmFjayh0cmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59KCk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gW3tcclxuICBuYW1lOiAnQmlyZHMgKExpZ2h0KScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzEvMTA1MF8xMTEyLWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0JpcmRzIChTcGFyc2UpJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTU4LzE1ODUyN18yNzgzMzM2LWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0NyaWNrZXRzJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMzkvMzk4MjlfMjgyMTYtaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnUm9hciAtIERyYWdvbiAoRmFzdCknLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy84NS84NTU2OF8xMjA2MzIxLWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0Zhc3QgUml2ZXInLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8zOS8zOTgzMV8yODIxNi1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdNYWdpYyAoRmFzdCknLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8yMjEvMjIxNjgzXzEwMTUyNDAtaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnVGh1bmRlciBTdG9ybScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzIvMjUyM18xMTEyLWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ1JvYXIsIE1vbnN0ZXIgKFNsb3cpJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMjY3LzI2NzQ1NF8zNDE1MDIyLWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ1JvYXIsIE9ncmUnLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xMDMvMTAzNTM0XzE3NTc0ODktaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnUm9hciwgT2dyZSAyJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMTAzLzEwMzUzNV8xNzU3NDg5LWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogXCJCRzogRm9yZXN0IEAgTmlnaHRcIixcclxuICBvcmlnaW46ICdodHRwczovL3MzLXVzLXdlc3QtMi5hbWF6b25hd3MuY29tL3R0YTEvc291bmRzLzY5X0ZvcmVzdF9OaWdodC5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdCRzogRHVuZ2VvbicsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly9zMy11cy13ZXN0LTIuYW1hem9uYXdzLmNvbS90dGExL3NvdW5kcy82NV9EdW5nZW9uX0kubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQkc6IFN0b3JteScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly9zMy11cy13ZXN0LTIuYW1hem9uYXdzLmNvbS90dGExL3NvdW5kcy82MF9EYXJrX2FuZF9TdG9ybXkubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQkc6IEp1bmdsZScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly9zMy11cy13ZXN0LTIuYW1hem9uYXdzLmNvbS90dGExL3NvdW5kcy81OV9EaW5vdG9waWEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQkc6IE9taW5vdXMnLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vdHRhMS9zb3VuZHMvNThfVGVycm9yLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0JHOiBNZWRpZXZhbCBUb3duJyxcclxuICBvcmlnaW46ICdodHRwczovL3MzLXVzLXdlc3QtMi5hbWF6b25hd3MuY29tL3R0YTEvc291bmRzLzU2X01lZGlldmFsX1Rvd24ubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQkc6IFdpbmR5IENhdmVybicsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly9zMy11cy13ZXN0LTIuYW1hem9uYXdzLmNvbS90dGExL3NvdW5kcy81NV9JY2VfQ2F2ZXJuLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0JHOiBRdWlldCBUYXZlcm4nLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vdHRhMS9zb3VuZHMvNTRfTW91bnRhaW5fVGF2ZXJuLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0JHOiBNb25hc3RpYyBDaGFudGluZycsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly9zMy11cy13ZXN0LTIuYW1hem9uYXdzLmNvbS90dGExL3NvdW5kcy80Nl9DYXRoZWRyYWwubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQkc6IFN3YW1wJyxcclxuICBvcmlnaW46ICdodHRwczovL3MzLXVzLXdlc3QtMi5hbWF6b25hd3MuY29tL3R0YTEvc291bmRzLzM1X1N3YW1wbGFuZGlhLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ0JHOiBXaW5keSBEZXNlcnQnLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vdHRhMS9zb3VuZHMvMzFfRnJvemVuX1dhc3Rlcy5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdCRzogSnVuZ2xlIEAgTmlnaHQnLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vczMtdXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vdHRhMS9zb3VuZHMvMjdfWGluZ3VfTmlnaHRzLm1wMydcclxufV07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gIHtcclxuICBzZWNvbmRzVG9UaW1lOiBmdW5jdGlvbihzZWNzKSB7XHJcbiAgICBzZWNzID0gTWF0aC5yb3VuZChzZWNzKTtcclxuICAgIHZhciBob3VycyA9IE1hdGguZmxvb3Ioc2VjcyAvICg2MCAqIDYwKSk7XHJcblxyXG4gICAgdmFyIGRpdmlzb3JfZm9yX21pbnV0ZXMgPSBzZWNzICUgKDYwICogNjApO1xyXG4gICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKGRpdmlzb3JfZm9yX21pbnV0ZXMgLyA2MCk7XHJcblxyXG4gICAgdmFyIGRpdmlzb3JfZm9yX3NlY29uZHMgPSBkaXZpc29yX2Zvcl9taW51dGVzICUgNjA7XHJcbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguY2VpbChkaXZpc29yX2Zvcl9zZWNvbmRzKTtcclxuXHJcbiAgICB2YXIgdGltZSA9IFwiXCI7XHJcblxyXG4gICAgaWYoaG91cnMgPiAwKSB7XHJcbiAgICAgIHRpbWUgKz0gaG91cnMgKyBcIjpcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lICs9IHRoaXMudGltZVVuaXRGb3JtYXQobWludXRlcykgKyBcIjpcIjtcclxuICAgIHRpbWUgKz0gdGhpcy50aW1lVW5pdEZvcm1hdChzZWNvbmRzKTtcclxuICAgIHJldHVybiB0aW1lO1xyXG4gIH0sXHJcblxyXG4gIHRpbWVVbml0Rm9ybWF0OmZ1bmN0aW9uKHRpbWUpIHtcclxuICAgIGlmICh0aW1lIDwgMSkge1xyXG4gICAgICByZXR1cm4gXCIwMFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aW1lIDwgMTApIHtcclxuICAgICAgcmV0dXJuIFwiMFwiICsgdGltZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVHJhY2tTZWFyY2hCYXIgPSByZXF1aXJlKCcuL1RyYWNrU2VhcmNoQmFyLmpzJyk7XHJcbnZhciBUcmFja0xpc3QgPSByZXF1aXJlKCcuL1RyYWNrTGlzdC5qcycpO1xyXG5cclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWx0ZXJUZXh0OiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbihmaWx0ZXJUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGZpbHRlclRleHQ6IGZpbHRlclRleHRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdHJhY2stbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPFRyYWNrU2VhcmNoQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbHRlckNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VHJhY2tMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcz17dGhpcy5wcm9wcy50cmFja3N9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmlsdGVyZWRUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbGlzdEl0ZW1zID0gdGhpcy5wcm9wcy50cmFja3NcclxuICAgICAgLmZpbHRlcihmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSB0aGlzLnByb3BzLmZpbHRlclRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2YXIgdHJhY2tOYW1lID0gdHJhY2submFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiB0cmFja05hbWUuaW5kZXhPZihmaWx0ZXIpID4gLTE7XHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICAgIC5tYXAoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpIGtleT17dHJhY2suaWR9IHRyYWNrPXt0cmFja30+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLW11c2ljXCI+PC9pPlxyXG4gICAgICAgICAgICB7dHJhY2submFtZX1cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+e2xpc3RJdGVtc308L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlsdGVyVGV4dCA9IHRoaXMucmVmcy5zZWFyY2hCb3guZ2V0RE9NTm9kZSgpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25GaWx0ZXJDaGFuZ2UoZmlsdGVyVGV4dCk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlclRleHR9XHJcbiAgICAgICAgICAgICAgICByZWY9XCJzZWFyY2hCb3hcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBIZWxwZXIgPSByZXF1aXJlKCcuLi9IZWxwZXIuanMnKTtcclxuXHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBsYXlTdGF0ZSkge1xyXG4gICAgICBjYXNlICdsb2FkaW5nJzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGxheWluZyc6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBhdXNlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBsYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGhhbmRsZUxvb3BUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbkxvb3BUb2dnbGUoXHJcbiAgICAgIHRoaXMucmVmcy5sb29wX2VuYWJsZWQuZ2V0RE9NTm9kZSgpLmNoZWNrZWRcclxuICAgICk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QnV0dG9uQ2xhc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBsYXlTdGF0ZSkge1xyXG4gICAgICBjYXNlICdwbGF5aW5nJzpcclxuICAgICAgICByZXR1cm4gJ3BhdXNlJztcclxuICAgICAgY2FzZSAnbG9hZGluZyc6XHJcbiAgICAgICAgcmV0dXJuICdzcGlubmVyJztcclxuICAgICAgY2FzZSAncGF1c2VkJzpcclxuICAgICAgY2FzZSAnc3RvcHBlZCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuICdwbGF5JztcclxuICAgICAgICByZXR1cm4gJ3BsYXknO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QnV0dG9uSWNvbkNsYXNzOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBidXR0b25fY2xhc3MgPSB0aGlzLmdldEJ1dHRvbkNsYXNzKCk7XHJcbiAgICBzd2l0Y2ggKGJ1dHRvbl9jbGFzcykge1xyXG4gICAgICBjYXNlICdzcGlubmVyJzpcclxuICAgICAgICByZXR1cm4gJ3NwaW5uZXIgZmEtc3Bpbic7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbl9jbGFzcztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGxvb3BfdG9nZ2xlX2lkID0gSGVscGVyLmd1aWQoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tY29udHJvbC1iYXJcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0QnV0dG9uQ2xhc3MoKX1cclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPXtcImZhIGZhLVwiICsgdGhpcy5nZXRCdXR0b25JY29uQ2xhc3MoKX0+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgaWQ9e2xvb3BfdG9nZ2xlX2lkfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibG9vcC10b2dnbGVcIlxyXG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgIHJlZj1cImxvb3BfZW5hYmxlZFwiXHJcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVMb29wVG9nZ2xlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJsb29wLXRvZ2dsZS1sYWJlbFwiXHJcbiAgICAgICAgICBodG1sRm9yPXtsb29wX3RvZ2dsZV9pZH0+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1yZXBlYXRcIj48L2k+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQ29udHJvbEJhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEF1ZGlvQ29udHJvbEJhciAgPSByZXF1aXJlKCcuL0F1ZGlvQ29udHJvbEJhci5qcycpO1xyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vQXVkaW9Qcm9ncmVzc0Jhci5qcycpO1xyXG52YXIgQXVkaW9Wb2x1bWVCYXIgICA9IHJlcXVpcmUoJy4vQXVkaW9Wb2x1bWVCYXIuanMnKTtcclxuXHJcbnZhciBIb3dsID0gcmVxdWlyZSgnaG93bGVyJykuSG93bDtcclxuXHJcbnZhciBBdWRpb1BsYXllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgIG11dGVkOiBmYWxzZSxcclxuICAgICAgcGxheVN0YXRlOiAnbG9hZGluZycsXHJcbiAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgdm9sdW1lOiAxLjBcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2FkQXVkaW8oKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY2xlYXJBdWRpbygpO1xyXG4gIH0sXHJcblxyXG4gIGF1ZGlvOiBudWxsLCAgIC8vIFRoZSBIb3dsZXIuanMgSG93bCBvYmplY3RcclxuICByZWZyZXNoOiBudWxsLCAvLyBJbnRlcnZhbCBmb3IgcmVmcmVzaGluZyBwbGF5IHRpbWUgJiBwcm9ncmVzc1xyXG5cclxuICBsb2FkQXVkaW86IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jbGVhckF1ZGlvKCk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGxheVN0YXRlOiAnbG9hZGluZycgfSk7XHJcblxyXG4gICAgdGhpcy5hdWRpbyA9IG5ldyBIb3dsKHtcclxuICAgICAgdXJsczogW3RoaXMucHJvcHMudHJhY2sub3JpZ2luXSxcclxuICAgICAgbG9vcDogdGhpcy5zdGF0ZS5sb29wLFxyXG4gICAgICB2b2x1bWU6IHRoaXMuc3RhdGUudm9sdW1lLFxyXG4gICAgICBvbmxvYWQ6IHRoaXMuaGFuZGxlQXVkaW9Mb2FkZWQsXHJcbiAgICAgIG9uZW5kOiB0aGlzLmhhbmRsZUF1ZGlvRW5kZWRcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUF1ZGlvTG9hZGVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBwbGF5U3RhdGU6ICdwYXVzZWQnLFxyXG4gICAgICBkdXJhdGlvbjogdGhpcy5hdWRpby5fZHVyYXRpb25cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY2xlYXJBdWRpbzogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5hdWRpbykge1xyXG4gICAgICB0aGlzLmF1ZGlvLnN0b3AoKTtcclxuICAgICAgdGhpcy5hdWRpbyA9IHt9O1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucHJvcHMub25DbG9zZSh0aGlzKTtcclxuICB9LFxyXG4gIGhhbmRsZU11dGVUb2dnbGU6IGZ1bmN0aW9uKG11dGVTZXR0aW5nKSB7XHJcbiAgICBpZiAobXV0ZVNldHRpbmcpXHJcbiAgICAgIHRoaXMuYXVkaW8ubXV0ZSgpO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLmF1ZGlvLnVubXV0ZSgpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IG11dGVkOiBtdXRlU2V0dGluZyB9KTtcclxuICB9LFxyXG4gIGhhbmRsZVBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5U3RhdGU6ICdwYXVzZWQnIH0pO1xyXG4gICAgdGhpcy5hdWRpby5wYXVzZSgpO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2ggfHwgMCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgfSxcclxuICBoYW5kbGVQbGF5OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5U3RhdGU6ICdwbGF5aW5nJyB9KTtcclxuICAgIHRoaXMuYXVkaW8ucGxheSgpO1xyXG4gICAgdGhpcy5yZWZyZXNoID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQb3NpdGlvbiwgMjAwKTtcclxuICB9LFxyXG4gIGhhbmRsZVNlZWs6IGZ1bmN0aW9uKHBlcmNlbnQpIHtcclxuICAgIHRoaXMuYXVkaW8ucG9zKHRoaXMuc3RhdGUuZHVyYXRpb24gKiBwZXJjZW50KTtcclxuICB9LFxyXG4gIGhhbmRsZVN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBsYXlTdGF0ZTogJ3N0b3BwZWQnIH0pO1xyXG4gICAgdGhpcy5hdWRpby5zdG9wKCk7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaCB8fCAwKTtcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9LFxyXG4gIGhhbmRsZUxvb3BUb2dnbGU6IGZ1bmN0aW9uKGxvb3BTZXR0aW5nKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5wbGF5U3RhdGUgPT0gJ3BsYXlpbmcnKSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IGR1ZSB0byBhIGJ1ZyBpbiBIb3dsZXIuanMuXHJcbiAgICAgIC8vICogU2V0dGluZyAubG9vcCh0cnVlKSB3aGlsZSBwbGF5aW5nIGRvZXNuJ3QgY2F1c2UgaXQgdG8gbG9vcCBhdCB0aGUgZW5kLlxyXG4gICAgICAvLyAgIFN1YnNlcXVlbnQgcGxheXMgd2lsbCBob25vciB0aGUgc2V0dGluZywgdGhvdWdoIC0gc28gd2Ugc2ltcGx5IGZvcmNlIGl0XHJcbiAgICAgIC8vICAgb25jZSB0byBvdmVyY29tZSB0aGUgbGltaXRhdGlvbi5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9yY2VMb29wOiBsb29wU2V0dGluZ30pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb29wOiBsb29wU2V0dGluZyB9KTtcclxuICAgIHRoaXMuYXVkaW8ubG9vcChsb29wU2V0dGluZyk7XHJcbiAgfSxcclxuICBoYW5kbGVTZXRWb2x1bWU6IGZ1bmN0aW9uKHZvbHVtZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHZvbHVtZTogdm9sdW1lLFxyXG4gICAgICBtdXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hdWRpby52b2x1bWUodm9sdW1lKTtcclxuICB9LFxyXG5cclxuICBoYW5kbGVBdWRpb0VuZGVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYXVkaW8ucG9zKDApO1xyXG4gICAgaWYgKHRoaXMuc3RhdGUucGxheVN0YXRlID09ICdwbGF5aW5nJyAmJiB0aGlzLmF1ZGlvLmxvb3AoKSAmJiB0aGlzLnN0YXRlLmZvcmNlTG9vcCkge1xyXG4gICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBkdWUgdG8gYSBidWcgaW4gSG93bGVyLmpzLlxyXG4gICAgICAvLyAqIFNldHRpbmcgLmxvb3AodHJ1ZSkgd2hpbGUgcGxheWluZyBkb2Vzbid0IGNhdXNlIGl0IHRvIGxvb3AgYXQgdGhlIGVuZC5cclxuICAgICAgLy8gICBTdWJzZXF1ZW50IHBsYXlzIHdpbGwgaG9ub3IgdGhlIHNldHRpbmcsIHRob3VnaCAtIHNvIHdlIHNpbXBseSBmb3JjZSBpdFxyXG4gICAgICAvLyAgIG9uY2UgdG8gb3ZlcmNvbWUgdGhlIGxpbWl0YXRpb24uXHJcbiAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xyXG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9yY2VMb29wOiBudWxsfSk7IC8vIE9ubHkgZm9yY2UgaXQgb25jZS5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wbGF5U3RhdGUgPT0gJ3BsYXlpbmcnICYmICF0aGlzLmF1ZGlvLmxvb3AoKSAmJiAhdGhpcy5zdGF0ZS5mb3JjZUxvb3ApIHtcclxuICAgICAgdGhpcy5hdWRpby5zdG9wKCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGZvcmNlTG9vcDogbnVsbCxcclxuICAgICAgICBwbGF5U3RhdGU6ICdwYXVzZWQnXHJcbiAgICAgIH0pOyAvLyBPbmx5IGZvcmNlIHN0b3BwaW5nIG9uY2UuXHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmF1ZGlvLmxvb3AoKSlcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxheVN0YXRlOiAncGF1c2VkJ30pO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwb3NpdGlvbjogdGhpcy5hdWRpby5wb3MoKSB9KTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYXVkaW8tcGxheWVyIFwiICsgdGhpcy5zdGF0ZS5wbGF5U3RhdGV9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhY2stbmFtZVwiPnt0aGlzLnByb3BzLnRyYWNrLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGlcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlIGNsb3NlLWJ1dHRvblwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cclxuICAgICAgICA8L2k+XHJcbiAgICAgICAgPEF1ZGlvQ29udHJvbEJhclxyXG4gICAgICAgICAgcGxheVN0YXRlPXt0aGlzLnN0YXRlLnBsYXlTdGF0ZX1cclxuICAgICAgICAgIG9uUGF1c2U9e3RoaXMuaGFuZGxlUGF1c2V9XHJcbiAgICAgICAgICBvblBsYXk9e3RoaXMuaGFuZGxlUGxheX1cclxuICAgICAgICAgIG9uTG9vcFRvZ2dsZT17dGhpcy5oYW5kbGVMb29wVG9nZ2xlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvUHJvZ3Jlc3NCYXJcclxuICAgICAgICAgIHBlcmNlbnRhZ2U9e3RoaXMuc3RhdGUucG9zaXRpb24gLyB0aGlzLnN0YXRlLmR1cmF0aW9ufVxyXG4gICAgICAgICAgcG9zaXRpb249e3RoaXMuc3RhdGUucG9zaXRpb259XHJcbiAgICAgICAgICBkdXJhdGlvbj17dGhpcy5zdGF0ZS5kdXJhdGlvbn1cclxuICAgICAgICAgIG9uU2Vlaz17dGhpcy5oYW5kbGVTZWVrfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvVm9sdW1lQmFyXHJcbiAgICAgICAgICBhdWRpb05vZGU9e3RoaXMuYXVkaW8uX2F1ZGlvTm9kZVswXX1cclxuICAgICAgICAgIG11dGVkPXt0aGlzLnN0YXRlLm11dGVkfVxyXG4gICAgICAgICAgb25NdXRlVG9nZ2xlPXt0aGlzLmhhbmRsZU11dGVUb2dnbGV9XHJcbiAgICAgICAgICBvblNldFZvbHVtZT17dGhpcy5oYW5kbGVTZXRWb2x1bWV9XHJcbiAgICAgICAgICBwbGF5U3RhdGU9e3RoaXMuc3RhdGUucGxheVN0YXRlfVxyXG4gICAgICAgICAgdm9sdW1lPXt0aGlzLnN0YXRlLnZvbHVtZX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9QbGF5ZXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUaW1lRm9ybWF0dGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvVGltZUZvcm1hdHRlck1peGluLmpzJyk7XHJcblxyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBtaXhpbnM6IFtUaW1lRm9ybWF0dGVyTWl4aW5dLFxyXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJhcl9lbCAgPSB0aGlzLmdldERPTU5vZGUoKSxcclxuICAgICAgICBjb29yZHMgID0gYmFyX2VsLmdldENsaWVudFJlY3RzKClbMF0sXHJcbiAgICAgICAgY2xpY2tfeCA9IGV2ZW50LnBhZ2VYIC0gY29vcmRzLmxlZnQsXHJcbiAgICAgICAgcGVyY2VudCA9IGNsaWNrX3ggLyAoY29vcmRzLnJpZ2h0IC0gY29vcmRzLmxlZnQpO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25TZWVrKHBlcmNlbnQpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjdXJyZW50ID0gdGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMucG9zaXRpb24pO1xyXG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMuZHVyYXRpb24pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImF1ZGlvLXByb2dyZXNzLWJhclwiXHJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby10aW1lclwiPntjdXJyZW50fSZuYnNwOy8mbmJzcDt7ZHVyYXRpb259PC9kaXY+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXVkaW8tcHJvZ3Jlc3MtYmFyLWZpbGxcIlxyXG4gICAgICAgICAgc3R5bGU9e3t3aWR0aDogKHRoaXMucHJvcHMucGVyY2VudGFnZSAqIDEwMCkgKyAnJSd9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdGltZXJcIj57Y3VycmVudH0mbmJzcDsvJm5ic3A7e2R1cmF0aW9ufTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9Qcm9ncmVzc0JhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEhlbHBlciA9IHJlcXVpcmUoJy4uL0hlbHBlci5qcycpO1xyXG5cclxudmFyIEF1ZGlvVm9sdW1lQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxvYWRWaXN1YWxpemVyKCk7XHJcbiAgICB0aGlzLnJlZnJlc2ggPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZU9zY2lsbG9zY29wZSwgMTAwMCk7XHJcbiAgICB0aGlzLnVwZGF0ZU9zY2lsbG9zY29wZSgpO1xyXG4gIH0sXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2gpO1xyXG4gICAgdGhpcy51bmxvYWRWaXN1YWxpemVyKCk7XHJcbiAgfSxcclxuICBhbmFseXNlcjogbnVsbCwgLy8gVGhlIFdlYiBBdWRpbyBBUEkgQW5hbHl6ZXIgb2JqZWN0XHJcbiAgcmVmcmVzaDogbnVsbCwgIC8vIEludGVydmFsIGZvciByZWZyZXNoaW5nIG9zY2lsbG9zY29wZVxyXG5cclxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBiYXJfZWwgID0gdGhpcy5yZWZzLnZvbHVtZV9iYXIuZ2V0RE9NTm9kZSgpLFxyXG4gICAgICAgIGNvb3JkcyAgPSBiYXJfZWwuZ2V0Q2xpZW50UmVjdHMoKVswXSxcclxuICAgICAgICBjbGlja194ID0gZXZlbnQucGFnZVggLSBjb29yZHMubGVmdCxcclxuICAgICAgICBwZXJjZW50ID0gY2xpY2tfeCAvIChjb29yZHMucmlnaHQgLSBjb29yZHMubGVmdCk7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNldFZvbHVtZShwZXJjZW50KTtcclxuICB9LFxyXG4gIGhhbmRsZU11dGVUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbk11dGVUb2dnbGUoIXRoaXMucHJvcHMubXV0ZWQpO1xyXG4gIH0sXHJcbiAgaGFuZGxlVm9sdW1lRG93bjogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciB2b2x1bWUgPSB0aGlzLnByb3BzLnZvbHVtZSAtIC4xO1xyXG4gICAgaWYgKHZvbHVtZSA8IDAuMClcclxuICAgICAgdm9sdW1lID0gMC4wO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25TZXRWb2x1bWUodm9sdW1lKTtcclxuICB9LFxyXG4gIGhhbmRsZVZvbHVtZVVwOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHZvbHVtZSA9IHRoaXMucHJvcHMudm9sdW1lICsgLjE7XHJcbiAgICBpZiAodm9sdW1lID4gMS4wKVxyXG4gICAgICB2b2x1bWUgPSAxLjA7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNldFZvbHVtZSh2b2x1bWUpO1xyXG4gIH0sXHJcblxyXG4gIGxvYWRWaXN1YWxpemVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBub2RlID0gdGhpcy5wcm9wcy5hdWRpb05vZGU7XHJcbiAgICB2YXIgY29udGV4dCA9IHRoaXMucHJvcHMuYXVkaW9Ob2RlLmNvbnRleHQ7XHJcbiAgICBpZiAoIWNvbnRleHQpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB0aGlzLmFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xyXG4gICAgbm9kZS5jb25uZWN0KHRoaXMuYW5hbHlzZXIpO1xyXG4gICAgLy90aGlzLmFuYWx5c2VyLmNvbm5lY3Qobm9kZSk7XHJcbiAgfSxcclxuICB1bmxvYWRWaXN1YWxpemVyOiBmdW5jdGlvbigpIHtcclxuICB9LFxyXG4gIHVwZGF0ZU9zY2lsbG9zY29wZTogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5wcm9wcy5wbGF5U3RhdGUgIT09ICdwbGF5aW5nJylcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHZhciBjYW52YXMgPSB0aGlzLnJlZnMub3NjaWxsb3Njb3BlLmdldERPTU5vZGUoKTtcclxuICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbiAgICB2YXIgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHZhciB3aWR0aCAgPSBjYW52YXMud2lkdGg7XHJcblxyXG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnI2NjYyc7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIHRoaXMuYW5hbHlzZXIuZmZ0U2l6ZSA9IDIwNDg7XHJcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudDtcclxuICAgIHZhciBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xyXG5cclxuICAgIHZhciBhbmFseXNlciA9IHRoaXMuYW5hbHlzZXI7XHJcbiAgICBmdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgICB2YXIgZHJhd1Zpc3VhbCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcclxuICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGFBcnJheSk7XHJcblxyXG4gICAgICBjb250ZXh0LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgY29udGV4dC5saW5lV2lkdGggPSAyO1xyXG4gICAgICBjb250ZXh0LnN0cm9rZVN0eWxlID0gJyMzMzY2OTknO1xyXG5cclxuICAgICAgdmFyIHNsaWNlV2lkdGggPSB3aWR0aCAvIGJ1ZmZlckxlbmd0aDtcclxuICAgICAgdmFyIHggPSAwO1xyXG4gICAgICBjb250ZXh0Lm1vdmVUbyh4LCBoZWlnaHQgLyAyKTtcclxuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWZmZXJMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB2ID0gZGF0YUFycmF5W2ldIC8gMTI4LjA7XHJcbiAgICAgICAgdmFyIHkgPSB2ICogaGVpZ2h0IC8gMjtcclxuICAgICAgICBjb250ZXh0LmxpbmVUbyh4LCB5KTtcclxuICAgICAgICB4ICs9IHNsaWNlV2lkdGg7XHJcbiAgICAgIH1cclxuICAgICAgY29udGV4dC5saW5lVG8od2lkdGgsIGhlaWdodCAvIDIpO1xyXG4gICAgICBjb250ZXh0LnN0cm9rZSgpO1xyXG4gICAgfTtcclxuICAgIGRyYXcoKTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG11dGVfYnV0dG9uX2lkID0gSGVscGVyLmd1aWQoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdm9sdW1lLXdyYXBwZXJcIj5cclxuICAgICAgICA8aSBjbGFzc05hbWU9e1wiZmEgZmEtdm9sdW1lLW9mZiBcIiArICh0aGlzLnByb3BzLm11dGVkID8gXCJtdXRlZFwiIDogXCJcIil9XHJcbiAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVNdXRlVG9nZ2xlfVxyXG4gICAgICAgID48L2k+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdm9sdW1lLWRvd25cIlxyXG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVm9sdW1lRG93bn1cclxuICAgICAgICA+PC9pPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImF1ZGlvLXZvbHVtZS1iYXJcIlxyXG4gICAgICAgICAgcmVmPVwidm9sdW1lX2JhclwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfT5cclxuICAgICAgICAgIDxjYW52YXNcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYXVkaW8tdm9sdW1lLWJhci1maWxsXCJcclxuICAgICAgICAgICAgcmVmPVwib3NjaWxsb3Njb3BlXCJcclxuICAgICAgICAgICAgaGVpZ2h0PVwiMTAwXCJcclxuICAgICAgICAgICAgd2lkdGg9XCIxMDBcIlxyXG4gICAgICAgICAgICBzdHlsZT17e3dpZHRoOiAodGhpcy5wcm9wcy52b2x1bWUgKiAxMDApICsgJyUnfX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvY2FudmFzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXZvbHVtZS11cFwiXHJcbiAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVWb2x1bWVVcH1cclxuICAgICAgICA+PC9pPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9Wb2x1bWVCYXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBIZWxwZXIgPSByZXF1aXJlKCcuLi9IZWxwZXIuanMnKTtcclxudmFyIEF1ZGlvUGxheWVyID0gcmVxdWlyZSgnLi4vcGxheWVyL0F1ZGlvUGxheWVyLmpzJyk7XHJcblxyXG52YXIgU291bmRCb2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG1lID0gdGhpcztcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBsYXllcnM6IHRoaXMucHJvcHMudHJhY2tzLm1hcChmdW5jdGlvbiAodHJhY2spIHtcclxuICAgICAgICB2YXIgZ3VpZCA9IEhlbHBlci5ndWlkKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxBdWRpb1BsYXllclxyXG4gICAgICAgICAgICB1bmlxdWU9e2d1aWR9IGtleT17Z3VpZH1cclxuICAgICAgICAgICAgdHJhY2s9e3RyYWNrfVxyXG4gICAgICAgICAgICBvbkNsb3NlPXttZS5yZW1vdmVQbGF5ZXJ9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHJlbW92ZVBsYXllcjogZnVuY3Rpb24odW5pcXVlKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcGxheWVyczogdGhpcy5zdGF0ZS5wbGF5ZXJzLmZpbHRlcihmdW5jdGlvbihwbGF5ZXIpIHtcclxuICAgICAgICByZXR1cm4gcGxheWVyLmtleSAhPT0gdW5pcXVlO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic291bmQtYm9hcmRcIj57dGhpcy5zdGF0ZS5wbGF5ZXJzfTwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb3VuZEJvYXJkO1xyXG4iLCIvKiFcbiAqICBob3dsZXIuanMgdjEuMS4yOFxuICogIGhvd2xlcmpzLmNvbVxuICpcbiAqICAoYykgMjAxMy0yMDE1LCBKYW1lcyBTaW1wc29uIG9mIEdvbGRGaXJlIFN0dWRpb3NcbiAqICBnb2xkZmlyZXN0dWRpb3MuY29tXG4gKlxuICogIE1JVCBMaWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAvLyBzZXR1cFxuICB2YXIgY2FjaGUgPSB7fTtcblxuICAvLyBzZXR1cCB0aGUgYXVkaW8gY29udGV4dFxuICB2YXIgY3R4ID0gbnVsbCxcbiAgICB1c2luZ1dlYkF1ZGlvID0gdHJ1ZSxcbiAgICBub0F1ZGlvID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBBdWRpb0NvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdHggPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3R4ID0gbmV3IHdlYmtpdEF1ZGlvQ29udGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1c2luZ1dlYkF1ZGlvID0gZmFsc2U7XG4gICAgfVxuICB9IGNhdGNoKGUpIHtcbiAgICB1c2luZ1dlYkF1ZGlvID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIXVzaW5nV2ViQXVkaW8pIHtcbiAgICBpZiAodHlwZW9mIEF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEF1ZGlvKCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgbm9BdWRpbyA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vQXVkaW8gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG1hc3RlciBnYWluIG5vZGVcbiAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICB2YXIgbWFzdGVyR2FpbiA9ICh0eXBlb2YgY3R4LmNyZWF0ZUdhaW4gPT09ICd1bmRlZmluZWQnKSA/IGN0eC5jcmVhdGVHYWluTm9kZSgpIDogY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSAxO1xuICAgIG1hc3RlckdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICB9XG5cbiAgLy8gY3JlYXRlIGdsb2JhbCBjb250cm9sbGVyXG4gIHZhciBIb3dsZXJHbG9iYWwgPSBmdW5jdGlvbihjb2RlY3MpIHtcbiAgICB0aGlzLl92b2x1bWUgPSAxO1xuICAgIHRoaXMuX211dGVkID0gZmFsc2U7XG4gICAgdGhpcy51c2luZ1dlYkF1ZGlvID0gdXNpbmdXZWJBdWRpbztcbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLm5vQXVkaW8gPSBub0F1ZGlvO1xuICAgIHRoaXMuX2hvd2xzID0gW107XG4gICAgdGhpcy5fY29kZWNzID0gY29kZWNzO1xuICAgIHRoaXMuaU9TQXV0b0VuYWJsZSA9IHRydWU7XG4gIH07XG4gIEhvd2xlckdsb2JhbC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgZ2xvYmFsIHZvbHVtZSBmb3IgYWxsIHNvdW5kcy5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gdm9sIFZvbHVtZSBmcm9tIDAuMCB0byAxLjAuXG4gICAgICogQHJldHVybiB7SG93bGVyL0Zsb2F0fSAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgdm9sdW1lLlxuICAgICAqL1xuICAgIHZvbHVtZTogZnVuY3Rpb24odm9sKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB2b2x1bWUgaXMgYSBudW1iZXJcbiAgICAgIHZvbCA9IHBhcnNlRmxvYXQodm9sKTtcblxuICAgICAgaWYgKHZvbCA+PSAwICYmIHZvbCA8PSAxKSB7XG4gICAgICAgIHNlbGYuX3ZvbHVtZSA9IHZvbDtcblxuICAgICAgICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgICAgICAgIG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IHZvbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBjYWNoZSBhbmQgY2hhbmdlIHZvbHVtZSBvZiBhbGwgbm9kZXMgdGhhdCBhcmUgdXNpbmcgSFRNTDUgQXVkaW9cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNlbGYuX2hvd2xzKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX2hvd2xzLmhhc093blByb3BlcnR5KGtleSkgJiYgc2VsZi5faG93bHNba2V5XS5fd2ViQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGF1ZGlvIG5vZGVzXG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZVtpXS52b2x1bWUgPSBzZWxmLl9ob3dsc1trZXldLl92b2x1bWUgKiBzZWxmLl92b2x1bWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIHJldHVybiB0aGUgY3VycmVudCBnbG9iYWwgdm9sdW1lXG4gICAgICByZXR1cm4gKHVzaW5nV2ViQXVkaW8pID8gbWFzdGVyR2Fpbi5nYWluLnZhbHVlIDogc2VsZi5fdm9sdW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNdXRlIGFsbCBzb3VuZHMuXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIG11dGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fc2V0TXV0ZWQodHJ1ZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbm11dGUgYWxsIHNvdW5kcy5cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXJ9XG4gICAgICovXG4gICAgdW5tdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3NldE11dGVkKGZhbHNlKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBtdXRpbmcgYW5kIHVubXV0aW5nIGdsb2JhbGx5LlxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IG11dGVkIElzIG11dGVkIG9yIG5vdC5cbiAgICAgKi9cbiAgICBfc2V0TXV0ZWQ6IGZ1bmN0aW9uKG11dGVkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHNlbGYuX211dGVkID0gbXV0ZWQ7XG5cbiAgICAgIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgICAgIG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA9IG11dGVkID8gMCA6IHNlbGYuX3ZvbHVtZTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIga2V5IGluIHNlbGYuX2hvd2xzKSB7XG4gICAgICAgIGlmIChzZWxmLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHNlbGYuX2hvd2xzW2tleV0uX3dlYkF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYXVkaW8gbm9kZXNcbiAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGVbaV0ubXV0ZWQgPSBtdXRlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIGNvZGVjIHN1cHBvcnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBleHQgQXVkaW8gZmlsZSBleHRlbnRpb24uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBjb2RlY3M6IGZ1bmN0aW9uKGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvZGVjc1tleHRdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBpT1Mgd2lsbCBvbmx5IGFsbG93IGF1ZGlvIHRvIGJlIHBsYXllZCBhZnRlciBhIHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQXR0ZW1wdCB0byBhdXRvbWF0aWNhbGx5IHVubG9jayBhdWRpbyBvbiB0aGUgZmlyc3QgdXNlciBpbnRlcmFjdGlvbi5cbiAgICAgKiBDb25jZXB0IGZyb206IGh0dHA6Ly9wYXVsYmFrYXVzLmNvbS90dXRvcmlhbHMvaHRtbDUvd2ViLWF1ZGlvLW9uLWlvcy9cbiAgICAgKiBAcmV0dXJuIHtIb3dsZXJ9XG4gICAgICovXG4gICAgX2VuYWJsZWlPU0F1ZGlvOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gb25seSBydW4gdGhpcyBvbiBpT1MgaWYgYXVkaW8gaXNuJ3QgYWxyZWFkeSBlYW5ibGVkXG4gICAgICBpZiAoY3R4ICYmIChzZWxmLl9pT1NFbmFibGVkIHx8ICEvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2VsZi5faU9TRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAvLyBjYWxsIHRoaXMgbWV0aG9kIG9uIHRvdWNoIHN0YXJ0IHRvIGNyZWF0ZSBhbmQgcGxheSBhIGJ1ZmZlcixcbiAgICAgIC8vIHRoZW4gY2hlY2sgaWYgdGhlIGF1ZGlvIGFjdHVhbGx5IHBsYXllZCB0byBkZXRlcm1pbmUgaWZcbiAgICAgIC8vIGF1ZGlvIGhhcyBub3cgYmVlbiB1bmxvY2tlZCBvbiBpT1NcbiAgICAgIHZhciB1bmxvY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IGJ1ZmZlclxuICAgICAgICB2YXIgYnVmZmVyID0gY3R4LmNyZWF0ZUJ1ZmZlcigxLCAxLCAyMjA1MCk7XG4gICAgICAgIHZhciBzb3VyY2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIHNvdXJjZS5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgICAgLy8gcGxheSB0aGUgZW1wdHkgYnVmZmVyXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlLnN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHNvdXJjZS5ub3RlT24oMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc291cmNlLnN0YXJ0KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0dXAgYSB0aW1lb3V0IHRvIGNoZWNrIHRoYXQgd2UgYXJlIHVubG9ja2VkIG9uIHRoZSBuZXh0IGV2ZW50IGxvb3BcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoKHNvdXJjZS5wbGF5YmFja1N0YXRlID09PSBzb3VyY2UuUExBWUlOR19TVEFURSB8fCBzb3VyY2UucGxheWJhY2tTdGF0ZSA9PT0gc291cmNlLkZJTklTSEVEX1NUQVRFKSkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSB1bmxvY2tlZCBzdGF0ZSBhbmQgcHJldmVudCB0aGlzIGNoZWNrIGZyb20gaGFwcGVuaW5nIGFnYWluXG4gICAgICAgICAgICBzZWxmLl9pT1NFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuaU9TQXV0b0VuYWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIHRvdWNoIHN0YXJ0IGxpc3RlbmVyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB1bmxvY2ssIGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgfTtcblxuICAgICAgLy8gc2V0dXAgYSB0b3VjaCBzdGFydCBsaXN0ZW5lciB0byBhdHRlbXB0IGFuIHVubG9jayBpblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrLCBmYWxzZSk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICAvLyBjaGVjayBmb3IgYnJvd3NlciBjb2RlYyBzdXBwb3J0XG4gIHZhciBhdWRpb1Rlc3QgPSBudWxsO1xuICB2YXIgY29kZWNzID0ge307XG4gIGlmICghbm9BdWRpbykge1xuICAgIGF1ZGlvVGVzdCA9IG5ldyBBdWRpbygpO1xuICAgIGNvZGVjcyA9IHtcbiAgICAgIG1wMzogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL21wZWc7JykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG9wdXM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cIm9wdXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBvZ2c6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIHdhdjogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIGFhYzogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgbTRhOiAhIShhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3gtbTRhOycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vbTRhOycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgbXA0OiAhIShhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3gtbXA0OycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vbXA0OycpIHx8IGF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vYWFjOycpKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgd2ViYTogISFhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL3dlYm07IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sICcnKVxuICAgIH07XG4gIH1cblxuICAvLyBhbGxvdyBhY2Nlc3MgdG8gdGhlIGdsb2JhbCBhdWRpbyBjb250cm9sc1xuICB2YXIgSG93bGVyID0gbmV3IEhvd2xlckdsb2JhbChjb2RlY3MpO1xuXG4gIC8vIHNldHVwIHRoZSBhdWRpbyBvYmplY3RcbiAgdmFyIEhvd2wgPSBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gc2V0dXAgdGhlIGRlZmF1bHRzXG4gICAgc2VsZi5fYXV0b3BsYXkgPSBvLmF1dG9wbGF5IHx8IGZhbHNlO1xuICAgIHNlbGYuX2J1ZmZlciA9IG8uYnVmZmVyIHx8IGZhbHNlO1xuICAgIHNlbGYuX2R1cmF0aW9uID0gby5kdXJhdGlvbiB8fCAwO1xuICAgIHNlbGYuX2Zvcm1hdCA9IG8uZm9ybWF0IHx8IG51bGw7XG4gICAgc2VsZi5fbG9vcCA9IG8ubG9vcCB8fCBmYWxzZTtcbiAgICBzZWxmLl9sb2FkZWQgPSBmYWxzZTtcbiAgICBzZWxmLl9zcHJpdGUgPSBvLnNwcml0ZSB8fCB7fTtcbiAgICBzZWxmLl9zcmMgPSBvLnNyYyB8fCAnJztcbiAgICBzZWxmLl9wb3MzZCA9IG8ucG9zM2QgfHwgWzAsIDAsIC0wLjVdO1xuICAgIHNlbGYuX3ZvbHVtZSA9IG8udm9sdW1lICE9PSB1bmRlZmluZWQgPyBvLnZvbHVtZSA6IDE7XG4gICAgc2VsZi5fdXJscyA9IG8udXJscyB8fCBbXTtcbiAgICBzZWxmLl9yYXRlID0gby5yYXRlIHx8IDE7XG5cbiAgICAvLyBhbGxvdyBmb3JjaW5nIG9mIGEgc3BlY2lmaWMgcGFubmluZ01vZGVsICgnZXF1YWxwb3dlcicgb3IgJ0hSVEYnKSxcbiAgICAvLyBpZiBub25lIGlzIHNwZWNpZmllZCwgZGVmYXVsdHMgdG8gJ2VxdWFscG93ZXInIGFuZCBzd2l0Y2hlcyB0byAnSFJURidcbiAgICAvLyBpZiAzZCBzb3VuZCBpcyB1c2VkXG4gICAgc2VsZi5fbW9kZWwgPSBvLm1vZGVsIHx8IG51bGw7XG5cbiAgICAvLyBzZXR1cCBldmVudCBmdW5jdGlvbnNcbiAgICBzZWxmLl9vbmxvYWQgPSBbby5vbmxvYWQgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25sb2FkZXJyb3IgPSBbby5vbmxvYWRlcnJvciB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbmVuZCA9IFtvLm9uZW5kIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ucGF1c2UgPSBbby5vbnBhdXNlIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ucGxheSA9IFtvLm9ucGxheSB8fCBmdW5jdGlvbigpIHt9XTtcblxuICAgIHNlbGYuX29uZW5kVGltZXIgPSBbXTtcblxuICAgIC8vIFdlYiBBdWRpbyBvciBIVE1MNSBBdWRpbz9cbiAgICBzZWxmLl93ZWJBdWRpbyA9IHVzaW5nV2ViQXVkaW8gJiYgIXNlbGYuX2J1ZmZlcjtcblxuICAgIC8vIGNoZWNrIGlmIHdlIG5lZWQgdG8gZmFsbCBiYWNrIHRvIEhUTUw1IEF1ZGlvXG4gICAgc2VsZi5fYXVkaW9Ob2RlID0gW107XG4gICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICBzZWxmLl9zZXR1cEF1ZGlvTm9kZSgpO1xuICAgIH1cblxuICAgIC8vIGF1dG9tYXRpY2FsbHkgdHJ5IHRvIGVuYWJsZSBhdWRpbyBvbiBpT1NcbiAgICBpZiAodHlwZW9mIGN0eCAhPT0gJ3VuZGVmaW5lZCcgJiYgY3R4ICYmIEhvd2xlci5pT1NBdXRvRW5hYmxlKSB7XG4gICAgICBIb3dsZXIuX2VuYWJsZWlPU0F1ZGlvKCk7XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoaXMgdG8gYW4gYXJyYXkgb2YgSG93bCdzIHRvIGFsbG93IGdsb2JhbCBjb250cm9sXG4gICAgSG93bGVyLl9ob3dscy5wdXNoKHNlbGYpO1xuXG4gICAgLy8gbG9hZCB0aGUgdHJhY2tcbiAgICBzZWxmLmxvYWQoKTtcbiAgfTtcblxuICAvLyBzZXR1cCBhbGwgb2YgdGhlIG1ldGhvZHNcbiAgSG93bC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICogTG9hZCBhbiBhdWRpbyBmaWxlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgbG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIHVybCA9IG51bGw7XG5cbiAgICAgIC8vIGlmIG5vIGF1ZGlvIGlzIGF2YWlsYWJsZSwgcXVpdCBpbW1lZGlhdGVseVxuICAgICAgaWYgKG5vQXVkaW8pIHtcbiAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gbG9vcCB0aHJvdWdoIHNvdXJjZSBVUkxzIGFuZCBwaWNrIHRoZSBmaXJzdCBvbmUgdGhhdCBpcyBjb21wYXRpYmxlXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXh0LCB1cmxJdGVtO1xuXG4gICAgICAgIGlmIChzZWxmLl9mb3JtYXQpIHtcbiAgICAgICAgICAvLyB1c2Ugc3BlY2lmaWVkIGF1ZGlvIGZvcm1hdCBpZiBhdmFpbGFibGVcbiAgICAgICAgICBleHQgPSBzZWxmLl9mb3JtYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZmlndXJlIG91dCB0aGUgZmlsZXR5cGUgKHdoZXRoZXIgYW4gZXh0ZW5zaW9uIG9yIGJhc2U2NCBkYXRhKVxuICAgICAgICAgIHVybEl0ZW0gPSBzZWxmLl91cmxzW2ldO1xuICAgICAgICAgIGV4dCA9IC9eZGF0YTphdWRpb1xcLyhbXjssXSspOy9pLmV4ZWModXJsSXRlbSk7XG4gICAgICAgICAgaWYgKCFleHQpIHtcbiAgICAgICAgICAgIGV4dCA9IC9cXC4oW14uXSspJC8uZXhlYyh1cmxJdGVtLnNwbGl0KCc/JywgMSlbMF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChleHQpIHtcbiAgICAgICAgICAgIGV4dCA9IGV4dFsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZWNzW2V4dF0pIHtcbiAgICAgICAgICB1cmwgPSBzZWxmLl91cmxzW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdXJsKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX3NyYyA9IHVybDtcblxuICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgIGxvYWRCdWZmZXIoc2VsZiwgdXJsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdOb2RlID0gbmV3IEF1ZGlvKCk7XG5cbiAgICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgd2l0aCBIVE1MNSBhdWRpbyAoaHR0cDovL2Rldi53My5vcmcvaHRtbDUvc3BlYy1hdXRob3Itdmlldy9zcGVjLmh0bWwjbWVkaWFlcnJvcilcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobmV3Tm9kZS5lcnJvciAmJiBuZXdOb2RlLmVycm9yLmNvZGUgPT09IDQpIHtcbiAgICAgICAgICAgIEhvd2xlckdsb2JhbC5ub0F1ZGlvID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InLCB7dHlwZTogbmV3Tm9kZS5lcnJvciA/IG5ld05vZGUuZXJyb3IuY29kZSA6IDB9KTtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIHNlbGYuX2F1ZGlvTm9kZS5wdXNoKG5ld05vZGUpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBuZXcgYXVkaW8gbm9kZVxuICAgICAgICBuZXdOb2RlLnNyYyA9IHVybDtcbiAgICAgICAgbmV3Tm9kZS5fcG9zID0gMDtcbiAgICAgICAgbmV3Tm9kZS5wcmVsb2FkID0gJ2F1dG8nO1xuICAgICAgICBuZXdOb2RlLnZvbHVtZSA9IChIb3dsZXIuX211dGVkKSA/IDAgOiBzZWxmLl92b2x1bWUgKiBIb3dsZXIudm9sdW1lKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIHN0YXJ0IHBsYXlpbmcgdGhlIHNvdW5kXG4gICAgICAgIC8vIGFzIHNvb24gYXMgaXQgaGFzIGJ1ZmZlcmVkIGVub3VnaFxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyByb3VuZCB1cCB0aGUgZHVyYXRpb24gd2hlbiB1c2luZyBIVE1MNSBBdWRpbyB0byBhY2NvdW50IGZvciB0aGUgbG93ZXIgcHJlY2lzaW9uXG4gICAgICAgICAgc2VsZi5fZHVyYXRpb24gPSBNYXRoLmNlaWwobmV3Tm9kZS5kdXJhdGlvbiAqIDEwKSAvIDEwO1xuXG4gICAgICAgICAgLy8gc2V0dXAgYSBzcHJpdGUgaWYgbm9uZSBpcyBkZWZpbmVkXG4gICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNlbGYuX3Nwcml0ZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzZWxmLl9zcHJpdGUgPSB7X2RlZmF1bHQ6IFswLCBzZWxmLl9kdXJhdGlvbiAqIDEwMDBdfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICAgICAgc2VsZi5fbG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYub24oJ2xvYWQnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5fYXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHNlbGYucGxheSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNsZWFyIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgbmV3Tm9kZS5sb2FkKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHRoZSBVUkxzIHRvIGJlIHB1bGxlZCBmcm9tIHRvIHBsYXkgaW4gdGhpcyBzb3VyY2UuXG4gICAgICogQHBhcmFtICB7QXJyYXl9IHVybHMgIEFycnkgb2YgVVJMcyB0byBsb2FkIGZyb21cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSAgICAgICAgUmV0dXJucyBzZWxmIG9yIHRoZSBjdXJyZW50IFVSTHNcbiAgICAgKi9cbiAgICB1cmxzOiBmdW5jdGlvbih1cmxzKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh1cmxzKSB7XG4gICAgICAgIHNlbGYuc3RvcCgpO1xuICAgICAgICBzZWxmLl91cmxzID0gKHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJykgPyBbdXJsc10gOiB1cmxzO1xuICAgICAgICBzZWxmLl9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5sb2FkKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fdXJscztcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGxheSBhIHNvdW5kIGZyb20gdGhlIGN1cnJlbnQgdGltZSAoMCBieSBkZWZhdWx0KS5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgc3ByaXRlICAgKG9wdGlvbmFsKSBQbGF5cyBmcm9tIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIHNvdW5kIHNwcml0ZSBkZWZpbml0aW9uLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIFJldHVybnMgdGhlIHVuaXF1ZSBwbGF5YmFjayBpZCBmb3IgdGhpcyBzb3VuZCBpbnN0YW5jZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHBsYXk6IGZ1bmN0aW9uKHNwcml0ZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgbm8gc3ByaXRlIHdhcyBwYXNzZWQgYnV0IGEgY2FsbGJhY2sgd2FzLCB1cGRhdGUgdGhlIHZhcmlhYmxlc1xuICAgICAgaWYgKHR5cGVvZiBzcHJpdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBzcHJpdGU7XG4gICAgICB9XG5cbiAgICAgIC8vIHVzZSB0aGUgZGVmYXVsdCBzcHJpdGUgaWYgbm9uZSBpcyBwYXNzZWRcbiAgICAgIGlmICghc3ByaXRlIHx8IHR5cGVvZiBzcHJpdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc3ByaXRlID0gJ19kZWZhdWx0JztcbiAgICAgIH1cblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucGxheShzcHJpdGUsIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzcHJpdGUgZG9lc24ndCBleGlzdCwgcGxheSBub3RoaW5nXG4gICAgICBpZiAoIXNlbGYuX3Nwcml0ZVtzcHJpdGVdKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgdGhlIG5vZGUgdG8gcGxheWJhY2tcbiAgICAgIHNlbGYuX2luYWN0aXZlTm9kZShmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIC8vIHBlcnNpc3QgdGhlIHNwcml0ZSBiZWluZyBwbGF5ZWRcbiAgICAgICAgbm9kZS5fc3ByaXRlID0gc3ByaXRlO1xuXG4gICAgICAgIC8vIGRldGVybWluZSB3aGVyZSB0byBzdGFydCBwbGF5aW5nIGZyb21cbiAgICAgICAgdmFyIHBvcyA9IChub2RlLl9wb3MgPiAwKSA/IG5vZGUuX3BvcyA6IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMDtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgaG93IGxvbmcgdG8gcGxheSBmb3JcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gMDtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgZHVyYXRpb24gPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDAgLSBub2RlLl9wb3M7XG4gICAgICAgICAgaWYgKG5vZGUuX3BvcyA+IDApIHtcbiAgICAgICAgICAgIHBvcyA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCArIHBvcztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHVyYXRpb24gPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDAgLSAocG9zIC0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRldGVybWluZSBpZiB0aGlzIHNvdW5kIHNob3VsZCBiZSBsb29wZWRcbiAgICAgICAgdmFyIGxvb3AgPSAhIShzZWxmLl9sb29wIHx8IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzJdKTtcblxuICAgICAgICAvLyBzZXQgdGltZXIgdG8gZmlyZSB0aGUgJ29uZW5kJyBldmVudFxuICAgICAgICB2YXIgc291bmRJZCA9ICh0eXBlb2YgY2FsbGJhY2sgPT09ICdzdHJpbmcnKSA/IGNhbGxiYWNrIDogTWF0aC5yb3VuZChEYXRlLm5vdygpICogTWF0aC5yYW5kb20oKSkgKyAnJyxcbiAgICAgICAgICB0aW1lcklkO1xuICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBpZDogc291bmRJZCxcbiAgICAgICAgICAgIHNwcml0ZTogc3ByaXRlLFxuICAgICAgICAgICAgbG9vcDogbG9vcFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBpZiBsb29waW5nLCByZXN0YXJ0IHRoZSB0cmFja1xuICAgICAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbyAmJiBsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuc3RvcChkYXRhLmlkKS5wbGF5KHNwcml0ZSwgZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB3ZWIgYXVkaW8gbm9kZSB0byBwYXVzZWQgYXQgZW5kXG4gICAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8gJiYgIWxvb3ApIHtcbiAgICAgICAgICAgICAgc2VsZi5fbm9kZUJ5SWQoZGF0YS5pZCkucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5fbm9kZUJ5SWQoZGF0YS5pZCkuX3BvcyA9IDA7XG5cbiAgICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGVuZCB0aW1lclxuICAgICAgICAgICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBlbmQgdGhlIHRyYWNrIGlmIGl0IGlzIEhUTUwgYXVkaW8gYW5kIGEgc3ByaXRlXG4gICAgICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvICYmICFsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuc3RvcChkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZmlyZSBlbmRlZCBldmVudFxuICAgICAgICAgICAgc2VsZi5vbignZW5kJywgc291bmRJZCk7XG4gICAgICAgICAgfSwgZHVyYXRpb24gKiAxMDAwKTtcblxuICAgICAgICAgIC8vIHN0b3JlIHRoZSByZWZlcmVuY2UgdG8gdGhlIHRpbWVyXG4gICAgICAgICAgc2VsZi5fb25lbmRUaW1lci5wdXNoKHt0aW1lcjogdGltZXJJZCwgaWQ6IGRhdGEuaWR9KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICB2YXIgbG9vcFN0YXJ0ID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMF0gLyAxMDAwLFxuICAgICAgICAgICAgbG9vcEVuZCA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzFdIC8gMTAwMDtcblxuICAgICAgICAgIC8vIHNldCB0aGUgcGxheSBpZCB0byB0aGlzIG5vZGUgYW5kIGxvYWQgaW50byBjb250ZXh0XG4gICAgICAgICAgbm9kZS5pZCA9IHNvdW5kSWQ7XG4gICAgICAgICAgbm9kZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICByZWZyZXNoQnVmZmVyKHNlbGYsIFtsb29wLCBsb29wU3RhcnQsIGxvb3BFbmRdLCBzb3VuZElkKTtcbiAgICAgICAgICBzZWxmLl9wbGF5U3RhcnQgPSBjdHguY3VycmVudFRpbWU7XG4gICAgICAgICAgbm9kZS5nYWluLnZhbHVlID0gc2VsZi5fdm9sdW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmJ1ZmZlclNvdXJjZS5zdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGxvb3AgPyBub2RlLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLCBwb3MsIDg2NDAwKSA6IG5vZGUuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsIHBvcywgZHVyYXRpb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb29wID8gbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQoMCwgcG9zLCA4NjQwMCkgOiBub2RlLmJ1ZmZlclNvdXJjZS5zdGFydCgwLCBwb3MsIGR1cmF0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG5vZGUucmVhZHlTdGF0ZSA9PT0gNCB8fCAhbm9kZS5yZWFkeVN0YXRlICYmIG5hdmlnYXRvci5pc0NvY29vbkpTKSB7XG4gICAgICAgICAgICBub2RlLnJlYWR5U3RhdGUgPSA0O1xuICAgICAgICAgICAgbm9kZS5pZCA9IHNvdW5kSWQ7XG4gICAgICAgICAgICBub2RlLmN1cnJlbnRUaW1lID0gcG9zO1xuICAgICAgICAgICAgbm9kZS5tdXRlZCA9IEhvd2xlci5fbXV0ZWQgfHwgbm9kZS5tdXRlZDtcbiAgICAgICAgICAgIG5vZGUudm9sdW1lID0gc2VsZi5fdm9sdW1lICogSG93bGVyLnZvbHVtZSgpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgbm9kZS5wbGF5KCk7IH0sIDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKHNvdW5kSWQpO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdmFyIHNvdW5kID0gc2VsZixcbiAgICAgICAgICAgICAgICBwbGF5U3ByaXRlID0gc3ByaXRlLFxuICAgICAgICAgICAgICAgIGZuID0gY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbmV3Tm9kZSA9IG5vZGU7XG4gICAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNvdW5kLnBsYXkocGxheVNwcml0ZSwgZm4pO1xuXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmlyZSB0aGUgcGxheSBldmVudCBhbmQgc2VuZCB0aGUgc291bmRJZCBiYWNrIGluIHRoZSBjYWxsYmFja1xuICAgICAgICBzZWxmLm9uKCdwbGF5Jyk7XG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKHNvdW5kSWQpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSBwbGF5YmFjayBhbmQgc2F2ZSB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHBhdXNlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wYXVzZShpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciAnb25lbmQnIHRpbWVyXG4gICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGlkKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gc2VsZi5wb3MobnVsbCwgaWQpO1xuXG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgc291bmQgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAgICAgIGlmICghYWN0aXZlTm9kZS5idWZmZXJTb3VyY2UgfHwgYWN0aXZlTm9kZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2VsZi5vbigncGF1c2UnKTtcblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3AgcGxheWJhY2sgYW5kIHJlc2V0IHRvIHN0YXJ0LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5zdG9wKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIGNsZWFyICdvbmVuZCcgdGltZXJcbiAgICAgIHNlbGYuX2NsZWFyRW5kVGltZXIoaWQpO1xuXG4gICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICBhY3RpdmVOb2RlLl9wb3MgPSAwO1xuXG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgc291bmQgaGFzIGJlZW4gY3JlYXRlZFxuICAgICAgICAgIGlmICghYWN0aXZlTm9kZS5idWZmZXJTb3VyY2UgfHwgYWN0aXZlTm9kZS5wYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2VkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLm5vdGVPZmYoMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AoMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihhY3RpdmVOb2RlLmR1cmF0aW9uKSkge1xuICAgICAgICAgIGFjdGl2ZU5vZGUucGF1c2UoKTtcbiAgICAgICAgICBhY3RpdmVOb2RlLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXV0ZSB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG11dGU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLm11dGUoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5nYWluLnZhbHVlID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tdXRlIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgdW5tdXRlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi51bm11dGUoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5nYWluLnZhbHVlID0gc2VsZi5fdm9sdW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU5vZGUubXV0ZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB2b2x1bWUgb2YgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHZvbCBWb2x1bWUgZnJvbSAwLjAgdG8gMS4wLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bC9GbG9hdH0gICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHZvbHVtZS5cbiAgICAgKi9cbiAgICB2b2x1bWU6IGZ1bmN0aW9uKHZvbCwgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gbWFrZSBzdXJlIHZvbHVtZSBpcyBhIG51bWJlclxuICAgICAgdm9sID0gcGFyc2VGbG9hdCh2b2wpO1xuXG4gICAgICBpZiAodm9sID49IDAgJiYgdm9sIDw9IDEpIHtcbiAgICAgICAgc2VsZi5fdm9sdW1lID0gdm9sO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZWxmLnZvbHVtZSh2b2wsIGlkKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgICBpZiAoYWN0aXZlTm9kZSkge1xuICAgICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5nYWluLnZhbHVlID0gdm9sO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLnZvbHVtZSA9IHZvbCAqIEhvd2xlci52b2x1bWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl92b2x1bWU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgd2hldGhlciB0byBsb29wIHRoZSBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBsb29wIFRvIGxvb3Agb3Igbm90IHRvIGxvb3AsIHRoYXQgaXMgdGhlIHF1ZXN0aW9uLlxuICAgICAqIEByZXR1cm4ge0hvd2wvQm9vbGVhbn0gICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCBsb29waW5nIHZhbHVlLlxuICAgICAqL1xuICAgIGxvb3A6IGZ1bmN0aW9uKGxvb3ApIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBsb29wID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgc2VsZi5fbG9vcCA9IGxvb3A7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fbG9vcDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCBzb3VuZCBzcHJpdGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IHNwcml0ZSBFeGFtcGxlOiB7c3ByaXRlTmFtZTogW29mZnNldCwgZHVyYXRpb24sIGxvb3BdfVxuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7SW50ZWdlcn0gb2Zmc2V0ICAgV2hlcmUgdG8gYmVnaW4gcGxheWJhY2sgaW4gbWlsbGlzZWNvbmRzXG4gICAgICogICAgICAgICAgICAgICAgQHBhcmFtIHtJbnRlZ2VyfSBkdXJhdGlvbiBIb3cgbG9uZyB0byBwbGF5IGluIG1pbGxpc2Vjb25kc1xuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7Qm9vbGVhbn0gbG9vcCAgICAgKG9wdGlvbmFsKSBTZXQgdHJ1ZSB0byBsb29wIHRoaXMgc3ByaXRlXG4gICAgICogQHJldHVybiB7SG93bH0gICAgICAgIFJldHVybnMgY3VycmVudCBzcHJpdGUgc2hlZXQgb3Igc2VsZi5cbiAgICAgKi9cbiAgICBzcHJpdGU6IGZ1bmN0aW9uKHNwcml0ZSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIHNwcml0ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc2VsZi5fc3ByaXRlID0gc3ByaXRlO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3Nwcml0ZTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgcG9zaXRpb24gb2YgcGxheWJhY2suXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICBwb3MgVGhlIHBvc2l0aW9uIHRvIG1vdmUgY3VycmVudCBwbGF5YmFjayB0by5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvRmxvYXR9ICAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24uXG4gICAgICovXG4gICAgcG9zOiBmdW5jdGlvbihwb3MsIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBvcyhwb3MpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHlwZW9mIHBvcyA9PT0gJ251bWJlcicgPyBzZWxmIDogc2VsZi5fcG9zIHx8IDA7XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBhcmUgZGVhbGluZyB3aXRoIGEgbnVtYmVyIGZvciBwb3NcbiAgICAgIHBvcyA9IHBhcnNlRmxvYXQocG9zKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgaWYgKHBvcyA+PSAwKSB7XG4gICAgICAgICAgc2VsZi5wYXVzZShpZCk7XG4gICAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gcG9zO1xuICAgICAgICAgIHNlbGYucGxheShhY3RpdmVOb2RlLl9zcHJpdGUsIGlkKTtcblxuICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBzZWxmLl93ZWJBdWRpbyA/IGFjdGl2ZU5vZGUuX3BvcyArIChjdHguY3VycmVudFRpbWUgLSBzZWxmLl9wbGF5U3RhcnQpIDogYWN0aXZlTm9kZS5jdXJyZW50VGltZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwb3MgPj0gMCkge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IGluYWN0aXZlIG5vZGUgdG8gcmV0dXJuIHRoZSBwb3MgZm9yXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCAmJiBzZWxmLl9hdWRpb05vZGVbaV0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIChzZWxmLl93ZWJBdWRpbykgPyBzZWxmLl9hdWRpb05vZGVbaV0uX3BvcyA6IHNlbGYuX2F1ZGlvTm9kZVtpXS5jdXJyZW50VGltZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgM0QgcG9zaXRpb24gb2YgdGhlIGF1ZGlvIHNvdXJjZS5cbiAgICAgKiBUaGUgbW9zdCBjb21tb24gdXNhZ2UgaXMgdG8gc2V0IHRoZSAneCcgcG9zaXRpb25cbiAgICAgKiB0byBhZmZlY3QgdGhlIGxlZnQvcmlnaHQgZWFyIHBhbm5pbmcuIFNldHRpbmcgYW55IHZhbHVlIGhpZ2hlciB0aGFuXG4gICAgICogMS4wIHdpbGwgYmVnaW4gdG8gZGVjcmVhc2UgdGhlIHZvbHVtZSBvZiB0aGUgc291bmQgYXMgaXQgbW92ZXMgZnVydGhlciBhd2F5LlxuICAgICAqIE5PVEU6IFRoaXMgb25seSB3b3JrcyB3aXRoIFdlYiBBdWRpbyBBUEksIEhUTUw1IEF1ZGlvIHBsYXliYWNrXG4gICAgICogd2lsbCBub3QgYmUgYWZmZWN0ZWQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB4ICBUaGUgeC1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeSAgVGhlIHktcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHogIFRoZSB6LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvQXJyYXl9ICAgUmV0dXJucyBzZWxmIG9yIHRoZSBjdXJyZW50IDNEIHBvc2l0aW9uOiBbeCwgeSwgel1cbiAgICAgKi9cbiAgICBwb3MzZDogZnVuY3Rpb24oeCwgeSwgeiwgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gc2V0IGEgZGVmYXVsdCBmb3IgdGhlIG9wdGlvbmFsICd5JyAmICd6J1xuICAgICAgeSA9ICh0eXBlb2YgeSA9PT0gJ3VuZGVmaW5lZCcgfHwgIXkpID8gMCA6IHk7XG4gICAgICB6ID0gKHR5cGVvZiB6ID09PSAndW5kZWZpbmVkJyB8fCAheikgPyAtMC41IDogejtcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucG9zM2QoeCwgeSwgeiwgaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgaWYgKHggPj0gMCB8fCB4IDwgMCkge1xuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICB2YXIgYWN0aXZlTm9kZSA9IChpZCkgPyBzZWxmLl9ub2RlQnlJZChpZCkgOiBzZWxmLl9hY3RpdmVOb2RlKCk7XG4gICAgICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgICAgIHNlbGYuX3BvczNkID0gW3gsIHksIHpdO1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5wYW5uZXIuc2V0UG9zaXRpb24oeCwgeSwgeik7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLnBhbm5lci5wYW5uaW5nTW9kZWwgPSBzZWxmLl9tb2RlbCB8fCAnSFJURic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fcG9zM2Q7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBGYWRlIGEgY3VycmVudGx5IHBsYXlpbmcgc291bmQgYmV0d2VlbiB0d28gdm9sdW1lcy5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgZnJvbSAgICAgVGhlIHZvbHVtZSB0byBmYWRlIGZyb20gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICB0byAgICAgICBUaGUgdm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgICBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBmYWRlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIEZpcmVkIHdoZW4gdGhlIGZhZGUgaXMgY29tcGxldGUuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGlkICAgICAgIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlOiBmdW5jdGlvbihmcm9tLCB0bywgbGVuLCBjYWxsYmFjaywgaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZGlmZiA9IE1hdGguYWJzKGZyb20gLSB0byksXG4gICAgICAgIGRpciA9IGZyb20gPiB0byA/ICdkb3duJyA6ICd1cCcsXG4gICAgICAgIHN0ZXBzID0gZGlmZiAvIDAuMDEsXG4gICAgICAgIHN0ZXBUaW1lID0gbGVuIC8gc3RlcHM7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLmZhZGUoZnJvbSwgdG8sIGxlbiwgY2FsbGJhY2ssIGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCB0aGUgdm9sdW1lIHRvIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgc2VsZi52b2x1bWUoZnJvbSwgaWQpO1xuXG4gICAgICBmb3IgKHZhciBpPTE7IGk8PXN0ZXBzOyBpKyspIHtcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjaGFuZ2UgPSBzZWxmLl92b2x1bWUgKyAoZGlyID09PSAndXAnID8gMC4wMSA6IC0wLjAxKSAqIGksXG4gICAgICAgICAgICB2b2wgPSBNYXRoLnJvdW5kKDEwMDAgKiBjaGFuZ2UpIC8gMTAwMCxcbiAgICAgICAgICAgIHRvVm9sID0gdG87XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi52b2x1bWUodm9sLCBpZCk7XG5cbiAgICAgICAgICAgIGlmICh2b2wgPT09IHRvVm9sKSB7XG4gICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBzdGVwVGltZSAqIGkpO1xuICAgICAgICB9KSgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBbREVQUkVDQVRFRF0gRmFkZSBpbiB0aGUgY3VycmVudCBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gICAgdG8gICAgICBWb2x1bWUgdG8gZmFkZSB0byAoMC4wIHRvIDEuMCkuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGxlbiAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGVJbjogZnVuY3Rpb24odG8sIGxlbiwgY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLnZvbHVtZSgwKS5wbGF5KCkuZmFkZSgwLCB0bywgbGVuLCBjYWxsYmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFtERVBSRUNBVEVEXSBGYWRlIG91dCB0aGUgY3VycmVudCBzb3VuZCBhbmQgcGF1c2Ugd2hlbiBmaW5pc2hlZC5cbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gICAgdG8gICAgICAgVm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgICBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBmYWRlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZU91dDogZnVuY3Rpb24odG8sIGxlbiwgY2FsbGJhY2ssIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHJldHVybiBzZWxmLmZhZGUoc2VsZi5fdm9sdW1lLCB0bywgbGVuLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICBzZWxmLnBhdXNlKGlkKTtcblxuICAgICAgICAvLyBmaXJlIGVuZGVkIGV2ZW50XG4gICAgICAgIHNlbGYub24oJ2VuZCcpO1xuICAgICAgfSwgaWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXVkaW8gbm9kZSBieSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSBBdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9ub2RlQnlJZDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVswXTtcblxuICAgICAgLy8gZmluZCB0aGUgbm9kZSB3aXRoIHRoaXMgSURcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpcnN0IGFjdGl2ZSBhdWRpbyBub2RlLlxuICAgICAqIEByZXR1cm4ge0hvd2x9IEF1ZGlvIG5vZGUuXG4gICAgICovXG4gICAgX2FjdGl2ZU5vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gbnVsbDtcblxuICAgICAgLy8gZmluZCB0aGUgZmlyc3QgcGxheWluZyBub2RlXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCkge1xuICAgICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbaV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgc2VsZi5fZHJhaW5Qb29sKCk7XG5cbiAgICAgIHJldHVybiBub2RlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpcnN0IGluYWN0aXZlIGF1ZGlvIG5vZGUuXG4gICAgICogSWYgdGhlcmUgaXMgbm9uZSwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwb29sLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGF1ZGlvIG5vZGUgaXMgcmVhZHkuXG4gICAgICovXG4gICAgX2luYWN0aXZlTm9kZTogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpbmQgZmlyc3QgaW5hY3RpdmUgbm9kZSB0byByZWN5Y2xlXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0ucGF1c2VkICYmIHNlbGYuX2F1ZGlvTm9kZVtpXS5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgLy8gc2VuZCB0aGUgbm9kZSBiYWNrIGZvciB1c2UgYnkgdGhlIG5ldyBwbGF5IGluc3RhbmNlXG4gICAgICAgICAgY2FsbGJhY2soc2VsZi5fYXVkaW9Ob2RlW2ldKTtcbiAgICAgICAgICBub2RlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgZXhjZXNzIGluYWN0aXZlIG5vZGVzXG4gICAgICBzZWxmLl9kcmFpblBvb2woKTtcblxuICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgbmV3IG5vZGUgaWYgdGhlcmUgYXJlIG5vIGluYWN0aXZlc1xuICAgICAgdmFyIG5ld05vZGU7XG4gICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgbmV3Tm9kZSA9IHNlbGYuX3NldHVwQXVkaW9Ob2RlKCk7XG4gICAgICAgIGNhbGxiYWNrKG5ld05vZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5sb2FkKCk7XG4gICAgICAgIG5ld05vZGUgPSBzZWxmLl9hdWRpb05vZGVbc2VsZi5fYXVkaW9Ob2RlLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgdGhlIGNvcnJlY3QgbG9hZCBldmVudCBhbmQgZmlyZSB0aGUgY2FsbGJhY2tcbiAgICAgICAgdmFyIGxpc3RlbmVyRXZlbnQgPSBuYXZpZ2F0b3IuaXNDb2Nvb25KUyA/ICdjYW5wbGF5dGhyb3VnaCcgOiAnbG9hZGVkbWV0YWRhdGEnO1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJFdmVudCwgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICBjYWxsYmFjayhuZXdOb2RlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyRXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIElmIHRoZXJlIGFyZSBtb3JlIHRoYW4gNSBpbmFjdGl2ZSBhdWRpbyBub2RlcyBpbiB0aGUgcG9vbCwgY2xlYXIgb3V0IHRoZSByZXN0LlxuICAgICAqL1xuICAgIF9kcmFpblBvb2w6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBpbmFjdGl2ZSA9IDAsXG4gICAgICAgIGk7XG5cbiAgICAgIC8vIGNvdW50IHRoZSBudW1iZXIgb2YgaW5hY3RpdmUgbm9kZXNcbiAgICAgIGZvciAoaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCkge1xuICAgICAgICAgIGluYWN0aXZlKys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgZm9yIChpPXNlbGYuX2F1ZGlvTm9kZS5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgIGlmIChpbmFjdGl2ZSA8PSA1KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCkge1xuICAgICAgICAgIC8vIGRpc2Nvbm5lY3QgdGhlIGF1ZGlvIHNvdXJjZSBpZiB1c2luZyBXZWIgQXVkaW9cbiAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIHNlbGYuX2F1ZGlvTm9kZVtpXS5kaXNjb25uZWN0KDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGluYWN0aXZlLS07XG4gICAgICAgICAgc2VsZi5fYXVkaW9Ob2RlLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDbGVhciAnb25lbmQnIHRpbWVvdXQgYmVmb3JlIGl0IGVuZHMuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBzb3VuZElkICBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKi9cbiAgICBfY2xlYXJFbmRUaW1lcjogZnVuY3Rpb24oc291bmRJZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgdGltZXJzIHRvIGZpbmQgdGhlIG9uZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBzb3VuZFxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX29uZW5kVGltZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX29uZW5kVGltZXJbaV0uaWQgPT09IHNvdW5kSWQpIHtcbiAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHRpbWVyID0gc2VsZi5fb25lbmRUaW1lcltpbmRleF07XG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyLnRpbWVyKTtcbiAgICAgICAgc2VsZi5fb25lbmRUaW1lci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgZ2FpbiBub2RlIGFuZCBwYW5uZXIgZm9yIGEgV2ViIEF1ZGlvIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBhdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9zZXR1cEF1ZGlvTm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGUsXG4gICAgICAgIGluZGV4ID0gc2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDtcblxuICAgICAgLy8gY3JlYXRlIGdhaW4gbm9kZVxuICAgICAgbm9kZVtpbmRleF0gPSAodHlwZW9mIGN0eC5jcmVhdGVHYWluID09PSAndW5kZWZpbmVkJykgPyBjdHguY3JlYXRlR2Fpbk5vZGUoKSA6IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICBub2RlW2luZGV4XS5nYWluLnZhbHVlID0gc2VsZi5fdm9sdW1lO1xuICAgICAgbm9kZVtpbmRleF0ucGF1c2VkID0gdHJ1ZTtcbiAgICAgIG5vZGVbaW5kZXhdLl9wb3MgPSAwO1xuICAgICAgbm9kZVtpbmRleF0ucmVhZHlTdGF0ZSA9IDQ7XG4gICAgICBub2RlW2luZGV4XS5jb25uZWN0KG1hc3RlckdhaW4pO1xuXG4gICAgICAvLyBjcmVhdGUgdGhlIHBhbm5lclxuICAgICAgbm9kZVtpbmRleF0ucGFubmVyID0gY3R4LmNyZWF0ZVBhbm5lcigpO1xuICAgICAgbm9kZVtpbmRleF0ucGFubmVyLnBhbm5pbmdNb2RlbCA9IHNlbGYuX21vZGVsIHx8ICdlcXVhbHBvd2VyJztcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5zZXRQb3NpdGlvbihzZWxmLl9wb3MzZFswXSwgc2VsZi5fcG9zM2RbMV0sIHNlbGYuX3BvczNkWzJdKTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5jb25uZWN0KG5vZGVbaW5kZXhdKTtcblxuICAgICAgcmV0dXJuIG5vZGVbaW5kZXhdO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxsL3NldCBjdXN0b20gZXZlbnRzLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBldmVudCBFdmVudCB0eXBlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBGdW5jdGlvbiB0byBjYWxsLlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgb246IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBldmVudHMgPSBzZWxmWydfb24nICsgZXZlbnRdO1xuXG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGZuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIGV2ZW50c1tpXS5jYWxsKHNlbGYsIGZuKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnRzW2ldLmNhbGwoc2VsZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYSBjdXN0b20gZXZlbnQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIGV2ZW50IEV2ZW50IHR5cGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgIExpc3RlbmVyIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG9mZjogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGV2ZW50cyA9IHNlbGZbJ19vbicgKyBldmVudF0sXG4gICAgICAgIGZuU3RyaW5nID0gZm4gPyBmbi50b1N0cmluZygpIDogbnVsbDtcblxuICAgICAgaWYgKGZuU3RyaW5nKSB7XG4gICAgICAgIC8vIGxvb3AgdGhyb3VnaCBmdW5jdGlvbnMgaW4gdGhlIGV2ZW50IGZvciBjb21wYXJpc29uXG4gICAgICAgIGZvciAodmFyIGk9MDsgaTxldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZm5TdHJpbmcgPT09IGV2ZW50c1tpXS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICBldmVudHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmWydfb24nICsgZXZlbnRdID0gW107XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmxvYWQgYW5kIGRlc3Ryb3kgdGhlIGN1cnJlbnQgSG93bCBvYmplY3QuXG4gICAgICogVGhpcyB3aWxsIGltbWVkaWF0ZWx5IHN0b3AgYWxsIHBsYXkgaW5zdGFuY2VzIGF0dGFjaGVkIHRvIHRoaXMgc291bmQuXG4gICAgICovXG4gICAgdW5sb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gc3RvcCBwbGF5aW5nIGFueSBhY3RpdmUgbm9kZXNcbiAgICAgIHZhciBub2RlcyA9IHNlbGYuX2F1ZGlvTm9kZTtcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gc3RvcCB0aGUgc291bmQgaWYgaXQgaXMgY3VycmVudGx5IHBsYXlpbmdcbiAgICAgICAgaWYgKCFub2Rlc1tpXS5wYXVzZWQpIHtcbiAgICAgICAgICBzZWxmLnN0b3Aobm9kZXNbaV0uaWQpO1xuICAgICAgICAgIHNlbGYub24oJ2VuZCcsIG5vZGVzW2ldLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIHNvdXJjZSBpZiB1c2luZyBIVE1MNSBBdWRpb1xuICAgICAgICAgIG5vZGVzW2ldLnNyYyA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRpc2Nvbm5lY3QgdGhlIG91dHB1dCBmcm9tIHRoZSBtYXN0ZXIgZ2FpblxuICAgICAgICAgIG5vZGVzW2ldLmRpc2Nvbm5lY3QoMCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBzdXJlIGFsbCB0aW1lb3V0cyBhcmUgY2xlYXJlZFxuICAgICAgZm9yIChpPTA7IGk8c2VsZi5fb25lbmRUaW1lci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi5fb25lbmRUaW1lcltpXS50aW1lcik7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSB0aGUgcmVmZXJlbmNlIGluIHRoZSBnbG9iYWwgSG93bGVyIG9iamVjdFxuICAgICAgdmFyIGluZGV4ID0gSG93bGVyLl9ob3dscy5pbmRleE9mKHNlbGYpO1xuICAgICAgaWYgKGluZGV4ICE9PSBudWxsICYmIGluZGV4ID49IDApIHtcbiAgICAgICAgSG93bGVyLl9ob3dscy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICAvLyBkZWxldGUgdGhpcyBzb3VuZCBmcm9tIHRoZSBjYWNoZVxuICAgICAgZGVsZXRlIGNhY2hlW3NlbGYuX3NyY107XG4gICAgICBzZWxmID0gbnVsbDtcbiAgICB9XG5cbiAgfTtcblxuICAvLyBvbmx5IGRlZmluZSB0aGVzZSBmdW5jdGlvbnMgd2hlbiB1c2luZyBXZWJBdWRpb1xuICBpZiAodXNpbmdXZWJBdWRpbykge1xuXG4gICAgLyoqXG4gICAgICogQnVmZmVyIGEgc291bmQgZnJvbSBVUkwgKG9yIGZyb20gY2FjaGUpIGFuZCBkZWNvZGUgdG8gYXVkaW8gc291cmNlIChXZWIgQXVkaW8gQVBJKS5cbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBUaGUgSG93bCBvYmplY3QgZm9yIHRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFRoZSBwYXRoIHRvIHRoZSBzb3VuZCBmaWxlLlxuICAgICAqL1xuICAgIHZhciBsb2FkQnVmZmVyID0gZnVuY3Rpb24ob2JqLCB1cmwpIHtcbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBidWZmZXIgaGFzIGFscmVhZHkgYmVlbiBjYWNoZWRcbiAgICAgIGlmICh1cmwgaW4gY2FjaGUpIHtcbiAgICAgICAgLy8gc2V0IHRoZSBkdXJhdGlvbiBmcm9tIHRoZSBjYWNoZVxuICAgICAgICBvYmouX2R1cmF0aW9uID0gY2FjaGVbdXJsXS5kdXJhdGlvbjtcblxuICAgICAgICAvLyBsb2FkIHRoZSBzb3VuZCBpbnRvIHRoaXMgb2JqZWN0XG4gICAgICAgIGxvYWRTb3VuZChvYmopO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICgvXmRhdGE6W147XSs7YmFzZTY0LC8udGVzdCh1cmwpKSB7XG4gICAgICAgIC8vIERlY29kZSBiYXNlNjQgZGF0YS1VUklzIGJlY2F1c2Ugc29tZSBicm93c2VycyBjYW5ub3QgbG9hZCBkYXRhLVVSSXMgd2l0aCBYTUxIdHRwUmVxdWVzdC5cbiAgICAgICAgdmFyIGRhdGEgPSBhdG9iKHVybC5zcGxpdCgnLCcpWzFdKTtcbiAgICAgICAgdmFyIGRhdGFWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZGF0YS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGRhdGFWaWV3W2ldID0gZGF0YS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkZWNvZGVBdWRpb0RhdGEoZGF0YVZpZXcuYnVmZmVyLCBvYmosIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsb2FkIHRoZSBidWZmZXIgZnJvbSB0aGUgVVJMXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZGVjb2RlQXVkaW9EYXRhKHhoci5yZXNwb25zZSwgb2JqLCB1cmwpO1xuICAgICAgICB9O1xuICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIGVycm9yLCBzd2l0Y2ggdGhlIHNvdW5kIHRvIEhUTUwgQXVkaW9cbiAgICAgICAgICBpZiAob2JqLl93ZWJBdWRpbykge1xuICAgICAgICAgICAgb2JqLl9idWZmZXIgPSB0cnVlO1xuICAgICAgICAgICAgb2JqLl93ZWJBdWRpbyA9IGZhbHNlO1xuICAgICAgICAgICAgb2JqLl9hdWRpb05vZGUgPSBbXTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouX2dhaW5Ob2RlO1xuICAgICAgICAgICAgZGVsZXRlIGNhY2hlW3VybF07XG4gICAgICAgICAgICBvYmoubG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgeGhyLm9uZXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYXVkaW8gZGF0YSBmcm9tIGFuIGFycmF5IGJ1ZmZlci5cbiAgICAgKiBAcGFyYW0gIHtBcnJheUJ1ZmZlcn0gYXJyYXlidWZmZXIgVGhlIGF1ZGlvIGRhdGEuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgcGF0aCB0byB0aGUgc291bmQgZmlsZS5cbiAgICAgKi9cbiAgICB2YXIgZGVjb2RlQXVkaW9EYXRhID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsIG9iaiwgdXJsKSB7XG4gICAgICAvLyBkZWNvZGUgdGhlIGJ1ZmZlciBpbnRvIGFuIGF1ZGlvIHNvdXJjZVxuICAgICAgY3R4LmRlY29kZUF1ZGlvRGF0YShcbiAgICAgICAgYXJyYXlidWZmZXIsXG4gICAgICAgIGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgIGNhY2hlW3VybF0gPSBidWZmZXI7XG4gICAgICAgICAgICBsb2FkU291bmQob2JqLCBidWZmZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgb2JqLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmluaXNoZXMgbG9hZGluZyB0aGUgV2ViIEF1ZGlvIEFQSSBzb3VuZCBhbmQgZmlyZXMgdGhlIGxvYWRlZCBldmVudFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gIG9iaiAgICBUaGUgSG93bCBvYmplY3QgZm9yIHRoZSBzb3VuZCB0byBsb2FkLlxuICAgICAqIEBwYXJhbSAge09iamVjY3R9IGJ1ZmZlciBUaGUgZGVjb2RlZCBidWZmZXIgc291bmQgc291cmNlLlxuICAgICAqL1xuICAgIHZhciBsb2FkU291bmQgPSBmdW5jdGlvbihvYmosIGJ1ZmZlcikge1xuICAgICAgLy8gc2V0IHRoZSBkdXJhdGlvblxuICAgICAgb2JqLl9kdXJhdGlvbiA9IChidWZmZXIpID8gYnVmZmVyLmR1cmF0aW9uIDogb2JqLl9kdXJhdGlvbjtcblxuICAgICAgLy8gc2V0dXAgYSBzcHJpdGUgaWYgbm9uZSBpcyBkZWZpbmVkXG4gICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqLl9zcHJpdGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBvYmouX3Nwcml0ZSA9IHtfZGVmYXVsdDogWzAsIG9iai5fZHVyYXRpb24gKiAxMDAwXX07XG4gICAgICB9XG5cbiAgICAgIC8vIGZpcmUgdGhlIGxvYWRlZCBldmVudFxuICAgICAgaWYgKCFvYmouX2xvYWRlZCkge1xuICAgICAgICBvYmouX2xvYWRlZCA9IHRydWU7XG4gICAgICAgIG9iai5vbignbG9hZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqLl9hdXRvcGxheSkge1xuICAgICAgICBvYmoucGxheSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIHRoZSBzb3VuZCBiYWNrIGludG8gdGhlIGJ1ZmZlciBzb3VyY2UuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogICBUaGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtBcnJheX0gIGxvb3AgIExvb3AgYm9vbGVhbiwgcG9zLCBhbmQgZHVyYXRpb24uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqL1xuICAgIHZhciByZWZyZXNoQnVmZmVyID0gZnVuY3Rpb24ob2JqLCBsb29wLCBpZCkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIG5vZGUgdG8gY29ubmVjdCB0b1xuICAgICAgdmFyIG5vZGUgPSBvYmouX25vZGVCeUlkKGlkKTtcblxuICAgICAgLy8gc2V0dXAgdGhlIGJ1ZmZlciBzb3VyY2UgZm9yIHBsYXliYWNrXG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZSA9IGN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmJ1ZmZlciA9IGNhY2hlW29iai5fc3JjXTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmNvbm5lY3Qobm9kZS5wYW5uZXIpO1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcCA9IGxvb3BbMF07XG4gICAgICBpZiAobG9vcFswXSkge1xuICAgICAgICBub2RlLmJ1ZmZlclNvdXJjZS5sb29wU3RhcnQgPSBsb29wWzFdO1xuICAgICAgICBub2RlLmJ1ZmZlclNvdXJjZS5sb29wRW5kID0gbG9vcFsxXSArIGxvb3BbMl07XG4gICAgICB9XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWUgPSBvYmouX3JhdGU7XG4gICAgfTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzdXBwb3J0IGZvciBBTUQgKEFzeW5jaHJvbm91cyBNb2R1bGUgRGVmaW5pdGlvbikgbGlicmFyaWVzIHN1Y2ggYXMgcmVxdWlyZS5qcy5cbiAgICovXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBIb3dsZXI6IEhvd2xlcixcbiAgICAgICAgSG93bDogSG93bFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc3VwcG9ydCBmb3IgQ29tbW9uSlMgbGlicmFyaWVzIHN1Y2ggYXMgYnJvd3NlcmlmeS5cbiAgICovXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBleHBvcnRzLkhvd2xlciA9IEhvd2xlcjtcbiAgICBleHBvcnRzLkhvd2wgPSBIb3dsO1xuICB9XG5cbiAgLy8gZGVmaW5lIGdsb2JhbGx5IGluIGNhc2UgQU1EIGlzIG5vdCBhdmFpbGFibGUgb3IgYXZhaWxhYmxlIGJ1dCBub3QgdXNlZFxuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5Ib3dsZXIgPSBIb3dsZXI7XG4gICAgd2luZG93Lkhvd2wgPSBIb3dsO1xuICB9XG5cbn0pKCk7XG4iLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi8uLi9hcHAvQXBwLmpzJyk7XHJcbnZhciBUZXN0VXRpbHMgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKS5UZXN0VXRpbHM7XHJcblxyXG5kZXNjcmliZShcIkFwcFwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgaXQoXCJzaG91bGQgYmUgd3JhcHBlZCB3aXRoIGEgZGl2XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFwcCA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoQXBwKCkpO1xyXG4gICAgZXhwZWN0KGFwcC5nZXRET01Ob2RlKCkudGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XHJcbiAgfSk7XHJcblxyXG59KTtcclxuIl19
