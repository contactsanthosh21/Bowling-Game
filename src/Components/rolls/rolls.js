import React from 'react';
import PropTypes from "prop-types";

const RollBall = ({onClick}) =>  {
  let ball;
  ball = <div className="roll" onClick={() => {onClick()}}>Roll</div>
  return (<div>{ball}</div>);
};

RollBall.propTypes ={
    onClick: PropTypes.func.isRequired,
}
 
export default RollBall;