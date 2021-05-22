import React, { Component } from 'react'

export default class countdownDisplay extends Component {
    render() {
        return (
            <div>
                <p id = 'timer-label'> {this.props.current == 'work'? 'Work Session': 'Break Session'} </p>
                <h2 id = 'time-left'>{this.props.display}</h2>
                <audio id = 'beep'>
                    <source src="files/beep.mp3" type="audio/mpeg"/>
                        Your browser does not support the audio element.
                </audio>
            </div>
        )
    }
}
