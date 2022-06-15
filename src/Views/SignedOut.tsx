import React from "react";
import styled from "styled-components";
import { SODescriptionContainers, SOHeroContainer } from "../Components/SOComponents";
import img1 from '../Styles/assets/Nightgame_generated.jpg';
import background from '../Styles/assets/78_generated.jpg';
import { auth } from "../firebase-config";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";

interface Props {
  nav?: Function,
  stateAuth?: User | string | null | undefined;
}

const fillerText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab corporis beatae eveniet aliquam at ea sequi quasi minima saepe! Hic saepe aut ipsum aliquam eos delectus, quo ab dolor? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe cum iure sunt amet facilis cumque quos vero adipisci explicabo? Laudantium pariatur sed officia architecto ipsa harum asperiores fugit fugiat officiis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe cum iure sunt amet facilis cumque quos vero adipisci explicabo? Laudantium pariatur sed officia architecto ipsa harum asperiores fugit fugiat officiis?';

const StyledSignedOut = styled.div`
  display: grid;
  /* background-color: #f5b3f3; */
  height: 100%;
  
  >div:nth-child(2) {
    background-image: url(${background});
    background-position: center;
  }

`;

const SignedOut: React.FC<Props> = (props) => {
  const { stateAuth, nav } = props;

  return !stateAuth ? (
    // FIRST SCROLLED VIEW
    <StyledSignedOut>
      <SOHeroContainer nav={nav} />
      {/* SECOND SCROLLED VIEW */}
      <div>
        <SODescriptionContainers imgRight="true" imgAlt="" imgSrc={`${img1}`} hText="one" pText={fillerText} />
        <SODescriptionContainers imgAlt="" imgSrc={`${img1}`} hText="two" pText={fillerText} />
        <SODescriptionContainers last="true" imgRight="true" imgAlt="" imgSrc={`${img1}`} hText="three" pText={fillerText} />
      </div>
      <div></div>
    </StyledSignedOut>
  ) : <Navigate replace to='/feed' />;
};

export default SignedOut;