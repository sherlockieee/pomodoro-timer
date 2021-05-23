import React, { Component } from 'react'


export default class WorkSession extends Component {

    
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div id = 'WorkSession' className = 'flex-column'>
                    <p id = 'session-label'> Session length </p>
                <div className = "flex-row">
                    <button id = 'session-increment' className = 'button-increment' onClick = {() => this.props.increase("work")}> + </button>
                    <p id = 'session-length' className = 'font-medium'>{this.props.display}</p>
                    <button id = 'session-decrement' className = 'button-increment' onClick = {() => this.props.decrease("work")}> - </button>
                </div>
            </div>
        )
    }
}
