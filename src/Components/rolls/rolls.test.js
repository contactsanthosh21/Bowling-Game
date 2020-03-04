import React from 'react';
import RollBall from './rolls';
import { render, mount,shallow } from "../../setupTest";

function setup(func) {
    var wrapper = shallow(<RollBall onClick={func}/>);
    return wrapper;
}

it('should render the roll ball', () => {
    const mockCallBack = jest.fn();
    const wrapper = setup(mockCallBack);
    expect(wrapper.find('.roll').length).toBe(1); 
});

it('should call the function on clicking roll', () => {
    const mockCallBack = jest.fn();
    const wrapper = setup(mockCallBack);
    wrapper.find('.roll').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
});


