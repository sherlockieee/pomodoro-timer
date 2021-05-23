import React, { Component } from 'react'

export default class countdownDisplay extends Component {
    render() {
        return (
            <div>
                <p id = 'timer-label'> {this.props.current == 'work'? 'Work Session': 'Break Session'} </p>
                <h2 id = 'time-left' className = 'font-large'>{this.props.display}</h2>
                <audio id = 'beep' src = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav">
                    Your browser does not support the audio element.
                </audio>
            </div>
        )
    }
}
