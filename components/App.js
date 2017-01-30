import React, { Component } from 'react'
import { Link } from 'react-router'

class App extends Component {
	render() {
		return (
			<div>
				<style jsx>{`
				p {
					color: red;
				}
				`}</style>
				<p>App</p>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
				</ul>
				{this.props.children}
			</div>
		)
	}
}

export default App