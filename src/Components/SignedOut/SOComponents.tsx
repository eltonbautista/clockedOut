import React from "react";
import styled from "styled-components";
import { SOButtons, } from "../Buttons";
import stylesModule from '../../Styles/SignedOut.module.css';


const StyledHeader = styled.h1`
color: blue;
font-size: 16px;
`;

interface PropsHero {
  nav?: Function,
}

const StyledHeroContainer = styled.div`
  display: grid;
  /* Hero container background */
  background-image: '';
  
  > div[data-sohero-body] {
    display: grid;

    width: 100%;
    background-color: yellow;
    justify-content: center;
    justify-items: center;
    box-sizing: border-box;
  }

  div[data-sohero-text] {
    display: grid;
  }
 
  div[data-sohero-text] > h1 {
    /* width: min(740px, 60%); */
    justify-self: center;
    font-size: clamp(24px, 5vw, 40px);
    margin: 0;
  }

  div[data-sohero-text] > p {
    width: min(740px, 60%);
    justify-self: center;
    font-size: min(3vh, 20px);
  }

  div[data-sohero-button-container] {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    width: 1000px;
    /* justify-content: center; */
    justify-items: center;
  }

  div[data-sohero-button-container] > button{
    border-radius: 100px;
    padding: 10px;
    font-weight: 900;
  }

  > div:last-of-type {
    /* background-color: blue; */
  }
`;

const SOHeroContainer: React.FC<PropsHero> = (props) => {
  // const nav = useNavigate();

  return (
    <StyledHeroContainer data-signed-out data-sohero-background>
      <div data-signed-out data-sohero-body>
        <div data-sohero-text>
          <StyledHeader>
            Create connections...
          </StyledHeader>
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