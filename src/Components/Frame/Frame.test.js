import React from 'react';
import Frame from './Frame';
import { render, mount,shallow } from "../../setupTest";

function setup(rolls) {
    var wrapper = shallow(<Frame rolls={rolls} />);
    return wrapper;
}
function rollMany(n, pins) {
    let rolls = [];
    for(let i=0; i< n; i++)
      rolls.push(pins);
    return rolls;
}

it('should render 12 frames', () => {
    var wrapper = setup(rollMany(12, 10));
    expect(wrapper.find('.frame').length).toBe(12); 
});

it('should render span with class "strike"', () => {
    var wrapper = setup(rollMany(12, 10));
    expect(wrapper.find('.strike').length).toBe(12); 
});

it('should render second span with "-" when frame first roll is strike', () => {
    var wrapper = setup(rollMany(12, 10));
    expect(wrapper.find('span').at(2).text()).toEqual("-");
});

it('should render  span with "0"', () => {
    var wrapper = setup(rollMany(20, 0));
    expect(wrapper.find('span').at(2).text()).toEqual("0");
});