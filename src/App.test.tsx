/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import UserContextProvider from './Contexts/UserContext';

describe('Global App testing', () => {

  it('should render App with proper homepage', () => {
    act(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>);
    });

    const text = screen.getByText(/clockedOut/i);
    expect(text).toBeInTheDocument();
  });

  it('should navigate to /login, /sign-up, then back to / in order', () => {
    act(() => {
      render(
        <BrowserRouter>
          <UserContextProvider>
            <App />
          </UserContextProvider>

        </BrowserRouter>);
    });
    const login = screen.getAllByText('Login');

    userEvent.click(login[1]);
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();
    const signUp = screen.getByText(/don't have an account?/i);
    userEvent.click(signUp);
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  });

});