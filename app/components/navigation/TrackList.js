var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    var listItems = _.sortBy(this.props.tracks, 'name')
      .filter(function(track) {
        var filter = this.props.filterText.toLowerCase();
        var trackName = track.name.toLowerCase();
        return trackName.indexOf(filter) > -1;
      }, this)
      .map(function(track) {
        var iconClassName = 'tickle-track';
        if (_.includes(this.props.addedTrackIds, track.id))
          iconClassName += '-playing';

        var isSelected = (
          this.props.selected &&
          this.props.selected.id === track.id
        );

        return (
          <li key={track.id} track={track}
              className={isSelected ? 'selected' : ''}
              onClick={this.props.onSelectTrack.bind(null, track)}>
            <i className={iconClassName}></i>
            <span className="track-name">{track.name}</span>
            <i className="tickle-add"
               onClick={this.props.onPlayTrack.bind(null, track.id)}
            ></i>
            <i className="tickle-remove"
               onClick={this.props.onRemoveTrack.bind(null, track.id)}
            ></i>
          </li>
        );
      }, this
    );

    return (
      <ul>
        {listItems}
        <li key="new" track={{}} className="add-track"
            onClick={this.props.onSelectTrack.bind(null, { name: 'New Track...', url: '' })}>
          <i className="tickle-add"></i>
          <span className="track-name">Add New...</span>
        </li>
      </ul>
    );
  }
});
