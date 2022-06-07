import React from "react";
import styled from "styled-components";
import { SOButtons } from "../Buttons";
const StyledProjectName = styled.h1`
color: blue;
font-size: 16px;
`

interface PropsHero {

}

const SOHeroContainer: React.FC<PropsHero> = () => {
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
          {/* wrap SOButtons in a <Link /> which routes to SignUp and Login views */}
          <SOButtons fontSize={'24px'} >Sign Up</SOButtons>
          <SOButtons color="white" bgColor="black" >Login</SOButtons>
        </div>
      </div>
      <div>
        <img src="" alt=""></img>
      </div>
    </div>
  )
}

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

export { SOHeroContainer, SODescriptionContainers, }