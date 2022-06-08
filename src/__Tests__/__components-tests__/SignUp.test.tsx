import { render, screen } from "@testing-library/react";
import React from "react";
import SignUp from "../../Views/SignUp";


describe('SignUp component tests', () => {
  it('should render SignUp elements with appropriate props', () => {
    render(<SignUp />);
    const emailInput = screen.getByText(/email/i);
    const submitButton = screen.getByText(/create account/i);

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toHaveStyle('width: 100%');
  });
});