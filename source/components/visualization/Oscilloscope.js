import React, { Component } from 'react'

export default class Oscilloscope extends Component {
  render() {
    if (!this.props.width || !this.props.height || !this.props.data.length) {
      return (
        <path d="M0,25L1000,25" stroke={'url('+this.props.stroke+')'} strokeWidth="2" fill="none" />
      )
    }

    const sliceWidth = (this.props.width / this.props.data.length)
    const hCenter    = (this.props.height / 2)

    const coordinates = this.props.data.map((value, index) => {
      const offsetY = (value - 128)
      const coords = {
        x: Math.round(sliceWidth * index),
        y: Math.round(hCenter + (offsetY * 1.5))
      }

      return [coords.x, coords.y].join(',')
    })

    return (
      <path d={'M' + coordinates.join('L')} stroke={'url('+this.props.stroke+')'} strokeWidth="2" fill="none" />
    )
  }
}
