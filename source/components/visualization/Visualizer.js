import React, { Component } from 'react'
import { connect } from 'react-redux'

import Oscilloscope from './Oscilloscope'

class Visualizer extends Component {
  constructor(props) {
    super(props)

    // Force Howler to setup & create an audio context
    if (!Howler.ctx) Howler.volume(1)
    const { ctx } = Howler

    ctx.analyzer = ctx.createAnalyser()
    ctx.analyzer.fftSize = 2048 // Default setting

    ctx.merger = ctx.createChannelMerger(2)
    ctx.merger.connect(ctx.analyzer)

    this.attachAudioNodes = this.attachAudioNodes.bind(this)
    this.renderPath = this.renderPath.bind(this)

    this.attachAudioNodes()
  }

  componentWillReceiveProps(nextProps) {
    this.reattach = true
  }
  componentDidUpdate() {
    if (this.reattach) {
      this.attachAudioNodes()
      this.reattach = false
    }
  }

  attachAudioNodes() {
    const { _howls: howls, ctx } = Howler

    howls
    .filter(howl => !howl.merged)
    .forEach((howl) => {
      howl._sounds.forEach((sound) => {
        if (howl._webAudio) sound._node.connect(ctx.merger)
        if (howl._html5) {
          sound.crossOrigin = 'anonymous'
          sound.webAudioNode = ctx.createMediaElementSource(sound._node)
          sound.webAudioNode.connect(ctx.merger)
        }
      })

      howl.merged = true
    })
  }

  componentDidMount() {
    this.refreshInterval = setInterval(this.forceUpdate.bind(this), 33)
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval)
  }

  renderPath() {
    if (!this.svg) return null

    const { analyzer } = Howler.ctx
    const bufferLength = analyzer.frequencyBinCount
    let timeData = new Uint8Array(bufferLength)

    analyzer.getByteTimeDomainData(timeData)

    const { height, width } = this.svg.getBoundingClientRect()
    const sliceWidth = width / timeData.length
    const hCenter    = height / 2

    const coordinates = Array.from(timeData).map((value, index) => {
      const offsetY = (value - 128)

      const x = Math.round(sliceWidth * index)
      const y = Math.round(hCenter + (offsetY * 1.5))

      return `${x},${y}`
    })

    const path = `M${coordinates.join('L')}`
    return <path d={path} stroke="url(#rainbow)" strokeWidth="2" />
  }

  render() {
    return (
      <svg className="visualizer" ref={(self) => { this.svg = self }}>
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopOpacity="1" stopColor="#ff0000" />
            <stop offset="16%"  stopOpacity="1" stopColor="#ffa500" />
            <stop offset="33%"  stopOpacity="1" stopColor="#ffff00" />
            <stop offset="50%"  stopOpacity="1" stopColor="#008000" />
            <stop offset="66%"  stopOpacity="1" stopColor="#0000ff" />
            <stop offset="83%"  stopOpacity="1" stopColor="#4b0082" />
            <stop offset="100%" stopOpacity="1" stopColor="#8d38c9" />
          </linearGradient>
        </defs>
        {this.renderPath()}
      </svg>
    )
  }
}

export default connect(
  (state) => ({ players: state.players })
)(Visualizer)
