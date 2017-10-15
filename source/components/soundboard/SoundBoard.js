import React, { Component } from 'react'
import { connect } from 'react-redux'
import AudioPlayer from '../playback/AudioPlayer'

class SoundBoard extends Component {
  render() {
    return (
      <div className="sound-board">
        {this.props.players.map(player =>
          <AudioPlayer key={player.playerId} {...player} />
        )}
      </div>
    )
  }
}

export default connect(
  (state) => ({ players: state.players })
)(SoundBoard)
