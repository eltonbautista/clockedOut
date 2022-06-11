import { render, screen } from "@testing-library/react";
import React from "react";
import Login from "../../Views/Login";

describe('Tests for SignUp component', () => {
  it('should render SignUp', () => {
    render(<Login inputInfo={{}} />);
    const firstInputHeader = screen.getByText(/email or username/i);
    const firstInput = screen.getByText(/Email or Username/i);

    expect(firstInputHeader).toBeInTheDocument();
    expect(firstInput).toBeInTheDocument();
  });
});