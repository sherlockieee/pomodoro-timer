import React, { Component } from 'react'

export default class BreakSession extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id = 'BreakSession' className = 'flex-column'>
                <p id = 'break-label'>Break length</p>

                <div className = "flex-row">
                    <button id = 'break-increment' className = 'button-increment' onClick = {() => this.props.increase("break")}> + </button>
                    <p id = 'break-length' className = 'font-medium'>{this.props.display}</p>
                    <button id = 'break-decrement' className = 'button-increment' onClick = {() => this.props.decrease("break")}> - </button>

                </div>
            </div>
        )
    }
}
