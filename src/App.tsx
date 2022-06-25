import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Styles/App.css';
import { Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData, IDbUserData, ILoginInput, IPostState } from './Helpers/interface';
import { signingIn, IUser, auth, getAllUserData, getUserDoc } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './Components/Navbar';
import { createLocalInfo, filterPosts, palette, createFields, toPostStateObjects, } from './Helpers/utils';
import { Feed, SignUp, Login, PrivateRoute, SignedOut } from './Views';
import { couldStartTrivia } from 'typescript';
import { User } from 'firebase/auth';

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
  const { postArray, setPostArray, postState, setPostState, loggedInData, setLoggedInData, allUsersData, setAllUsersData } = useContext(UserContext);

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
        <Route path='/login' element={<Login localAuth={localInfo} inputFields={userLoginData} submitHandler={loginHandler} nav={navigate} stateAuth={loggedInData} />}></Route>
        <Route path='/sign-up' element={<SignUp signUpData={{ userSignUpData, setUserSignUpData }} localAuth={localInfo} inputFields={userSignUpData} nav={navigate} stateAuth={loggedInData} />}></Route>

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
