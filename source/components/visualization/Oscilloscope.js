var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    if (!this.props.width || !this.props.height || !this.props.data.length) {
      return (
        <path d="M0,25L1000,25" stroke={'url('+this.props.stroke+')'} strokeWidth="2" fill="none" />
      );
    }

    var sliceWidth = (this.props.width / this.props.data.length)
    var hCenter    = (this.props.height / 2);

    var coordinates = _.map(this.props.data, function(value, index) {
      var offsetY = (value - 128);
      var coords = {
        x: Math.round(sliceWidth * index),
        y: Math.round(hCenter + (offsetY * 1.5))
      };

      return [coords.x, coords.y].join(',');
    }.bind(this));

    return (
      <path d={'M' + coordinates.join('L')} stroke={'url('+this.props.stroke+')'} strokeWidth="2" fill="none" />
    );
  }
});
