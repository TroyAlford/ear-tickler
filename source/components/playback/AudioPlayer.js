import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Howl } from 'howler'
import AudioControlBar from './AudioControlBar'
import AudioProgressBar from './AudioProgressBar'
import AudioVolumeBar from './AudioVolumeBar'
import { removePlayer } from '../../stores/players/actions'

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillMount() {
    const { url } = this.props

    this.audio = new Howl({
      src: [url],
      loop: false,
      volume: 1.0,
    })

    const forceUpdate = () => { this.forceUpdate.call(this) }
    this.audio.on('play', forceUpdate)
    this.audio.on('pause', forceUpdate)
    this.audio.on('stop', forceUpdate)
  }
  componentWillUnmount() {
    this.audio.off() // Remove all attached event handlers
    this.audio.stop()
  }

  handleClose() {
    this.props.dispatch(removePlayer(this.props.playerId))
  }

  render() {
    const playerClassName = [
      'audio-player',
      this.audio.playing() ? 'playing' : 'paused',
    ].join(' ')

    return (
      <div className={playerClassName}>
        <div className="track-name">{this.props.name}</div>
        <i className="tickle-close close-button" onClick={this.handleClose} />
        <AudioControlBar audio={this.audio} />
        <AudioProgressBar audio={this.audio} />
        <AudioVolumeBar audio={this.audio} initialVolume={1.0} />
      </div>
    )
  }
}

export default connect()(AudioPlayer)
