import React, { Component } from 'react'
import guid from '../../helpers/Guid'

export default class AudioControlBar extends Component {
  constructor(props) {
    super(props)

    this.getButtonClass = this.getButtonClass.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handlePlayToggle = this.handlePlayToggle.bind(this)
  }

  componentDidMount() {
    const forceUpdate = () => { this.forceUpdate.call(this) }

    this.props.audio.on('end', forceUpdate)
    this.props.audio.on('load', forceUpdate)
    this.props.audio.on('pause', forceUpdate)
    this.props.audio.on('play', forceUpdate)
    this.props.audio.on('stop', forceUpdate)
  }

  handlePlayToggle() {
    if (this.props.audio.state() !== 'loaded') return undefined

    if (this.props.audio.playing())
      this.props.audio.pause()
    else
      this.props.audio.play()
  }
  handleLoopToggle() {
    const loop = !this.props.audio.loop()
    this.props.audio.loop(loop)
    this.forceUpdate()
  }

  getButtonClass() {
    if (this.props.audio.state() === 'loading')
      return 'loading animate-spin'

    if (this.props.audio.playing())
      return 'pause'
    else
      return 'play'
  }

  render() {
    const buttonClass = `play-button tickle-${this.getButtonClass()}`
    const loop = this.props.audio.loop()
    const loopToggleClass = `loop-toggle loop-${loop ? 'on' : 'off'}`
    return (
      <div className="audio-control-bar">
        <i className={buttonClass} onClick={this.handlePlayToggle} />
        <label className={loopToggleClass} onClick={this.handleLoopToggle}>
          <i className="tickle-loop" />
        </label>
      </div>
    )
  }
}
