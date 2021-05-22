import React, { Component } from 'react'

export default class countdownDisplay extends Component {
    render() {
        return (
            <div>
                <p id = 'timer-label'> {this.props.current == 'work'? 'Work Session': 'Break Session'} </p>
                <h2 id = 'time-left'>{this.props.display}</h2>
            </div>
        )
    }
}
