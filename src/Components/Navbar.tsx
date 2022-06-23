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
  justify-items: space-around;
  padding: 10px max(150px, 8vw) 0 max(150px, 8vw);
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  background-color: ${palette.red};

  a {
    text-decoration: none;
    width: fit-content;
  }
  
  > div {
    display: grid;
  }

  > a {
    font-family: jostLight, Arial, Helvetica, sans-serif;
    font-size: clamp(36px, 3vh, 40px);
    letter-spacing: 0.5px;
    padding-left: 10px;
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
    font-weight: 900;
    font-size: clamp(20px,2vh,28px);
    padding: none;
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
    margin-left: max(150px, 15vw);
    width: fit-content;
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
  font-size: clamp(20px,2vh,28px);
  font-weight: 900;
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
      <Link to='/feed'>clockedOut</Link>
      {' '}
      <NavLinksContainer>
        <Link to="/feed" >Feed</Link>
      </NavLinksContainer>
      <NavButtonDropdown>
        <SOButtons onClick={() => {
          signingOut();
          setLocalInfo?.(null);
          nav?.('login', { replace: true });
        }} >Sign Out
        </SOButtons>
      </NavButtonDropdown>

    </FeedNav>);
};

export default Navbar;