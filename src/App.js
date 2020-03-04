import React, {Component} from 'react';
import './App.css';
import RollBall from './Components/rolls/rolls';
import ScoreBoard from './Components/Scoreboard/Scoreboard';
import Frame from './Components/Frame/Frame';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.onRoll = this.onRoll.bind(this);

    this.state = {
      rolls: [],
      gameOver: false,
      isLastFrame:false,
      firstRoll:true,
      frame:0,
      actual:0,
      bonusOne:0,
      bonusTwo:0,
      bonusSpare:0
    };
  }

  onRoll() {
    
    let count = parseInt(localStorage.getItem("count")) || 0;
    let nextRollState = !this.state.firstRoll;
    if (this.state.firstRoll) {
      count = Math.round(Math.random()*10);
      // count = 10;
      localStorage.setItem("count",count);
      if (count === 10){
          if(!this.state.isLastFrame){ 
            this.setState({frame: this.state.frame += 1});
          }else if(!this.state.actual && !this.state.bonusOne && !this.state.bonusTwo){
            this.setState({actual: this.state.actual = 1});
          }else if(!this.state.bonusOne && !this.state.bonusTwo){
            this.setState({bonusOne: this.state.bonusOne = 1});
          }else{
            this.setState({frame: this.state.frame += 1});
          }
          nextRollState = true;
      }
    }else{
      count = Math.round(Math.random()*(10-count));  
      // count = 0;
      if(this.state.isLastFrame){
        if(this.state.bonusSpare){
          this.setState({frame: this.state.frame += 1});
        }
        if(this.state.rolls[this.state.rolls.length-1] + count === 10){
          this.setState({bonusSpare: this.state.bonusSpare = 1});
        }else{
          this.setState({frame: this.state.frame += 1});
        }
      }else{
        this.setState({frame: this.state.frame += 1});
      }  
    }
    if(this.state.frame === 9){
      this.setState({isLastFrame:true});
    }
    if(this.state.frame === 10){
      this.setState({gameOver:true});
    }
    const newRolls = [count];
 
    this.setState({rolls: [...this.state.rolls, ...newRolls], firstRoll: nextRollState});

  }

  render() {
    let Score;
    let roll;
    if(this.state.gameOver){
      Score = <ScoreBoard rolls={this.state.rolls}/>;
      roll =  <h4>Game Over...</h4>;
    }else{
      Score = <h4>Game in progress...</h4>;
      roll =  <RollBall onClick={this.onRoll}/>;
    }
    return (
      <div className="App">
        <div className="Bowling-header">
          <h1>Bowling</h1>
          {roll}
          <div className="frames">
            <Frame rolls={this.state.rolls}/>
          </div>
          {Score}
        </div>
      </div>
    );
  }
}

export default App;
