(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d:\\git\\ear-tickler\\app\\App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('./data/TrackStore.js');
var FilteredTrackList = require('./navigation/FilteredTrackList.js');
var SoundBoard = require('./soundboard/SoundBoard.js');

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {}; // tracks: TrackStore.getTracks() };
  },
  tracks: TrackStore.getTracks(),
  componentWillMount: function componentWillMount() {
    //Store.addChangeListener(this.changeState);
  },
  componentWillUnmount: function componentWillUnmount() {
    //Store.removeChangeListener(this.changeState);
  },
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
        tracks: this.props.trackStore.getTracks()
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
        volume: this.state.volume,
        muted: this.state.muted,
        onMuteToggle: this.handleMuteToggle,
        onSetVolume: this.handleSetVolume
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
        React.createElement('div', {
          className: 'audio-volume-bar-fill',
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0FwcC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvSGVscGVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9kYXRhL1RyYWNrU3RvcmUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL2RhdGEvVHJhY2tzLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9tYWluLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9taXhpbnMvVGltZUZvcm1hdHRlck1peGluLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9uYXZpZ2F0aW9uL0ZpbHRlcmVkVHJhY2tMaXN0LmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9uYXZpZ2F0aW9uL1RyYWNrTGlzdC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvbmF2aWdhdGlvbi9UcmFja1NlYXJjaEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvQ29udHJvbEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvUGxheWVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9wbGF5ZXIvQXVkaW9Qcm9ncmVzc0Jhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvVm9sdW1lQmFyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9zb3VuZGJvYXJkL1NvdW5kQm9hcmQuanMiLCJub2RlX21vZHVsZXMvaG93bGVyL2hvd2xlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ2pELElBQUksaUJBQWlCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDckUsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7O0FBRXZELElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUMxQixpQkFBZSxFQUFFLDJCQUFZO0FBQzNCLFdBQU8sRUFBRSxDQUFDO0dBQ1g7QUFDRCxRQUFNLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRTtBQUM5QixvQkFBa0IsRUFBRSw4QkFBWTs7R0FFL0I7QUFDRCxzQkFBb0IsRUFBRSxnQ0FBWTs7R0FFakM7QUFDRCxhQUFXLEVBQUUsdUJBQVk7QUFDdkIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztHQUNuQjtBQUNELFFBQU0sRUFBRSxrQkFBVztBQUNqQixXQUNFOztRQUFLLFNBQVMsRUFBQyx5QkFBeUI7TUFDdEM7O1VBQUssU0FBUyxFQUFDLFlBQVk7UUFDekI7O1lBQUssU0FBUyxFQUFDLE9BQU87VUFDcEIsMkJBQUcsU0FBUyxFQUFDLGtCQUFrQixHQUFLOztTQUNoQztPQUNGO01BQ04sb0JBQUMsaUJBQWlCO0FBQ2hCLGNBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQUFBQztRQUMxQztNQUNGLG9CQUFDLFVBQVU7QUFDVCxjQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEFBQUM7UUFDMUM7S0FDRSxDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Ozs7O0FDdENyQixNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2IsVUFBTSxFQUFFLGdCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUM7QUFDbkIsYUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQ1osSUFBRyxDQUFDLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUNwQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLGVBQU8sQ0FBQyxDQUFDO0tBQ1o7QUFDRCxRQUFJLEVBQUUsZ0JBQVc7QUFDYixlQUFPLHNDQUFzQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDdkUsZ0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLEdBQUMsQ0FBQztnQkFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUksQ0FBQyxHQUFDLEdBQUcsR0FBQyxHQUFHLEFBQUMsQ0FBQztBQUMzRCxtQkFBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztLQUNOO0NBQ0osQ0FBQTs7Ozs7QUNiRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDakMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUEsWUFBVztBQUMxQixRQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQ3BDLElBQUksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkIsZUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckMsQ0FBQyxDQUFDO0FBQ0wsUUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEtBQUssRUFBRTtBQUN4QyxlQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDakIsY0FBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDakIsZ0JBQUksRUFBRSxXQUFXO0FBQ2pCLGVBQUcsRUFBRSxzQkFBc0I7QUFDM0Isa0JBQU0sRUFBRSxnQkFBZ0I7U0FDM0IsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNiLENBQUMsQ0FBQzs7QUFFSCxXQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDdEIsY0FBTSxFQUFFLE1BQU07QUFDZCxtQkFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUN6QixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQjtBQUNELG1CQUFXLEVBQUUscUJBQVMsRUFBRSxFQUFFO0FBQ3RCLGtCQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFTLEVBQUUsRUFBRTtBQUFFLHVCQUFPLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQUUsQ0FBQyxDQUFDO0FBQzlELGdCQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDL0I7QUFDRCxlQUFPLEVBQUU7QUFDTCxxQkFBUyxFQUFFLHFCQUFXO0FBQ2xCLHVCQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDdEI7QUFDRCx1QkFBVyxFQUFFLHFCQUFTLEVBQUUsRUFBRTtBQUN0QixvQkFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN4QjtBQUNELG9CQUFRLEVBQUUsa0JBQVMsS0FBSyxFQUFFO0FBQ3RCLG9CQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1NBQ0o7S0FDRixDQUFDLENBQUM7Q0FDSixDQUFBLEVBQUUsQ0FBQzs7Ozs7QUN2Q0osTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDO0FBQ2hCLE1BQUksRUFBRSxlQUFlO0FBQ3JCLFFBQU0sRUFBRSw0REFBNEQ7Q0FDckUsRUFBQztBQUNBLE1BQUksRUFBRSxnQkFBZ0I7QUFDdEIsUUFBTSxFQUFFLG1FQUFtRTtDQUM1RSxFQUFDO0FBQ0EsTUFBSSxFQUFFLFVBQVU7QUFDaEIsUUFBTSxFQUFFLCtEQUErRDtDQUN4RSxFQUFDO0FBQ0EsTUFBSSxFQUFFLHNCQUFzQjtBQUM1QixRQUFNLEVBQUUsaUVBQWlFO0NBQzFFLEVBQUM7QUFDQSxNQUFJLEVBQUUsWUFBWTtBQUNsQixRQUFNLEVBQUUsK0RBQStEO0NBQ3hFLEVBQUM7QUFDQSxNQUFJLEVBQUUsY0FBYztBQUNwQixRQUFNLEVBQUUsbUVBQW1FO0NBQzVFLEVBQUM7QUFDQSxNQUFJLEVBQUUsZUFBZTtBQUNyQixRQUFNLEVBQUUsNERBQTREO0NBQ3JFLEVBQUM7QUFDQSxNQUFJLEVBQUUsc0JBQXNCO0FBQzVCLFFBQU0sRUFBRSxtRUFBbUU7Q0FDNUUsRUFBQztBQUNBLE1BQUksRUFBRSxZQUFZO0FBQ2xCLFFBQU0sRUFBRSxtRUFBbUU7Q0FDNUUsRUFBQztBQUNBLE1BQUksRUFBRSxjQUFjO0FBQ3BCLFFBQU0sRUFBRSxtRUFBbUU7Q0FDNUUsQ0FBQyxDQUFDOzs7OztBQzlCSCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUU5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNqRCxLQUFLLENBQUMsTUFBTSxDQUNWLG9CQUFDLEdBQUc7QUFDRixZQUFVLEVBQUUsVUFBVSxBQUFDO0VBQ3ZCLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FDM0MsQ0FBQzs7Ozs7QUNSRixNQUFNLENBQUMsT0FBTyxHQUFJO0FBQ2hCLGVBQWEsRUFBRSx1QkFBUyxJQUFJLEVBQUU7QUFDNUIsUUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsUUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUMsQ0FBQzs7QUFFekMsUUFBSSxtQkFBbUIsR0FBRyxJQUFJLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUM7QUFDM0MsUUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsQ0FBQzs7QUFFbkQsUUFBSSxtQkFBbUIsR0FBRyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7QUFDbkQsUUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUU3QyxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsUUFBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ1osVUFBSSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUM7S0FDckI7O0FBRUQsUUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzNDLFFBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JDLFdBQU8sSUFBSSxDQUFDO0dBQ2I7O0FBRUQsZ0JBQWMsRUFBQyx3QkFBUyxJQUFJLEVBQUU7QUFDNUIsUUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0FBQ1osYUFBTyxJQUFJLENBQUM7S0FDYixNQUFNLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRTtBQUNwQixhQUFPLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDbkIsTUFBTTtBQUNMLGFBQU8sSUFBSSxDQUFDO0tBQ2I7R0FDRjtDQUNGLENBQUM7Ozs7O0FDL0JGLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNwRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFMUMsSUFBSSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDdEMsbUJBQWUsRUFBRSwyQkFBVztBQUN4QixlQUFPO0FBQ0gsc0JBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUM7S0FDTDtBQUNELHNCQUFrQixFQUFFLDRCQUFTLFVBQVUsRUFBRTtBQUNyQyxZQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1Ysc0JBQVUsRUFBRSxVQUFVO1NBQ3pCLENBQUMsQ0FBQztLQUNOO0FBQ0QsVUFBTSxFQUFFLGtCQUFXO0FBQ2YsZUFDSTs7Y0FBSyxTQUFTLEVBQUMscUJBQXFCO1lBQ2hDLG9CQUFDLGNBQWM7QUFDWCwwQkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDO0FBQ2xDLDhCQUFjLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixBQUFDO2NBQzFDO1lBQ0Ysb0JBQUMsU0FBUztBQUNOLDBCQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEFBQUM7QUFDbEMsc0JBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQUFBQztjQUM1QjtTQUNBLENBQ1I7S0FDTDtDQUNKLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDOzs7OztBQy9CbkMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUVsRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDaEMsUUFBTSxFQUFFLGtCQUFXO0FBQ2pCLFFBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUM5QixNQUFNLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDdEIsVUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDakQsVUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUN6QyxhQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDdkMsRUFBRSxJQUFJLENBQUMsQ0FDUCxHQUFHLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDbkIsYUFDRTs7VUFBSSxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsQUFBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEFBQUM7UUFDOUIsMkJBQUcsU0FBUyxFQUFDLGFBQWEsR0FBSztRQUM5QixLQUFLLENBQUMsSUFBSTtPQUNSLENBQ0w7S0FDSCxDQUNGLENBQUM7O0FBRUYsV0FDRTs7O01BQUssU0FBUztLQUFNLENBQ3BCO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7O0FDM0IzQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRWxELElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUM5QixzQkFBa0IsRUFBRSw4QkFBVztBQUMzQixZQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDeEQsWUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekM7QUFDRCxVQUFNLEVBQUUsa0JBQVc7QUFDZixlQUNJO0FBQ0ksZ0JBQUksRUFBQyxNQUFNO0FBQ1gsdUJBQVcsRUFBQyxXQUFXO0FBQ3ZCLGlCQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEFBQUM7QUFDN0IsZUFBRyxFQUFDLFdBQVc7QUFDZixvQkFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQUFBQztVQUNwQyxDQUNKO0tBQ0w7Q0FDSixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7Ozs7O0FDckIzQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztBQUVyQyxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDdEMsYUFBVyxFQUFFLHVCQUFXO0FBQ3RCLFlBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQzFCLFdBQUssU0FBUztBQUNaLGNBQU07QUFBQSxBQUNSLFdBQUssU0FBUztBQUNaLFlBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDckIsY0FBTTtBQUFBLEFBQ1I7QUFDRSxZQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQUEsS0FDdkI7R0FDRjtBQUNELGtCQUFnQixFQUFFLDRCQUFXO0FBQzNCLFFBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQzVDLENBQUM7R0FDSDs7QUFFRCxnQkFBYyxFQUFFLDBCQUFXO0FBQ3pCLFlBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO0FBQzFCLFdBQUssU0FBUztBQUNaLGVBQU8sT0FBTyxDQUFDO0FBQUEsQUFDakIsV0FBSyxTQUFTO0FBQ1osZUFBTyxTQUFTLENBQUM7QUFBQSxBQUNuQixXQUFLLFFBQVEsQ0FBQztBQUNkLFdBQUssU0FBUyxDQUFDO0FBQ2Y7QUFDRSxlQUFPLE1BQU0sQ0FBQztBQUNkLGVBQU8sTUFBTSxDQUFDO0FBQUEsS0FDakI7R0FDRjtBQUNELG9CQUFrQixFQUFFLDhCQUFXO0FBQzdCLFFBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN6QyxZQUFRLFlBQVk7QUFDbEIsV0FBSyxTQUFTO0FBQ1osZUFBTyxpQkFBaUIsQ0FBQztBQUFBLEFBQzNCO0FBQ0UsZUFBTyxZQUFZLENBQUM7QUFBQSxLQUN2QjtHQUNGOztBQUVELFFBQU0sRUFBRSxrQkFBVztBQUNqQixRQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbkMsV0FDRTs7UUFBSyxTQUFTLEVBQUMsbUJBQW1CO01BQ2hDOzs7QUFDRSxtQkFBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQUFBQztBQUNqQyxpQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUM7O1FBRTFCLDJCQUFHLFNBQVMsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEFBQUMsR0FBSztPQUNqRDtNQUNUO0FBQ0UsVUFBRSxFQUFFLGNBQWMsQUFBQztBQUNuQixpQkFBUyxFQUFDLGFBQWE7QUFDdkIsWUFBSSxFQUFDLFVBQVU7QUFDZixXQUFHLEVBQUMsY0FBYztBQUNsQixnQkFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQztRQUNoQztNQUNGOzs7QUFDRSxtQkFBUyxFQUFDLG1CQUFtQjtBQUM3QixpQkFBTyxFQUFFLGNBQWMsQUFBQztRQUN4QiwyQkFBRyxTQUFTLEVBQUMsY0FBYyxHQUFLO09BQzFCO0tBQ0osQ0FDTjtHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDOzs7OztBQ3ZFakMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLElBQUksZUFBZSxHQUFJLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3ZELElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDeEQsSUFBSSxjQUFjLEdBQUssT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRXRELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7O0FBRWxDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNsQyxpQkFBZSxFQUFFLDJCQUFXO0FBQzFCLFdBQU87QUFDTCxVQUFJLEVBQUUsS0FBSztBQUNYLFdBQUssRUFBRSxLQUFLO0FBQ1osZUFBUyxFQUFFLFNBQVM7QUFDcEIsY0FBUSxFQUFFLENBQUM7QUFDWCxjQUFRLEVBQUUsQ0FBQztBQUNYLFlBQU0sRUFBRSxHQUFHO0tBQ1osQ0FBQztHQUNIO0FBQ0Qsb0JBQWtCLEVBQUUsOEJBQVc7QUFDN0IsUUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0dBQ2xCO0FBQ0Qsc0JBQW9CLEVBQUUsZ0NBQVc7QUFDL0IsUUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0dBQ25COztBQUVELE9BQUssRUFBRSxJQUFJO0FBQ1gsU0FBTyxFQUFFLElBQUk7O0FBRWIsV0FBUyxFQUFFLHFCQUFXO0FBQ3BCLFFBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7O0FBRXhDLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUM7QUFDcEIsVUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CLFVBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7QUFDckIsWUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtBQUN6QixZQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtBQUM5QixXQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtLQUM3QixDQUFDLENBQUM7R0FDSjs7QUFFRCxtQkFBaUIsRUFBRSw2QkFBVztBQUM1QixRQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZUFBUyxFQUFFLFFBQVE7QUFDbkIsY0FBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztLQUMvQixDQUFDLENBQUM7R0FDSjtBQUNELFlBQVUsRUFBRSxzQkFBVztBQUNyQixRQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDZCxVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ2pCO0dBQ0Y7O0FBRUQsYUFBVyxFQUFFLHVCQUFXOztHQUV2QjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLFdBQVcsRUFBRTtBQUN0QyxRQUFJLFdBQVcsRUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0dBQ3ZDO0FBQ0QsYUFBVyxFQUFFLHVCQUFXO0FBQ3RCLFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUN2QyxRQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ25CLGlCQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqQyxRQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDdkI7QUFDRCxZQUFVLEVBQUUsc0JBQVc7QUFDckIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztHQUN0RDtBQUNELFlBQVUsRUFBRSxvQkFBUyxPQUFPLEVBQUU7QUFDNUIsUUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUM7R0FDL0M7QUFDRCxZQUFVLEVBQUUsc0JBQVc7QUFDckIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsaUJBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFFBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztHQUN2QjtBQUNELGtCQUFnQixFQUFFLDBCQUFTLFdBQVcsRUFBRTtBQUN0QyxRQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLFNBQVMsRUFBRTs7Ozs7QUFLckMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO0tBQ3pDOztBQUVELFFBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUNyQyxRQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztHQUM5QjtBQUNELGlCQUFlLEVBQUUseUJBQVMsTUFBTSxFQUFFO0FBQ2hDLFFBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixZQUFNLEVBQUUsTUFBTTtBQUNkLFdBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQyxDQUFDO0FBQ0gsUUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDM0I7O0FBRUQsa0JBQWdCLEVBQUUsNEJBQVc7QUFDM0IsUUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsUUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTs7Ozs7QUFLbEYsVUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztLQUNsQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzNGLFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDbEIsWUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLG1CQUFTLEVBQUUsSUFBSTtBQUNmLG1CQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDLENBQUM7T0FDSixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsU0FBUyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7R0FDeEM7O0FBRUQsZ0JBQWMsRUFBRSwwQkFBVztBQUN6QixRQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0dBQy9DOztBQUVELFFBQU0sRUFBRSxrQkFBVztBQUNqQixXQUNFOztRQUFLLFNBQVMsRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUM7TUFDckQ7O1VBQUssU0FBUyxFQUFDLFlBQVk7UUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJO09BQU87TUFDekQ7QUFDRSxpQkFBUyxFQUFDLDBCQUEwQjtBQUNwQyxlQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQUFBQyxHQUN4QjtNQUNKLG9CQUFDLGVBQWU7QUFDZCxpQkFBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDO0FBQ2hDLGVBQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDO0FBQzFCLGNBQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxBQUFDO0FBQ3hCLG9CQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixBQUFDO1FBQ3BDO01BQ0Ysb0JBQUMsZ0JBQWdCO0FBQ2Ysa0JBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQztBQUN0RCxnQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQzlCLGdCQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUM7QUFDOUIsY0FBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEFBQUM7UUFDeEI7TUFDRixvQkFBQyxjQUFjO0FBQ2IsY0FBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxBQUFDO0FBQzFCLGFBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQztBQUN4QixvQkFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQztBQUNwQyxtQkFBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEFBQUM7UUFDbEM7S0FDRSxDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7Ozs7O0FDL0o3QixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFcEUsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDdkMsUUFBTSxFQUFFLENBQUMsa0JBQWtCLENBQUM7QUFDNUIsYUFBVyxFQUFFLHFCQUFTLEtBQUssRUFBRTtBQUMzQixRQUFJLE1BQU0sR0FBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQzNCLE1BQU0sR0FBSSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJO1FBQ25DLE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBLEFBQUMsQ0FBQzs7QUFFckQsUUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDNUI7QUFDRCxRQUFNLEVBQUUsa0JBQVc7QUFDakIsUUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELFFBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RCxXQUNFOzs7QUFDRSxpQkFBUyxFQUFDLG9CQUFvQjtBQUM5QixlQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQUFBQztNQUMxQjs7VUFBSyxTQUFTLEVBQUMsYUFBYTtRQUFFLE9BQU87O1FBQWUsUUFBUTtPQUFPO01BQ25FOzs7QUFDRSxtQkFBUyxFQUFDLHlCQUF5QjtBQUNuQyxlQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsQUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUksR0FBRyxFQUFDLEFBQUM7O1FBRXBEOztZQUFLLFNBQVMsRUFBQyxhQUFhO1VBQUUsT0FBTzs7VUFBZSxRQUFRO1NBQU87T0FDL0Q7S0FDRixDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQzs7Ozs7QUNoQ2xDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRXJDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNyQyxhQUFXLEVBQUUscUJBQVMsS0FBSyxFQUFFO0FBQzNCLFFBQUksTUFBTSxHQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtRQUMzQyxNQUFNLEdBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSTtRQUNuQyxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQSxBQUFDLENBQUM7O0FBRXJELFFBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ2pDO0FBQ0Qsa0JBQWdCLEVBQUUsNEJBQVc7QUFDM0IsUUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQzVDO0FBQ0Qsa0JBQWdCLEVBQUUsMEJBQVMsS0FBSyxFQUFFO0FBQ2hDLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNwQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEVBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7QUFFZixRQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNoQztBQUNELGdCQUFjLEVBQUUsd0JBQVMsS0FBSyxFQUFFO0FBQzlCLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNwQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEVBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQzs7QUFFZixRQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztHQUNoQzs7QUFFRCxRQUFNLEVBQUUsa0JBQVc7QUFDakIsUUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ25DLFdBQ0U7O1FBQUssU0FBUyxFQUFDLHNCQUFzQjtNQUNuQywyQkFBRyxTQUFTLEVBQUUsbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQSxBQUFDLEFBQUM7QUFDbkUsZUFBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQztRQUM3QjtNQUNMLDJCQUFHLFNBQVMsRUFBQyxtQkFBbUI7QUFDN0IsZUFBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQUFBQztRQUM3QjtNQUNMOzs7QUFDRSxtQkFBUyxFQUFDLGtCQUFrQjtBQUM1QixhQUFHLEVBQUMsWUFBWTtBQUNoQixpQkFBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUM7UUFDMUI7QUFDRSxtQkFBUyxFQUFDLHVCQUF1QjtBQUNqQyxlQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsQUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUksR0FBRyxFQUFDLEFBQUM7VUFFNUM7T0FDRjtNQUNOLDJCQUFHLFNBQVMsRUFBQyxpQkFBaUI7QUFDM0IsZUFBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEFBQUM7UUFDM0I7S0FDRCxDQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Ozs7O0FDMURoQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRXRELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7OztBQUNqQyxpQkFBZSxFQUFFLDJCQUFXO0FBQzFCLFdBQU8sRUFBRSxDQUFDO0dBQ1g7O0FBRUQsUUFBTSxFQUFFLGtCQUFXO0FBQ2pCLFFBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixRQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDeEMsWUFBTSxDQUFDLElBQUksQ0FDVCxvQkFBQyxXQUFXO0FBQ1YsV0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDZCxhQUFLLEVBQUUsS0FBSyxBQUFDO1FBQ2IsQ0FDSCxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0gsV0FDRTs7UUFBSyxTQUFTLEVBQUMsYUFBYTtNQUFFLE1BQU07S0FBTyxDQUMzQztHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDOzs7QUN4QjVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi9kYXRhL1RyYWNrU3RvcmUuanMnKTtcclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gcmVxdWlyZSgnLi9uYXZpZ2F0aW9uL0ZpbHRlcmVkVHJhY2tMaXN0LmpzJyk7XHJcbnZhciBTb3VuZEJvYXJkID0gcmVxdWlyZSgnLi9zb3VuZGJvYXJkL1NvdW5kQm9hcmQuanMnKTtcclxuXHJcbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge307IC8vIHRyYWNrczogVHJhY2tTdG9yZS5nZXRUcmFja3MoKSB9O1xyXG4gIH0sXHJcbiAgdHJhY2tzOiBUcmFja1N0b3JlLmdldFRyYWNrcygpLFxyXG4gIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9TdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL1N0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMuY2hhbmdlU3RhdGUpO1xyXG4gIH0sXHJcbiAgY2hhbmdlU3RhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe30pO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybihcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJlYXItdGlja2xlciBhcHBsaWNhdGlvblwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWJhclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1oZWFkcGhvbmVzXCI+PC9pPiBFYXIgVGlja2xlclxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPEZpbHRlcmVkVHJhY2tMaXN0XHJcbiAgICAgICAgICB0cmFja3M9e3RoaXMucHJvcHMudHJhY2tTdG9yZS5nZXRUcmFja3MoKX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIDxTb3VuZEJvYXJkXHJcbiAgICAgICAgICB0cmFja3M9e3RoaXMucHJvcHMudHJhY2tTdG9yZS5nZXRUcmFja3MoKX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHRcclxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAoYSwgYil7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYilcclxuICAgICAgICAgICAgaWYoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSxcclxuICAgIGd1aWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpKjE2fDAsIHYgPSBjID09ICd4JyA/IHIgOiAociYweDN8MHg4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xyXG52YXIgSGVscGVyID0gcmVxdWlyZSgnLi4vSGVscGVyLmpzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciByYXdfdHJhY2tzID0gcmVxdWlyZSgnLi9UcmFja3MuanMnKVxyXG4gICAgLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICByZXR1cm4gYS5uYW1lLmxvY2FsZUNvbXBhcmUoYi5uYW1lKTtcclxuICAgIH0pO1xyXG4gIHZhciB0cmFja3MgPSByYXdfdHJhY2tzLm1hcChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICByZXR1cm4gSGVscGVyLmV4dGVuZCh7XHJcbiAgICAgICAgICBpZDogSGVscGVyLmd1aWQoKSxcclxuICAgICAgICAgIG5hbWU6ICdOZXcgVHJhY2snLFxyXG4gICAgICAgICAgdXJsOiAnLi4vYXVkaW8vZGVmYXVsdC5tcDMnLFxyXG4gICAgICAgICAgb3JpZ2luOiAnVW5rbm93biBPcmlnaW4nXHJcbiAgICAgIH0sIHRyYWNrKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZsdXguY3JlYXRlU3RvcmUoe1xyXG4gICAgdHJhY2tzOiB0cmFja3MsXHJcbiAgICB1cHNlcnRUcmFjazogZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ3RyYWNrcy51cGRhdGVkJyk7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVHJhY2s6IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdHJhY2tzID0gdHJhY2tzLmZpbHRlcihmdW5jdGlvbihlbCkgeyByZXR1cm4gZWwuaWQgIT09IGlkOyB9KTtcclxuICAgICAgICB0aGlzLmVtaXQoJ3RyYWNrcy5kZWxldGVkJyk7XHJcbiAgICB9LFxyXG4gICAgZXhwb3J0czoge1xyXG4gICAgICAgIGdldFRyYWNrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNrcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVRyYWNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVRyYWNrKGlkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZFRyYWNrOiBmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnVwc2VydFRyYWNrKHRyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0oKTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBbe1xyXG4gIG5hbWU6ICdCaXJkcyAoTGlnaHQpJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMS8xMDUwXzExMTItaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQmlyZHMgKFNwYXJzZSknLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xNTgvMTU4NTI3XzI3ODMzMzYtaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnQ3JpY2tldHMnLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8zOS8zOTgyOV8yODIxNi1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdSb2FyIC0gRHJhZ29uIChGYXN0KScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzg1Lzg1NTY4XzEyMDYzMjEtaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnRmFzdCBSaXZlcicsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzM5LzM5ODMxXzI4MjE2LWhxLm1wMydcclxufSx7XHJcbiAgbmFtZTogJ01hZ2ljIChGYXN0KScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzIyMS8yMjE2ODNfMTAxNTI0MC1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdUaHVuZGVyIFN0b3JtJyxcclxuICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMi8yNTIzXzExMTItaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnUm9hciwgTW9uc3RlciAoU2xvdyknLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8yNjcvMjY3NDU0XzM0MTUwMjItaHEubXAzJ1xyXG59LHtcclxuICBuYW1lOiAnUm9hciwgT2dyZScsXHJcbiAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzEwMy8xMDM1MzRfMTc1NzQ4OS1ocS5tcDMnXHJcbn0se1xyXG4gIG5hbWU6ICdSb2FyLCBPZ3JlIDInLFxyXG4gIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8xMDMvMTAzNTM1XzE3NTc0ODktaHEubXAzJ1xyXG59XTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XHJcblxyXG52YXIgdHJhY2tTdG9yZSA9IHJlcXVpcmUoJy4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblJlYWN0LnJlbmRlcihcclxuICA8QXBwXHJcbiAgICB0cmFja1N0b3JlPXt0cmFja1N0b3JlfVxyXG4gIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwbGljYXRpb24nKVxyXG4pOyIsIm1vZHVsZS5leHBvcnRzID0gIHtcclxuICBzZWNvbmRzVG9UaW1lOiBmdW5jdGlvbihzZWNzKSB7XHJcbiAgICBzZWNzID0gTWF0aC5yb3VuZChzZWNzKTtcclxuICAgIHZhciBob3VycyA9IE1hdGguZmxvb3Ioc2VjcyAvICg2MCAqIDYwKSk7XHJcblxyXG4gICAgdmFyIGRpdmlzb3JfZm9yX21pbnV0ZXMgPSBzZWNzICUgKDYwICogNjApO1xyXG4gICAgdmFyIG1pbnV0ZXMgPSBNYXRoLmZsb29yKGRpdmlzb3JfZm9yX21pbnV0ZXMgLyA2MCk7XHJcblxyXG4gICAgdmFyIGRpdmlzb3JfZm9yX3NlY29uZHMgPSBkaXZpc29yX2Zvcl9taW51dGVzICUgNjA7XHJcbiAgICB2YXIgc2Vjb25kcyA9IE1hdGguY2VpbChkaXZpc29yX2Zvcl9zZWNvbmRzKTtcclxuXHJcbiAgICB2YXIgdGltZSA9IFwiXCI7XHJcblxyXG4gICAgaWYoaG91cnMgPiAwKSB7XHJcbiAgICAgIHRpbWUgKz0gaG91cnMgKyBcIjpcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lICs9IHRoaXMudGltZVVuaXRGb3JtYXQobWludXRlcykgKyBcIjpcIjtcclxuICAgIHRpbWUgKz0gdGhpcy50aW1lVW5pdEZvcm1hdChzZWNvbmRzKTtcclxuICAgIHJldHVybiB0aW1lO1xyXG4gIH0sXHJcblxyXG4gIHRpbWVVbml0Rm9ybWF0OmZ1bmN0aW9uKHRpbWUpIHtcclxuICAgIGlmICh0aW1lIDwgMSkge1xyXG4gICAgICByZXR1cm4gXCIwMFwiO1xyXG4gICAgfSBlbHNlIGlmICh0aW1lIDwgMTApIHtcclxuICAgICAgcmV0dXJuIFwiMFwiICsgdGltZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgfVxyXG4gIH1cclxufTsiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVHJhY2tTZWFyY2hCYXIgPSByZXF1aXJlKCcuL1RyYWNrU2VhcmNoQmFyLmpzJyk7XHJcbnZhciBUcmFja0xpc3QgPSByZXF1aXJlKCcuL1RyYWNrTGlzdC5qcycpO1xyXG5cclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWx0ZXJUZXh0OiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbihmaWx0ZXJUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGZpbHRlclRleHQ6IGZpbHRlclRleHRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdHJhY2stbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPFRyYWNrU2VhcmNoQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbHRlckNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VHJhY2tMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcz17dGhpcy5wcm9wcy50cmFja3N9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmlsdGVyZWRUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbGlzdEl0ZW1zID0gdGhpcy5wcm9wcy50cmFja3NcclxuICAgICAgLmZpbHRlcihmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSB0aGlzLnByb3BzLmZpbHRlclRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2YXIgdHJhY2tOYW1lID0gdHJhY2submFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiB0cmFja05hbWUuaW5kZXhPZihmaWx0ZXIpID4gLTE7XHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICAgIC5tYXAoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpIGtleT17dHJhY2suaWR9IHRyYWNrPXt0cmFja30+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLW11c2ljXCI+PC9pPlxyXG4gICAgICAgICAgICB7dHJhY2submFtZX1cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+e2xpc3RJdGVtc308L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi4vZGF0YS9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlsdGVyVGV4dCA9IHRoaXMucmVmcy5zZWFyY2hCb3guZ2V0RE9NTm9kZSgpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25GaWx0ZXJDaGFuZ2UoZmlsdGVyVGV4dCk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlclRleHR9XHJcbiAgICAgICAgICAgICAgICByZWY9XCJzZWFyY2hCb3hcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBIZWxwZXIgPSByZXF1aXJlKCcuLi9IZWxwZXIuanMnKTtcclxuXHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgaGFuZGxlQ2xpY2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBsYXlTdGF0ZSkge1xyXG4gICAgICBjYXNlICdsb2FkaW5nJzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGxheWluZyc6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBhdXNlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblBsYXkoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGhhbmRsZUxvb3BUb2dnbGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5wcm9wcy5vbkxvb3BUb2dnbGUoXHJcbiAgICAgIHRoaXMucmVmcy5sb29wX2VuYWJsZWQuZ2V0RE9NTm9kZSgpLmNoZWNrZWRcclxuICAgICk7XHJcbiAgfSxcclxuXHJcbiAgZ2V0QnV0dG9uQ2xhc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnByb3BzLnBsYXlTdGF0ZSkge1xyXG4gICAgICBjYXNlICdwbGF5aW5nJzpcclxuICAgICAgICByZXR1cm4gJ3BhdXNlJztcclxuICAgICAgY2FzZSAnbG9hZGluZyc6XHJcbiAgICAgICAgcmV0dXJuICdzcGlubmVyJztcclxuICAgICAgY2FzZSAncGF1c2VkJzpcclxuICAgICAgY2FzZSAnc3RvcHBlZCc6XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuICdwbGF5JztcclxuICAgICAgICByZXR1cm4gJ3BsYXknO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QnV0dG9uSWNvbkNsYXNzOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBidXR0b25fY2xhc3MgPSB0aGlzLmdldEJ1dHRvbkNsYXNzKCk7XHJcbiAgICBzd2l0Y2ggKGJ1dHRvbl9jbGFzcykge1xyXG4gICAgICBjYXNlICdzcGlubmVyJzpcclxuICAgICAgICByZXR1cm4gJ3NwaW5uZXIgZmEtc3Bpbic7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbl9jbGFzcztcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGxvb3BfdG9nZ2xlX2lkID0gSGVscGVyLmd1aWQoKTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tY29udHJvbC1iYXJcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzc05hbWU9e3RoaXMuZ2V0QnV0dG9uQ2xhc3MoKX1cclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGkgY2xhc3NOYW1lPXtcImZhIGZhLVwiICsgdGhpcy5nZXRCdXR0b25JY29uQ2xhc3MoKX0+PC9pPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgaWQ9e2xvb3BfdG9nZ2xlX2lkfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibG9vcC10b2dnbGVcIlxyXG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcclxuICAgICAgICAgIHJlZj1cImxvb3BfZW5hYmxlZFwiXHJcbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVMb29wVG9nZ2xlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJsb29wLXRvZ2dsZS1sYWJlbFwiXHJcbiAgICAgICAgICBodG1sRm9yPXtsb29wX3RvZ2dsZV9pZH0+XHJcbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1yZXBlYXRcIj48L2k+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvQ29udHJvbEJhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEF1ZGlvQ29udHJvbEJhciAgPSByZXF1aXJlKCcuL0F1ZGlvQ29udHJvbEJhci5qcycpO1xyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vQXVkaW9Qcm9ncmVzc0Jhci5qcycpO1xyXG52YXIgQXVkaW9Wb2x1bWVCYXIgICA9IHJlcXVpcmUoJy4vQXVkaW9Wb2x1bWVCYXIuanMnKTtcclxuXHJcbnZhciBIb3dsID0gcmVxdWlyZSgnaG93bGVyJykuSG93bDtcclxuXHJcbnZhciBBdWRpb1BsYXllciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgIG11dGVkOiBmYWxzZSxcclxuICAgICAgcGxheVN0YXRlOiAnbG9hZGluZycsXHJcbiAgICAgIHBvc2l0aW9uOiAwLFxyXG4gICAgICBkdXJhdGlvbjogMCxcclxuICAgICAgdm9sdW1lOiAxLjBcclxuICAgIH07XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sb2FkQXVkaW8oKTtcclxuICB9LFxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuY2xlYXJBdWRpbygpO1xyXG4gIH0sXHJcblxyXG4gIGF1ZGlvOiBudWxsLCAgIC8vIFRoZSBIb3dsZXIuanMgSG93bCBvYmplY3RcclxuICByZWZyZXNoOiBudWxsLCAvLyBJbnRlcnZhbCBmb3IgcmVmcmVzaGluZyBwbGF5IHRpbWUgJiBwcm9ncmVzc1xyXG5cclxuICBsb2FkQXVkaW86IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5jbGVhckF1ZGlvKCk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgcGxheVN0YXRlOiAnbG9hZGluZycgfSk7XHJcblxyXG4gICAgdGhpcy5hdWRpbyA9IG5ldyBIb3dsKHtcclxuICAgICAgdXJsczogW3RoaXMucHJvcHMudHJhY2sub3JpZ2luXSxcclxuICAgICAgbG9vcDogdGhpcy5zdGF0ZS5sb29wLFxyXG4gICAgICB2b2x1bWU6IHRoaXMuc3RhdGUudm9sdW1lLFxyXG4gICAgICBvbmxvYWQ6IHRoaXMuaGFuZGxlQXVkaW9Mb2FkZWQsXHJcbiAgICAgIG9uZW5kOiB0aGlzLmhhbmRsZUF1ZGlvRW5kZWRcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUF1ZGlvTG9hZGVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBwbGF5U3RhdGU6ICdwYXVzZWQnLFxyXG4gICAgICBkdXJhdGlvbjogdGhpcy5hdWRpby5fZHVyYXRpb25cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY2xlYXJBdWRpbzogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodGhpcy5hdWRpbykge1xyXG4gICAgICB0aGlzLmF1ZGlvLnN0b3AoKTtcclxuICAgICAgdGhpcy5hdWRpbyA9IHt9O1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgIC8vIFRPRE86IGFsbG93IHRoZSBjbG9zZS1idXR0b24gdG8gd29yay5cclxuICB9LFxyXG4gIGhhbmRsZU11dGVUb2dnbGU6IGZ1bmN0aW9uKG11dGVTZXR0aW5nKSB7XHJcbiAgICBpZiAobXV0ZVNldHRpbmcpXHJcbiAgICAgIHRoaXMuYXVkaW8ubXV0ZSgpO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLmF1ZGlvLnVubXV0ZSgpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IG11dGVkOiBtdXRlU2V0dGluZyB9KTtcclxuICB9LFxyXG4gIGhhbmRsZVBhdXNlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5U3RhdGU6ICdwYXVzZWQnIH0pO1xyXG4gICAgdGhpcy5hdWRpby5wYXVzZSgpO1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlZnJlc2ggfHwgMCk7XHJcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XHJcbiAgfSxcclxuICBoYW5kbGVQbGF5OiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwbGF5U3RhdGU6ICdwbGF5aW5nJyB9KTtcclxuICAgIHRoaXMuYXVkaW8ucGxheSgpO1xyXG4gICAgdGhpcy5yZWZyZXNoID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVQb3NpdGlvbiwgMjAwKTtcclxuICB9LFxyXG4gIGhhbmRsZVNlZWs6IGZ1bmN0aW9uKHBlcmNlbnQpIHtcclxuICAgIHRoaXMuYXVkaW8ucG9zKHRoaXMuc3RhdGUuZHVyYXRpb24gKiBwZXJjZW50KTtcclxuICB9LFxyXG4gIGhhbmRsZVN0b3A6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBsYXlTdGF0ZTogJ3N0b3BwZWQnIH0pO1xyXG4gICAgdGhpcy5hdWRpby5zdG9wKCk7XHJcbiAgICBjbGVhckludGVydmFsKHRoaXMucmVmcmVzaCB8fCAwKTtcclxuICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcclxuICB9LFxyXG4gIGhhbmRsZUxvb3BUb2dnbGU6IGZ1bmN0aW9uKGxvb3BTZXR0aW5nKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5wbGF5U3RhdGUgPT0gJ3BsYXlpbmcnKSB7XHJcbiAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IGR1ZSB0byBhIGJ1ZyBpbiBIb3dsZXIuanMuXHJcbiAgICAgIC8vICogU2V0dGluZyAubG9vcCh0cnVlKSB3aGlsZSBwbGF5aW5nIGRvZXNuJ3QgY2F1c2UgaXQgdG8gbG9vcCBhdCB0aGUgZW5kLlxyXG4gICAgICAvLyAgIFN1YnNlcXVlbnQgcGxheXMgd2lsbCBob25vciB0aGUgc2V0dGluZywgdGhvdWdoIC0gc28gd2Ugc2ltcGx5IGZvcmNlIGl0XHJcbiAgICAgIC8vICAgb25jZSB0byBvdmVyY29tZSB0aGUgbGltaXRhdGlvbi5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9yY2VMb29wOiBsb29wU2V0dGluZ30pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0U3RhdGUoeyBsb29wOiBsb29wU2V0dGluZyB9KTtcclxuICAgIHRoaXMuYXVkaW8ubG9vcChsb29wU2V0dGluZyk7XHJcbiAgfSxcclxuICBoYW5kbGVTZXRWb2x1bWU6IGZ1bmN0aW9uKHZvbHVtZSkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHZvbHVtZTogdm9sdW1lLFxyXG4gICAgICBtdXRlZDogZmFsc2VcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hdWRpby52b2x1bWUodm9sdW1lKTtcclxuICB9LFxyXG5cclxuICBoYW5kbGVBdWRpb0VuZGVkOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYXVkaW8ucG9zKDApO1xyXG4gICAgaWYgKHRoaXMuc3RhdGUucGxheVN0YXRlID09ICdwbGF5aW5nJyAmJiB0aGlzLmF1ZGlvLmxvb3AoKSAmJiB0aGlzLnN0YXRlLmZvcmNlTG9vcCkge1xyXG4gICAgICAvLyBUaGlzIGlzIG5lY2Vzc2FyeSBkdWUgdG8gYSBidWcgaW4gSG93bGVyLmpzLlxyXG4gICAgICAvLyAqIFNldHRpbmcgLmxvb3AodHJ1ZSkgd2hpbGUgcGxheWluZyBkb2Vzbid0IGNhdXNlIGl0IHRvIGxvb3AgYXQgdGhlIGVuZC5cclxuICAgICAgLy8gICBTdWJzZXF1ZW50IHBsYXlzIHdpbGwgaG9ub3IgdGhlIHNldHRpbmcsIHRob3VnaCAtIHNvIHdlIHNpbXBseSBmb3JjZSBpdFxyXG4gICAgICAvLyAgIG9uY2UgdG8gb3ZlcmNvbWUgdGhlIGxpbWl0YXRpb24uXHJcbiAgICAgIHRoaXMuYXVkaW8uc3RvcCgpO1xyXG4gICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9yY2VMb29wOiBudWxsfSk7IC8vIE9ubHkgZm9yY2UgaXQgb25jZS5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5wbGF5U3RhdGUgPT0gJ3BsYXlpbmcnICYmICF0aGlzLmF1ZGlvLmxvb3AoKSAmJiAhdGhpcy5zdGF0ZS5mb3JjZUxvb3ApIHtcclxuICAgICAgdGhpcy5hdWRpby5zdG9wKCk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGZvcmNlTG9vcDogbnVsbCxcclxuICAgICAgICBwbGF5U3RhdGU6ICdwYXVzZWQnXHJcbiAgICAgIH0pOyAvLyBPbmx5IGZvcmNlIHN0b3BwaW5nIG9uY2UuXHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmF1ZGlvLmxvb3AoKSlcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7cGxheVN0YXRlOiAncGF1c2VkJ30pO1xyXG4gIH0sXHJcblxyXG4gIHVwZGF0ZVBvc2l0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBwb3NpdGlvbjogdGhpcy5hdWRpby5wb3MoKSB9KTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9e1wiYXVkaW8tcGxheWVyIFwiICsgdGhpcy5zdGF0ZS5wbGF5U3RhdGV9PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhY2stbmFtZVwiPnt0aGlzLnByb3BzLnRyYWNrLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGlcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlIGNsb3NlLWJ1dHRvblwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfT5cclxuICAgICAgICA8L2k+XHJcbiAgICAgICAgPEF1ZGlvQ29udHJvbEJhclxyXG4gICAgICAgICAgcGxheVN0YXRlPXt0aGlzLnN0YXRlLnBsYXlTdGF0ZX1cclxuICAgICAgICAgIG9uUGF1c2U9e3RoaXMuaGFuZGxlUGF1c2V9XHJcbiAgICAgICAgICBvblBsYXk9e3RoaXMuaGFuZGxlUGxheX1cclxuICAgICAgICAgIG9uTG9vcFRvZ2dsZT17dGhpcy5oYW5kbGVMb29wVG9nZ2xlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvUHJvZ3Jlc3NCYXJcclxuICAgICAgICAgIHBlcmNlbnRhZ2U9e3RoaXMuc3RhdGUucG9zaXRpb24gLyB0aGlzLnN0YXRlLmR1cmF0aW9ufVxyXG4gICAgICAgICAgcG9zaXRpb249e3RoaXMuc3RhdGUucG9zaXRpb259XHJcbiAgICAgICAgICBkdXJhdGlvbj17dGhpcy5zdGF0ZS5kdXJhdGlvbn1cclxuICAgICAgICAgIG9uU2Vlaz17dGhpcy5oYW5kbGVTZWVrfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvVm9sdW1lQmFyXHJcbiAgICAgICAgICB2b2x1bWU9e3RoaXMuc3RhdGUudm9sdW1lfVxyXG4gICAgICAgICAgbXV0ZWQ9e3RoaXMuc3RhdGUubXV0ZWR9XHJcbiAgICAgICAgICBvbk11dGVUb2dnbGU9e3RoaXMuaGFuZGxlTXV0ZVRvZ2dsZX1cclxuICAgICAgICAgIG9uU2V0Vm9sdW1lPXt0aGlzLmhhbmRsZVNldFZvbHVtZX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9QbGF5ZXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUaW1lRm9ybWF0dGVyTWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMvVGltZUZvcm1hdHRlck1peGluLmpzJyk7XHJcblxyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBtaXhpbnM6IFtUaW1lRm9ybWF0dGVyTWl4aW5dLFxyXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJhcl9lbCAgPSB0aGlzLmdldERPTU5vZGUoKSxcclxuICAgICAgICBjb29yZHMgID0gYmFyX2VsLmdldENsaWVudFJlY3RzKClbMF0sXHJcbiAgICAgICAgY2xpY2tfeCA9IGV2ZW50LnBhZ2VYIC0gY29vcmRzLmxlZnQsXHJcbiAgICAgICAgcGVyY2VudCA9IGNsaWNrX3ggLyAoY29vcmRzLnJpZ2h0IC0gY29vcmRzLmxlZnQpO1xyXG5cclxuICAgIHRoaXMucHJvcHMub25TZWVrKHBlcmNlbnQpO1xyXG4gIH0sXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBjdXJyZW50ID0gdGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMucG9zaXRpb24pO1xyXG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMuZHVyYXRpb24pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImF1ZGlvLXByb2dyZXNzLWJhclwiXHJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby10aW1lclwiPntjdXJyZW50fSZuYnNwOy8mbmJzcDt7ZHVyYXRpb259PC9kaXY+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXVkaW8tcHJvZ3Jlc3MtYmFyLWZpbGxcIlxyXG4gICAgICAgICAgc3R5bGU9e3t3aWR0aDogKHRoaXMucHJvcHMucGVyY2VudGFnZSAqIDEwMCkgKyAnJSd9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdGltZXJcIj57Y3VycmVudH0mbmJzcDsvJm5ic3A7e2R1cmF0aW9ufTwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXVkaW9Qcm9ncmVzc0JhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEhlbHBlciA9IHJlcXVpcmUoJy4uL0hlbHBlci5qcycpO1xyXG5cclxudmFyIEF1ZGlvVm9sdW1lQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGhhbmRsZUNsaWNrOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJhcl9lbCAgPSB0aGlzLnJlZnMudm9sdW1lX2Jhci5nZXRET01Ob2RlKCksXHJcbiAgICAgICAgY29vcmRzICA9IGJhcl9lbC5nZXRDbGllbnRSZWN0cygpWzBdLFxyXG4gICAgICAgIGNsaWNrX3ggPSBldmVudC5wYWdlWCAtIGNvb3Jkcy5sZWZ0LFxyXG4gICAgICAgIHBlcmNlbnQgPSBjbGlja194IC8gKGNvb3Jkcy5yaWdodCAtIGNvb3Jkcy5sZWZ0KTtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uU2V0Vm9sdW1lKHBlcmNlbnQpO1xyXG4gIH0sXHJcbiAgaGFuZGxlTXV0ZVRvZ2dsZTogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnByb3BzLm9uTXV0ZVRvZ2dsZSghdGhpcy5wcm9wcy5tdXRlZCk7XHJcbiAgfSxcclxuICBoYW5kbGVWb2x1bWVEb3duOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHZvbHVtZSA9IHRoaXMucHJvcHMudm9sdW1lIC0gLjE7XHJcbiAgICBpZiAodm9sdW1lIDwgMC4wKVxyXG4gICAgICB2b2x1bWUgPSAwLjA7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vblNldFZvbHVtZSh2b2x1bWUpO1xyXG4gIH0sXHJcbiAgaGFuZGxlVm9sdW1lVXA6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgdm9sdW1lID0gdGhpcy5wcm9wcy52b2x1bWUgKyAuMTtcclxuICAgIGlmICh2b2x1bWUgPiAxLjApXHJcbiAgICAgIHZvbHVtZSA9IDEuMDtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uU2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBtdXRlX2J1dHRvbl9pZCA9IEhlbHBlci5ndWlkKCk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1ZGlvLXZvbHVtZS13cmFwcGVyXCI+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPXtcImZhIGZhLXZvbHVtZS1vZmYgXCIgKyAodGhpcy5wcm9wcy5tdXRlZCA/IFwibXV0ZWRcIiA6IFwiXCIpfVxyXG4gICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTXV0ZVRvZ2dsZX1cclxuICAgICAgICA+PC9pPlxyXG4gICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXZvbHVtZS1kb3duXCJcclxuICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVZvbHVtZURvd259XHJcbiAgICAgICAgPjwvaT5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhdWRpby12b2x1bWUtYmFyXCJcclxuICAgICAgICAgIHJlZj1cInZvbHVtZV9iYXJcIlxyXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+XHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImF1ZGlvLXZvbHVtZS1iYXItZmlsbFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6ICh0aGlzLnByb3BzLnZvbHVtZSAqIDEwMCkgKyAnJSd9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdm9sdW1lLXVwXCJcclxuICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVZvbHVtZVVwfVxyXG4gICAgICAgID48L2k+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1ZvbHVtZUJhcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEF1ZGlvUGxheWVyID0gcmVxdWlyZSgnLi4vcGxheWVyL0F1ZGlvUGxheWVyLmpzJyk7XHJcblxyXG52YXIgU291bmRCb2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHt9O1xyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdHJhY2tzID0gW107XHJcbiAgICB0aGlzLnByb3BzLnRyYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgIHRyYWNrcy5wdXNoKFxyXG4gICAgICAgIDxBdWRpb1BsYXllclxyXG4gICAgICAgICAga2V5PXt0cmFjay5pZH1cclxuICAgICAgICAgIHRyYWNrPXt0cmFja31cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNvdW5kLWJvYXJkXCI+e3RyYWNrc308L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU291bmRCb2FyZDtcclxuIiwiLyohXG4gKiAgaG93bGVyLmpzIHYxLjEuMjhcbiAqICBob3dsZXJqcy5jb21cbiAqXG4gKiAgKGMpIDIwMTMtMjAxNSwgSmFtZXMgU2ltcHNvbiBvZiBHb2xkRmlyZSBTdHVkaW9zXG4gKiAgZ29sZGZpcmVzdHVkaW9zLmNvbVxuICpcbiAqICBNSVQgTGljZW5zZVxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgLy8gc2V0dXBcbiAgdmFyIGNhY2hlID0ge307XG5cbiAgLy8gc2V0dXAgdGhlIGF1ZGlvIGNvbnRleHRcbiAgdmFyIGN0eCA9IG51bGwsXG4gICAgdXNpbmdXZWJBdWRpbyA9IHRydWUsXG4gICAgbm9BdWRpbyA9IGZhbHNlO1xuICB0cnkge1xuICAgIGlmICh0eXBlb2YgQXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3R4ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN0eCA9IG5ldyB3ZWJraXRBdWRpb0NvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXNpbmdXZWJBdWRpbyA9IGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7XG4gICAgdXNpbmdXZWJBdWRpbyA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKCF1c2luZ1dlYkF1ZGlvKSB7XG4gICAgaWYgKHR5cGVvZiBBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBBdWRpbygpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIG5vQXVkaW8gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub0F1ZGlvID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBjcmVhdGUgYSBtYXN0ZXIgZ2FpbiBub2RlXG4gIGlmICh1c2luZ1dlYkF1ZGlvKSB7XG4gICAgdmFyIG1hc3RlckdhaW4gPSAodHlwZW9mIGN0eC5jcmVhdGVHYWluID09PSAndW5kZWZpbmVkJykgPyBjdHguY3JlYXRlR2Fpbk5vZGUoKSA6IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgbWFzdGVyR2Fpbi5nYWluLnZhbHVlID0gMTtcbiAgICBtYXN0ZXJHYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBnbG9iYWwgY29udHJvbGxlclxuICB2YXIgSG93bGVyR2xvYmFsID0gZnVuY3Rpb24oY29kZWNzKSB7XG4gICAgdGhpcy5fdm9sdW1lID0gMTtcbiAgICB0aGlzLl9tdXRlZCA9IGZhbHNlO1xuICAgIHRoaXMudXNpbmdXZWJBdWRpbyA9IHVzaW5nV2ViQXVkaW87XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5ub0F1ZGlvID0gbm9BdWRpbztcbiAgICB0aGlzLl9ob3dscyA9IFtdO1xuICAgIHRoaXMuX2NvZGVjcyA9IGNvZGVjcztcbiAgICB0aGlzLmlPU0F1dG9FbmFibGUgPSB0cnVlO1xuICB9O1xuICBIb3dsZXJHbG9iYWwucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIGdsb2JhbCB2b2x1bWUgZm9yIGFsbCBzb3VuZHMuXG4gICAgICogQHBhcmFtICB7RmxvYXR9IHZvbCBWb2x1bWUgZnJvbSAwLjAgdG8gMS4wLlxuICAgICAqIEByZXR1cm4ge0hvd2xlci9GbG9hdH0gICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHZvbHVtZS5cbiAgICAgKi9cbiAgICB2b2x1bWU6IGZ1bmN0aW9uKHZvbCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBtYWtlIHN1cmUgdm9sdW1lIGlzIGEgbnVtYmVyXG4gICAgICB2b2wgPSBwYXJzZUZsb2F0KHZvbCk7XG5cbiAgICAgIGlmICh2b2wgPj0gMCAmJiB2b2wgPD0gMSkge1xuICAgICAgICBzZWxmLl92b2x1bWUgPSB2b2w7XG5cbiAgICAgICAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcbiAgICAgICAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSB2b2w7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wIHRocm91Z2ggY2FjaGUgYW5kIGNoYW5nZSB2b2x1bWUgb2YgYWxsIG5vZGVzIHRoYXQgYXJlIHVzaW5nIEhUTUw1IEF1ZGlvXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl9ob3dscykge1xuICAgICAgICAgIGlmIChzZWxmLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHNlbGYuX2hvd2xzW2tleV0uX3dlYkF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBhdWRpbyBub2Rlc1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBzZWxmLl9ob3dsc1trZXldLl9hdWRpb05vZGVbaV0udm9sdW1lID0gc2VsZi5faG93bHNba2V5XS5fdm9sdW1lICogc2VsZi5fdm9sdW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyByZXR1cm4gdGhlIGN1cnJlbnQgZ2xvYmFsIHZvbHVtZVxuICAgICAgcmV0dXJuICh1c2luZ1dlYkF1ZGlvKSA/IG1hc3RlckdhaW4uZ2Fpbi52YWx1ZSA6IHNlbGYuX3ZvbHVtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTXV0ZSBhbGwgc291bmRzLlxuICAgICAqIEByZXR1cm4ge0hvd2xlcn1cbiAgICAgKi9cbiAgICBtdXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuX3NldE11dGVkKHRydWUpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5tdXRlIGFsbCBzb3VuZHMuXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIHVubXV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9zZXRNdXRlZChmYWxzZSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbXV0aW5nIGFuZCB1bm11dGluZyBnbG9iYWxseS5cbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBtdXRlZCBJcyBtdXRlZCBvciBub3QuXG4gICAgICovXG4gICAgX3NldE11dGVkOiBmdW5jdGlvbihtdXRlZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBzZWxmLl9tdXRlZCA9IG11dGVkO1xuXG4gICAgICBpZiAodXNpbmdXZWJBdWRpbykge1xuICAgICAgICBtYXN0ZXJHYWluLmdhaW4udmFsdWUgPSBtdXRlZCA/IDAgOiBzZWxmLl92b2x1bWU7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzZWxmLl9ob3dscykge1xuICAgICAgICBpZiAoc2VsZi5faG93bHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBzZWxmLl9ob3dsc1trZXldLl93ZWJBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIGF1ZGlvIG5vZGVzXG4gICAgICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2hvd2xzW2tleV0uX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5faG93bHNba2V5XS5fYXVkaW9Ob2RlW2ldLm11dGVkID0gbXV0ZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBjb2RlYyBzdXBwb3J0LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gZXh0IEF1ZGlvIGZpbGUgZXh0ZW50aW9uLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgY29kZWNzOiBmdW5jdGlvbihleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2RlY3NbZXh0XTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogaU9TIHdpbGwgb25seSBhbGxvdyBhdWRpbyB0byBiZSBwbGF5ZWQgYWZ0ZXIgYSB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqIEF0dGVtcHQgdG8gYXV0b21hdGljYWxseSB1bmxvY2sgYXVkaW8gb24gdGhlIGZpcnN0IHVzZXIgaW50ZXJhY3Rpb24uXG4gICAgICogQ29uY2VwdCBmcm9tOiBodHRwOi8vcGF1bGJha2F1cy5jb20vdHV0b3JpYWxzL2h0bWw1L3dlYi1hdWRpby1vbi1pb3MvXG4gICAgICogQHJldHVybiB7SG93bGVyfVxuICAgICAqL1xuICAgIF9lbmFibGVpT1NBdWRpbzogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG9ubHkgcnVuIHRoaXMgb24gaU9TIGlmIGF1ZGlvIGlzbid0IGFscmVhZHkgZWFuYmxlZFxuICAgICAgaWYgKGN0eCAmJiAoc2VsZi5faU9TRW5hYmxlZCB8fCAhL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNlbGYuX2lPU0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgLy8gY2FsbCB0aGlzIG1ldGhvZCBvbiB0b3VjaCBzdGFydCB0byBjcmVhdGUgYW5kIHBsYXkgYSBidWZmZXIsXG4gICAgICAvLyB0aGVuIGNoZWNrIGlmIHRoZSBhdWRpbyBhY3R1YWxseSBwbGF5ZWQgdG8gZGV0ZXJtaW5lIGlmXG4gICAgICAvLyBhdWRpbyBoYXMgbm93IGJlZW4gdW5sb2NrZWQgb24gaU9TXG4gICAgICB2YXIgdW5sb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBidWZmZXJcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGN0eC5jcmVhdGVCdWZmZXIoMSwgMSwgMjIwNTApO1xuICAgICAgICB2YXIgc291cmNlID0gY3R4LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICBzb3VyY2UuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuXG4gICAgICAgIC8vIHBsYXkgdGhlIGVtcHR5IGJ1ZmZlclxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZS5zdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBzb3VyY2Uubm90ZU9uKDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNvdXJjZS5zdGFydCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldHVwIGEgdGltZW91dCB0byBjaGVjayB0aGF0IHdlIGFyZSB1bmxvY2tlZCBvbiB0aGUgbmV4dCBldmVudCBsb29wXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKChzb3VyY2UucGxheWJhY2tTdGF0ZSA9PT0gc291cmNlLlBMQVlJTkdfU1RBVEUgfHwgc291cmNlLnBsYXliYWNrU3RhdGUgPT09IHNvdXJjZS5GSU5JU0hFRF9TVEFURSkpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgdW5sb2NrZWQgc3RhdGUgYW5kIHByZXZlbnQgdGhpcyBjaGVjayBmcm9tIGhhcHBlbmluZyBhZ2FpblxuICAgICAgICAgICAgc2VsZi5faU9TRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmlPU0F1dG9FbmFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHRoZSB0b3VjaCBzdGFydCBsaXN0ZW5lclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHNldHVwIGEgdG91Y2ggc3RhcnQgbGlzdGVuZXIgdG8gYXR0ZW1wdCBhbiB1bmxvY2sgaW5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9jaywgZmFsc2UpO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gIH07XG5cbiAgLy8gY2hlY2sgZm9yIGJyb3dzZXIgY29kZWMgc3VwcG9ydFxuICB2YXIgYXVkaW9UZXN0ID0gbnVsbDtcbiAgdmFyIGNvZGVjcyA9IHt9O1xuICBpZiAoIW5vQXVkaW8pIHtcbiAgICBhdWRpb1Rlc3QgPSBuZXcgQXVkaW8oKTtcbiAgICBjb2RlY3MgPSB7XG4gICAgICBtcDM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9tcGVnOycpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBvcHVzOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLywgJycpLFxuICAgICAgb2dnOiAhIWF1ZGlvVGVzdC5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICB3YXY6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpLnJlcGxhY2UoL15ubyQvLCAnJyksXG4gICAgICBhYWM6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby9hYWM7JykucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG00YTogISEoYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby94LW00YTsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL200YTsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIG1wNDogISEoYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby94LW1wNDsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL21wNDsnKSB8fCBhdWRpb1Rlc3QuY2FuUGxheVR5cGUoJ2F1ZGlvL2FhYzsnKSkucmVwbGFjZSgvXm5vJC8sICcnKSxcbiAgICAgIHdlYmE6ICEhYXVkaW9UZXN0LmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLCAnJylcbiAgICB9O1xuICB9XG5cbiAgLy8gYWxsb3cgYWNjZXNzIHRvIHRoZSBnbG9iYWwgYXVkaW8gY29udHJvbHNcbiAgdmFyIEhvd2xlciA9IG5ldyBIb3dsZXJHbG9iYWwoY29kZWNzKTtcblxuICAvLyBzZXR1cCB0aGUgYXVkaW8gb2JqZWN0XG4gIHZhciBIb3dsID0gZnVuY3Rpb24obykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIHNldHVwIHRoZSBkZWZhdWx0c1xuICAgIHNlbGYuX2F1dG9wbGF5ID0gby5hdXRvcGxheSB8fCBmYWxzZTtcbiAgICBzZWxmLl9idWZmZXIgPSBvLmJ1ZmZlciB8fCBmYWxzZTtcbiAgICBzZWxmLl9kdXJhdGlvbiA9IG8uZHVyYXRpb24gfHwgMDtcbiAgICBzZWxmLl9mb3JtYXQgPSBvLmZvcm1hdCB8fCBudWxsO1xuICAgIHNlbGYuX2xvb3AgPSBvLmxvb3AgfHwgZmFsc2U7XG4gICAgc2VsZi5fbG9hZGVkID0gZmFsc2U7XG4gICAgc2VsZi5fc3ByaXRlID0gby5zcHJpdGUgfHwge307XG4gICAgc2VsZi5fc3JjID0gby5zcmMgfHwgJyc7XG4gICAgc2VsZi5fcG9zM2QgPSBvLnBvczNkIHx8IFswLCAwLCAtMC41XTtcbiAgICBzZWxmLl92b2x1bWUgPSBvLnZvbHVtZSAhPT0gdW5kZWZpbmVkID8gby52b2x1bWUgOiAxO1xuICAgIHNlbGYuX3VybHMgPSBvLnVybHMgfHwgW107XG4gICAgc2VsZi5fcmF0ZSA9IG8ucmF0ZSB8fCAxO1xuXG4gICAgLy8gYWxsb3cgZm9yY2luZyBvZiBhIHNwZWNpZmljIHBhbm5pbmdNb2RlbCAoJ2VxdWFscG93ZXInIG9yICdIUlRGJyksXG4gICAgLy8gaWYgbm9uZSBpcyBzcGVjaWZpZWQsIGRlZmF1bHRzIHRvICdlcXVhbHBvd2VyJyBhbmQgc3dpdGNoZXMgdG8gJ0hSVEYnXG4gICAgLy8gaWYgM2Qgc291bmQgaXMgdXNlZFxuICAgIHNlbGYuX21vZGVsID0gby5tb2RlbCB8fCBudWxsO1xuXG4gICAgLy8gc2V0dXAgZXZlbnQgZnVuY3Rpb25zXG4gICAgc2VsZi5fb25sb2FkID0gW28ub25sb2FkIHx8IGZ1bmN0aW9uKCkge31dO1xuICAgIHNlbGYuX29ubG9hZGVycm9yID0gW28ub25sb2FkZXJyb3IgfHwgZnVuY3Rpb24oKSB7fV07XG4gICAgc2VsZi5fb25lbmQgPSBbby5vbmVuZCB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbnBhdXNlID0gW28ub25wYXVzZSB8fCBmdW5jdGlvbigpIHt9XTtcbiAgICBzZWxmLl9vbnBsYXkgPSBbby5vbnBsYXkgfHwgZnVuY3Rpb24oKSB7fV07XG5cbiAgICBzZWxmLl9vbmVuZFRpbWVyID0gW107XG5cbiAgICAvLyBXZWIgQXVkaW8gb3IgSFRNTDUgQXVkaW8/XG4gICAgc2VsZi5fd2ViQXVkaW8gPSB1c2luZ1dlYkF1ZGlvICYmICFzZWxmLl9idWZmZXI7XG5cbiAgICAvLyBjaGVjayBpZiB3ZSBuZWVkIHRvIGZhbGwgYmFjayB0byBIVE1MNSBBdWRpb1xuICAgIHNlbGYuX2F1ZGlvTm9kZSA9IFtdO1xuICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgc2VsZi5fc2V0dXBBdWRpb05vZGUoKTtcbiAgICB9XG5cbiAgICAvLyBhdXRvbWF0aWNhbGx5IHRyeSB0byBlbmFibGUgYXVkaW8gb24gaU9TXG4gICAgaWYgKHR5cGVvZiBjdHggIT09ICd1bmRlZmluZWQnICYmIGN0eCAmJiBIb3dsZXIuaU9TQXV0b0VuYWJsZSkge1xuICAgICAgSG93bGVyLl9lbmFibGVpT1NBdWRpbygpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGlzIHRvIGFuIGFycmF5IG9mIEhvd2wncyB0byBhbGxvdyBnbG9iYWwgY29udHJvbFxuICAgIEhvd2xlci5faG93bHMucHVzaChzZWxmKTtcblxuICAgIC8vIGxvYWQgdGhlIHRyYWNrXG4gICAgc2VsZi5sb2FkKCk7XG4gIH07XG5cbiAgLy8gc2V0dXAgYWxsIG9mIHRoZSBtZXRob2RzXG4gIEhvd2wucHJvdG90eXBlID0ge1xuICAgIC8qKlxuICAgICAqIExvYWQgYW4gYXVkaW8gZmlsZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICB1cmwgPSBudWxsO1xuXG4gICAgICAvLyBpZiBubyBhdWRpbyBpcyBhdmFpbGFibGUsIHF1aXQgaW1tZWRpYXRlbHlcbiAgICAgIGlmIChub0F1ZGlvKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWRlcnJvcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBzb3VyY2UgVVJMcyBhbmQgcGljayB0aGUgZmlyc3Qgb25lIHRoYXQgaXMgY29tcGF0aWJsZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX3VybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGV4dCwgdXJsSXRlbTtcblxuICAgICAgICBpZiAoc2VsZi5fZm9ybWF0KSB7XG4gICAgICAgICAgLy8gdXNlIHNwZWNpZmllZCBhdWRpbyBmb3JtYXQgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgZXh0ID0gc2VsZi5fZm9ybWF0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgdGhlIGZpbGV0eXBlICh3aGV0aGVyIGFuIGV4dGVuc2lvbiBvciBiYXNlNjQgZGF0YSlcbiAgICAgICAgICB1cmxJdGVtID0gc2VsZi5fdXJsc1tpXTtcbiAgICAgICAgICBleHQgPSAvXmRhdGE6YXVkaW9cXC8oW147LF0rKTsvaS5leGVjKHVybEl0ZW0pO1xuICAgICAgICAgIGlmICghZXh0KSB7XG4gICAgICAgICAgICBleHQgPSAvXFwuKFteLl0rKSQvLmV4ZWModXJsSXRlbS5zcGxpdCgnPycsIDEpWzBdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZXh0KSB7XG4gICAgICAgICAgICBleHQgPSBleHRbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGVjc1tleHRdKSB7XG4gICAgICAgICAgdXJsID0gc2VsZi5fdXJsc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXVybCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkZXJyb3InKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9zcmMgPSB1cmw7XG5cbiAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICBsb2FkQnVmZmVyKHNlbGYsIHVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3Tm9kZSA9IG5ldyBBdWRpbygpO1xuXG4gICAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIHdpdGggSFRNTDUgYXVkaW8gKGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvc3BlYy5odG1sI21lZGlhZXJyb3IpXG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKG5ld05vZGUuZXJyb3IgJiYgbmV3Tm9kZS5lcnJvci5jb2RlID09PSA0KSB7XG4gICAgICAgICAgICBIb3dsZXJHbG9iYWwubm9BdWRpbyA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VsZi5vbignbG9hZGVycm9yJywge3R5cGU6IG5ld05vZGUuZXJyb3IgPyBuZXdOb2RlLmVycm9yLmNvZGUgOiAwfSk7XG4gICAgICAgIH0sIGZhbHNlKTtcblxuICAgICAgICBzZWxmLl9hdWRpb05vZGUucHVzaChuZXdOb2RlKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgbmV3IGF1ZGlvIG5vZGVcbiAgICAgICAgbmV3Tm9kZS5zcmMgPSB1cmw7XG4gICAgICAgIG5ld05vZGUuX3BvcyA9IDA7XG4gICAgICAgIG5ld05vZGUucHJlbG9hZCA9ICdhdXRvJztcbiAgICAgICAgbmV3Tm9kZS52b2x1bWUgPSAoSG93bGVyLl9tdXRlZCkgPyAwIDogc2VsZi5fdm9sdW1lICogSG93bGVyLnZvbHVtZSgpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBldmVudCBsaXN0ZW5lciB0byBzdGFydCBwbGF5aW5nIHRoZSBzb3VuZFxuICAgICAgICAvLyBhcyBzb29uIGFzIGl0IGhhcyBidWZmZXJlZCBlbm91Z2hcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gcm91bmQgdXAgdGhlIGR1cmF0aW9uIHdoZW4gdXNpbmcgSFRNTDUgQXVkaW8gdG8gYWNjb3VudCBmb3IgdGhlIGxvd2VyIHByZWNpc2lvblxuICAgICAgICAgIHNlbGYuX2R1cmF0aW9uID0gTWF0aC5jZWlsKG5ld05vZGUuZHVyYXRpb24gKiAxMCkgLyAxMDtcblxuICAgICAgICAgIC8vIHNldHVwIGEgc3ByaXRlIGlmIG5vbmUgaXMgZGVmaW5lZFxuICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZWxmLl9zcHJpdGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VsZi5fc3ByaXRlID0ge19kZWZhdWx0OiBbMCwgc2VsZi5fZHVyYXRpb24gKiAxMDAwXX07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgICAgIHNlbGYuX2xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLm9uKCdsb2FkJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYuX2F1dG9wbGF5KSB7XG4gICAgICAgICAgICBzZWxmLnBsYXkoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjbGVhciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICBuZXdOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbmV3Tm9kZS5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgIG5ld05vZGUubG9hZCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0L3NldCB0aGUgVVJMcyB0byBiZSBwdWxsZWQgZnJvbSB0byBwbGF5IGluIHRoaXMgc291cmNlLlxuICAgICAqIEBwYXJhbSAge0FycmF5fSB1cmxzICBBcnJ5IG9mIFVSTHMgdG8gbG9hZCBmcm9tXG4gICAgICogQHJldHVybiB7SG93bH0gICAgICAgIFJldHVybnMgc2VsZiBvciB0aGUgY3VycmVudCBVUkxzXG4gICAgICovXG4gICAgdXJsczogZnVuY3Rpb24odXJscykge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICBpZiAodXJscykge1xuICAgICAgICBzZWxmLnN0b3AoKTtcbiAgICAgICAgc2VsZi5fdXJscyA9ICh0eXBlb2YgdXJscyA9PT0gJ3N0cmluZycpID8gW3VybHNdIDogdXJscztcbiAgICAgICAgc2VsZi5fbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHNlbGYubG9hZCgpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3VybHM7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgYSBzb3VuZCBmcm9tIHRoZSBjdXJyZW50IHRpbWUgKDAgYnkgZGVmYXVsdCkuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgIHNwcml0ZSAgIChvcHRpb25hbCkgUGxheXMgZnJvbSB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSBzb3VuZCBzcHJpdGUgZGVmaW5pdGlvbi5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgKG9wdGlvbmFsKSBSZXR1cm5zIHRoZSB1bmlxdWUgcGxheWJhY2sgaWQgZm9yIHRoaXMgc291bmQgaW5zdGFuY2UuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBwbGF5OiBmdW5jdGlvbihzcHJpdGUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIGlmIG5vIHNwcml0ZSB3YXMgcGFzc2VkIGJ1dCBhIGNhbGxiYWNrIHdhcywgdXBkYXRlIHRoZSB2YXJpYWJsZXNcbiAgICAgIGlmICh0eXBlb2Ygc3ByaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gc3ByaXRlO1xuICAgICAgfVxuXG4gICAgICAvLyB1c2UgdGhlIGRlZmF1bHQgc3ByaXRlIGlmIG5vbmUgaXMgcGFzc2VkXG4gICAgICBpZiAoIXNwcml0ZSB8fCB0eXBlb2Ygc3ByaXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHNwcml0ZSA9ICdfZGVmYXVsdCc7XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBsYXkoc3ByaXRlLCBjYWxsYmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB0aGUgc3ByaXRlIGRvZXNuJ3QgZXhpc3QsIHBsYXkgbm90aGluZ1xuICAgICAgaWYgKCFzZWxmLl9zcHJpdGVbc3ByaXRlXSkge1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRoZSBub2RlIHRvIHBsYXliYWNrXG4gICAgICBzZWxmLl9pbmFjdGl2ZU5vZGUoZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAvLyBwZXJzaXN0IHRoZSBzcHJpdGUgYmVpbmcgcGxheWVkXG4gICAgICAgIG5vZGUuX3Nwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hlcmUgdG8gc3RhcnQgcGxheWluZyBmcm9tXG4gICAgICAgIHZhciBwb3MgPSAobm9kZS5fcG9zID4gMCkgPyBub2RlLl9wb3MgOiBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDA7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGhvdyBsb25nIHRvIHBsYXkgZm9yXG4gICAgICAgIHZhciBkdXJhdGlvbiA9IDA7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGR1cmF0aW9uID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwIC0gbm9kZS5fcG9zO1xuICAgICAgICAgIGlmIChub2RlLl9wb3MgPiAwKSB7XG4gICAgICAgICAgICBwb3MgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVswXSAvIDEwMDAgKyBwb3M7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGR1cmF0aW9uID0gc2VsZi5fc3ByaXRlW3Nwcml0ZV1bMV0gLyAxMDAwIC0gKHBvcyAtIHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgdGhpcyBzb3VuZCBzaG91bGQgYmUgbG9vcGVkXG4gICAgICAgIHZhciBsb29wID0gISEoc2VsZi5fbG9vcCB8fCBzZWxmLl9zcHJpdGVbc3ByaXRlXVsyXSk7XG5cbiAgICAgICAgLy8gc2V0IHRpbWVyIHRvIGZpcmUgdGhlICdvbmVuZCcgZXZlbnRcbiAgICAgICAgdmFyIHNvdW5kSWQgPSAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykgPyBjYWxsYmFjayA6IE1hdGgucm91bmQoRGF0ZS5ub3coKSAqIE1hdGgucmFuZG9tKCkpICsgJycsXG4gICAgICAgICAgdGltZXJJZDtcbiAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgaWQ6IHNvdW5kSWQsXG4gICAgICAgICAgICBzcHJpdGU6IHNwcml0ZSxcbiAgICAgICAgICAgIGxvb3A6IGxvb3BcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWYgbG9vcGluZywgcmVzdGFydCB0aGUgdHJhY2tcbiAgICAgICAgICAgIGlmICghc2VsZi5fd2ViQXVkaW8gJiYgbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLnN0b3AoZGF0YS5pZCkucGxheShzcHJpdGUsIGRhdGEuaWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzZXQgd2ViIGF1ZGlvIG5vZGUgdG8gcGF1c2VkIGF0IGVuZFxuICAgICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvICYmICFsb29wKSB7XG4gICAgICAgICAgICAgIHNlbGYuX25vZGVCeUlkKGRhdGEuaWQpLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuX25vZGVCeUlkKGRhdGEuaWQpLl9wb3MgPSAwO1xuXG4gICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBlbmQgdGltZXJcbiAgICAgICAgICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihkYXRhLmlkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZW5kIHRoZSB0cmFjayBpZiBpdCBpcyBIVE1MIGF1ZGlvIGFuZCBhIHNwcml0ZVxuICAgICAgICAgICAgaWYgKCFzZWxmLl93ZWJBdWRpbyAmJiAhbG9vcCkge1xuICAgICAgICAgICAgICBzZWxmLnN0b3AoZGF0YS5pZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpcmUgZW5kZWQgZXZlbnRcbiAgICAgICAgICAgIHNlbGYub24oJ2VuZCcsIHNvdW5kSWQpO1xuICAgICAgICAgIH0sIGR1cmF0aW9uICogMTAwMCk7XG5cbiAgICAgICAgICAvLyBzdG9yZSB0aGUgcmVmZXJlbmNlIHRvIHRoZSB0aW1lclxuICAgICAgICAgIHNlbGYuX29uZW5kVGltZXIucHVzaCh7dGltZXI6IHRpbWVySWQsIGlkOiBkYXRhLmlkfSk7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgdmFyIGxvb3BTdGFydCA9IHNlbGYuX3Nwcml0ZVtzcHJpdGVdWzBdIC8gMTAwMCxcbiAgICAgICAgICAgIGxvb3BFbmQgPSBzZWxmLl9zcHJpdGVbc3ByaXRlXVsxXSAvIDEwMDA7XG5cbiAgICAgICAgICAvLyBzZXQgdGhlIHBsYXkgaWQgdG8gdGhpcyBub2RlIGFuZCBsb2FkIGludG8gY29udGV4dFxuICAgICAgICAgIG5vZGUuaWQgPSBzb3VuZElkO1xuICAgICAgICAgIG5vZGUucGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgcmVmcmVzaEJ1ZmZlcihzZWxmLCBbbG9vcCwgbG9vcFN0YXJ0LCBsb29wRW5kXSwgc291bmRJZCk7XG4gICAgICAgICAgc2VsZi5fcGxheVN0YXJ0ID0gY3R4LmN1cnJlbnRUaW1lO1xuICAgICAgICAgIG5vZGUuZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBsb29wID8gbm9kZS5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCwgcG9zLCA4NjQwMCkgOiBub2RlLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLCBwb3MsIGR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbG9vcCA/IG5vZGUuYnVmZmVyU291cmNlLnN0YXJ0KDAsIHBvcywgODY0MDApIDogbm9kZS5idWZmZXJTb3VyY2Uuc3RhcnQoMCwgcG9zLCBkdXJhdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChub2RlLnJlYWR5U3RhdGUgPT09IDQgfHwgIW5vZGUucmVhZHlTdGF0ZSAmJiBuYXZpZ2F0b3IuaXNDb2Nvb25KUykge1xuICAgICAgICAgICAgbm9kZS5yZWFkeVN0YXRlID0gNDtcbiAgICAgICAgICAgIG5vZGUuaWQgPSBzb3VuZElkO1xuICAgICAgICAgICAgbm9kZS5jdXJyZW50VGltZSA9IHBvcztcbiAgICAgICAgICAgIG5vZGUubXV0ZWQgPSBIb3dsZXIuX211dGVkIHx8IG5vZGUubXV0ZWQ7XG4gICAgICAgICAgICBub2RlLnZvbHVtZSA9IHNlbGYuX3ZvbHVtZSAqIEhvd2xlci52b2x1bWUoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IG5vZGUucGxheSgpOyB9LCAwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihzb3VuZElkKTtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHZhciBzb3VuZCA9IHNlbGYsXG4gICAgICAgICAgICAgICAgcGxheVNwcml0ZSA9IHNwcml0ZSxcbiAgICAgICAgICAgICAgICBmbiA9IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIG5ld05vZGUgPSBub2RlO1xuICAgICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzb3VuZC5wbGF5KHBsYXlTcHJpdGUsIGZuKTtcblxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIG5ld05vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBuZXdOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXl0aHJvdWdoJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpcmUgdGhlIHBsYXkgZXZlbnQgYW5kIHNlbmQgdGhlIHNvdW5kSWQgYmFjayBpbiB0aGUgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5vbigncGxheScpO1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjayhzb3VuZElkKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGF1c2UgcGxheWJhY2sgYW5kIHNhdmUgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBwYXVzZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucGF1c2UoaWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH1cblxuICAgICAgLy8gY2xlYXIgJ29uZW5kJyB0aW1lclxuICAgICAgc2VsZi5fY2xlYXJFbmRUaW1lcihpZCk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IHNlbGYucG9zKG51bGwsIGlkKTtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNvdW5kIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5vZGUuYnVmZmVyU291cmNlIHx8IGFjdGl2ZU5vZGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHNlbGYub24oJ3BhdXNlJyk7XG5cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wIHBsYXliYWNrIGFuZCByZXNldCB0byBzdGFydC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYuc3RvcChpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBjbGVhciAnb25lbmQnIHRpbWVyXG4gICAgICBzZWxmLl9jbGVhckVuZFRpbWVyKGlkKTtcblxuICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgYWN0aXZlTm9kZS5fcG9zID0gMDtcblxuICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIHNvdW5kIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgICAgICBpZiAoIWFjdGl2ZU5vZGUuYnVmZmVyU291cmNlIHx8IGFjdGl2ZU5vZGUucGF1c2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZU5vZGUuYnVmZmVyU291cmNlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVOb2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oYWN0aXZlTm9kZS5kdXJhdGlvbikpIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLnBhdXNlKCk7XG4gICAgICAgICAgYWN0aXZlTm9kZS5jdXJyZW50VGltZSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE11dGUgdGhpcyBzb3VuZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIChvcHRpb25hbCkgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBtdXRlOiBmdW5jdGlvbihpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdwbGF5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5tdXRlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWN0aXZlTm9kZS5tdXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVubXV0ZSB0aGlzIHNvdW5kLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIHVubXV0ZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gaWYgdGhlIHNvdW5kIGhhc24ndCBiZWVuIGxvYWRlZCwgYWRkIGl0IHRvIHRoZSBldmVudCBxdWV1ZVxuICAgICAgaWYgKCFzZWxmLl9sb2FkZWQpIHtcbiAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYudW5tdXRlKGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChzZWxmLl93ZWJBdWRpbykge1xuICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOb2RlLm11dGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdm9sdW1lIG9mIHRoaXMgc291bmQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB2b2wgVm9sdW1lIGZyb20gMC4wIHRvIDEuMC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2wvRmxvYXR9ICAgICBSZXR1cm5zIHNlbGYgb3IgY3VycmVudCB2b2x1bWUuXG4gICAgICovXG4gICAgdm9sdW1lOiBmdW5jdGlvbih2b2wsIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB2b2x1bWUgaXMgYSBudW1iZXJcbiAgICAgIHZvbCA9IHBhcnNlRmxvYXQodm9sKTtcblxuICAgICAgaWYgKHZvbCA+PSAwICYmIHZvbCA8PSAxKSB7XG4gICAgICAgIHNlbGYuX3ZvbHVtZSA9IHZvbDtcblxuICAgICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgICAgc2VsZi5vbigncGxheScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2VsZi52b2x1bWUodm9sLCBpZCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgICAgaWYgKGFjdGl2ZU5vZGUpIHtcbiAgICAgICAgICBpZiAoc2VsZi5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUuZ2Fpbi52YWx1ZSA9IHZvbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWN0aXZlTm9kZS52b2x1bWUgPSB2b2wgKiBIb3dsZXIudm9sdW1lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5fdm9sdW1lO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQvc2V0IHdoZXRoZXIgdG8gbG9vcCB0aGUgc291bmQuXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gbG9vcCBUbyBsb29wIG9yIG5vdCB0byBsb29wLCB0aGF0IGlzIHRoZSBxdWVzdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Jvb2xlYW59ICAgICAgUmV0dXJucyBzZWxmIG9yIGN1cnJlbnQgbG9vcGluZyB2YWx1ZS5cbiAgICAgKi9cbiAgICBsb29wOiBmdW5jdGlvbihsb29wKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgbG9vcCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHNlbGYuX2xvb3AgPSBsb29wO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX2xvb3A7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgc291bmQgc3ByaXRlIGRlZmluaXRpb24uXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBzcHJpdGUgRXhhbXBsZToge3Nwcml0ZU5hbWU6IFtvZmZzZXQsIGR1cmF0aW9uLCBsb29wXX1cbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0ludGVnZXJ9IG9mZnNldCAgIFdoZXJlIHRvIGJlZ2luIHBsYXliYWNrIGluIG1pbGxpc2Vjb25kc1xuICAgICAqICAgICAgICAgICAgICAgIEBwYXJhbSB7SW50ZWdlcn0gZHVyYXRpb24gSG93IGxvbmcgdG8gcGxheSBpbiBtaWxsaXNlY29uZHNcbiAgICAgKiAgICAgICAgICAgICAgICBAcGFyYW0ge0Jvb2xlYW59IGxvb3AgICAgIChvcHRpb25hbCkgU2V0IHRydWUgdG8gbG9vcCB0aGlzIHNwcml0ZVxuICAgICAqIEByZXR1cm4ge0hvd2x9ICAgICAgICBSZXR1cm5zIGN1cnJlbnQgc3ByaXRlIHNoZWV0IG9yIHNlbGYuXG4gICAgICovXG4gICAgc3ByaXRlOiBmdW5jdGlvbihzcHJpdGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBzcHJpdGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHNlbGYuX3Nwcml0ZSA9IHNwcml0ZTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZWxmLl9zcHJpdGU7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIHBvc2l0aW9uIG9mIHBsYXliYWNrLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgcG9zIFRoZSBwb3NpdGlvbiB0byBtb3ZlIGN1cnJlbnQgcGxheWJhY2sgdG8uXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSBpZCAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0Zsb2F0fSAgICAgIFJldHVybnMgc2VsZiBvciBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHBvczogZnVuY3Rpb24ocG9zLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5wb3MocG9zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBwb3MgPT09ICdudW1iZXInID8gc2VsZiA6IHNlbGYuX3BvcyB8fCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBtYWtlIHN1cmUgd2UgYXJlIGRlYWxpbmcgd2l0aCBhIG51bWJlciBmb3IgcG9zXG4gICAgICBwb3MgPSBwYXJzZUZsb2F0KHBvcyk7XG5cbiAgICAgIHZhciBhY3RpdmVOb2RlID0gKGlkKSA/IHNlbGYuX25vZGVCeUlkKGlkKSA6IHNlbGYuX2FjdGl2ZU5vZGUoKTtcbiAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgIGlmIChwb3MgPj0gMCkge1xuICAgICAgICAgIHNlbGYucGF1c2UoaWQpO1xuICAgICAgICAgIGFjdGl2ZU5vZGUuX3BvcyA9IHBvcztcbiAgICAgICAgICBzZWxmLnBsYXkoYWN0aXZlTm9kZS5fc3ByaXRlLCBpZCk7XG5cbiAgICAgICAgICByZXR1cm4gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5fd2ViQXVkaW8gPyBhY3RpdmVOb2RlLl9wb3MgKyAoY3R4LmN1cnJlbnRUaW1lIC0gc2VsZi5fcGxheVN0YXJ0KSA6IGFjdGl2ZU5vZGUuY3VycmVudFRpbWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocG9zID49IDApIHtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbmFjdGl2ZSBub2RlIHRvIHJldHVybiB0aGUgcG9zIGZvclxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQgJiYgc2VsZi5fYXVkaW9Ob2RlW2ldLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiAoc2VsZi5fd2ViQXVkaW8pID8gc2VsZi5fYXVkaW9Ob2RlW2ldLl9wb3MgOiBzZWxmLl9hdWRpb05vZGVbaV0uY3VycmVudFRpbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldC9zZXQgdGhlIDNEIHBvc2l0aW9uIG9mIHRoZSBhdWRpbyBzb3VyY2UuXG4gICAgICogVGhlIG1vc3QgY29tbW9uIHVzYWdlIGlzIHRvIHNldCB0aGUgJ3gnIHBvc2l0aW9uXG4gICAgICogdG8gYWZmZWN0IHRoZSBsZWZ0L3JpZ2h0IGVhciBwYW5uaW5nLiBTZXR0aW5nIGFueSB2YWx1ZSBoaWdoZXIgdGhhblxuICAgICAqIDEuMCB3aWxsIGJlZ2luIHRvIGRlY3JlYXNlIHRoZSB2b2x1bWUgb2YgdGhlIHNvdW5kIGFzIGl0IG1vdmVzIGZ1cnRoZXIgYXdheS5cbiAgICAgKiBOT1RFOiBUaGlzIG9ubHkgd29ya3Mgd2l0aCBXZWIgQXVkaW8gQVBJLCBIVE1MNSBBdWRpbyBwbGF5YmFja1xuICAgICAqIHdpbGwgbm90IGJlIGFmZmVjdGVkLlxuICAgICAqIEBwYXJhbSAge0Zsb2F0fSAgeCAgVGhlIHgtcG9zaXRpb24gb2YgdGhlIHBsYXliYWNrIGZyb20gLTEwMDAuMCB0byAxMDAwLjBcbiAgICAgKiBAcGFyYW0gIHtGbG9hdH0gIHkgIFRoZSB5LXBvc2l0aW9uIG9mIHRoZSBwbGF5YmFjayBmcm9tIC0xMDAwLjAgdG8gMTAwMC4wXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICB6ICBUaGUgei1wb3NpdGlvbiBvZiB0aGUgcGxheWJhY2sgZnJvbSAtMTAwMC4wIHRvIDEwMDAuMFxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsL0FycmF5fSAgIFJldHVybnMgc2VsZiBvciB0aGUgY3VycmVudCAzRCBwb3NpdGlvbjogW3gsIHksIHpdXG4gICAgICovXG4gICAgcG9zM2Q6IGZ1bmN0aW9uKHgsIHksIHosIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIHNldCBhIGRlZmF1bHQgZm9yIHRoZSBvcHRpb25hbCAneScgJiAneidcbiAgICAgIHkgPSAodHlwZW9mIHkgPT09ICd1bmRlZmluZWQnIHx8ICF5KSA/IDAgOiB5O1xuICAgICAgeiA9ICh0eXBlb2YgeiA9PT0gJ3VuZGVmaW5lZCcgfHwgIXopID8gLTAuNSA6IHo7XG5cbiAgICAgIC8vIGlmIHRoZSBzb3VuZCBoYXNuJ3QgYmVlbiBsb2FkZWQsIGFkZCBpdCB0byB0aGUgZXZlbnQgcXVldWVcbiAgICAgIGlmICghc2VsZi5fbG9hZGVkKSB7XG4gICAgICAgIHNlbGYub24oJ3BsYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnBvczNkKHgsIHksIHosIGlkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICB9XG5cbiAgICAgIGlmICh4ID49IDAgfHwgeCA8IDApIHtcbiAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgdmFyIGFjdGl2ZU5vZGUgPSAoaWQpID8gc2VsZi5fbm9kZUJ5SWQoaWQpIDogc2VsZi5fYWN0aXZlTm9kZSgpO1xuICAgICAgICAgIGlmIChhY3RpdmVOb2RlKSB7XG4gICAgICAgICAgICBzZWxmLl9wb3MzZCA9IFt4LCB5LCB6XTtcbiAgICAgICAgICAgIGFjdGl2ZU5vZGUucGFubmVyLnNldFBvc2l0aW9uKHgsIHksIHopO1xuICAgICAgICAgICAgYWN0aXZlTm9kZS5wYW5uZXIucGFubmluZ01vZGVsID0gc2VsZi5fbW9kZWwgfHwgJ0hSVEYnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuX3BvczNkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRmFkZSBhIGN1cnJlbnRseSBwbGF5aW5nIHNvdW5kIGJldHdlZW4gdHdvIHZvbHVtZXMuXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSAgIGZyb20gICAgIFRoZSB2b2x1bWUgdG8gZmFkZSBmcm9tICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgdG8gICAgICAgVGhlIHZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgKG9wdGlvbmFsKSBGaXJlZCB3aGVuIHRoZSBmYWRlIGlzIGNvbXBsZXRlLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBpZCAgICAgICAob3B0aW9uYWwpIFRoZSBwbGF5IGluc3RhbmNlIElELlxuICAgICAqIEByZXR1cm4ge0hvd2x9XG4gICAgICovXG4gICAgZmFkZTogZnVuY3Rpb24oZnJvbSwgdG8sIGxlbiwgY2FsbGJhY2ssIGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGRpZmYgPSBNYXRoLmFicyhmcm9tIC0gdG8pLFxuICAgICAgICBkaXIgPSBmcm9tID4gdG8gPyAnZG93bicgOiAndXAnLFxuICAgICAgICBzdGVwcyA9IGRpZmYgLyAwLjAxLFxuICAgICAgICBzdGVwVGltZSA9IGxlbiAvIHN0ZXBzO1xuXG4gICAgICAvLyBpZiB0aGUgc291bmQgaGFzbid0IGJlZW4gbG9hZGVkLCBhZGQgaXQgdG8gdGhlIGV2ZW50IHF1ZXVlXG4gICAgICBpZiAoIXNlbGYuX2xvYWRlZCkge1xuICAgICAgICBzZWxmLm9uKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi5mYWRlKGZyb20sIHRvLCBsZW4sIGNhbGxiYWNrLCBpZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIHZvbHVtZSB0byB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgIHNlbGYudm9sdW1lKGZyb20sIGlkKTtcblxuICAgICAgZm9yICh2YXIgaT0xOyBpPD1zdGVwczsgaSsrKSB7XG4gICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2hhbmdlID0gc2VsZi5fdm9sdW1lICsgKGRpciA9PT0gJ3VwJyA/IDAuMDEgOiAtMC4wMSkgKiBpLFxuICAgICAgICAgICAgdm9sID0gTWF0aC5yb3VuZCgxMDAwICogY2hhbmdlKSAvIDEwMDAsXG4gICAgICAgICAgICB0b1ZvbCA9IHRvO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlbGYudm9sdW1lKHZvbCwgaWQpO1xuXG4gICAgICAgICAgICBpZiAodm9sID09PSB0b1ZvbCkge1xuICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgc3RlcFRpbWUgKiBpKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogW0RFUFJFQ0FURURdIEZhZGUgaW4gdGhlIGN1cnJlbnQgc291bmQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICAgIHRvICAgICAgVm9sdW1lIHRvIGZhZGUgdG8gKDAuMCB0byAxLjApLlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gICBsZW4gICAgIFRpbWUgaW4gbWlsbGlzZWNvbmRzIHRvIGZhZGUuXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBmYWRlSW46IGZ1bmN0aW9uKHRvLCBsZW4sIGNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gdGhpcy52b2x1bWUoMCkucGxheSgpLmZhZGUoMCwgdG8sIGxlbiwgY2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBbREVQUkVDQVRFRF0gRmFkZSBvdXQgdGhlIGN1cnJlbnQgc291bmQgYW5kIHBhdXNlIHdoZW4gZmluaXNoZWQuXG4gICAgICogQHBhcmFtICB7RmxvYXR9ICAgIHRvICAgICAgIFZvbHVtZSB0byBmYWRlIHRvICgwLjAgdG8gMS4wKS5cbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICAgbGVuICAgICAgVGltZSBpbiBtaWxsaXNlY29uZHMgdG8gZmFkZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgaWQgICAgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIGZhZGVPdXQ6IGZ1bmN0aW9uKHRvLCBsZW4sIGNhbGxiYWNrLCBpZCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gc2VsZi5mYWRlKHNlbGYuX3ZvbHVtZSwgdG8sIGxlbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgc2VsZi5wYXVzZShpZCk7XG5cbiAgICAgICAgLy8gZmlyZSBlbmRlZCBldmVudFxuICAgICAgICBzZWxmLm9uKCdlbmQnKTtcbiAgICAgIH0sIGlkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGF1ZGlvIG5vZGUgYnkgSUQuXG4gICAgICogQHJldHVybiB7SG93bH0gQXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfbm9kZUJ5SWQ6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBzZWxmLl9hdWRpb05vZGVbMF07XG5cbiAgICAgIC8vIGZpbmQgdGhlIG5vZGUgd2l0aCB0aGlzIElEXG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9hdWRpb05vZGVbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgbm9kZSA9IHNlbGYuX2F1ZGlvTm9kZVtpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBhY3RpdmUgYXVkaW8gbm9kZS5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfSBBdWRpbyBub2RlLlxuICAgICAqL1xuICAgIF9hY3RpdmVOb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgbm9kZSA9IG51bGw7XG5cbiAgICAgIC8vIGZpbmQgdGhlIGZpcnN0IHBsYXlpbmcgbm9kZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlW2ldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIHNlbGYuX2RyYWluUG9vbCgpO1xuXG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBpbmFjdGl2ZSBhdWRpbyBub2RlLlxuICAgICAqIElmIHRoZXJlIGlzIG5vbmUsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcG9vbC5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHRoZSBhdWRpbyBub2RlIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIF9pbmFjdGl2ZU5vZGU6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIG5vZGUgPSBudWxsO1xuXG4gICAgICAvLyBmaW5kIGZpcnN0IGluYWN0aXZlIG5vZGUgdG8gcmVjeWNsZVxuICAgICAgZm9yICh2YXIgaT0wOyBpPHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2VsZi5fYXVkaW9Ob2RlW2ldLnBhdXNlZCAmJiBzZWxmLl9hdWRpb05vZGVbaV0ucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIC8vIHNlbmQgdGhlIG5vZGUgYmFjayBmb3IgdXNlIGJ5IHRoZSBuZXcgcGxheSBpbnN0YW5jZVxuICAgICAgICAgIGNhbGxiYWNrKHNlbGYuX2F1ZGlvTm9kZVtpXSk7XG4gICAgICAgICAgbm9kZSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBpbmFjdGl2ZSBub2Rlc1xuICAgICAgc2VsZi5fZHJhaW5Qb29sKCk7XG5cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIG5ldyBub2RlIGlmIHRoZXJlIGFyZSBubyBpbmFjdGl2ZXNcbiAgICAgIHZhciBuZXdOb2RlO1xuICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgIG5ld05vZGUgPSBzZWxmLl9zZXR1cEF1ZGlvTm9kZSgpO1xuICAgICAgICBjYWxsYmFjayhuZXdOb2RlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYubG9hZCgpO1xuICAgICAgICBuZXdOb2RlID0gc2VsZi5fYXVkaW9Ob2RlW3NlbGYuX2F1ZGlvTm9kZS5sZW5ndGggLSAxXTtcblxuICAgICAgICAvLyBsaXN0ZW4gZm9yIHRoZSBjb3JyZWN0IGxvYWQgZXZlbnQgYW5kIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgICAgIHZhciBsaXN0ZW5lckV2ZW50ID0gbmF2aWdhdG9yLmlzQ29jb29uSlMgPyAnY2FucGxheXRocm91Z2gnIDogJ2xvYWRlZG1ldGFkYXRhJztcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbmV3Tm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyRXZlbnQsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgY2FsbGJhY2sobmV3Tm9kZSk7XG4gICAgICAgIH07XG4gICAgICAgIG5ld05vZGUuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lckV2ZW50LCBsaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGVyZSBhcmUgbW9yZSB0aGFuIDUgaW5hY3RpdmUgYXVkaW8gbm9kZXMgaW4gdGhlIHBvb2wsIGNsZWFyIG91dCB0aGUgcmVzdC5cbiAgICAgKi9cbiAgICBfZHJhaW5Qb29sOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaW5hY3RpdmUgPSAwLFxuICAgICAgICBpO1xuXG4gICAgICAvLyBjb3VudCB0aGUgbnVtYmVyIG9mIGluYWN0aXZlIG5vZGVzXG4gICAgICBmb3IgKGk9MDsgaTxzZWxmLl9hdWRpb05vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICBpbmFjdGl2ZSsrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBleGNlc3MgaW5hY3RpdmUgbm9kZXNcbiAgICAgIGZvciAoaT1zZWxmLl9hdWRpb05vZGUubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgICBpZiAoaW5hY3RpdmUgPD0gNSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGYuX2F1ZGlvTm9kZVtpXS5wYXVzZWQpIHtcbiAgICAgICAgICAvLyBkaXNjb25uZWN0IHRoZSBhdWRpbyBzb3VyY2UgaWYgdXNpbmcgV2ViIEF1ZGlvXG4gICAgICAgICAgaWYgKHNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgICBzZWxmLl9hdWRpb05vZGVbaV0uZGlzY29ubmVjdCgwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpbmFjdGl2ZS0tO1xuICAgICAgICAgIHNlbGYuX2F1ZGlvTm9kZS5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgJ29uZW5kJyB0aW1lb3V0IGJlZm9yZSBpdCBlbmRzLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gc291bmRJZCAgVGhlIHBsYXkgaW5zdGFuY2UgSUQuXG4gICAgICovXG4gICAgX2NsZWFyRW5kVGltZXI6IGZ1bmN0aW9uKHNvdW5kSWQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaW5kZXggPSAwO1xuXG4gICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHRpbWVycyB0byBmaW5kIHRoZSBvbmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc291bmRcbiAgICAgIGZvciAodmFyIGk9MDsgaTxzZWxmLl9vbmVuZFRpbWVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZWxmLl9vbmVuZFRpbWVyW2ldLmlkID09PSBzb3VuZElkKSB7XG4gICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB0aW1lciA9IHNlbGYuX29uZW5kVGltZXJbaW5kZXhdO1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lci50aW1lcik7XG4gICAgICAgIHNlbGYuX29uZW5kVGltZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIGdhaW4gbm9kZSBhbmQgcGFubmVyIGZvciBhIFdlYiBBdWRpbyBpbnN0YW5jZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgYXVkaW8gbm9kZS5cbiAgICAgKi9cbiAgICBfc2V0dXBBdWRpb05vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBub2RlID0gc2VsZi5fYXVkaW9Ob2RlLFxuICAgICAgICBpbmRleCA9IHNlbGYuX2F1ZGlvTm9kZS5sZW5ndGg7XG5cbiAgICAgIC8vIGNyZWF0ZSBnYWluIG5vZGVcbiAgICAgIG5vZGVbaW5kZXhdID0gKHR5cGVvZiBjdHguY3JlYXRlR2FpbiA9PT0gJ3VuZGVmaW5lZCcpID8gY3R4LmNyZWF0ZUdhaW5Ob2RlKCkgOiBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgbm9kZVtpbmRleF0uZ2Fpbi52YWx1ZSA9IHNlbGYuX3ZvbHVtZTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhdXNlZCA9IHRydWU7XG4gICAgICBub2RlW2luZGV4XS5fcG9zID0gMDtcbiAgICAgIG5vZGVbaW5kZXhdLnJlYWR5U3RhdGUgPSA0O1xuICAgICAgbm9kZVtpbmRleF0uY29ubmVjdChtYXN0ZXJHYWluKTtcblxuICAgICAgLy8gY3JlYXRlIHRoZSBwYW5uZXJcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lciA9IGN0eC5jcmVhdGVQYW5uZXIoKTtcbiAgICAgIG5vZGVbaW5kZXhdLnBhbm5lci5wYW5uaW5nTW9kZWwgPSBzZWxmLl9tb2RlbCB8fCAnZXF1YWxwb3dlcic7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIuc2V0UG9zaXRpb24oc2VsZi5fcG9zM2RbMF0sIHNlbGYuX3BvczNkWzFdLCBzZWxmLl9wb3MzZFsyXSk7XG4gICAgICBub2RlW2luZGV4XS5wYW5uZXIuY29ubmVjdChub2RlW2luZGV4XSk7XG5cbiAgICAgIHJldHVybiBub2RlW2luZGV4XTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsbC9zZXQgY3VzdG9tIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgZXZlbnQgRXZlbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgRnVuY3Rpb24gdG8gY2FsbC5cbiAgICAgKiBAcmV0dXJuIHtIb3dsfVxuICAgICAqL1xuICAgIG9uOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgZXZlbnRzID0gc2VsZlsnX29uJyArIGV2ZW50XTtcblxuICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBldmVudHMucHVzaChmbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICBldmVudHNbaV0uY2FsbChzZWxmLCBmbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50c1tpXS5jYWxsKHNlbGYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGEgY3VzdG9tIGV2ZW50LlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gICBldmVudCBFdmVudCB0eXBlLlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICBMaXN0ZW5lciB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7SG93bH1cbiAgICAgKi9cbiAgICBvZmY6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBldmVudHMgPSBzZWxmWydfb24nICsgZXZlbnRdLFxuICAgICAgICBmblN0cmluZyA9IGZuID8gZm4udG9TdHJpbmcoKSA6IG51bGw7XG5cbiAgICAgIGlmIChmblN0cmluZykge1xuICAgICAgICAvLyBsb29wIHRocm91Z2ggZnVuY3Rpb25zIGluIHRoZSBldmVudCBmb3IgY29tcGFyaXNvblxuICAgICAgICBmb3IgKHZhciBpPTA7IGk8ZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGZuU3RyaW5nID09PSBldmVudHNbaV0udG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZlsnX29uJyArIGV2ZW50XSA9IFtdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5sb2FkIGFuZCBkZXN0cm95IHRoZSBjdXJyZW50IEhvd2wgb2JqZWN0LlxuICAgICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVseSBzdG9wIGFsbCBwbGF5IGluc3RhbmNlcyBhdHRhY2hlZCB0byB0aGlzIHNvdW5kLlxuICAgICAqL1xuICAgIHVubG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIHN0b3AgcGxheWluZyBhbnkgYWN0aXZlIG5vZGVzXG4gICAgICB2YXIgbm9kZXMgPSBzZWxmLl9hdWRpb05vZGU7XG4gICAgICBmb3IgKHZhciBpPTA7IGk8c2VsZi5fYXVkaW9Ob2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIHN0b3AgdGhlIHNvdW5kIGlmIGl0IGlzIGN1cnJlbnRseSBwbGF5aW5nXG4gICAgICAgIGlmICghbm9kZXNbaV0ucGF1c2VkKSB7XG4gICAgICAgICAgc2VsZi5zdG9wKG5vZGVzW2ldLmlkKTtcbiAgICAgICAgICBzZWxmLm9uKCdlbmQnLCBub2Rlc1tpXS5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX3dlYkF1ZGlvKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBzb3VyY2UgaWYgdXNpbmcgSFRNTDUgQXVkaW9cbiAgICAgICAgICBub2Rlc1tpXS5zcmMgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBkaXNjb25uZWN0IHRoZSBvdXRwdXQgZnJvbSB0aGUgbWFzdGVyIGdhaW5cbiAgICAgICAgICBub2Rlc1tpXS5kaXNjb25uZWN0KDApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSBhbGwgdGltZW91dHMgYXJlIGNsZWFyZWRcbiAgICAgIGZvciAoaT0wOyBpPHNlbGYuX29uZW5kVGltZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX29uZW5kVGltZXJbaV0udGltZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgdGhlIHJlZmVyZW5jZSBpbiB0aGUgZ2xvYmFsIEhvd2xlciBvYmplY3RcbiAgICAgIHZhciBpbmRleCA9IEhvd2xlci5faG93bHMuaW5kZXhPZihzZWxmKTtcbiAgICAgIGlmIChpbmRleCAhPT0gbnVsbCAmJiBpbmRleCA+PSAwKSB7XG4gICAgICAgIEhvd2xlci5faG93bHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gZGVsZXRlIHRoaXMgc291bmQgZnJvbSB0aGUgY2FjaGVcbiAgICAgIGRlbGV0ZSBjYWNoZVtzZWxmLl9zcmNdO1xuICAgICAgc2VsZiA9IG51bGw7XG4gICAgfVxuXG4gIH07XG5cbiAgLy8gb25seSBkZWZpbmUgdGhlc2UgZnVuY3Rpb25zIHdoZW4gdXNpbmcgV2ViQXVkaW9cbiAgaWYgKHVzaW5nV2ViQXVkaW8pIHtcblxuICAgIC8qKlxuICAgICAqIEJ1ZmZlciBhIHNvdW5kIGZyb20gVVJMIChvciBmcm9tIGNhY2hlKSBhbmQgZGVjb2RlIHRvIGF1ZGlvIHNvdXJjZSAoV2ViIEF1ZGlvIEFQSSkuXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBvYmogVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBUaGUgcGF0aCB0byB0aGUgc291bmQgZmlsZS5cbiAgICAgKi9cbiAgICB2YXIgbG9hZEJ1ZmZlciA9IGZ1bmN0aW9uKG9iaiwgdXJsKSB7XG4gICAgICAvLyBjaGVjayBpZiB0aGUgYnVmZmVyIGhhcyBhbHJlYWR5IGJlZW4gY2FjaGVkXG4gICAgICBpZiAodXJsIGluIGNhY2hlKSB7XG4gICAgICAgIC8vIHNldCB0aGUgZHVyYXRpb24gZnJvbSB0aGUgY2FjaGVcbiAgICAgICAgb2JqLl9kdXJhdGlvbiA9IGNhY2hlW3VybF0uZHVyYXRpb247XG5cbiAgICAgICAgLy8gbG9hZCB0aGUgc291bmQgaW50byB0aGlzIG9iamVjdFxuICAgICAgICBsb2FkU291bmQob2JqKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoL15kYXRhOlteO10rO2Jhc2U2NCwvLnRlc3QodXJsKSkge1xuICAgICAgICAvLyBEZWNvZGUgYmFzZTY0IGRhdGEtVVJJcyBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgY2Fubm90IGxvYWQgZGF0YS1VUklzIHdpdGggWE1MSHR0cFJlcXVlc3QuXG4gICAgICAgIHZhciBkYXRhID0gYXRvYih1cmwuc3BsaXQoJywnKVsxXSk7XG4gICAgICAgIHZhciBkYXRhVmlldyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpPGRhdGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBkYXRhVmlld1tpXSA9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVjb2RlQXVkaW9EYXRhKGRhdGFWaWV3LmJ1ZmZlciwgb2JqLCB1cmwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbG9hZCB0aGUgYnVmZmVyIGZyb20gdGhlIFVSTFxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRlY29kZUF1ZGlvRGF0YSh4aHIucmVzcG9uc2UsIG9iaiwgdXJsKTtcbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciwgc3dpdGNoIHRoZSBzb3VuZCB0byBIVE1MIEF1ZGlvXG4gICAgICAgICAgaWYgKG9iai5fd2ViQXVkaW8pIHtcbiAgICAgICAgICAgIG9iai5fYnVmZmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIG9iai5fd2ViQXVkaW8gPSBmYWxzZTtcbiAgICAgICAgICAgIG9iai5fYXVkaW9Ob2RlID0gW107XG4gICAgICAgICAgICBkZWxldGUgb2JqLl9nYWluTm9kZTtcbiAgICAgICAgICAgIGRlbGV0ZSBjYWNoZVt1cmxdO1xuICAgICAgICAgICAgb2JqLmxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHhoci5vbmVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVjb2RlIGF1ZGlvIGRhdGEgZnJvbSBhbiBhcnJheSBidWZmZXIuXG4gICAgICogQHBhcmFtICB7QXJyYXlCdWZmZXJ9IGFycmF5YnVmZmVyIFRoZSBhdWRpbyBkYXRhLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqIFRoZSBIb3dsIG9iamVjdCBmb3IgdGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVGhlIHBhdGggdG8gdGhlIHNvdW5kIGZpbGUuXG4gICAgICovXG4gICAgdmFyIGRlY29kZUF1ZGlvRGF0YSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBvYmosIHVybCkge1xuICAgICAgLy8gZGVjb2RlIHRoZSBidWZmZXIgaW50byBhbiBhdWRpbyBzb3VyY2VcbiAgICAgIGN0eC5kZWNvZGVBdWRpb0RhdGEoXG4gICAgICAgIGFycmF5YnVmZmVyLFxuICAgICAgICBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICBjYWNoZVt1cmxdID0gYnVmZmVyO1xuICAgICAgICAgICAgbG9hZFNvdW5kKG9iaiwgYnVmZmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIG9iai5vbignbG9hZGVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmlzaGVzIGxvYWRpbmcgdGhlIFdlYiBBdWRpbyBBUEkgc291bmQgYW5kIGZpcmVzIHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9ICBvYmogICAgVGhlIEhvd2wgb2JqZWN0IGZvciB0aGUgc291bmQgdG8gbG9hZC5cbiAgICAgKiBAcGFyYW0gIHtPYmplY2N0fSBidWZmZXIgVGhlIGRlY29kZWQgYnVmZmVyIHNvdW5kIHNvdXJjZS5cbiAgICAgKi9cbiAgICB2YXIgbG9hZFNvdW5kID0gZnVuY3Rpb24ob2JqLCBidWZmZXIpIHtcbiAgICAgIC8vIHNldCB0aGUgZHVyYXRpb25cbiAgICAgIG9iai5fZHVyYXRpb24gPSAoYnVmZmVyKSA/IGJ1ZmZlci5kdXJhdGlvbiA6IG9iai5fZHVyYXRpb247XG5cbiAgICAgIC8vIHNldHVwIGEgc3ByaXRlIGlmIG5vbmUgaXMgZGVmaW5lZFxuICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iai5fc3ByaXRlKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgb2JqLl9zcHJpdGUgPSB7X2RlZmF1bHQ6IFswLCBvYmouX2R1cmF0aW9uICogMTAwMF19O1xuICAgICAgfVxuXG4gICAgICAvLyBmaXJlIHRoZSBsb2FkZWQgZXZlbnRcbiAgICAgIGlmICghb2JqLl9sb2FkZWQpIHtcbiAgICAgICAgb2JqLl9sb2FkZWQgPSB0cnVlO1xuICAgICAgICBvYmoub24oJ2xvYWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iai5fYXV0b3BsYXkpIHtcbiAgICAgICAgb2JqLnBsYXkoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogTG9hZCB0aGUgc291bmQgYmFjayBpbnRvIHRoZSBidWZmZXIgc291cmNlLlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgVGhlIHNvdW5kIHRvIGxvYWQuXG4gICAgICogQHBhcmFtICB7QXJyYXl9ICBsb29wICBMb29wIGJvb2xlYW4sIHBvcywgYW5kIGR1cmF0aW9uLlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gaWQgICAgKG9wdGlvbmFsKSBUaGUgcGxheSBpbnN0YW5jZSBJRC5cbiAgICAgKi9cbiAgICB2YXIgcmVmcmVzaEJ1ZmZlciA9IGZ1bmN0aW9uKG9iaiwgbG9vcCwgaWQpIHtcbiAgICAgIC8vIGRldGVybWluZSB3aGljaCBub2RlIHRvIGNvbm5lY3QgdG9cbiAgICAgIHZhciBub2RlID0gb2JqLl9ub2RlQnlJZChpZCk7XG5cbiAgICAgIC8vIHNldHVwIHRoZSBidWZmZXIgc291cmNlIGZvciBwbGF5YmFja1xuICAgICAgbm9kZS5idWZmZXJTb3VyY2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5idWZmZXIgPSBjYWNoZVtvYmouX3NyY107XG4gICAgICBub2RlLmJ1ZmZlclNvdXJjZS5jb25uZWN0KG5vZGUucGFubmVyKTtcbiAgICAgIG5vZGUuYnVmZmVyU291cmNlLmxvb3AgPSBsb29wWzBdO1xuICAgICAgaWYgKGxvb3BbMF0pIHtcbiAgICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcFN0YXJ0ID0gbG9vcFsxXTtcbiAgICAgICAgbm9kZS5idWZmZXJTb3VyY2UubG9vcEVuZCA9IGxvb3BbMV0gKyBsb29wWzJdO1xuICAgICAgfVxuICAgICAgbm9kZS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlID0gb2JqLl9yYXRlO1xuICAgIH07XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc3VwcG9ydCBmb3IgQU1EIChBc3luY2hyb25vdXMgTW9kdWxlIERlZmluaXRpb24pIGxpYnJhcmllcyBzdWNoIGFzIHJlcXVpcmUuanMuXG4gICAqL1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgSG93bGVyOiBIb3dsZXIsXG4gICAgICAgIEhvd2w6IEhvd2xcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHN1cHBvcnQgZm9yIENvbW1vbkpTIGxpYnJhcmllcyBzdWNoIGFzIGJyb3dzZXJpZnkuXG4gICAqL1xuICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZXhwb3J0cy5Ib3dsZXIgPSBIb3dsZXI7XG4gICAgZXhwb3J0cy5Ib3dsID0gSG93bDtcbiAgfVxuXG4gIC8vIGRlZmluZSBnbG9iYWxseSBpbiBjYXNlIEFNRCBpcyBub3QgYXZhaWxhYmxlIG9yIGF2YWlsYWJsZSBidXQgbm90IHVzZWRcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB3aW5kb3cuSG93bGVyID0gSG93bGVyO1xuICAgIHdpbmRvdy5Ib3dsID0gSG93bDtcbiAgfVxuXG59KSgpO1xuIl19
