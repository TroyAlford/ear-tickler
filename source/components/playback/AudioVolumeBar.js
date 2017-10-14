import React, { Component } from 'react'

export default class AudioVolumeBar extends Component {
  constructor(props) {
    super(props)

    this.handleSetVolume = this.handleSetVolume.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleVolumeDown = this.handleVolumeDown.bind(this)
    this.handleVolumeUp = this.handleVolumeUp.bind(this)
  }

  componentDidMount() {
    const forceUpdate = () => { this.forceUpdate.call(this) }

    this.props.audio.on('volume', forceUpdate)
    this.props.audio.on('mute', forceUpdate)
  }

  handleSetVolume(event) {
    const coords  = this.refs.volumeBar.getClientRects()[0]
    const clickX = event.pageX - coords.left
    const volume = clickX / (coords.right - coords.left)

    this.props.audio.volume(volume)
  }
  handleMuteToggle() {
    const muted = !this.props.audio.mute()
    this.props.audio.mute(muted);
  }
  handleVolumeDown(event) {
    let volume = this.state.volume - .1
    if (volume < 0.0) volume = 0.0

    this.props.audio.volume(volume)
  }
  handleVolumeUp() {
    let volume = this.state.volume + .1
    if (volume > 1.0) volume = 1.0

    this.props.audio.volume(volume)
  }

  render() {
    const { audio } = this.props
    const muted = audio.mute()
    const volume = audio.volume()

    const muteToggleClasses = muted ? 'tickle-volume-muted muted' : 'tickle-volume-mute'
    const barStyle = { width: `${(volume * 100)}%` }

    return (
      <div className="audio-volume-wrapper">
        <i className={muteToggleClasses} onClick={this.handleMuteToggle} />
        <i className="tickle-volume-down" onClick={this.handleVolumeDown} />
        <div className="audio-volume-bar" ref="volumeBar" onClick={this.handleSetVolume}>
          <div className="audio-volume-bar-fill" height="100" width="100" style={barStyle} />
        </div>
        <i className="tickle-volume-up" onClick={this.handleVolumeUp} />
      </div>
    )
  }
}
