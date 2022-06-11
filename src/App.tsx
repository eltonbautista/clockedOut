import React, { useState, useEffect, useMemo } from 'react';
import './Styles/App.css';
import SignedOut from './Views/SignedOut';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './Helpers/contexts';
import { IData } from './Helpers/interface';

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
  position: absolute;
  z-index: 1;
`;

const StyledAppContainer = styled.div`
  height: 100%;
  position: relative;
`;

const App: React.FC = function App() {

  // HOOKS & STATES

  const initData: IData = {
    email: '',
    username: '',
    password: '',
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState(initData);

  const UCProviderVal = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  const inputHandler = (e: any, key: keyof IData) => {

    userData[key] = e.target.value;
    setUserData({ ...userData });
    console.log(userData);
  };

  console.log(userData);

  return (
    <StyledAppContainer className="App">
      <header>
        <StyledH1 onClick={() => navigate('/')}>clockedOut</StyledH1>
      </header>

      {/* <nav id='navbar'>
        <Link to={'/'} >Home</Link>
        <Link to={'/login'} >Login</Link>
        <Link to={'/sign-up'} >Sign Up</Link>
      </nav> */}
      <UserContext.Provider value={UCProviderVal}>

        <Routes>
          <Route path='/' element={<SignedOut nav={navigate} />}></Route>
          <Route path='/login' element={<Login nav={navigate} />}></Route>
          <Route path='/sign-up' element={<SignUp inputHandler={inputHandler} inputInfo={userData} nav={navigate} />}></Route>
        </Routes>

      </UserContext.Provider>
      <div id='app-child-container'>
        <Outlet />
      </div>

    </StyledAppContainer>
  );
};

export default App;
