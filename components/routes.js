import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import About from './About'

export default (
	<Route path='/' component={App} >
		<IndexRoute component={Home} />
		<Route path='/about' component={About} />
	</Route>
)

// export default {
//   path: '/',
//   component: App,
//   getChildRoutes(location, cb) {
//     require.ensure([], (require) => {
//       cb(null, [ require('./About') ])
//     })
//   },
//   indexRoute: {
//     component: Home
//   }
// }