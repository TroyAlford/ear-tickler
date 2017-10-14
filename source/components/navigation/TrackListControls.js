import React, { Component } from 'react'

export default class TrackListControls extends Component {
  constructor(props) {
    super(props)

    this.clearSelectedState = this.clearSelectedState.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

    this.state = {
      selected_id: undefined,
      selected_name: undefined,
      selected_url: undefined,
    }
  }

  componentWillReceiveProps(props) {
    if (props.selected && props.selected.id !== this.props.selected.id) {
      this.setState({
        selected_id: props.selected.id,
        selected_name: props.selected.name,
        selected_url: props.selected.url,
      })
      this.setFocus = true
    } else if (!props.selected) {
      this.clearSelectedState()
    }
  }

  componentDidUpdate() {
    if (this.setFocus) {
      this.refs.name.focus()
      this.setFocus = false
    }
  }

  clearSelectedState() {
    this.setState({
      selected_id: null,
      selected_name: null,
      selected_url: null
    })
  }

  getBackupUrl() {
    var json = JSON.stringify({
      tracks: this.props.tracks
    })
    var blob = new Blob([json], { type: 'octet/stream' })
    return URL.createObjectURL(blob)
  }

  handleBlur() {
    this.props.onCancelEdit()
  }
  handleChange() {
    this.setState({
      selected_id: this.state.selected.id,
      selected_name: this.refs.name.value,
      selected_url: this.refs.url.value
    })
  }
  handleKeyUp(event) {
    switch (event.key) {
      case "Enter":  // --> Save
        this.props.onUpdateTrack({
          id: this.props.selected.id,
          name: this.refs.name.value,
          url: this.refs.url.value,
        })
        break
      case "Escape": // --> Cancel
        this.props.onCancelEdit()
        break
    }
  }

  render() {
    return (
      <div className={`track-list-controls ${this.state.selected_id ? 'visible' : ''}`}>
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
}
