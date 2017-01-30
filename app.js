import koa from 'koa'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { flushToHTML } from 'styled-jsx/server'

import routes from './components/routes'

const app = koa()

app.use(function *(){
	match({ routes, location: this.url }, (error, redirectLocation, renderProps) => {
		console.log(this.url)
		console.log(routes)
		console.log(renderProps)
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
				    <div id="root">${app}</div>
				  </body>
				</html>`
		  	this.body = html
		} else {
			this.throw(404, 'Not found')
		}
	})
	// const app = ReactDOMServer.renderToString(<App />)
	// const styles = flushToHTML()
	// const html = `<!doctype html>
	// 	<html>
	// 	  <head>${styles}</head>
	// 	  <title>Test</title>
	// 	  <body>
	// 	    <div id="root">${app}</div>
	// 	  </body>
	// 	</html>`
 //  	this.body = html
})

app.listen(3000)