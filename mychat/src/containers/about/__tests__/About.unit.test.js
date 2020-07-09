import React from 'react';
import { shallow } from 'enzyme';
import About from '../About';

test('renders HeaderNav', () => {
  const wrapper = shallow(<About />);
  expect(wrapper).toMatchSnapshot();
});
