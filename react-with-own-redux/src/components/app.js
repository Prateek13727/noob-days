import React, { Component } from 'react';

//pseudo reduxer
const counter = ( state = {value: 0}, action) => {
	switch(action.type){
		case 'INCREMENT':
			return { value: state.value + 1 };
		case 'DECREMENT':
			return { value: state.value - 1 };
		default:
			return state;
	}
}	

class App extends Component {
	state = counter(undefined, {});

	//pseudo action creator
	dispatch(action) {
		this.setState((prevState) => counter(prevState, action));
	}

	render() {
		const {value} = this.state;
		return (
			<div>
				{value}
				<button onClick={this.dispatch.bind(this, {type: 'INCREMENT'})}>Increment</button>
				<button onClick={this.dispatch.bind(this, {type: 'DECREMENT'})}>Decrement</button>
			</div>
		)
	}
}

export default App;