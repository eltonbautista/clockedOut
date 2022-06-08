import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import RouteSwitch from './RouteSwitch';

test('renders learn react link', () => {
  render(<RouteSwitch />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});
