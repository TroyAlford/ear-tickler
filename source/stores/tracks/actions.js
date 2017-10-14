import guid from '../../helpers/Guid'

export const ACTIONS = {
  ADD: 'track.add',
  REMOVE: 'track.remove',
  UPDATE: 'track.update',
}

export const addTrack = (track) => ({
  type: ACTIONS.ADD,
  track: {
    trackId: guid(),
    ...track,
  },
})
export const removeTrack = (trackId) => ({ type: ACTIONS.REMOVE, trackId })
