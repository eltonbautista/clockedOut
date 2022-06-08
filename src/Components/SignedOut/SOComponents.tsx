import React from "react";
import styled from "styled-components";
import { SOButtons, } from "../Buttons";
import { useNavigate, useHref, To } from "react-router-dom";
const StyledProjectName = styled.h1`
color: blue;
font-size: 16px;
`;

interface PropsHero {
  nav?: Function,
}

const SOHeroContainer: React.FC<PropsHero> = (props) => {
  // const nav = useNavigate();

  return (
    <div data-signed-out data-sohero-background>
      <div data-signed-out data-sohero-body>
        <div data-sohero-text>
          <StyledProjectName>
            Hello World
          </StyledProjectName>
          <p>This is where my description will go</p>
        </div>
        <div data-sohero-button-container>
          <SOButtons onClick={(() => { props.nav?.('login'); })} color="white" bgColor="black" >Login</SOButtons>
          <SOButtons onClick={(() => { props.nav?.('sign-up'); })} fontSize={'24px'} >Sign Up</SOButtons>
        </div>
      </div>
      <div>
        <img src="" alt=""></img>
      </div>
    </div>
  );
};

interface PropsDesc {
  imgSrc?: string,
  imgAlt?: string,
  hText?: string,
  pText?: string,
}

const SODescriptionContainers: React.FC<PropsDesc> = ({
  hText, imgAlt, imgSrc, pText,
}) => {

  return (
    <div data-signed-out data-description-container>
      <div data-description-first >
        {/* can change position of img/description using css*/}
        <img src={imgSrc} alt={imgAlt} ></img>
        <div>
          <h2>{hText}</h2>
          <p>{pText}</p>
        </div>
      </div>
    </div>
  );
};

export { SOHeroContainer, SODescriptionContainers, };