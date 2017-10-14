import { ACTIONS } from './actions'
import guid from '../../helpers/Guid'
import sortBy from '../../helpers/sortBy'

export default (state = [], action) => {
  switch (action.type) {

    case ACTIONS.ADD:
      return [...state, action.track, ...(action.tracks || [])]
        .filter(Boolean).sort(sortBy('name'))

    case ACTIONS.REMOVE:
      return state.filter(track => track.id !== action.id)

    case ACTIONS.UPDATE:
      const filtered = state.filter(track => track.id !== action.track.id)
      return [...filtered, action.track].sort(sortBy('name'))

    default:
      return state.map(track => ({ trackId: guid(), ...track }))
                  .sort(sortBy('name'))
  }
}
