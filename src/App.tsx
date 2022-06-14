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
import { current } from '@reduxjs/toolkit';

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

  // Checks if user is currently authenticated/logged in, also sets loggedInData if authState detects user as logged in.

  // useEffect(() => {
  // THIS useEffect MAKES AN API CALL FOR USER AUTHENTICATION. THE NEW ONE I CONFIGURED USES LOCALSTORAGE AND SAVES THE USER'S AUTHID TOKEN WHEN THEY LOGIN. THIS WAY THEIR AUTH TOKEN IS STORED IN LOCALSTORAGE AND THE PROGRAM DOESN'T NEED TO MAKE A CALL TO FIREBASE EVERY TIME THEY GO TO '/' PATH!
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user && location.pathname === '/') {
  //       setLoggedInData(user);
  //       navigate('feed');
  //       // trigger sign out: 
  //       await signingOut();
  //     }
  //   });

  // }, [location.pathname, navigate]);

  const [userSignUpData, setUserSignUpData] = useState(initSignUpData);
  const [userLoginData, setUserLoginData] = useState(initLoginData);
  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInData(user);
      }
    });
  });


  // An effect that checks if the storedToken is === to Firebase's current token. Since Firebase adds expiration times on their authentication token for security purposes, I added this effect so that the user would get signed out if the tokens don't match.
  useEffect(() => {

    if (!loggedInData || loggedInData === null) {
      return;
    } else {
      const tokenChecker = async () => {
        const storedToken = localStorage.getItem('loginInfo');
        const currentToken: string = await loggedInData!.getIdToken();
        console.log(storedToken);
        console.log(currentToken);
        if (currentToken !== storedToken) {
          signingOut();
        }

        if (storedToken && location.pathname === '/') {
          navigate('feed');
        }
      };
      tokenChecker();
    }

  }, [location.pathname, loggedInData, navigate]);

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

    const myToken: string = await currUser!.getIdToken();

    localStorage.removeItem('loginInfo');

    localStorage.setItem('loginInfo', myToken);
    if (currUser?.email === userLoginData.email) {
      navigate('feed');
    }
    return;
  };
  console.log(loggedInData);
  return (
    <StyledAppContainer className="App">
      <header>
        {/* LEAVE FOR NOW */}
        {/* <StyledH1 onClick={() => navigate('/')}>clockedOut</StyledH1> */}

        <nav id='navbar' >
          clockedOut {' '}
          <Link to={'/'} >Home</Link>
          <Link to={'/login'} >Login</Link>
          <Link to={'/sign-up'} >Sign Up</Link>
          <Link to={'/feed'} >Feed</Link>
        </nav>
      </header>

      <UserContext.Provider value={UCProviderVal}>

        <Routes>
          <Route path='/' element={<SignedOut nav={navigate} />}></Route>
          <Route path='/login' element={<Login inputFields={userLoginData} inputHandler={loginInputHandler} submitHandler={loginHandler} nav={navigate} />}></Route>
          <Route path='/sign-up' element={<SignUp inputFields={userSignUpData} inputHandler={signUpInputHandler} nav={navigate} />}></Route>
          <Route path='/feed' element={<Feed />}></Route>
        </Routes>

      </UserContext.Provider>
      <div id='app-child-container'>
        <Outlet />
      </div>

    </StyledAppContainer>
  );
};

export default App;
