import koa from 'koa'
import send from 'koa-send'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { flushToHTML } from 'styled-jsx/server'

import routes from './components/routes'

const app = koa()
app.use(function *(){
	if (/^\/dist/g.test(this.url)) {
		console.log('dist')
		console.log(this.path)
		yield send(this, this.path);
	} else {
		console.log('routes')
		match({ routes, location: this.url }, (error, redirectLocation, renderProps) => {
			if (error) {
				this.throw(500, error.message)
			} else if (redirectLocation) {
				this.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				// You can also check renderProps.components or renderProps.routes for
				// your "not found" component or route respectively, and send a 404 as
				// below, if you're using a catch-all route.
				const app = ReactDOMServer.renderToString(<RouterContext {...renderProps} />)
				const styles = flushToHTML()
				const html = `<!doctype html>
					<html>
					  <head>${styles}</head>
					  <title>Test</title>
					  <body>
					    <div id="app">${app}</div>
					   	<script src='/dist/bundle.js'></script>
					  </body>
					</html>`
			  	this.body = html
			} else {
				this.throw(404, 'Not found')
			}
		})
	}
})

// app.use(serve(__dirname + '/dist'))


app.listen(3000)