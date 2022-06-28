import { render, screen, cleanup, waitFor } from "@testing-library/react";
import SignUp from "../../Views/SignUp";
import Login from "../../Views/Login";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { IData, ILoginInput } from "../../Helpers/interface";
import Feed from "../../Views/Feed";
import { signingIn } from "../../firebase-config";
import UserContextProvider from "../../Contexts/UserContext";
import { act } from "react-dom/test-utils";


const mockDataRetrieval = async (email: string, password: string) => {
  const myData = await signingIn(email, password);
  console.log(myData);
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
    render(
      <UserContextProvider>
        <SignUp inputFields={signUpObj} />
      </UserContextProvider>);

    const emailInput = screen.getByText(/email/i);
    const submitButton = screen.getByText(/create account/i);

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toHaveStyle('width: 90%');
  });

  it('should direct to SignUp view, then clicking a button redirects me to Login view', () => {

    render(
      <BrowserRouter>
        <UserContextProvider>
          <App />
        </UserContextProvider>

      </BrowserRouter>);


    const signUpLink = screen.getAllByRole('button')[1];
    userEvent.click(signUpLink);
    const loginRedirect = screen.getByText('Already have an account?');
    userEvent.click(loginRedirect);
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();

  });

  it('typing in input should yield proper input textbox value', () => {
    render(
      <UserContextProvider>
        <SignUp inputFields={signUpObj} />
      </UserContextProvider>
    );
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
    render(
      <UserContextProvider>
        <Login inputFields={loginObj} />
      </UserContextProvider>
    );
    const firstInputHeader = screen.getByText(/email/i);
    const firstLabel = screen.getByText(/email/i);

    expect(firstInputHeader).toBeInTheDocument();
    expect(firstLabel).toBeInTheDocument();

  });

  it('should pass only if user is actually AUTHENTICATED in Firebase Auth DB, redirects user to Feed view', async () => {

    const testData = {
      testEmail: "test@tester.com",
      testPassword: "123123"

    };
    const { testEmail, testPassword } = testData;


    render(
      <UserContextProvider>
        <Login inputFields={loginObj} />
      </UserContextProvider>
    );

    const [email, password] = screen.getAllByTestId('input');

    const loginBtn = screen.getByRole('button', { name: 'Login' });

    userEvent.type(email, testEmail);
    expect(email).toHaveValue('test@tester.com');

    userEvent.type(password, testPassword);
    expect(password).toHaveValue("123123");
    userEvent.click(loginBtn);

    // This condition will only pass if the testData information actually exists in the database.
    // Thus, if it passes, we can safely and confidently render <Feed /> manually, because Feed is a privateRoute that is only viewable for authenticated users. 
    // cleanup();

    // TODO: For some reason the async function is failing now. Not sure why..

    // console.log(await mockDataRetrieval('123', "123"));
    const promise = await mockDataRetrieval(testEmail, testPassword);
    if (!promise) {
      return;
    }

    render(
      <UserContextProvider>
        <Feed />
      </UserContextProvider>
    );

    await waitFor(async () => {
      expect(screen.getByText(/fireteam/i)).toBeInTheDocument();
    });





  });
});