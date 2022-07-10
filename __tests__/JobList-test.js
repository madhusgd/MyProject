import React from 'react';
import renderer from 'react-test-renderer';

import {render} from "@testing-library/react-native"

import JobList from '../apps/src/screens/JobsList';

it("renders correctly", () => {
 // const tree = renderer.create(<JobList />);
  //expect(tree).toMatchSnapshot();
  render(<JobList />);
});