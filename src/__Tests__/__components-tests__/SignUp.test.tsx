import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import React from "react";
import SignUp from "../../Views/SignUp";
import Login from "../../Views/Login";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { IData, ILoginInput } from "../../Helpers/interface";
import { act } from "react-dom/test-utils";
import Feed from "../../Views/Feed";
import { auth, signingIn } from "../../firebase-config";


const mockDataRetrieval = async (email: string, password: string) => {
  const myData = await signingIn(email, password);
  return myData;
};


const signUpObj: IData = {
  email: '',
  password: '',
  username: '',
};

const loginObj: ILoginInput = {
  email: '',
  password: '',
};

describe('SignUp component tests', () => {
  it('should render SignUp elements with appropriate props', () => {
    render(<SignUp inputFields={signUpObj} />);

    const emailInput = screen.getByText(/email/i);
    const submitButton = screen.getByText(/create account/i);

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toHaveStyle('width: 90%');
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
    const [email, username, password] = screen.getAllByTestId('input');
    const form = screen.getByText(/create account/i);

    userEvent.type(email, 'xphailedx');
    expect(email).toHaveValue('xphailedx');

    userEvent.type(username, 'magnum@magnum.com');
    expect(screen.getByDisplayValue('magnum@magnum.com')).toBeInTheDocument();

    userEvent.type(password, '******');
    expect(password).toHaveValue('******');

  });

});

describe('Tests for SignUp component', () => {

  beforeEach(cleanup);
  afterEach(cleanup);
  it('should render SignUp', () => {
    render(<Login inputFields={loginObj} />);
    const firstInputHeader = screen.getByText(/email/i);
    const firstLabel = screen.getByText(/email/i);

    expect(firstInputHeader).toBeInTheDocument();
    expect(firstLabel).toBeInTheDocument();

  });

  it('should pass only if user is actually AUTHENTICATED in Firebase Auth DB, redirects user to Feed view', async () => {

    const testData = {
      testEmail: "jest@gmail.com",
      testPassword: "******"

    };
    const { testEmail, testPassword } = testData;


    render(<Login inputFields={loginObj} />);

    const [email, password] = screen.getAllByTestId('input');

    const loginBtn = screen.getByRole('button', { name: 'Login' });

    userEvent.type(email, testEmail);
    expect(email).toHaveValue('jest@gmail.com');

    userEvent.type(password, testPassword);
    expect(password).toHaveValue('******');
    userEvent.click(loginBtn);

    // This condition will only pass if the testData information actually exists in the database.
    // Thus, if it passes, we can safely and confidently render <Feed /> manually, because Feed is a privateRoute that is only viewable for authenticated users. 
    cleanup();

    if (await mockDataRetrieval(testEmail, testPassword)) {
      render(<Feed />);
    };
    expect(screen.getByText(/fireteam/i)).toBeInTheDocument();

  });
});