import React, { Component } from 'react'

export default class BreakSession extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <button id = 'break-increment' onClick = {() => this.props.increase("break")}> Increase </button>
                <p id = 'break-label'>Break length</p>
                <p id = 'break-length'>{this.props.display}</p>
                <button id = 'break-decrement' onClick = {() => this.props.decrease("break")}> Decrease </button>
            </div>
        )
    }
}
