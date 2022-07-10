import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import JobDetails from '../apps/src/screens/JobDetails';

test('renders correctly', () => {
  const tree = renderer.create(<JobDetails />)
  expect(tree).toMatchSnapshot();
});