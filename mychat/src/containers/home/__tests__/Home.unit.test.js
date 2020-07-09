import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

describe('We test the innerHTML of the component', () => {
  test('renders Home', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
