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
      current: "work",
      interval: null,
    }

    this.togglePlayButton = this.togglePlayButton.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.reset = this.reset.bind(this);
    this.handleStartStop = this.handleStartStop.bind(this);
    this.startTimer = this.startTimer.bind(this);
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
          workTime: workTime + 1,
        })
        if (this.state.current == 'work'){
          this.setState({
            display: workTime + 1 >= 10? String(workTime + 1) + ":00" : "0" + String(workTime + 1) + ":00"
          })
        }
      } else if (type === 'break' && breakTime < 60){
        this.setState({
          breakTime: breakTime + 1 ,
        })

        if (this.state.current == 'break'){
          this.setState({
            display: breakTime + 1 >= 10? String(breakTime + 1) + ":00" : "0" + String(breakTime + 1) + ":00"
          })
        }
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
        if (this.state.current == 'work'){
          this.setState({
            display: workTime - 1 >= 10? String(workTime - 1) + ":00" : "0" + String(workTime - 1) + ":00"
          })
        }
      } else if (type === 'break' && breakTime > 1) {
        this.setState({
          breakTime: breakTime - 1
        })

        if (this.state.current == 'break'){
          this.setState({
            display: breakTime - 1 >= 10? String(breakTime - 1) + ":00" : "0" + String(breakTime - 1) + ":00"
          })
        }
      }
    }
    
  }

  reset(){
    this.stopTimer();
    this.setState({
      playing: false,
      workTime: 25,
      breakTime: 5,
      display: "25:00",
      current: "work",
      interval: null
    })
  }

  handleStartStop(){
    this.togglePlayButton();
    if (!this.state.playing){
      if (this.state.current == "work"){
        this.startTimer(this.state.workTime, "work")
      } else {
        this.startTimer(this.state.breakTime, "break")
      }
    } else {
      this.stopTimer()
    }
  }

  startTimer(time, type){
    let minutes = time - 1
    let seconds = 59
    
    let intervalID = setInterval(() => {
      let minuteStr = String(minutes).length == 1 ? "0" + String(minutes) : String(minutes);
      let secondStr = String(seconds).length == 1 ? "0" + String(seconds) : String(seconds);
      this.setState({
        display: minuteStr + ":" + secondStr
      })

      if (seconds > 0){
        seconds -= 1
      } else if (minutes > 0){
        minutes -= 1
        seconds = 59
      } else {
        this.stopTimer();
        type == 'work'? this.startTimer(this.state.breakTime, 'break') : this.startTimer(this.state.breakTime, 'work') 
      }
    }, 1000)

    this.setState({
      interval: intervalID,
    }
    )
    
  }

  stopTimer = () => {
    clearInterval(this.state.interval);
  }
  
  render() {
    return (
      <div className = 'App'>
        <ScriptComponent/>

        <BreakSession increase = {this.increase} decrease = {this.decrease} display = {this.state.breakTime}/>

        <WorkSession increase = {this.increase} decrease = {this.decrease} display = {this.state.workTime}/>

        <CountdownDisplay display = {this.state.display} current = {this.state.current}/>

        <button id='start_stop' onClick = {this.handleStartStop}>{this.state.playing? "Pause" : "Start"}</button>
        <button id = 'reset' onClick = {this.reset}> Reset </button>
      </div>
    )
  }
}
