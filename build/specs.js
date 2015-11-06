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
        tracks: []
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

},{"flux-react":"flux-react"}],"d:\\git\\ear-tickler\\app\\mixins\\TimeFormatterMixin.js":[function(require,module,exports){
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

  handleClose: function handleClose() {},
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
        style: "width: " + this.props.seekPercentage + "%;"
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0FwcC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvRmlsdGVyZWRUcmFja0xpc3QuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL0hlbHBlci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvVHJhY2tMaXN0LmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9UcmFja1NlYXJjaEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvVHJhY2tTdG9yZS5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvYWN0aW9ucy5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvbWl4aW5zL1RpbWVGb3JtYXR0ZXJNaXhpbi5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvQ29udHJvbEJhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvUGxheWVyLmpzIiwiZDovZ2l0L2Vhci10aWNrbGVyL2FwcC9wbGF5ZXIvQXVkaW9Qcm9ncmVzc0Jhci5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hcHAvcGxheWVyL0F1ZGlvVGltZXIuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvYXBwL3NvdW5kYm9hcmQvU291bmRCb2FyZC5qcyIsImQ6L2dpdC9lYXItdGlja2xlci9hdWRpby90cmFja3MuanMiLCJkOi9naXQvZWFyLXRpY2tsZXIvc3BlY3MvQXBwLXNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1QyxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQzFELElBQUksVUFBVSxH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O0FBQzNCLFVBQU0sRUFBRSwrREFBK0Q7Q0FDMUUsRUFBQztBQUNFLFFBQUksRUFBRSxlQUFlO0FBQ3JCLE9BQUcsRUFBRSx5QkFBeUI7QUFDOUIsVUFBTSxFQUFFLDREQUE0RDtDQUN2RSxDQUFDLENBQUM7Ozs7O0FDWkgsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDckMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzs7QUFFbEQsUUFBUSxDQUFDLEtBQUssRUFBRSxZQUFXOztBQUV6QixJQUFFLENBQUMsOEJBQThCLEVBQUUsWUFBVztBQUM1QyxRQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM5QyxVQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUNqRCxDQUFDLENBQUM7Q0FFSixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFRyYWNrU3RvcmUgPSByZXF1aXJlKCcuL1RyYWNrU3RvcmUuanMnKTtcclxudmFyIEZpbHRlcmVkVHJhY2tMaXN0ID0gcmVxdWlyZSgnLi9GaWx0ZXJlZFRyYWNrTGlzdC5qcycpO1xyXG52YXIgU291bmRCb2FyZCA9IHJlcXVpcmUoJy4vc291bmRib2FyZC9Tb3VuZEJvYXJkLmpzJyk7XHJcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XHJcblxyXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHt9OyAvLyB0cmFja3M6IFRyYWNrU3RvcmUuZ2V0VHJhY2tzKCkgfTtcclxuICB9LFxyXG4gIHRyYWNrczogVHJhY2tTdG9yZS5nZXRUcmFja3MoKSxcclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vU3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5jaGFuZ2VTdGF0ZSk7XHJcbiAgfSxcclxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gKCkge1xyXG4gICAgLy9TdG9yZS5yZW1vdmVDaGFuZ2VMaXN0ZW5lcih0aGlzLmNoYW5nZVN0YXRlKTtcclxuICB9LFxyXG4gIGNoYW5nZVN0YXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHt9KTtcclxuICB9LFxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZWFyLXRpY2tsZXIgYXBwbGljYXRpb25cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlci1iYXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj5FYXIgVGlja2xlcjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxGaWx0ZXJlZFRyYWNrTGlzdFxyXG4gICAgICAgICAgdHJhY2tzPXt0aGlzLnByb3BzLnRyYWNrU3RvcmUuZ2V0VHJhY2tzKCl9XHJcbiAgICAgICAgLz5cclxuICAgICAgICA8U291bmRCb2FyZFxyXG4gICAgICAgICAgdHJhY2tzPXtbXX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59KTtcclxuXHRcclxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBUcmFja1NlYXJjaEJhciA9IHJlcXVpcmUoJy4vVHJhY2tTZWFyY2hCYXIuanMnKTtcclxudmFyIFRyYWNrTGlzdCA9IHJlcXVpcmUoJy4vVHJhY2tMaXN0LmpzJyk7XHJcblxyXG52YXIgRmlsdGVyZWRUcmFja0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpbHRlclRleHQ6ICcnXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBoYW5kbGVGaWx0ZXJDaGFuZ2U6IGZ1bmN0aW9uKGZpbHRlclRleHQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgZmlsdGVyVGV4dDogZmlsdGVyVGV4dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXJlZC10cmFjay1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICA8VHJhY2tTZWFyY2hCYXJcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0PXt0aGlzLnN0YXRlLmZpbHRlclRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgb25GaWx0ZXJDaGFuZ2U9e3RoaXMuaGFuZGxlRmlsdGVyQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxUcmFja0xpc3RcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0PXt0aGlzLnN0YXRlLmZpbHRlclRleHR9XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tzPXt0aGlzLnByb3BzLnRyYWNrc31cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGaWx0ZXJlZFRyYWNrTGlzdDtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBleHRlbmQ6IGZ1bmN0aW9uIChhLCBiKXtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBiKVxyXG4gICAgICAgICAgICBpZihiLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9LFxyXG4gICAgZ3VpZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24oYykge1xyXG4gICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkqMTZ8MCwgdiA9IGMgPT0gJ3gnID8gciA6IChyJjB4M3wweDgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFRyYWNrU3RvcmUgPSByZXF1aXJlKCcuL1RyYWNrU3RvcmUuanMnKTtcclxuXHJcbnZhciBUcmFja0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciBsaXN0SXRlbXMgPSB0aGlzLnByb3BzLnRyYWNrc1xyXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgdmFyIGZpbHRlciA9IHRoaXMucHJvcHMuZmlsdGVyVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciB0cmFja05hbWUgPSB0cmFjay5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrTmFtZS5pbmRleE9mKGZpbHRlcikgPiAtMTtcclxuICAgICAgfSwgdGhpcylcclxuICAgICAgLm1hcChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8bGkga2V5PXt0cmFjay5pZH0gdHJhY2s9e3RyYWNrfT5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbXVzaWNcIj48L2k+XHJcbiAgICAgICAgICAgIHt0cmFjay5uYW1lfVxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx1bD57bGlzdEl0ZW1zfTwvdWw+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNrTGlzdDtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFRyYWNrU3RvcmUgPSByZXF1aXJlKCcuL1RyYWNrU3RvcmUuanMnKTtcclxuXHJcbnZhciBUcmFja0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBoYW5kbGVGaWx0ZXJDaGFuZ2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmaWx0ZXJUZXh0ID0gdGhpcy5yZWZzLnNlYXJjaEJveC5nZXRET01Ob2RlKCkudmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vbkZpbHRlckNoYW5nZShmaWx0ZXJUZXh0KTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2guLi5cIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuZmlsdGVyVGV4dH1cclxuICAgICAgICAgICAgICAgIHJlZj1cInNlYXJjaEJveFwiXHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVGaWx0ZXJDaGFuZ2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNrTGlzdDtcclxuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XHJcbnZhciBhY3Rpb25zID0gcmVxdWlyZSgnLi9hY3Rpb25zLmpzJyk7XHJcbnZhciBIZWxwZXIgPSByZXF1aXJlKCcuL0hlbHBlci5qcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgcmF3X3RyYWNrcyA9IHJlcXVpcmUoJy4uL2F1ZGlvL3RyYWNrcy5qcycpO1xyXG4gIHZhciB0cmFja3MgPSByYXdfdHJhY2tzLm1hcChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICByZXR1cm4gSGVscGVyLmV4dGVuZCh7XHJcbiAgICAgICAgICBpZDogSGVscGVyLmd1aWQoKSxcclxuICAgICAgICAgIG5hbWU6ICdOZXcgVHJhY2snLFxyXG4gICAgICAgICAgdXJsOiAnLi4vYXVkaW8vZGVmYXVsdC5tcDMnLFxyXG4gICAgICAgICAgb3JpZ2luOiAnVW5rbm93biBPcmlnaW4nXHJcbiAgICAgIH0sIHRyYWNrKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGZsdXguY3JlYXRlU3RvcmUoe1xyXG4gICAgdHJhY2tzOiB0cmFja3MsXHJcbiAgICBhY3Rpb25zOiBbXHJcbiAgICAgIGFjdGlvbnMudXBzZXJ0VHJhY2ssXHJcbiAgICAgIGFjdGlvbnMuZGVsZXRlVHJhY2tcclxuICAgIF0sXHJcbiAgICB1cHNlcnRUcmFjazogZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICB0aGlzLnRyYWNrcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICB0aGlzLmVtaXQoJ3RyYWNrcy51cGRhdGVkJyk7XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVHJhY2s6IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdHJhY2tzID0gdHJhY2tzLmZpbHRlcihmdW5jdGlvbihlbCkgeyByZXR1cm4gZWwuaWQgIT09IGlkOyB9KTtcclxuICAgICAgICB0aGlzLmVtaXQoJ3RyYWNrcy5kZWxldGVkJyk7XHJcbiAgICB9LFxyXG4gICAgZXhwb3J0czoge1xyXG4gICAgICAgIGdldFRyYWNrczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYWNrcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZVRyYWNrOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVRyYWNrKGlkKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZFRyYWNrOiBmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnVwc2VydFRyYWNrKHRyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0oKTtcclxuIiwidmFyIGZsdXggPSByZXF1aXJlKCdmbHV4LXJlYWN0Jyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZsdXguY3JlYXRlQWN0aW9ucyhbXHJcbiAgJ3Vwc2VydFRyYWNrJyxcclxuICAnZGVsZXRlVHJhY2snXHJcbl0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9ICB7XHJcbiAgc2Vjb25kc1RvVGltZTogZnVuY3Rpb24oc2Vjcykge1xyXG4gICAgc2VjcyA9IE1hdGgucm91bmQoc2Vjcyk7XHJcbiAgICB2YXIgaG91cnMgPSBNYXRoLmZsb29yKHNlY3MgLyAoNjAgKiA2MCkpO1xyXG5cclxuICAgIHZhciBkaXZpc29yX2Zvcl9taW51dGVzID0gc2VjcyAlICg2MCAqIDYwKTtcclxuICAgIHZhciBtaW51dGVzID0gTWF0aC5mbG9vcihkaXZpc29yX2Zvcl9taW51dGVzIC8gNjApO1xyXG5cclxuICAgIHZhciBkaXZpc29yX2Zvcl9zZWNvbmRzID0gZGl2aXNvcl9mb3JfbWludXRlcyAlIDYwO1xyXG4gICAgdmFyIHNlY29uZHMgPSBNYXRoLmNlaWwoZGl2aXNvcl9mb3Jfc2Vjb25kcyk7XHJcblxyXG4gICAgdmFyIHRpbWUgPSBcIlwiO1xyXG5cclxuICAgIGlmKGhvdXJzID4gMCkge1xyXG4gICAgICB0aW1lICs9IGhvdXJzICsgXCI6XCI7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZSArPSB0aGlzLnRpbWVVbml0Rm9ybWF0KG1pbnV0ZXMpICsgXCI6XCI7XHJcbiAgICB0aW1lICs9IHRoaXMudGltZVVuaXRGb3JtYXQoc2Vjb25kcyk7XHJcbiAgICByZXR1cm4gdGltZTtcclxuICB9LFxyXG5cclxuICB0aW1lVW5pdEZvcm1hdDpmdW5jdGlvbih0aW1lKSB7XHJcbiAgICBpZiAodGltZSA8IDEpIHtcclxuICAgICAgcmV0dXJuIFwiMDBcIjtcclxuICAgIH0gZWxzZSBpZiAodGltZSA8IDEwKSB7XHJcbiAgICAgIHJldHVybiBcIjBcIiArIHRpbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGltZTtcclxuICAgIH1cclxuICB9XHJcbn07IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7fTtcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby1jb250cm9sLWJhclwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwicGxheVwiIHZhbHVlPVwiUGxheVwiIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb0NvbnRyb2xCYXI7XHJcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBBdWRpb0NvbnRyb2xCYXIgPSByZXF1aXJlKCcuL0F1ZGlvQ29udHJvbEJhci5qcycpO1xyXG52YXIgQXVkaW9Qcm9ncmVzc0JhciA9IHJlcXVpcmUoJy4vQXVkaW9Qcm9ncmVzc0Jhci5qcycpO1xyXG52YXIgQXVkaW9UaW1lciA9IHJlcXVpcmUoJy4vQXVkaW9UaW1lci5qcycpO1xyXG5cclxudmFyIEF1ZGlvUGxheWVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWVrQ3VycmVudDogMCxcclxuICAgICAgc2Vla0R1cmF0aW9uOiAwLFxyXG4gICAgICBzZWVrUGVyY2VudGFnZTogMC4wXHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUNsb3NlOiBmdW5jdGlvbigpIHt9LFxyXG4gIGhhbmRsZVBhdXNlOiBmdW5jdGlvbigpIHt9LFxyXG4gIGhhbmRsZVBsYXk6ICBmdW5jdGlvbigpIHt9LFxyXG4gIGhhbmRsZVN0b3A6ICBmdW5jdGlvbigpIHt9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhdWRpby1wbGF5ZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRyYWNrLW5hbWVcIj57dGhpcy5wcm9wcy50cmFjay5uYW1lfTwvZGl2PlxyXG4gICAgICAgIDxBdWRpb1Byb2dyZXNzQmFyXHJcbiAgICAgICAgICBwZXJjZW50YWdlPXt0aGlzLnN0YXRlLnNlZWtQZXJjZW50YWdlfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvVGltZXJcclxuICAgICAgICAgIGN1cnJlbnRTZWNvbmRzPXt0aGlzLnN0YXRlLnNlZWtDdXJyZW50fVxyXG4gICAgICAgICAgbWF4aW11bVNlY29uZHM9e3RoaXMuc3RhdGUuc2Vla0R1cmF0aW9ufVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEF1ZGlvQ29udHJvbEJhclxyXG4gICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVDbG9zZX1cclxuICAgICAgICAgIG9uUGF1c2U9e3RoaXMuaGFuZGxlUGF1c2V9XHJcbiAgICAgICAgICBvblBsYXk9e3RoaXMuaGFuZGxlUGxheX1cclxuICAgICAgICAgIG9uU3RvcD17dGhpcy5oYW5kbGVTdG9wfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1BsYXllcjtcclxuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbnZhciBBdWRpb1Byb2dyZXNzQmFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tcHJvZ3Jlc3MtYmFyXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYXVkaW8tcHJvZ3Jlc3MtYmFyLWZpbGxcIlxyXG4gICAgICAgICAgc3R5bGU9e1wid2lkdGg6IFwiICsgdGhpcy5wcm9wcy5zZWVrUGVyY2VudGFnZSArIFwiJTtcIn1cclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1Byb2dyZXNzQmFyO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgVGltZUZvcm1hdHRlck1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zL1RpbWVGb3JtYXR0ZXJNaXhpbi5qcycpO1xyXG5cclxudmFyIEF1ZGlvVGltZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgbWl4aW5zOiBbVGltZUZvcm1hdHRlck1peGluXSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXVkaW8tdGltZXJcIj5cclxuICAgICAgICB7dGhpcy5zZWNvbmRzVG9UaW1lKHRoaXMucHJvcHMuc2Vla0N1cnJlbnQpfSAvXHJcbiAgICAgICAge3RoaXMuc2Vjb25kc1RvVGltZSh0aGlzLnByb3BzLnNlZWtEdXJhdGlvbil9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdWRpb1RpbWVyO1xyXG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgQXVkaW9QbGF5ZXIgPSByZXF1aXJlKCcuLi9wbGF5ZXIvQXVkaW9QbGF5ZXIuanMnKTtcclxuXHJcbnZhciBTb3VuZEJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge307XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0cmFja3MgPSBbXTtcclxuICAgIHRoaXMucHJvcHMudHJhY2tzLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgdHJhY2tzLnB1c2goXHJcbiAgICAgICAgPEF1ZGlvUGxheWVyXHJcbiAgICAgICAgICB0cmFjaz17dHJhY2t9XHJcbiAgICAgICAgLz5cclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzb3VuZC1ib2FyZFwiPnt0cmFja3N9PC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNvdW5kQm9hcmQ7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gW3tcclxuICAgIG5hbWU6ICdDcmlja2V0cycsXHJcbiAgICB1cmw6ICdhdWRpby9jcmlja2V0cy5tcDMnLFxyXG4gICAgb3JpZ2luOiAnaHR0cHM6Ly93d3cuZnJlZXNvdW5kLm9yZy9kYXRhL3ByZXZpZXdzLzM5LzM5ODI5XzI4MjE2LWhxLm1wMydcclxufSx7XHJcbiAgICBuYW1lOiAnRmFzdCBSaXZlcicsXHJcbiAgICB1cmw6ICdhdWRpby9mYXN0LXJpdmVyLm1wMycsXHJcbiAgICBvcmlnaW46ICdodHRwczovL3d3dy5mcmVlc291bmQub3JnL2RhdGEvcHJldmlld3MvMzkvMzk4MzFfMjgyMTYtaHEubXAzJ1xyXG59LHtcclxuICAgIG5hbWU6ICdUaHVuZGVyIFN0b3JtJyxcclxuICAgIHVybDogJ2F1ZGlvL3RodW5kZXItc3Rvcm0ubXAzJyxcclxuICAgIG9yaWdpbjogJ2h0dHBzOi8vd3d3LmZyZWVzb3VuZC5vcmcvZGF0YS9wcmV2aWV3cy8yLzI1MjNfMTExMi1ocS5tcDMnXHJcbn1dO1xyXG4iLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi8uLi9hcHAvQXBwLmpzJyk7XHJcbnZhciBUZXN0VXRpbHMgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKS5UZXN0VXRpbHM7XHJcblxyXG5kZXNjcmliZShcIkFwcFwiLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgaXQoXCJzaG91bGQgYmUgd3JhcHBlZCB3aXRoIGEgZGl2XCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGFwcCA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoQXBwKCkpO1xyXG4gICAgZXhwZWN0KGFwcC5nZXRET01Ob2RlKCkudGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XHJcbiAgfSk7XHJcblxyXG59KTtcclxuIl19
