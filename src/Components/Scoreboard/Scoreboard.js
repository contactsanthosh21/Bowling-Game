import React from 'react';
import PropTypes from "prop-types";


const ScoreBoard = ({rolls}) => {
  let score = 0;
  let pointer = 0;
  let bonusPoint = 10;

  let isStrike = function (pointer) {
    return rolls[pointer] === 10;
  };

  let isSpare = function (pointer) {
    return rolls[pointer]+rolls[pointer+1] === 10;
  };

  for (let frame = 0; frame < 10; frame++) {
    if(isStrike(pointer)){
        score += bonusPoint + rolls[pointer+1] + rolls[pointer+2];
        pointer++;
    }
    else if (isSpare(pointer)){
        score += bonusPoint + rolls[pointer+2];
        pointer += 2;
    }else{
        score += rolls[pointer] + rolls[pointer+1];
        pointer += 2;
    }
  }


  return (
    <div className="scoreboard">
      <h1>Game Score = <span className="score">{score}</span></h1>
    </div>
  );
};

ScoreBoard.propTypes ={
    rolls: PropTypes.array.isRequired,
}

export default ScoreBoard;