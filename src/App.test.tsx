import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Global App testing', () => {

  it('should render App with proper homepage', () => {
    act(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>);
    });

    const text = screen.getByText(/Hello World/i);
    expect(text).toBeInTheDocument();
  });

  it('should navigate to /login, /sign-up, then back to / in order', () => {
    act(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>);
    });
    const [home, login, signUp] = screen.getAllByRole('link');

    userEvent.click(login);
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();
    userEvent.click(signUp);
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
    userEvent.click(home);
    expect(screen.getByText(/Hello world/i)).toBeInTheDocument();
  });

});