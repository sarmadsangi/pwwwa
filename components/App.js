import React, { Component } from 'react'

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
				{this.props.children}
			</div>
		)
	}
}

export default App