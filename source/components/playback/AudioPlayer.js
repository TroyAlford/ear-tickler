import React, { Component } from 'react'
import AudioControlBar from './AudioControlBar'
import AudioProgressBar from './AudioProgressBar'
import AudioVolumeBar from './AudioVolumeBar'

import { Howl } from 'howler'

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.loadAudio = this.loadAudio.bind(this)
  }

  componentWillMount() {
    this.loadAudio()
  }
  componentWillUnmount() {
    this.audio.off() // Remove all attached event handlers
    this.audio.stop()
  }

  loadAudio() {
    const { player: { url } } = this.props

    this.audio = new Howl({
      src: [url],
      html5: false, // Force HTML5 Audio & buffered-loading
      loop: false,
      volume: 1.0,
    })
  }

  handleClose() {
    this.props.onClose(this.props.player_id)
  }

  render() {
    const playerClassName = `audio-player ${this.audio.playing() ? 'playing' : ''}`
    return (
      <div className={playerClassName}>
        <div className="track-name">{this.props.title}</div>
        <i
          className="tickle-close close-button"
          onClick={this.handleClose}>
        </i>
        <AudioControlBar audio={this.audio} />
        <AudioProgressBar audio={this.audio} />
        <AudioVolumeBar audio={this.audio} initialVolume={1.0} />
      </div>
    )
  }
}
