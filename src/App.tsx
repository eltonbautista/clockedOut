import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Styles/App.css';
import SignedOut from './Views/SignedOut';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Feed from './Views/Feed';
import { Link, Navigate, Outlet, useLocation, useNavigate, useParams, } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData, ILoginInput } from './Helpers/interface';
import { signingIn, IUser, signingOut, initFirebaseAuth, currentUserInfo, auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './Views/PrivateRoute';
import Navbar from './Components/Navbar';
import { createLocalInfo, localLoginInfo } from './Helpers/utils';


const StyledH1 = styled.h1`
  color: red;
  font-family: grenze;
  justify-self: start;
  text-align: start;
  font-size: clamp(24px, 5vw, 60px);
  padding-left: 5%;
  height: fit-content;
  width: 100%;
  margin: 0;
  background-color: black;
  /* letter-spacing: 2px; */
  font-weight: 0;
  position: fixed;
  z-index: 1;
`;

const StyledAppContainer = styled.div`
  height: 100%;
  position: relative;
`;
const App: React.FC = function App() {

  // HOOKS & STATES
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useParams();

  const initSignUpData: IData = {
    email: '',
    username: '',
    password: '',
  };

  const initLoginData: ILoginInput = {
    email: '',
    password: '',
  };

  const [userSignUpData, setUserSignUpData] = useState(initSignUpData);
  const [userLoginData, setUserLoginData] = useState(initLoginData);
  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);
  const [localData, setLocalData] = useState<string | undefined | null>('');

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInData(user);
        createLocalInfo(user);
        setLocalData(localLoginInfo);
      } else if (!user) {
        setLoggedInData(null);
        localStorage.removeItem('localInfo');
      }
    });
  }, []);
  // signingOut();

  const UCProviderVal = useMemo(() => ({ userSignUpData: userSignUpData, setUserSignUpData: setUserSignUpData }), [userSignUpData, setUserSignUpData]);

  const signUpInputHandler = (e: React.ChangeEvent<HTMLInputElement>, key: keyof IData): void => {
    userSignUpData[key] = e.target.value;
    setUserSignUpData({ ...userSignUpData });
  };

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput): void => {
    userLoginData[key] = e.target.value;
    setUserLoginData({ ...userLoginData });
  };


  // Used for handling user's login request. When a user logs in, the currently stored loginInformation is deleted, and a new signedIn call to Firebase is called - and saves the current user's ID token onto localStorage.
  // TODO: Add error pop-ups to notify users what is preventing them from logging in: wrong password/email, request timed out, etc.
  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currUser = await signingIn(userLoginData.email, userLoginData.password);

    setLoggedInData(currUser);
    await createLocalInfo(currUser);

    if (currUser?.email) {
      navigate('feed');
    }
    return;
  };

  return (
    <StyledAppContainer className="App">
      <header>
        {/* LEAVE FOR NOW */}
        {/* <StyledH1 onClick={() => navigate('/')}>clockedOut</StyledH1> */}
        {!loggedInData ? <Navbar stateAuth={loggedInData} nav={navigate} authorized={false} /> : <Navbar stateAuth={loggedInData} nav={navigate} authorized={true} />}
      </header>

      <UserContext.Provider value={UCProviderVal}>

        <Routes>

          <Route path='/' element={<SignedOut nav={navigate} />}></Route>
          <Route path='/login' element={<Login inputFields={userLoginData} inputHandler={loginInputHandler} submitHandler={loginHandler} nav={navigate} stateAuth={loggedInData} />}></Route>
          <Route path='/sign-up' element={<SignUp inputFields={userSignUpData} inputHandler={signUpInputHandler} nav={navigate} />}></Route>

          <Route path='/feed'
            element={
              <PrivateRoute stateAuth={loggedInData} children={<Feed />}></PrivateRoute>} ></Route>
        </Routes>

      </UserContext.Provider>
      <div id='app-child-container'>
        <Outlet />
      </div>

    </StyledAppContainer>
  );
};

export default App;
