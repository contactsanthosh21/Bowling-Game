import React from 'react';
import App from './App';
import ScoreBoard from './Components/Scoreboard/Scoreboard';
import RollBall from './Components/rolls/rolls';
import Frame from './Components/Frame/Frame';
import { render, mount,shallow } from "./setupTest";

function setup() {
  return shallow(<App />);
}

function rollMany(n, pins) {
  let rolls = [];
  for(let i=0; i< n; i++)
    rolls.push(pins);
  return rolls;
}

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders a <ScoreBoard/> component', () => {
  const wrapper = setup();
  expect(wrapper.find(ScoreBoard)).toBeDefined();
});

it('renders a <RollBall/> component', () => {
  const wrapper = setup();
  expect(wrapper.find(RollBall)).toBeDefined();
});
it('renders a <Frame/> component', () => {
  const wrapper = setup();
  expect(wrapper.find(Frame)).toBeDefined();
});

it('should call the function on clicking roll', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<RollBall onClick={mockCallBack}/>);
    wrapper.find('.roll').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('should show Game over... on rolls finish', () => {
  const wrapper = setup();
  wrapper.setState({
    gameOver: true
  });
  expect(wrapper.find('h4').text()).toEqual('Game Over...');
});

it('should show Game in progress... while rolls left', () => {
  const wrapper = setup();
  wrapper.setState({
    gameOver: false
  });
  expect(wrapper.find('h4').text()).toEqual('Game in progress...');
});

it('should push roll number into rolls array', () => {
  const wrapper = setup();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.rolls.length).toEqual(1);
});

it('should return last frame true', () => {
  const wrapper = setup();
  wrapper.setState({
    frame: 9
  });
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.isLastFrame).toEqual(true);
});

it('should return first roll false', () => {
  const wrapper = setup();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.firstRoll).toEqual(false);
});

it('should return frame count 2', () => {
  const wrapper = setup();
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.frame).toEqual(2);
});

it('should return game over true', () => {
  const wrapper = setup();
  wrapper.setState({
    frame: 10
  });
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.gameOver).toEqual(true);
});

it('should return frame count 2', () => {
  const wrapper = setup();
  wrapper.setState({
    count:10,
    isLastFrame:false,
    frame:1
  });
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.frame).toEqual(2);
});

it('should return frame count 3', () => {
  const wrapper = setup();
  wrapper.setState({
    firstRoll:false,
    isLastFrame:true,
    bonusSpare:true,
    frame:1
  });
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.frame).toEqual(3);
});

it('should return frame count 3', () => {
  const wrapper = setup();
  wrapper.setState({
    firstRoll:false,
    isLastFrame:true,
    bonusSpare:true,
    frame:1
  });
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.frame).toEqual(3);
});

it('should return frame count 2', () => {
  const wrapper = setup();
  wrapper.setState({
    firstRoll:true,
    count:10,
    isLastFrame:false,
    frame:1
  });
  wrapper.instance().onRoll();
  wrapper.instance().onRoll();
  expect( wrapper.instance().state.frame).toEqual(2);
});


