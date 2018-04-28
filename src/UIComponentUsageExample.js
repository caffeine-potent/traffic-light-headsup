import React, { Component } from "react"
import "./App.css"

import {TrafficLight} from "./TrafficLights.js"
import {CountBox} from "./NumberCounter.js"

class App extends Component {
	render() {
		return (
			<div className="MainContainer">
				<TrafficLight lightColor="red"></TrafficLight>
				<CountBox count="10"></CountBox>
			</div>
		)

	}
}

export default App
