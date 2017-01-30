import React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory } from 'react-router'
import routes from './components/routes'

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
  render(<Router {...renderProps} />, document.getElementById('app'))
})