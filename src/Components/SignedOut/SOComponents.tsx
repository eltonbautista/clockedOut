import React from "react";
import styled from "styled-components";

const StyledProjectName = styled.h1`
color: blue;
font-size: 16px;
`

interface PropsDesc {
  imgSrc?: string,
  imgAlt?: string,
  hText?: string,
  pText?: string
}

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
          <SOButtons size={'24px'} >Sign Up</SOButtons>
          <SOButtons color="white" bgColor="black" >Login</SOButtons>
        </div>
      </div>
      <div>
        <img src="" alt=""></img>
      </div>
    </div>
  )
}

const SODescriptionContainers: React.FC<PropsDesc> = ({
  hText, imgAlt, imgSrc, pText
}) => {

  return (
    <div data-signed-out data-description-container>
      <div data-description-first>
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

interface iSOButton {
  bgColor?: string,
  color?: string,
  size?: string,

}

const SOButtons = styled.button<iSOButton>`
      background-color: ${props => props.bgColor};
      color: ${props => props.color};
      font-size: ${props => props.size ? props.size : '16px'};
    `

export { SOHeroContainer, SODescriptionContainers, SOButtons }