import React from 'react'
import { Router, Route, Link, IndexRoute } from 'react-router'
import App from './App'

if(typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

export default {
  path: '/',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/a') },
  childRoutes:[
    {
      path:'/a',
      getComponents:(nextState, cb) => {
        return require.ensure([], require => {cb(null, require('./Home').default);})
      }
    },
    {
      path:'/about',
      getComponents:(nextState, cb) => require.ensure([], require => {cb(null, require('./About').default);})
    },
  ]
};