import React, { Component } from 'react'
import { connect } from 'react-redux'
import sortBy from '../../helpers/sortBy'
import TrackListItem from './TrackListItem'

export default ({ tracks = [] }) => (
  <ul>
    {tracks.map(track => <TrackListItem key={track.trackId} track={track} />)}
  </ul>
)
