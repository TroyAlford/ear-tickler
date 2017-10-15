import React    from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from '../stores'
import Layout from './Layout'

import registerServiceWorkers from '../service-workers/register'
registerServiceWorkers()

ReactDOM.render(
  <Provider store={store}>
    <Layout />
  </Provider>
, document.getElementById('application'))
