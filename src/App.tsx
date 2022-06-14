import React, { useState, useEffect, useMemo } from 'react';
import './Styles/App.css';
import SignedOut from './Views/SignedOut';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import Feed from './Views/Feed';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData, ILoginInput } from './Helpers/interface';
import { signingIn, IUser } from './firebase-config';

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

  const initSignUpData: IData = {
    email: '',
    username: '',
    password: '',
  };

  const initLoginData: ILoginInput = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const [userSignUpData, setUserSignUpData] = useState(initSignUpData);
  const [userLoginData, setUserLoginData] = useState(initLoginData);
  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);

  const UCProviderVal = useMemo(() => ({ userSignUpData: userSignUpData, setUserSignUpData: setUserSignUpData }), [userSignUpData, setUserSignUpData]);

  const signUpInputHandler = (e: React.ChangeEvent<HTMLInputElement>, key: keyof IData): void => {
    userSignUpData[key] = e.target.value;
    setUserSignUpData({ ...userSignUpData });
  };

  const loginInputHandler = (e: React.ChangeEvent<HTMLInputElement>, key: keyof ILoginInput): void => {
    userLoginData[key] = e.target.value;
    setUserLoginData({ ...userLoginData });
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currUser = await signingIn(userLoginData.email, userLoginData.password);
    setLoggedInData(currUser);
    if (currUser?.email === userLoginData.email) {
      navigate('Feed');
    }
    return;
  };

  return (
    <StyledAppContainer className="App">
      <header>

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
