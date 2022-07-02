import React, { useState, useEffect, useContext } from 'react';
import './Styles/App.css';
import { Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData, ILoginInput } from './Helpers/interface';
import { signingIn, getAllUserData } from './firebase-config';
import Navbar from './Components/Navbar';
import { createLocalInfo, palette, createFields, } from './Helpers/utils';
import { Feed, SignUp, Login, PrivateRoute, SignedOut } from './Views';
import EditSidebarModal from './Components/EditSidebarModal';

const StyledHeader = styled.header`
  background-color: ${palette.red};
`;

const StyledAppContainer = styled.div`
  height: 100%;
  position: relative;
`;

const App: React.FC = function App() {
  // VARIABLES, STATES & CONTEXT: 

  const initLoginData: ILoginInput = {
    email: '',
    password: '',
  };
  const initSignUpData: IData = {
    email: '',
    username: '',
    password: '',
  };
  const [userLoginData, setUserLoginData] = useState(initLoginData);
  const [userSignUpData, setUserSignUpData] = useState(initSignUpData);
  const [localInfo, setLocalInfo] = useState<string | null>(localStorage.getItem('loginInfo'));
  const { setPostArray, loggedInData, setLoggedInData, setAllUsersData } = useContext(UserContext);

  const [loginErrorMessage, setLoginErrorMessage] = useState<ILoginInput>();

  // HOOKS:

  const navigate: Function = useNavigate();
  useEffect(() => {
    // Effect that sets localInfo which is partly used for authentication. This is done to reduce re-rendering caused by API calls.
    const myInfo = localStorage.getItem('loginInfo');
    setLocalInfo(myInfo);
    if (!loggedInData && !localInfo) {
      localStorage.removeItem('loginInfo');
      setLocalInfo(myInfo);
    }

  }, [localInfo, loggedInData]);

  useEffect(() => {
    // loggedInData is set when user logs in - this is determined by Firebase auth.
    // If true then fetch user documents (archivedUserData)

    async function asynCalls() {
      if (loggedInData) {
        const archivedAllUsersData = await getAllUserData();
        if (archivedAllUsersData !== undefined && localInfo) {
          setAllUsersData(archivedAllUsersData);
        } else if (!localInfo) {
          setAllUsersData([]);
          setPostArray([]);
        }
      }
    }
    asynCalls();

  }, [localInfo, loggedInData, setAllUsersData, setPostArray]);


  // Used for handling user's login request. When a user logs in, the currently stored loginInformation is deleted, and a new signedIn call to Firebase is called - and saves the current user's ID token onto localStorage.
  // TODO: Add error pop-ups to notify users what is preventing them from logging in: wrong password/email, request timed out, etc.
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginField = createFields(e, "login");
    const currUser = await signingIn(loginField!.emailValue, loginField!.passwordValue);

    if (!currUser && loginField) {

      if (loginField.emailValue === '' && loginField.passwordValue === '') {
        setLoginErrorMessage({
          email: "Please enter a valid email",
          password: "Please enter a valid password"
        });
        return;
      }

      if (loginField.emailValue.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) === null) {
        setLoginErrorMessage({
          email: "Please enter an email with the following format: example@domain.com",
          password: ""
        });
        return;
      }

      if (loginField.passwordValue === '' && loginField.emailValue) {
        setLoginErrorMessage({
          email: "",
          password: "Please enter a valid password",
        });
      } else if (loginField.passwordValue && loginField.emailValue) {
        setLoginErrorMessage({
          email: "",
          password: "Incorrect password"
        });
      }
      return;
    }

    setLoggedInData(currUser);
    await createLocalInfo(currUser);

    if (currUser?.email) {
      navigate('feed', { replace: true });
    }
    return;
  };
  return (
    <StyledAppContainer className="App">
      <StyledHeader id='header'>
        {!loggedInData ? <Navbar setAuth={setLoggedInData} stateAuth={loggedInData} nav={navigate} authorized={false} /> : <Navbar setAuth={setLoggedInData} setLocalInfo={setLocalInfo} stateAuth={loggedInData} nav={navigate} authorized={true} />}
      </StyledHeader>

      <Routes>

        <Route path='/' element={<SignedOut localAuth={localInfo} nav={navigate} stateAuth={loggedInData} />}></Route>
        <Route path='/login' element={<Login errorMessage={loginErrorMessage} localAuth={localInfo} inputFields={userLoginData} submitHandler={loginHandler} nav={navigate} stateAuth={loggedInData} />}></Route>
        <Route path='/sign-up' element={<SignUp signUpData={{ userSignUpData, setUserSignUpData }} localAuth={localInfo} inputFields={userSignUpData} nav={navigate} stateAuth={loggedInData} />}></Route>

        {/* Private Routes: */}
        <Route path='/feed'
          element={
            <PrivateRoute stateAuth={loggedInData} localAuth={localInfo} children={<Feed localAuth={localInfo} />} />} >
        </Route>
      </Routes>

      <div id='app-child-container'>
        <Outlet />
      </div>

    </StyledAppContainer>
  );
};

export default App;
