var React = require('react');
var _ = require('lodash');

var TrackListControls = React.createClass({
  getBackupUrl: function() {
    var json = JSON.stringify({
      tracks: this.props.tracks
    });
    var blob = new Blob([json], { type: 'octet/stream' });
    return URL.createObjectURL(blob);
  },

  render: function() {
    return (
      <div className="track-list-controls">
        <a className="button backup"
           download="track-list-backup.json"
           href={this.getBackupUrl()}
        ><i className="tickle-download"></i> Export</a>
      </div>
    );
  }
});

module.exports = TrackListControls;
