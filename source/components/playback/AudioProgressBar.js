import React, { Component } from 'react'
import formatTime from '../../helpers/formatTime'

export default class AudioProgressBar extends Component {
  constructor(props) {
    super(props)
    this.handleSeek = this.handleSeek.bind(this)
  }

  componentDidMount() {
    const forceUpdate = () => { this.forceUpdate.call(this) }

    this.props.audio.on('load', forceUpdate)
    this.props.audio.on('seek', forceUpdate)
    this.props.audio.on('play', () => {
      this.timer = setInterval(forceUpdate, 500)
    })
    this.props.audio.on('pause', () => clearInterval(this.timer))
    this.props.audio.on('stop', () => clearInterval(this.timer))
  }

  handleSeek(event) {
    const coords  = this.refs.seekBar.getClientRects()[0]
    const clickX = event.pageX - coords.left
    const percent = clickX / (coords.right - coords.left)

    const seekPosition = this.props.audio.duration() * percent
    this.props.audio.seek(seekPosition)
  }

  render() {
    const { audio } = this.props
    const position = audio.seek()
    const duration = audio.duration()
    const percentage = `${(position / duration) * 100}%`

    let progressText, progressStyle
    if (this.props.audio.state() === 'loading') {
      progressText = 'Loading...'
      progressStyle = { display: 'none' }
    } else {
      progressText = `${formatTime(position)} / ${formatTime(duration)}`
      progressStyle = { width: percentage }
    }

    return (
      <div className="audio-progress-bar" ref="seekBar" onClick={this.handleSeek}>
        <div className="audio-timer">{progressText}</div>
        <div className="audio-progress-bar-fill" style={progressStyle}>
          <div className="audio-timer">{progressText}</div>
        </div>
      </div>
    )
  }
}
