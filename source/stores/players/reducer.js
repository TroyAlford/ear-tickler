import { ACTIONS } from './actions'

export default (state = [], action) => {
  switch (action.type) {

    case ACTIONS.ADD:
      return [...state, action.player]

    case ACTIONS.REMOVE:
      return state.filter(player => player.id !== action.id)

    default:
      return state
  }
}
