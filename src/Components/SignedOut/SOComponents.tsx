import React from "react";
import styled from "styled-components";
import { SOButtons, } from "../Buttons";
import stylesModule from '../../Styles/SignedOut.module.css';
import test from '../../Styles/assets/78_generated.jpg';

const StyledHeroHeader = styled.h1`
color: red;
justify-self: center;
font-size: clamp(24px, 5vw, 50px);
height: fit-content;
margin: 0;
z-index: 1;
`;

interface PropsHero {
  nav?: Function,
}

const StyledHeroContainer = styled.div`
  display: grid;
  position: relative;
  background-color: black;
  /* Hero container background */

  
  > div[data-sohero-body] {
    display: grid;
    width: 100%;
    grid-template-rows: 0.3fr 0.3fr;
    margin-top: 5%;
    justify-content: center;
    justify-items: center;
    box-sizing: border-box;
    height: max(400px, 40vh);
  }

  div[data-sohero-text] {
    display: grid;
    grid-template-rows: 0.5fr 1fr;
  }
 
  div[data-sohero-text] > p {
    width: min(800px, 60%);
    justify-self: center;
    font-size: clamp(14px, 2.5vh, 26px);
    color: wheat;
    z-index: 1;
  }

  div[data-sohero-button-container] {
    display: grid;
    grid-template-rows: repeat(2, 0.4fr);
    width: min(300px, 30vw);
    height: 100%;
    justify-items: center;
    gap: 10px;
    z-index: 1;
  }

  div[data-sohero-button-container] > button {
    border-radius: 100px;
    font-weight: 900;
    /* text-align: center; */
    height: clamp(24px, 3vw, 60px);
    padding-top: 6px;
  }

  > div:last-of-type {
  background-color: blue;
  background-image: url(${test});
  background-position: center 54%;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  /* z-index: 1; */
  opacity: 0.5;
  }
`;

const SOHeroContainer: React.FC<PropsHero> = (props) => {
  // const nav = useNavigate();

  return (
    <StyledHeroContainer data-signed-out data-sohero-background>
      <div data-signed-out data-sohero-body>
        <div data-sohero-text>
          <StyledHeroHeader>
            Create connections...
          </StyledHeroHeader>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe cum iure sunt amet facilis cumque quos vero adipisci explicabo? Laudantium pariatur sed officia architecto ipsa harum asperiores fugit fugiat officiis?</p>
        </div>
        <div data-sohero-button-container>
          <SOButtons onClick={(() => { props.nav?.('login'); })} color="white" bgColor="black" >Login</SOButtons>
          <SOButtons onClick={(() => { props.nav?.('sign-up'); })} fontSize={'24px'} >Sign Up</SOButtons>
        </div>
      </div>
      <div>
        <img src="" alt=""></img>
      </div>
    </StyledHeroContainer>
  );
};

interface PropsDesc {
  imgSrc?: string,
  imgAlt?: string,
  hText?: string,
  pText?: string,
  imgRight?: string,
  last?: string,
};

const StyledDescContainer = styled.div<PropsDesc>`
  background-color: ${props => props.imgRight ? '#5b3864' : '#74527d'};
  ${props => props.last ? `background-color: #5b3864` : null};
  
  > div[data-description-first] {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: ${props => props.imgRight ? '"text image"' : '"image text"'};
    align-items: center;
    justify-items: center;
  }

  > div[data-description-first] > img {
    width: ${props => props.imgRight ? '80%' : '70%'};;
    height: ${props => props.imgRight ? '80%' : '70%'};;
    grid-area: image;
  }

  > div[data-description-first] > div {
    width: 80%;
    grid-area: text;
    font-family: ostrichSansHeavy;
    color: ${props => props.imgRight ? 'wheat' : 'red'};
    ${props => props.last ? `color: #d39a9a` : null};
    font-size: ${props => props.imgRight ? 'min(2.4vh, 24px)' : 'min(2.5vh, 26px)'};
    letter-spacing: 1px;

  }

  > div[data-description-first] > div > p {
    font-family: ostrichSansHeavy;
    font-weight: 900;
  }

`;



const SODescriptionContainers: React.FC<PropsDesc> = ({
  hText, imgAlt, imgSrc, pText, imgRight, last
}) => {
  return (
    <StyledDescContainer last={last} imgRight={imgRight} >
      <div data-description-first >
        <img src={imgSrc} alt={imgAlt} ></img>
        <div>
          <h2>{hText}</h2>
          <p>{pText}</p>
        </div>
      </div>
    </StyledDescContainer>
  );
};

export { SOHeroContainer, SODescriptionContainers, };