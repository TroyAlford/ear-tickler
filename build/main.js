(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d:\\git\\ear-tickler\\app\\App.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('./TrackStore.js');
var FilteredTrackList = require('./FilteredTrackList.js');
var SoundBoard = require('./soundboard/SoundBoard.js');
var actions = require('./actions.js');

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
          'Ear Tickler'
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

},{"./FilteredTrackList.js":"d:\\git\\ear-tickler\\app\\FilteredTrackList.js","./TrackStore.js":"d:\\git\\ear-tickler\\app\\TrackStore.js","./actions.js":"d:\\git\\ear-tickler\\app\\actions.js","./soundboard/SoundBoard.js":"d:\\git\\ear-tickler\\app\\soundboard\\SoundBoard.js","react":"react"}],"d:\\git\\ear-tickler\\app\\FilteredTrackList.js":[function(require,module,exports){
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

},{"./TrackList.js":"d:\\git\\ear-tickler\\app\\TrackList.js","./TrackSearchBar.js":"d:\\git\\ear-tickler\\app\\TrackSearchBar.js","react":"react"}],"d:\\git\\ear-tickler\\app\\Helper.js":[function(require,module,exports){
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

},{}],"d:\\git\\ear-tickler\\app\\TrackList.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('./TrackStore.js');

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

},{"./TrackStore.js":"d:\\git\\ear-tickler\\app\\TrackStore.js","react":"react"}],"d:\\git\\ear-tickler\\app\\TrackSearchBar.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TrackStore = require('./TrackStore.js');

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

},{"./TrackStore.js":"d:\\git\\ear-tickler\\app\\TrackStore.js","react":"react"}],"d:\\git\\ear-tickler\\app\\TrackStore.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');
var actions = require('./actions.js');
var Helper = require('./Helper.js');

module.exports = (function () {
    var raw_tracks = require('../audio/tracks.js');
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
        actions: [actions.upsertTrack, actions.deleteTrack],
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

},{"../audio/tracks.js":"d:\\git\\ear-tickler\\audio\\tracks.js","./Helper.js":"d:\\git\\ear-tickler\\app\\Helper.js","./actions.js":"d:\\git\\ear-tickler\\app\\actions.js","flux-react":"flux-react"}],"d:\\git\\ear-tickler\\app\\actions.js":[function(require,module,exports){
'use strict';

var flux = require('flux-react');

module.exports = flux.createActions(['upsertTrack', 'deleteTrack']);

},{"flux-react":"flux-react"}],"d:\\git\\ear-tickler\\app\\main.js":[function(require,module,exports){
'use strict';

var React = require('react');
var App = require('./App.js');

var trackStore = require('./TrackStore.js');
React.render(React.createElement(App, {
  trackStore: trackStore
}), document.getElementById('application'));

},{"./App.js":"d:\\git\\ear-tickler\\app\\App.js","./TrackStore.js":"d:\\git\\ear-tickler\\app\\TrackStore.js","react":"react"}],"d:\\git\\ear-tickler\\app\\mixins\\TimeFormatterMixin.js":[function(require,module,exports){
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

},{}],"d:\\git\\ear-tickler\\app\\player\\AudioControlBar.js":[function(require,module,exports){
"use strict";

var React = require('react');

var AudioControlBar = React.createClass({
  displayName: "AudioControlBar",

  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "audio-control-bar" },
      React.createElement("button", { className: "play", value: "Play" })
    );
  }
});

module.exports = AudioControlBar;

},{"react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioPlayer.js":[function(require,module,exports){
'use strict';

var React = require('react');
var AudioControlBar = require('./AudioControlBar.js');
var AudioProgressBar = require('./AudioProgressBar.js');
var AudioTimer = require('./AudioTimer.js');

var AudioPlayer = React.createClass({
  displayName: 'AudioPlayer',

  getInitialState: function getInitialState() {
    return {
      seekCurrent: 0,
      seekDuration: 0,
      seekPercentage: 0.0
    };
  },

  handleClose: function handleClose() {
    console.log('close');
  },
  handlePause: function handlePause() {},
  handlePlay: function handlePlay() {},
  handleStop: function handleStop() {},

  render: function render() {
    return React.createElement(
      'div',
      { className: 'audio-player' },
      React.createElement(
        'div',
        { className: 'track-name' },
        this.props.track.name
      ),
      React.createElement('i', {
        className: 'fa fa-close close-button',
        onClick: this.handleClose
      }),
      React.createElement(AudioProgressBar, {
        percentage: this.state.seekPercentage
      }),
      React.createElement(AudioTimer, {
        currentSeconds: this.state.seekCurrent,
        maximumSeconds: this.state.seekDuration
      }),
      React.createElement(AudioControlBar, {
        onClose: this.handleClose,
        onPause: this.handlePause,
        onPlay: this.handlePlay,
        onStop: this.handleStop
      })
    );
  }
});

module.exports = AudioPlayer;

},{"./AudioControlBar.js":"d:\\git\\ear-tickler\\app\\player\\AudioControlBar.js","./AudioProgressBar.js":"d:\\git\\ear-tickler\\app\\player\\AudioProgressBar.js","./AudioTimer.js":"d:\\git\\ear-tickler\\app\\player\\AudioTimer.js","react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioProgressBar.js":[function(require,module,exports){
"use strict";

var React = require('react');

var AudioProgressBar = React.createClass({
  displayName: "AudioProgressBar",

  getInitialState: function getInitialState() {
    return {};
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "audio-progress-bar" },
      React.createElement("div", {
        className: "audio-progress-bar-fill",
        style: { width: this.props.seekPercentage + '%' }
      })
    );
  }
});

module.exports = AudioProgressBar;

},{"react":"react"}],"d:\\git\\ear-tickler\\app\\player\\AudioTimer.js":[function(require,module,exports){
'use strict';

var React = require('react');
var TimeFormatterMixin = require('../mixins/TimeFormatterMixin.js');

var AudioTimer = React.createClass({
  displayName: 'AudioTimer',

  mixins: [TimeFormatterMixin],

  render: function render() {
    return React.createElement(
      'div',
      { className: 'audio-timer' },
      this.secondsToTime(this.props.seekCurrent),
      ' /',
      this.secondsToTime(this.props.seekDuration)
    );
  }
});

module.exports = AudioTimer;

},{"../mixins/TimeFormatterMixin.js":"d:\\git\\ear-tickler\\app\\mixins\\TimeFormatterMixin.js","react":"react"}],"d:\\git\\ear-tickler\\app\\soundboard\\SoundBoard.js":[function(require,module,exports){
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

},{"../player/AudioPlayer.js":"d:\\git\\ear-tickler\\app\\player\\AudioPlayer.js","react":"react"}],"d:\\git\\ear-tickler\\audio\\tracks.js":[function(require,module,exports){
'use strict';

module.exports = [{
    name: 'Crickets',
    url: 'audio/crickets.mp3',
    origin: 'https://www.freesound.org/data/previews/39/39829_28216-hq.mp3'
}, {
    name: 'Fast River',
    url: 'audio/fast-river.mp3',
    origin: 'https://www.freesound.org/data/previews/39/39831_28216-hq.mp3'
}, {
    name: 'Thunder Storm',
    url: 'audio/thunder-storm.mp3',
    origin: 'https://www.freesound.org/data/previews/2/2523_1112-hq.mp3'
}];

},{}]},{},["d:\\git\\ear-tickler\\app\\main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0FwcC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvRmlsdGVyZWRUcmFja0xpc3QuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0hlbHBlci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvVHJhY2tMaXN0LmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9UcmFja1NlYXJjaEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvVHJhY2tTdG9yZS5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvYWN0aW9ucy5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvbWFpbi5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvbWl4aW5zL1RpbWVGb3JtYXR0ZXJNaXhpbi5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvQ29udHJvbEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvUGxheWVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9wbGF5ZXIvQXVkaW9Qcm9ncmVzc0Jhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvVGltZXIuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL3NvdW5kYm9hcmQvU291bmRCb2FyZC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hdWRpby90cmFja3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzFELElBQUksVUFBVSxHQUFHLE9B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QUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBUyxLQUFLLEVBQUU7QUFDeEMsWUFBTSxDQUFDLElBQUksQ0FDVCxvQkFBQyxXQUFXO0FBQ1YsV0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEFBQUM7QUFDZCxhQUFLLEVBQUUsS0FBSyxBQUFDO1FBQ2IsQ0FDSCxDQUFDO0tBQ0gsQ0FBQyxDQUFDO0FBQ0gsV0FDRTs7UUFBSyxTQUFTLEVBQUMsYUFBYTtNQUFFLE1BQU07S0FBTyxDQUMzQztHQUNIO0NBQ0YsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDOzs7OztBQ3hCNUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDO0FBQ2QsUUFBSSxFQUFFLFVBQVU7QUFDaEIsT0FBRyxFQUFFLG9CQUFvQjtBQUN6QixVQUFNLEVBQUUsK0RBQStEO0NBQzFFLEVBQUM7QUFDRSxRQUFJLEVBQUUsWUFBWTtBQUNsQixPQUFHLEVBQUUsc0JBQXNCO0FBQzNCLFVBQU0sRUFBRSwrREFBK0Q7Q0FDMUUsRUFBQztBQUNFLFFBQUksRUFBRSxlQUFlO0FBQ3JCLE9BQUcsRUFBRSx5QkFBeUI7QUFDOUIsVUFBTSxFQUFFLDREQUE0RDtDQUN2RSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFRyYWNrU3RvcmUgPSByZXF1aXJlKCcuL1RyYWNrU3RvcmUuanMnKTtcclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gcmVxdWlyZSgnLi9GaWx0ZXJlZFRyYWNrTGlzdC5qcycpO1xyXG52YXIgU291bmRCb2FyZCA9IHJlcXVpcmUoJy4vc291bmRib2FyZC9Tb3VuZEJvYXJkLmpzJyk7XHJcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XHJcblxyXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHt9OyAvLyB0cmFja3M6IFRyYWNrU3RvcmUuZ2V0VHJhY2tzKCkgfTtcclxuICB9LFxyXG4gIHRyYWNrczogVHJhY2tTdG9yZS5nZXRUcmFja3MoKSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9TdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcclxuICB9LFxyXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHt9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWFyLXRpY2tsZXIgYXBwbGljYXRpb25cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1iYXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5FYXIgVGlja2xlcjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxGaWx0ZXJlZFRyYWNrTGlzdFxyXG4gICAgICAgICAgdHJhY2tzPXt0aGlzLnByb3BzLnRyYWNrU3RvcmUuZ2V0VHJhY2tzKCl9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8U291bmRCb2FyZFxyXG4gICAgICAgICAgdHJhY2tzPXt0aGlzLnByb3BzLnRyYWNrU3RvcmUuZ2V0VHJhY2tzKCl9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblx0XHJcbm1vZHVsZS5leHBvcnRzID0gQXBwO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVHJhY2tTZWFyY2hCYXIgPSByZXF1aXJlKCcuL1RyYWNrU2VhcmNoQmFyLmpzJyk7XHJcbnZhciBUcmFja0xpc3QgPSByZXF1aXJlKCcuL1RyYWNrTGlzdC5qcycpO1xyXG5cclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWx0ZXJUZXh0OiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbihmaWx0ZXJUZXh0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGZpbHRlclRleHQ6IGZpbHRlclRleHRcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyZWQtdHJhY2stbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgPFRyYWNrU2VhcmNoQmFyXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXt0aGlzLmhhbmRsZUZpbHRlckNoYW5nZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8VHJhY2tMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcz17dGhpcy5wcm9wcy50cmFja3N9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmlsdGVyZWRUcmFja0xpc3Q7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAoYSwgYil7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gYilcclxuICAgICAgICAgICAgaWYoYi5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgYVtrZXldID0gYltrZXldO1xyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSxcclxuICAgIGd1aWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpKjE2fDAsIHYgPSBjID09ICd4JyA/IHIgOiAociYweDN8MHg4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbGlzdEl0ZW1zID0gdGhpcy5wcm9wcy50cmFja3NcclxuICAgICAgLmZpbHRlcihmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSB0aGlzLnByb3BzLmZpbHRlclRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2YXIgdHJhY2tOYW1lID0gdHJhY2submFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiB0cmFja05hbWUuaW5kZXhPZihmaWx0ZXIpID4gLTE7XHJcbiAgICAgIH0sIHRoaXMpXHJcbiAgICAgIC5tYXAoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGxpIGtleT17dHJhY2suaWR9IHRyYWNrPXt0cmFja30+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLW11c2ljXCI+PC9pPlxyXG4gICAgICAgICAgICB7dHJhY2submFtZX1cclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dWw+e2xpc3RJdGVtc308L3VsPlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1N0b3JlID0gcmVxdWlyZSgnLi9UcmFja1N0b3JlLmpzJyk7XHJcblxyXG52YXIgVHJhY2tMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgaGFuZGxlRmlsdGVyQ2hhbmdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlsdGVyVGV4dCA9IHRoaXMucmVmcy5zZWFyY2hCb3guZ2V0RE9NTm9kZSgpLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvcHMub25GaWx0ZXJDaGFuZ2UoZmlsdGVyVGV4dCk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCJcclxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnByb3BzLmZpbHRlclRleHR9XHJcbiAgICAgICAgICAgICAgICByZWY9XCJzZWFyY2hCb3hcIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0xpc3Q7XHJcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xyXG52YXIgYWN0aW9ucyA9IHJlcXVpcmUoJy4vYWN0aW9ucy5qcycpO1xyXG52YXIgSGVscGVyID0gcmVxdWlyZSgnLi9IZWxwZXIuanMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHJhd190cmFja3MgPSByZXF1aXJlKCcuLi9hdWRpby90cmFja3MuanMnKTtcclxuICB2YXIgdHJhY2tzID0gcmF3X3RyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgcmV0dXJuIEhlbHBlci5leHRlbmQoe1xyXG4gICAgICAgICAgaWQ6IEhlbHBlci5ndWlkKCksXHJcbiAgICAgICAgICBuYW1lOiAnTmV3IFRyYWNrJyxcclxuICAgICAgICAgIHVybDogJy4uL2F1ZGlvL2RlZmF1bHQubXAzJyxcclxuICAgICAgICAgIG9yaWdpbjogJ1Vua25vd24gT3JpZ2luJ1xyXG4gICAgICB9LCB0cmFjayk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBmbHV4LmNyZWF0ZVN0b3JlKHtcclxuICAgIHRyYWNrczogdHJhY2tzLFxyXG4gICAgYWN0aW9uczogW1xyXG4gICAgICBhY3Rpb25zLnVwc2VydFRyYWNrLFxyXG4gICAgICBhY3Rpb25zLmRlbGV0ZVRyYWNrXHJcbiAgICBdLFxyXG4gICAgdXBzZXJ0VHJhY2s6IGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgdGhpcy50cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCd0cmFja3MudXBkYXRlZCcpO1xyXG4gICAgfSxcclxuICAgIGRlbGV0ZVRyYWNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHRyYWNrcyA9IHRyYWNrcy5maWx0ZXIoZnVuY3Rpb24oZWwpIHsgcmV0dXJuIGVsLmlkICE9PSBpZDsgfSk7XHJcbiAgICAgICAgdGhpcy5lbWl0KCd0cmFja3MuZGVsZXRlZCcpO1xyXG4gICAgfSxcclxuICAgIGV4cG9ydHM6IHtcclxuICAgICAgICBnZXRUcmFja3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFja3M7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVUcmFjazogZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxldGVUcmFjayhpZCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhZGRUcmFjazogZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy51cHNlcnRUcmFjayh0cmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59KCk7XHJcbiIsInZhciBmbHV4ID0gcmVxdWlyZSgnZmx1eC1yZWFjdCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmbHV4LmNyZWF0ZUFjdGlvbnMoW1xyXG4gICd1cHNlcnRUcmFjaycsXHJcbiAgJ2RlbGV0ZVRyYWNrJ1xyXG5dKTtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIEFwcCA9IHJlcXVpcmUoJy4vQXBwLmpzJyk7XHJcblxyXG52YXIgdHJhY2tTdG9yZSA9IHJlcXVpcmUoJy4vVHJhY2tTdG9yZS5qcycpO1xyXG5SZWFjdC5yZW5kZXIoXHJcbiAgPEFwcFxyXG4gICAgdHJhY2tTdG9yZT17dHJhY2tTdG9yZX1cclxuICAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcGxpY2F0aW9uJylcclxuKTsiLCJtb2R1bGUuZXhwb3J0cyA9ICB7XHJcbiAgc2Vjb25kc1RvVGltZTogZnVuY3Rpb24oc2Vjcykge1xyXG4gICAgc2VjcyA9IE1hdGgucm91bmQoc2Vjcyk7XHJcbiAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHNlY3MgLyAoNjAgKiA2MCkpO1xyXG5cclxuICAgIHZhciBkaXZpc29yX2Zvcl9taW51dGVzID0gc2VjcyAlICg2MCAqIDYwKTtcclxuICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcihkaXZpc29yX2Zvcl9taW51dGVzIC8gNjApO1xyXG5cclxuICAgIHZhciBkaXZpc29yX2Zvcl9zZWNvbmRzID0gZGl2aXNvcl9mb3JfbWludXRlcyAlIDYwO1xyXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmNlaWwoZGl2aXNvcl9mb3Jfc2Vjb25kcyk7XHJcblxyXG4gICAgdmFyIHRpbWUgPSBcIlwiO1xyXG5cclxuICAgIGlmKGhvdXJzID4gMCkge1xyXG4gICAgICB0aW1lICs9IGhvdXJzICsgXCI6XCI7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZSArPSB0aGlzLnRpbWVVbml0Rm9ybWF0KG1pbnV0ZXMpICsgXCI6XCI7XHJcbiAgICB0aW1lICs9IHRoaXMudGltZVVuaXRGb3JtYXQoc2Vjb25kcyk7XHJcbiAgICByZXR1cm4gdGltZTtcclxuICB9LFxyXG5cclxuICB0aW1lVW5pdEZvcm1hdDpmdW5jdGlvbih0aW1lKSB7XHJcbiAgICBpZiAodGltZSA8IDEpIHtcclxuICAgICAgcmV0dXJuIFwiMDBcIjtcclxuICAgIH0gZWxzZSBpZiAodGltZSA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBcIjBcIiArIHRpbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxuICB9XHJcbn07IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby1jb250cm9sLWJhclwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicGxheVwiIHZhbHVlPVwiUGxheVwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb0NvbnRyb2xCYXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSByZXF1aXJlKCcuL0F1ZGlvQ29udHJvbEJhci5qcycpO1xyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vQXVkaW9Qcm9ncmVzc0Jhci5qcycpO1xyXG52YXIgQXVkaW9UaW1lciA9IHJlcXVpcmUoJy4vQXVkaW9UaW1lci5qcycpO1xyXG5cclxudmFyIEF1ZGlvUGxheWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWVrQ3VycmVudDogMCxcclxuICAgICAgc2Vla0R1cmF0aW9uOiAwLFxyXG4gICAgICBzZWVrUGVyY2VudGFnZTogMC4wXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUNsb3NlOiBmdW5jdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCdjbG9zZScpO1xyXG4gIH0sXHJcbiAgaGFuZGxlUGF1c2U6IGZ1bmN0aW9uKCkge30sXHJcbiAgaGFuZGxlUGxheTogIGZ1bmN0aW9uKCkge30sXHJcbiAgaGFuZGxlU3RvcDogIGZ1bmN0aW9uKCkge30sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1ZGlvLXBsYXllclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhY2stbmFtZVwiPnt0aGlzLnByb3BzLnRyYWNrLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGlcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLWNsb3NlIGNsb3NlLWJ1dHRvblwiXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlfVxyXG4gICAgICAgID48L2k+XHJcbiAgICAgICAgPEF1ZGlvUHJvZ3Jlc3NCYXJcclxuICAgICAgICAgIHBlcmNlbnRhZ2U9e3RoaXMuc3RhdGUuc2Vla1BlcmNlbnRhZ2V9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8QXVkaW9UaW1lclxyXG4gICAgICAgICAgY3VycmVudFNlY29uZHM9e3RoaXMuc3RhdGUuc2Vla0N1cnJlbnR9XHJcbiAgICAgICAgICBtYXhpbXVtU2Vjb25kcz17dGhpcy5zdGF0ZS5zZWVrRHVyYXRpb259XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8QXVkaW9Db250cm9sQmFyXHJcbiAgICAgICAgICBvbkNsb3NlPXt0aGlzLmhhbmRsZUNsb3NlfVxyXG4gICAgICAgICAgb25QYXVzZT17dGhpcy5oYW5kbGVQYXVzZX1cclxuICAgICAgICAgIG9uUGxheT17dGhpcy5oYW5kbGVQbGF5fVxyXG4gICAgICAgICAgb25TdG9wPXt0aGlzLmhhbmRsZVN0b3B9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEF1ZGlvUGxheWVyO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxudmFyIEF1ZGlvUHJvZ3Jlc3NCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby1wcm9ncmVzcy1iYXJcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJhdWRpby1wcm9ncmVzcy1iYXItZmlsbFwiXHJcbiAgICAgICAgICBzdHlsZT17e3dpZHRoOiB0aGlzLnByb3BzLnNlZWtQZXJjZW50YWdlICsgJyUnfX1cclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1Byb2dyZXNzQmFyO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVGltZUZvcm1hdHRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1RpbWVGb3JtYXR0ZXJNaXhpbi5qcycpO1xyXG5cclxudmFyIEF1ZGlvVGltZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgbWl4aW5zOiBbVGltZUZvcm1hdHRlck1peGluXSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdGltZXJcIj5cclxuICAgICAgICB7dGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMuc2Vla0N1cnJlbnQpfSAvXHJcbiAgICAgICAge3RoaXMuc2Vjb25kc1RvVGltZSh0aGlzLnByb3BzLnNlZWtEdXJhdGlvbil9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1RpbWVyO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgQXVkaW9QbGF5ZXIgPSByZXF1aXJlKCcuLi9wbGF5ZXIvQXVkaW9QbGF5ZXIuanMnKTtcclxuXHJcbnZhciBTb3VuZEJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0cmFja3MgPSBbXTtcclxuICAgIHRoaXMucHJvcHMudHJhY2tzLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgdHJhY2tzLnB1c2goXHJcbiAgICAgICAgPEF1ZGlvUGxheWVyXHJcbiAgICAgICAgICBrZXk9e3RyYWNrLmlkfVxyXG4gICAgICAgICAgdHJhY2s9e3RyYWNrfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic291bmQtYm9hcmRcIj57dHJhY2tzfTwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTb3VuZEJvYXJkO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFt7XHJcbiAgICBuYW1lOiAnQ3JpY2tldHMnLFxyXG4gICAgdXJsOiAnYXVkaW8vY3JpY2tldHMubXAzJyxcclxuICAgIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8zOS8zOTgyOV8yODIxNi1ocS5tcDMnXHJcbn0se1xyXG4gICAgbmFtZTogJ0Zhc3QgUml2ZXInLFxyXG4gICAgdXJsOiAnYXVkaW8vZmFzdC1yaXZlci5tcDMnLFxyXG4gICAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzM5LzM5ODMxXzI4MjE2LWhxLm1wMydcclxufSx7XHJcbiAgICBuYW1lOiAnVGh1bmRlciBTdG9ybScsXHJcbiAgICB1cmw6ICdhdWRpby90aHVuZGVyLXN0b3JtLm1wMycsXHJcbiAgICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMi8yNTIzXzExMTItaHEubXAzJ1xyXG59XTtcclxuIl19
