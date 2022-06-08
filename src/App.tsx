import React from 'react';
import './Styles/App.css';
import SignedOut from './Views/SignedOut';
import SignUp from './Views/SignUp';
import Login from './Views/Login';
import { Link, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
const App: React.FC = function App() {
  // Have navbar, mainpage displays SignedOut, links route to others

  return (
    <div className="App">
      <h1>clockedOut</h1>
      <nav id='navbar'>
        <Link to={'/'} >Home</Link>
        <Link to={'/login'} >Login</Link>
        <Link to={'/sign-up'} >Sign Up</Link>
      </nav>
      <Routes>
        <Route path='/' element={<SignedOut />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
      </Routes>
      <div id='app-child-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
