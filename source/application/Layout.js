import React, { Component } from 'react'
import { connect } from 'react-redux'

import FilteredTrackList from '../components/navigation/FilteredTrackList'
import SoundBoard from '../components/soundboard/SoundBoard'
import Visualizer from '../components/visualization/Visualizer'

export default class Layout extends Component {
  render() {
    return(
      <div className="ear-tickler application">
        <div className="header-bar">
          <div className="title">
            <i className="tickle-logo"></i> Ear Tickler
          </div>
          <div className="social-media">
            <a href="https://github.com/troyalford/ear-tickler" target="_blank">
              <i className="tickle-github"></i>
            </a>
          </div>
        </div>
        <FilteredTrackList />
        <SoundBoard />
      </div>
    )
  }
}
