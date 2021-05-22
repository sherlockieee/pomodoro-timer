import React, { Component } from 'react'


export default class WorkSession extends Component {

    
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <button id = 'session-increment' onClick = {() => this.props.increase("work")}> Increase </button>
                <p id = 'session-label'> Session length </p>
                <p id = 'session-length'>{this.props.display}</p>
                <button id = 'session-decrement' onClick = {() => this.props.decrease("work")}> Decrease </button>
            </div>
        )
    }
}
