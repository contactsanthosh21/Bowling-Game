import React from 'react';
import ScoreBoard from './Scoreboard';
import { render, mount,shallow } from "../../setupTest";

function setup(rolls) {
    var wrapper = shallow(<ScoreBoard rolls={rolls} />);
    return wrapper;
}
function rollMany(n, pins) {
    let rolls = [];
    for(let i=0; i< n; i++)
      rolls.push(pins);
    return rolls;
}

describe('knows the scores to display for',  () => {
    it('a game of gutter balls', () => {
      var wrapper = setup(rollMany(20, 0));
      expect(wrapper.find('h1').text()).toEqual('Game Score = 0');
    });
    it('a game of all twos', () => {
        var wrapper = setup(rollMany(20, 2));
        expect(wrapper.find('h1').text()).toEqual('Game Score = 40');
    });
    it('a game of all fives where last frame gets bonus ball', () => {
        var wrapper = setup(rollMany(21, 5));
        expect(wrapper.find('h1').text()).toEqual('Game Score = 150');
    });
    it('a game of all strike', () => {
        var wrapper = setup(rollMany(12, 10));
        expect(wrapper.find('h1').text()).toEqual('Game Score = 300');
      });
});