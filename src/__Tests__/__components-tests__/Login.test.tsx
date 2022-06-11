import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { act } from "react-dom/test-utils";
import Login from "../../Views/Login";

describe('Tests for SignUp component', () => {


  it('should render SignUp', () => {
    render(<Login />);
    const firstInputHeader = screen.getByText(/username/i);
    const firstLabel = screen.getByText(/Username/i);

    expect(firstInputHeader).toBeInTheDocument();
    expect(firstLabel).toBeInTheDocument();

  });

  it('typing in input should yield proper input textbox value', () => {
    render(<Login />);
    const [username, password] = screen.getAllByRole('textbox');
    userEvent.type(username, 'xphailedx');
    expect(username).toHaveValue('xphailedx');
    userEvent.type(password, '******');
    expect(password).toHaveValue('******');
  });

});