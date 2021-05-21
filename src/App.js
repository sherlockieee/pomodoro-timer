import React, { Component } from 'react'
import useScript from './components/useScript.js'
import './App.css'
import BreakSession from './components/breakSession.js'
import WorkSession from './components/workSession.js'
import CountdownDisplay from './components/countdownDisplay'


const ScriptComponent = () => {
  useScript("https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js");
  return null
}


export default class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      playing: false,
      workTime: 25,
      breakTime: 5,
      display: "25:00",
      current: "work"
    }

    this.togglePlayButton = this.togglePlayButton.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.reset = this.reset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
  }

  togglePlayButton(){
    this.setState({
      playing: !this.state.playing
    })
  }

  increase(type){
    const { workTime, breakTime, playing } = this.state;
    if (!playing){
      if (type === 'work' && workTime < 60){
        this.setState({
          workTime: workTime + 1
        })
      } else if (type === 'break' && breakTime < 60){
        this.setState({
          breakTime: breakTime + 1
        })
      }
    }
  }

  decrease(type){
    const { workTime, breakTime, playing } = this.state;
    if (!playing){
      if (type === 'work' && workTime > 1 ){
        this.setState({
          workTime: workTime - 1
        })
      } else if (type === 'break' && breakTime > 1) {
        this.setState({
          breakTime: breakTime - 1
        })
      }
    }
    
  }

  reset(){
    this.setState({
      playing: false,
      workTime: 25,
      breakTime: 5,
    })
  }

  handleStartStop(){
    this.togglePlayButton();
  }
  
  render() {
    return (
      <div className = 'App'>
        <ScriptComponent/>

        <BreakSession increase = {this.increase} decrease = {this.decrease} display = {this.state.breakTime}/>

        <WorkSession increase = {this.increase} decrease = {this.decrease} display = {this.state.workTime}/>

        <CountdownDisplay display = {this.state.display}/>

        <button id='start_stop' onClick = {this.handleStartStop}>{this.state.playing? "Pause" : "Start"}</button>
        <button id = 'reset' onClick = {this.reset}> Reset </button>
      </div>
    )
  }
}
