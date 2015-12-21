var React = require('react');
var TrackList = require('./TrackList.js');
var TrackListControls = require('./TrackListControls.js');
var TrackSearchBar = require('./TrackSearchBar.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      selected: {}
    };
  },

  handlePlayTrack: function(track_id) {
    this.props.onPlayTrack(track_id);
  },
  handleCancelEdit: function() {
    this.setState({ selected: {} });
  },
  handleUpdateTrack: function(track) {
    this.props.onUpdateTrack(track);
    this.setState({ selected: {} });
  },
  handleFilterChange: function(filterText) {
    this.setState({ filterText: filterText });
  },
  handleSelectTrack: function(track) {
    this.setState({ selected: track });
  },

  render: function() {
    return (
      <div className="filtered-track-list">
        <TrackSearchBar
          filterText={this.state.filterText}
          onFilterChange={this.handleFilterChange}
        />
        <TrackList
          filterText={this.state.filterText}
          addedTrackIds={this.props.addedTrackIds}
          selected={this.state.selected}
          tracks={this.props.tracks}
          onPlayTrack={this.handlePlayTrack}
          onRemoveTrack={this.props.onRemoveTrack}
          onSelectTrack={this.handleSelectTrack}
        />
        <TrackListControls
          selected={this.state.selected}
          tracks={this.props.tracks}
          onCancelEdit={this.handleCancelEdit}
          onUpdateTrack={this.handleUpdateTrack}
        />
      </div>
    );
  }
});
