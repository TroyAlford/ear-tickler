var React = require('react');
var TrackList = require('./TrackList.js');
var TrackListControls = require('./TrackListControls.js');
var TrackSearchBar = require('./TrackSearchBar.js');

var FilteredTrackList = React.createClass({
  getInitialState: function() {
    return {
      filterText: ''
    };
  },

  handleAddClicked: function(track_id) {
    this.props.onAddClicked(track_id);
  },
  handleFilterChange: function(filterText) {
    this.setState({
      filterText: filterText
    });
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
          tracks={this.props.tracks}
          onAddClicked={this.handleAddClicked}
        />
        <TrackListControls
          tracks={this.props.tracks}
        />
      </div>
    );
  }
});

module.exports = FilteredTrackList;
