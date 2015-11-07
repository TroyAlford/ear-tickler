var React = require('react');
var TrackSearchBar = require('./TrackSearchBar.js');
var TrackList = require('./TrackList.js');

var FilteredTrackList = React.createClass({
    getInitialState: function() {
        return {
            filterText: ''
        };
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
                    tracks={this.props.tracks}
                />
            </div>
        );
    }
});

module.exports = FilteredTrackList;
