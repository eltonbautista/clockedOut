import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { INavProps } from "../Helpers/interface";
import { SOButtons } from "./Buttons";
import { signingOut } from "../firebase-config";
import styled from "styled-components";
import { palette } from "../Helpers/utils";

const FeedNav = styled.nav`
  display: grid;
  width: 100%;
  justify-self: center;
  padding: 0 150px 0 150px;
  /* grid-auto-flow: column; */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  background-color: ${palette.fpink};
  border-bottom: 2px solid ${palette.red};
  > div {
    display: grid;
  }

  > p {
    text-align: start;
    padding-left: 10px;
    font-family: grenze, sans-serif;
    font-size: clamp(50px, 2.5vh, 60px);
  }
`;

const NavButtonDropdown = styled.div`

  > button {
    box-shadow: none;
    color: ${palette.black};
    background: none;
    border: none;
    justify-self: end;
    align-self: center;
    width: fit-content;
    height: fit-content;
    /* margin-right: 100px; */

    :hover {
      color: ${palette.red};
      background: ${palette.black};
    }
  }
`;

const HomeNav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: ${palette.red};
  padding-top: 10px;
  * {
    font-family: jostLight, Arial, Helvetica, sans-serif;
    text-decoration: none;
    color: ${palette.black};
    text-align: center;
  }

  > a {
    font-family: jostLight, Arial, Helvetica, sans-serif;
    font-size: clamp(36px, 3vh, 40px);
    letter-spacing: 0.5px;
    padding-right: max(150px, 15vw);
  }
  > div {
    display: grid;
    grid-auto-flow: column;
    align-content: center;
    justify-content: space-evenly;
    font-weight: 600;
    font-size: clamp(20px, 2vh, 28px);
  }


`;

const NavLinksContainer = styled.div`
  font-size: clamp(26px, 2vh, 40px);
  align-content: center;
  justify-content: space-evenly;
`;


const Navbar: React.FC<INavProps> = (props: INavProps) => {
  const { authorized, nav, stateAuth, setLocalInfo } = props;

  return (!stateAuth ?
    <HomeNav id="navbar">
      <Link to='/'>clockedOut</Link>
      <div>
        <Link to={'/'} >Home</Link>
        <Link to={'/login'} >Login</Link>
        <Link to={'/sign-up'} >Sign-Up</Link>
      </div>
    </HomeNav>
    :
    <FeedNav id="navbar">
      <p>clockedOut</p>
      {' '}
      <NavLinksContainer>
        <Link to="/feed" >Feed</Link>
      </NavLinksContainer>
      <NavButtonDropdown>
        <SOButtons onClick={() => {
          signingOut();
          setLocalInfo?.(null);
          // localStorage.removeItem('loginInfo');
          nav?.('login', { replace: true });
        }} >Sign Out
        </SOButtons>
      </NavButtonDropdown>

    </FeedNav>);
};

export default Navbar;