import React from "react";
import { Link } from "react-router-dom";
import { INavProps } from "../Helpers/interface";
import { SOButtons } from "./Buttons";
import { signingOut } from "../firebase-config";

const Navbar: React.FC<INavProps> = (props: INavProps) => {
  const { authorized, nav } = props;

  return (!authorized ?
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
        nav?.('login');
        signingOut();
      }} >Sign Out</SOButtons>
    </nav>);
};

export default Navbar;