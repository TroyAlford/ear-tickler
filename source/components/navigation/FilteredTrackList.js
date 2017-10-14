import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrackList from './TrackList'

class FilteredTrackList extends Component {
  constructor(props) {
    super(props)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  state = { filterText: '' }

  handleFilterChange({ target: { value: filterText } }) {
    if (filterText !== this.state.filterText) {
      this.setState({ filterText, filter: new RegExp(filterText, 'i') })
    }
  }

  render() {
    const { filterText, filter } = this.state
    let filteredTracks = this.props.tracks
    if (filterText.length) {
      filteredTracks = filteredTracks.filter(track =>
        track.name.search(filter) !== -1
      )
    }

    return (
      <div className="filtered-track-list">
        <input
          type="text" placeholder="Search..."
          onChange={this.handleFilterChange}
          value={filterText}
        />
        <TrackList tracks={filteredTracks} />
      </div>
    )
  }
}

export default connect(
  (state) => ({ tracks: state.tracks })
)(FilteredTrackList)
