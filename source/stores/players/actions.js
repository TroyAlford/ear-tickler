import guid from '../../helpers/Guid'

export const ACTIONS = {
  ADD: 'player.add',
  REMOVE: 'player.remove',
}

export const addPlayer = (track) => ({
  type: ACTIONS.ADD,
  player: {
    playerId: guid(),
    ...track,
  },
})
export const removePlayer = (playerId) => ({ type: ACTIONS.REMOVE, playerId })
