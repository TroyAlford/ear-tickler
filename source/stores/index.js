import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux'
import thunk from 'redux-thunk'

import players from './players/reducer'
import tracks from './tracks/reducer'

export default createStore(
  combineReducers({
    players,
    tracks,
  }),
  window.InitialState || {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
