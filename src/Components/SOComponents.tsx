import React from "react";
import styled from "styled-components";
import { SOButtons, } from "./Buttons";
import stylesModule from '../../Styles/SignedOut.module.css';
import test from '../Styles/assets/78_generated.jpg';
import { palette } from "../Helpers/utils";

const StyledHeroHeader = styled.h1`
color: ${palette.black};
justify-self: center;
font-size: clamp(24px, 4vw, 46px);
height: fit-content;
margin: 0;
z-index: 1;
/* font-family: ostrichSansHeavy, grenze, Arial, Helvetica, sans-serif; */
font-family: jostLight;
font-weight: 100;
letter-spacing: 1px;
`;

interface PropsHero {
  nav?: Function,
}

const StyledHeroContainer = styled.div`
  display: grid;
  position: relative;
  /* background-color: black; */
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
    letter-spacing: 0.2px;
    
    font-size: clamp(14px, 2.5vh, 26px);
    font-family: jostLight, Arial, Helvetica, sans-serif;
    font-weight: 600;
    color: ${palette.black};

    margin-top: max(10px, 0.8vh);
    padding-bottom: 10px;
    z-index: 1;
    border-bottom: 2px solid ${palette.black};
  }

  div[data-sohero-button-container] {
    display: grid;
    grid-template-columns: repeat(2, 0.4fr);
    width: min(800px, 30vw);
    height: 100%;
    justify-content: center;
    justify-items: center;
    align-items: center;
    gap: 20px;
    z-index: 1;
    margin-top: min(20px, 2vh);
  }

  div[data-sohero-button-container] > button {
    /* border & shadow for 3d look */
    border: 2.4px ${palette.red} inset;
    box-shadow: 5px -5px 3px #302c2c, 8px 2.5px 10px #302c2c, -1px 2.5px 10px #302c2c;
    border-radius: 100px;
    font-weight: 200;
    height: clamp(24px, 3vw, 50px);
    width: 90%;
    padding-top: 6px;

    :active {
            transform: scale(0.98);
            box-shadow: 0 -2px 3px #302c2c, 0 5px 4px #302c2c, 0 5px 4px #302c2c;
        }
  }

  > div:last-of-type {
  background-color: ${palette.red};
  background-position: center 54%;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  border-bottom: 2px solid ${palette.white};
  }
`;

const SOHeroContainer: React.FC<PropsHero> = (props) => {
  const { nav } = props;

  return (
    <StyledHeroContainer data-signed-out data-sohero-background>
      <div data-signed-out data-sohero-body>
        <div data-sohero-text>
          <StyledHeroHeader>
            CREATE CONNECTIONS..
          </StyledHeroHeader>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe cum iure sunt amet facilis cumque quos vero adipisci explicabo? Laudantium pariatur sed officia architecto ipsa harum asperiores fugit fugiat officiis?</p>
        </div>
        <div data-sohero-button-container>
          <SOButtons onClick={(() => { nav?.('login'); })} color="white" bgColor="black" >Login</SOButtons>
          <SOButtons onClick={(() => { nav?.('sign-up'); })} fontSize={'24px'} >Sign-Up</SOButtons>
        </div>
      </div>
      <div>
        <img src="" alt=""></img>
      </div>
    </StyledHeroContainer>
  );
};

// -----------------------------------------------------------------------------
// 
// -----------------------------------------------------------------------------

interface PropsDesc {
  imgSrc?: string,
  imgAlt?: string,
  hText?: string,
  pText?: string,
  imgRight?: string,
  last?: string,
};

const StyledDescContainer = styled.div<PropsDesc>`
  background-color: ${props => props.imgRight ? `#fc9a9a` : `${palette.red}`};
  border-bottom: ${props => props.imgRight ? `2px solid ${palette.black}` : ` 2px solid ${palette.white}`};
  font-family: jostLight, grenze, Arial, Helvetica, sans-serif;
  /* ${props => props.last ? `background-color: #dd8b82` : null}; */
  
  > div[data-description-first] {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: ${props => props.imgRight ? '"text image"' : '"image text"'};
    align-items: center;
    justify-items: center;

    > div > h2 {
      
      text-align: ${props => props.imgRight ? "left" : "center"};
      border-bottom: ${props => props.imgRight ? `2px solid ${palette.white}` : `2px solid ${palette.black}`};
      margin-bottom: 12px;
      padding-bottom: 2px;
    }
  }

  > div[data-description-first] > img {
    width: ${props => props.imgRight ? '80%' : '70%'};;
    height: ${props => props.imgRight ? '80%' : '70%'};;
    grid-area: image;
  }

  > div[data-description-first] > div {
    width: 80%;
    grid-area: text;
    /* font-family: ostrichSansHeavy; */
    color: ${props => props.imgRight ? `${palette.black}` : "#e9dede"};
    font-size: ${props => props.imgRight ? 'min(2vh, 20px)' : 'min(2.2vh, 22px)'};
    letter-spacing: 1px;

  }

  > div[data-description-first] > div > p {
    /* font-family: ostrichSansHeavy; */
    /* font-weight: 900; */
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