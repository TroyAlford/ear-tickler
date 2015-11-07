var React = require('react');
var TrackStore = require('./../TrackStore.js');

var TrackList = React.createClass({
    handleFilterChange: function() {
        var filterText = this.refs.searchBox.getDOMNode().value;
        this.props.onFilterChange(filterText);
    },
    render: function() {
        return (
            <input
                type="text"
                placeholder="Search..."
                value={this.props.filterText}
                ref="searchBox"
                onChange={this.handleFilterChange}
            />
        );
    }
});

module.exports = TrackList;
