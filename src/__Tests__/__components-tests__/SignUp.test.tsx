import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import SignUp from "../../Views/SignUp";
import Login from "../../Views/Login";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { IData, ILoginInput } from "../../Helpers/interface";

const signUpObj: IData = {
  email: '',
  password: '',
  username: '',
};

const loginObj: ILoginInput = {
  username: '',
  password: '',
};

describe('SignUp component tests', () => {
  it('should render SignUp elements with appropriate props', () => {
    render(<SignUp inputFields={signUpObj} />);

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

  it('typing in input should yield proper input textbox value', () => {
    render(<SignUp inputFields={signUpObj} />);
    const [email, username, password] = screen.getAllByRole('textbox');
    const form = screen.getByText(/create account/i);

    userEvent.type(email, 'xphailedx');
    expect(email).toHaveValue('xphailedx');

    userEvent.type(username, 'magnum@magnum.com');
    expect(screen.getByDisplayValue('magnum@magnum.com')).toBeInTheDocument();

    // TODO: FIGURE OUT TEST FOR PASSWORD AND INPUT RESET(?)

    // userEvent.type(password, '******');
    // expect(password).toHaveValue(undefined);

    // userEvent.click(form);
    // expect(username).toHaveValue('');
  });

});

describe('Tests for SignUp component', () => {

  it('should render SignUp', () => {
    render(<Login inputFields={loginObj} />);
    const firstInputHeader = screen.getByText(/username/i);
    const firstLabel = screen.getByText(/Username/i);

    expect(firstInputHeader).toBeInTheDocument();
    expect(firstLabel).toBeInTheDocument();

  });

  it('typing in input should yield proper input textbox value', () => {
    render(<Login inputFields={loginObj} />);
    const [username, password] = screen.getAllByRole('textbox');
    userEvent.type(username, 'xphailedx');
    expect(username).toHaveValue('xphailedx');

    // TODO: FIGURE OUT TEST FOR PASSWORD

    // userEvent.type(password, '******');
    // expect(password).toHaveValue('******');
  });

});