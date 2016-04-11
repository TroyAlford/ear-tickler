var React = require('react');

module.exports = React.createClass({
    handleFilterChange: function() {
        var filterText = this.refs.searchBox.value;
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
