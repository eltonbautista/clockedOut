import React, { useState, useEffect, useContext } from 'react';
import './Styles/App.css';
import { Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData, ILoginInput } from './Helpers/interface';
import { signingIn, IUser, auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './Components/Navbar';
import { createLocalInfo, palette, } from './Helpers/utils';
import { Feed, SignUp, Login, PrivateRoute, SignedOut } from './Views';
// import 'bootstrap/dist/css/bootstrap.min.css';


const StyledH1 = styled.h1`
  color: red;
  font-family: jostLight;
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

  const [userLoginData, setUserLoginData] = useState(initLoginData);
  const [loggedInData, setLoggedInData] = useState<typeof IUser | null | undefined>(null);
  const [localInfo, setLocalInfo] = useState<string | null>(null);

  const { postArray, setPostArray, postState, setPostState, setUserSignUpData, userSignUpData } = useContext(UserContext);

  useEffect(() => {
    const info = localStorage.getItem('loginInfo');
    setLocalInfo(info);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoggedInData(user);
        createLocalInfo(user);
      } else if (!user) {
        setLoggedInData(null);
        localStorage.removeItem('localInfo');
      }
    });
  }, []);



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
        <Route path='/sign-up' element={<SignUp localAuth={localInfo} inputFields={userSignUpData} inputHandler={signUpInputHandler} nav={navigate} stateAuth={loggedInData} />}></Route>

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
