import React from "react";
import styled from "styled-components";
import { SOButtons, } from "./Buttons";
import stylesModule from '../../Styles/SignedOut.module.css';
import test from '../Styles/assets/78_generated.jpg';
import { palette } from "../Helpers/utils";
import valoImg from '../Styles/assets/valResized.jpg';
import donda from '../Styles/assets/Donda.mp4';

const StyledHeroHeader = styled.h1`
color: ${palette.black};
justify-self: center;
font-size: clamp(24px, 4vw, 46px);
height: fit-content;
margin: 0;
z-index: 1;
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

    margin-bottom: max(150px, 7%);
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
    border-bottom: 1px solid ${palette.black};
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
    border: 2.4px ${palette.white} inset;
    box-shadow: 3px -3px 3px #302c2c, 8px 2.5px 10px #302c2c, -1px 4px 10px #302c2c;
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
        {/* <img src="" alt=""></img> */}
        <div className="custom-shape-divider-bottom-1655480482">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
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
  font-family: jostLight, Arial, Helvetica, sans-serif;
  ${props => props.last ?
    `
   background-image: url(${valoImg}); 
   background-size: cover;
   background-attachment: fixed;
   background-position: 0 300px;
   color: white;
   height: 30%;
   display: grid; 
   align-items: center;
   @media screen and (max-height: 460px) 
  { background-position: 0 100px; }` : null};
  
  > div[data-description-first] {
    display: grid;
    ${props => !props.imgRight && !props.last ? "padding: 50px 0 50px 0;" : null}
    grid-template-columns: 1fr 0.5fr;
    grid-template-areas: ${props => props.imgRight ? '"text image"' : '"image text"'};
    align-items: center;
    justify-items: center;
    /* height: 80%; */
    > div > h2 {
      font-size: clamp(32px, 2.5vh, 36px);
      text-align: ${props => props.imgRight ? "left" : "center"};
      border-bottom: ${props => props.imgRight ? `2px solid ${palette.white}` : `2px solid ${palette.black}`};
      margin-bottom: 12px;
      padding-bottom: 2px;
      ${props => props.last ? "color: white;" : null}
    }

  }

  > div > div[data-not-div] {
    /* background-color: black; */
    width: 80%;
    border: 20px solid ${palette.black};
    /* height: 60%; */
    grid-area: image;
    position: relative;
    :hover {
      
      ::before {
        position: absolute;
        color: ${palette.red};
        content: "Donda(4K) - by DestructEdits on YouTube";
      }
    }
  }

  svg {
  filter: drop-shadow(3px 8px 2px rgb(0 0 0 / 0.4));
}

  > div[data-description-first] > img {
    width: ${props => props.imgRight ? '70%' : '60%'};
    height: ${props => props.imgRight ? '70%' : '60%'};
    ${props => !props.imgRight && !props.last ? "grid-area: null;" : "grid-area: image;"}
    /* grid-area: image; */
    /* opacity: ${props => props.last ? "0" : null}; */
    /* opacity: 0; */
    padding: 0;
    margin: 0;
    visibility: visible;

    :hover {
        animation: mymove 2s 1, mymoveone 2s 1;
    }
    @keyframes mymove {
    50% {filter: drop-shadow( 200px 0px 0px rgb(255 255 255 / 1));}
    }; 

  @keyframes mymoveone {
    100% {filter: drop-shadow(-250px 0px 0px rgb(255 255 255 / 1))}
    }; 

  }

  > div[data-description-first] > div:last-of-type {
    width: 80%;
    grid-area: text;
    color: ${props => props.imgRight ? `${palette.black}` : "#ffffff"};
    color: ${props => props.last ? "#ffffff" : `${palette.black}`};
    font-size: ${props => props.imgRight ? 'min(2vh, 20px)' : 'min(2.2vh, 22px)'};
    letter-spacing: 1px;
    ${props => props.imgRight ? "margin-right: 100px; padding-right: 150px;" : null}
  }

`;



const SODescriptionContainers: React.FC<PropsDesc> = ({
  hText, imgAlt, imgSrc, pText, imgRight, last
}) => {
  return (
    <StyledDescContainer last={last} imgRight={imgRight} >
      {imgRight && !last ?
        <div className="custom-shape-divider-top-1655480231">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 68" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div> : null}

      <div data-description-first >
        {!last && !imgRight &&
          <div data-not-div>
            <video id="my-video" onMouseLeave={(e) => e.currentTarget.pause()} onMouseOver={(e) => e.currentTarget.play()} controls >
              <source src={donda} type="video/mp4"></source>
            </video>
          </div>}
        {!last && imgRight && <img src={imgSrc} alt={imgAlt} ></img>}
        {last && null}
        <div>
          <h2>{hText}</h2>
          <p>{pText}</p>
        </div>
      </div>
    </StyledDescContainer>
  );
};

export { SOHeroContainer, SODescriptionContainers, };