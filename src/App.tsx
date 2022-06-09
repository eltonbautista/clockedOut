import React from 'react';
import './Styles/App.css';
import SignedOut from './Views/SignedOut';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

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
  // Have navbar, mainpage displays SignedOut, links route to others

  const navigate = useNavigate();

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
      <Routes>
        <Route path='/' element={<SignedOut nav={navigate} />}></Route>
        <Route path='/login' element={<Login nav={navigate} />}></Route>
        <Route path='/sign-up' element={<SignUp nav={navigate} />}></Route>
      </Routes>
      <div id='app-child-container'>
        <Outlet />
      </div>

    </StyledAppContainer>
  );
};

export default App;
