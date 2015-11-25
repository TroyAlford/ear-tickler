var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  handleAddClicked: function(track) {
    this.props.onAddClicked(track.id);
  },

  render: function() {
    var listItems = _.sortBy(this.props.tracks, 'name')
      .filter(function(track) {
        var filter = this.props.filterText.toLowerCase();
        var trackName = track.name.toLowerCase();
        return trackName.indexOf(filter) > -1;
      }, this)
      .map(function(track) {
        var className = 'tickle-track';
        if (_.includes(this.props.addedTrackIds, track.id))
          className += '-playing';

        return (
          <li key={track.id} track={track}>
            <i className={className}></i>
            <span className="track-name">{track.name}</span>
            <i className="tickle-add"
               onClick={this.handleAddClicked.bind(null, track)}
            ></i>
          </li>
        );
      }, this
    );

    return (
      <ul>{listItems}</ul>
    );
  }
});
