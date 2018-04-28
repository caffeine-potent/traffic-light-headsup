import React, { Component } from "react"
import propTypes from "prop-types"

import UserContext from "../UserContext"

/**
  Ask for location, start tracking, & send data upstream
*/
export class _GeolocationTracker extends Component {
	constructor() {
		this.onStartTracking = this.onStartTracking.bind(this)
		this.onPosition = this.onPosition.bind(this)
		this.onPositionError = this.onPositionError.bind(this)
	}
	onStartTracking(evt) {
		evt.preventDefault()
		if (this.state.watch) {
			return
		}
		const watch = navigator.geolocation.watchPosition(
			this.onPosition,
			this.onError,
			{
				enableHighAccuracy: this.props.enableHighAccuracy,
				timeout: this.props.timeout,
				maximumAge: this.props.maximumAge
			}
		)
		this.setState({
			watch
		})
	}
	onPosition(pos) {
		this.reportPosition(pos)
	}
	onPositionError(error) {
		console.log("position error!", error)
	}
	reportPosition(pos) {}
	render() {
		let button = null
		if (!this.state.watch) {
			button = (
				<button type="button" onClick={this.onStartTracking}>
					Start!
				</button>
			)
		}
		return <span id="tracking">{button}</span>
	}
}

_GeolocationTracker.propTypes = {
	positionUrl: propTypes.string,
	enableHighAccuracy: propTypes.bool,
	timeout: propTypes.number,
	maximumAge: propTypes.number
}

_GeolocationTracker.defaultProps = function() {
	return {
		positionUrl: "/pos",
		enableHighAccuracy: true,
		timeout: 30000,
		maximumAge: 2000
	}
}

export const GeolocationTracker = props => (
	<UserContext.Consumer>
		{user => <_GeolocationTracker {...props} user={user} />}
	</UserContext.Consumer>
)

export default GeolocationTracker