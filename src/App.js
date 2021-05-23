import React, { Component } from 'react'
import useScript from './components/useScript.js'
import './App.scss'
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
      timer: 25 * 60,
      display: "25:00",
      current: "work",
      interval: null,
    }

    
  }

  togglePlayButton = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  increase = (type) => {
    const { workTime, breakTime, playing } = this.state;
    if (!playing){
      if (type === 'work' && workTime < 60){
        this.setWorkTime(workTime + 1)

        if (this.state.current === 'work'){
          this.showDisplay((workTime + 1) * 60)
        }
      } else if (type === 'break' && breakTime < 60){
        this.setBreakTime(breakTime + 1)

        if (this.state.current === 'break'){
          this.showDisplay((breakTime + 1)*60)
        }
      }
    }
  }

  decrease = (type) => {
    const { workTime, breakTime, playing } = this.state;
    if (!playing){
      if (type === 'work' && workTime > 1 ){
        this.setWorkTime(workTime - 1);

        if (this.state.current === 'work'){
          this.showDisplay((workTime - 1) * 60)
        }
      } else if (type === 'break' && breakTime > 1) {
        this.setBreakTime(breakTime - 1);

        if (this.state.current ==='break'){
          this.showDisplay((breakTime - 1) * 60)
        }
      }
    }
  }

  setBreakTime = (time) => {
    this.setState({
      breakTime: time
    })
  }

  setWorkTime = (time) => {
    this.setState({
      workTime: time
    })
  }
  showDisplay = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = time - minutes * 60

    minutes = minutes < 10 ? "0" + String(minutes) : String(minutes)
    seconds = seconds < 10 ? "0" + String(seconds) : String(seconds)

    this.setState({
      display: minutes + ":" + seconds
    })
  }

  reset = () => {
    this.stopTimer();
    this.resetSound();
    this.setState({
      playing: false,
      workTime: 25,
      breakTime: 5,
      timer: 25 * 60,
      display: "25:00",
      current: "work",
      interval: null
    })
  }

  handleStartStop = () =>{
    this.togglePlayButton();
    if (!this.state.playing){
      if (this.state.current == "work"){
        this.startTimer(this.state.timer, "work")
      } else {
        this.startTimer(this.state.timer, "break")
      }
    } else {
      this.stopTimer()
    }
  }

  startTimer(timer, type){
    let intervalID = setInterval(() => {
      timer --;
      this.showDisplay(timer);
      if (timer === 0){
          this.playSound();
          this.stopTimer();
          type === 'work'? this.startTimer(this.state.breakTime * 60, 'break') 
          : this.startTimer(this.state.workTime * 60, 'work') 
        } 
      }, 1000)

    this.setState({
      interval: intervalID,
      current: type
    }
    )
    
  }
  
  playSound = () => {
    let snd = document.getElementById('beep');
    snd.play();
    setTimeout(this.resetSound, 1000)
  };

  resetSound = () => {
    let snd = document.getElementById('beep');
    snd.pause();
    snd.currentTime = 0;
  }

  stopTimer = () => {
    clearInterval(this.state.interval);
  }
  
  render() {
    return (
      <div className = 'App flex-column'>
        <ScriptComponent/>
        <div className = "flex-row">
          <BreakSession increase = {this.increase} decrease = {this.decrease} display = {this.state.breakTime}/>

          <WorkSession increase = {this.increase} decrease = {this.decrease} display = {this.state.workTime}/>
        </div>
        
        <div className = "flex-column">
            <CountdownDisplay display = {this.state.display} current = {this.state.current}/>
            <div className = 'flex-row'>
              <button id='start_stop' className = 'button-normal' onClick = {this.handleStartStop}>{this.state.playing? "Pause" : "Start"}</button>

              <button id = 'reset' className = 'button-normal' onClick = {this.reset}> Reset </button>
            </div>
            

        </div>
        
      </div>
    )
  }

}
