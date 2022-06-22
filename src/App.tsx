import React, { useState, useEffect, useContext, useCallback } from 'react';
import './Styles/App.css';
import { Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData, IDbUserData, ILoginInput, IPostState } from './Helpers/interface';
import { signingIn, IUser, auth, getUserData } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './Components/Navbar';
import { createLocalInfo, filterPosts, palette, toPostStateObjects, } from './Helpers/utils';
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
  // HOOKS & STATES

  const navigate: Function = useNavigate();

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
  const [localInfo, setLocalInfo] = useState<string | null>(null);

  const { postArray, setPostArray, postState, setPostState, loggedInData, setLoggedInData, allUsersData, setAllUsersData } = useContext(UserContext);


  const fetch = useCallback(async () => {
    // Used to fetch userData from Firestore collection

    const archivedUserData = await getUserData();
    if (archivedUserData !== undefined && loggedInData && localInfo) {
      setAllUsersData(archivedUserData);
    }
  }, [localInfo, loggedInData, setAllUsersData]);


  useEffect(() => {
    // loggedInData is set when user logs in - this is determined by Firebase auth.
    // If true then fetch user documents (archivedUserData)

    if (loggedInData && localInfo) {
      fetch();
    }
  }, [fetch, localInfo, loggedInData]);


  useEffect(() => {
    // an effect that checks if a user is authenticated or not. If(auth) then set loggedInData
    // Renders once, and on dependency change

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInData(user);
        createLocalInfo(user);

        const info = localStorage.getItem('loginInfo');
        setLocalInfo(info);

      } else if (!user) {
        setLoggedInData(null);
        localStorage.removeItem('localInfo');
      }
    });
  }, [setLoggedInData, loggedInData]);

  const signUpInputHandler = (e: React.ChangeEvent<HTMLInputElement>, key: keyof IData): void => {
    userSignUpData[key] = e.target.value;
    setUserSignUpData({ ...userSignUpData });
  };

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput): void => {
    userLoginData[key] = e.target.value;
    setUserLoginData({ ...userLoginData });
  };

  // console.log(allUsersData);

  // Used for handling user's login request. When a user logs in, the currently stored loginInformation is deleted, and a new signedIn call to Firebase is called - and saves the current user's ID token onto localStorage.
  // TODO: Add error pop-ups to notify users what is preventing them from logging in: wrong password/email, request timed out, etc.
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currUser = await signingIn(userLoginData.email, userLoginData.password);
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
        {!loggedInData ? <Navbar stateAuth={loggedInData} nav={navigate} authorized={false} /> : <Navbar setLocalInfo={setLocalInfo} stateAuth={loggedInData} nav={navigate} authorized={true} />}
      </StyledHeader>

      <Routes>

        <Route path='/' element={<SignedOut localAuth={localInfo} nav={navigate} stateAuth={loggedInData} />}></Route>
        <Route path='/login' element={<Login localAuth={localInfo} inputFields={userLoginData} inputHandler={loginInputHandler} submitHandler={loginHandler} nav={navigate} stateAuth={loggedInData} />}></Route>
        <Route path='/sign-up' element={<SignUp signUpData={{ userSignUpData, setUserSignUpData }} localAuth={localInfo} inputFields={userSignUpData} inputHandler={signUpInputHandler} nav={navigate} stateAuth={loggedInData} />}></Route>

        <Route path='/feed'
          element={
            <PrivateRoute stateAuth={loggedInData} children={<Feed />} />} >

        </Route>
      </Routes>

      <div id='app-child-container'>
        <Outlet />
      </div>

    </StyledAppContainer>
  );
};

export default App;
