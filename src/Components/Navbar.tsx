import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { INavProps } from "../Helpers/interface";
import { SOButtons } from "./Buttons";
import { signingOut } from "../firebase-config";
import { localLoginInfo } from "../Helpers/utils";

const Navbar: React.FC<INavProps> = (props: INavProps) => {
  const { authorized, nav, stateAuth, setLocalInfo } = props;

  return (!stateAuth ?
    <nav id="navbar">
      clockedOut {' '}
      <Link to={'/'} >Home</Link>
      <Link to={'/login'} >Login</Link>
      <Link to={'/sign-up'} >Sign Up</Link>
    </nav>
    :
    <nav id="navbar">
      clockedOut {' '}
      <Link to="/feed" >Feed</Link>
      <SOButtons onClick={() => {
        signingOut();
        setLocalInfo?.(null);
        // localStorage.removeItem('loginInfo');
        nav?.('login', { replace: true });
      }} >Sign Out</SOButtons>
    </nav>);
};

export default Navbar;