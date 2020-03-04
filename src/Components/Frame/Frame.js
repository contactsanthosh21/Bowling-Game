import React from 'react';
import PropTypes from "prop-types";


const Frame = ({rolls}) => {
    const frames = [];
    let i=0;
    let second;
    for (let frame = 0; frame < 12; frame++) {
        if(rolls[i] == 10){
            second =  <span className="strike">-</span>
        }else{
            second = <span className="second">{rolls[i+1]}</span>
        }
        frames.push(
        <div key={frame} className="frame">

        <span className="frameName">{frame+1}</span>
        <span className="first">{rolls[i]}</span>
            {second}
        </div>
        );
        if(rolls[i] != 10){
            i += 2;
        }else{
            i += 1; 
        }
    }

return (<div>
    {frames}
</div>);
};

Frame.propTypes = {
  rolls: PropTypes.array.isRequired,
}

export default Frame;