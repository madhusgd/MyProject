import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../apps/src/screens/Home';

test('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});