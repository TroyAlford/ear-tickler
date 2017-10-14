import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPlayer } from '../../stores/players/actions'
import { removeTrack } from '../../stores/tracks/actions'

class TrackListItem extends Component {
  constructor(props) {
    super(props)
    this.handleAddPlayer = this.handleAddPlayer.bind(this)
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this)
  }

  handleAddPlayer() { this.props.dispatch(addPlayer(this.props.track)) }
  handleRemoveTrack() { this.props.dispatch(removeTrack(this.props.track)) }

  render() {
    const { track } = this.props

    return (
      <li>
        <i className="tickle-track" />
        <span className="track-name">{track.name}</span>
        <i className="tickle-add" onClick={this.handleAddPlayer} />
        <i className="tickle-remove" onClick={this.handleRemoveTrack} />
      </li>
    )
  }
}

export default connect()(TrackListItem)
