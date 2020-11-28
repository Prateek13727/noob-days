import React, { Component } from 'react';
import App from '../src/components/App';
import { shallow } from 'enzyme';

describe('App', () => {
	test('should match snapshot', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('h1').text()).toBe('Welcome to React');
		expect(wrapper).toMatchSnapshot;
	})
})

