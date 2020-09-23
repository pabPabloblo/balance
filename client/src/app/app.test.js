import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import {listTitle} from '../constants'

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/listTitle/i);
  expect(linkElement).toBeInTheDocument();
});
