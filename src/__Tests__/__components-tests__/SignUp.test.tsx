import { render, screen } from "@testing-library/react";
import React from "react";
import SignUp from "../../Views/SignUp";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('SignUp component tests', () => {
  it('should render SignUp elements with appropriate props', () => {
    render(<SignUp />);

    const emailInput = screen.getByText(/email/i);
    const submitButton = screen.getByText(/create account/i);

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toHaveStyle('width: 100%');
  });

  it('should direct to SignUp view, then clicking a button redirects me to Login view', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);

    const signUpLink = screen.getAllByRole('button')[1];
    userEvent.click(signUpLink);
    const loginRedirect = screen.getByText('Already have an account?');
    userEvent.click(loginRedirect);
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();

  });




});