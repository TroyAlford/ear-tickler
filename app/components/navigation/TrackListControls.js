var React = require('react'),
       cx = require('classnames'),
        _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { selected: null };
  },
  componentWillReceiveProps: function(props) {
    if (props.selected && props.selected.id !== this.props.selected.id) {
      this.setState({
        selected_id: props.selected.id,
        selected_name: props.selected.name,
        selected_url: props.selected.url
      });
      this.setFocus = true;
    } else if (!props.selected) {
      this.setState({
        selected_id: null,
        selected_name: null,
        selected_url: null
      });
    }
  },
  componentDidUpdate: function() {
    if (this.setFocus) {
      this.refs.name.focus();
      this.setFocus = false;
    }
  },

  getBackupUrl: function() {
    var json = JSON.stringify({
      tracks: this.props.tracks
    });
    var blob = new Blob([json], { type: 'octet/stream' });
    return URL.createObjectURL(blob);
  },

  handleChange: function() {
    this.setState({
      selected_id: this.state.selected.id,
      selected_name: this.refs.name.value,
      selected_url: this.refs.url.value
    });
  },
  handleKeyUp: function(event) {
    switch (event.key) {
      case "Enter":  // --> Save
        this.props.onUpdateTrack({
          id: this.props.selected.id,
          name: this.refs.name.value,
          url: this.refs.url.value
        });
        break;
      case "Escape": // --> Cancel
        this.props.onCancelEdit();
        break;
    }
  },

  render: function() {
    var classes = cx({
      'track-list-controls': true,
      'visible': this.state.selected_id
    });
    return (
      <div className={classes}>
        <label>
          Name
          <input
            ref="name"
            placeholder="Name"
            type="text"
            value={this.state.selected_name}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          ></input>
        </label>
        <label>
          URL
          <input
            ref="url"
            placeholder="URL"
            type="text"
            value={this.state.selected_url}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
          ></input>
        </label>
      </div>
    );
  }
});

//<a className="button backup"
//       download="track-list-backup.json"
//       href={this.getBackupUrl()}
//><i className="tickle-download"></i> Export</a>
