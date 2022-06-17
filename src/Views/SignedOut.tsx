import React from "react";
import styled from "styled-components";
import { SODescriptionContainers, SOHeroContainer } from "../Components/SOComponents";
import img1 from '../Styles/assets/Nightgame_generated.jpg';
import background from '../Styles/assets/78_generated.jpg';
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
import sFImg from "../Styles/assets/fighter.svg";

interface Props {
  nav?: Function,
  stateAuth?: User | string | null | undefined;
  localAuth?: string | null;
}

const fillerText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab corporis beatae eveniet aliquam at ea sequi quasi minima saepe! Hic saepe aut ipsum aliquam eos delectus, quo ab dolor? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe cum iure sunt amet facilis cumque quos vero adipisci explicabo? Laudantium pariatur sed officia architecto ipsa harum asperiores fugit fugiat officiis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe cum iure sunt amet facilis cumque quos vero adipisci explicabo? Laudantium pariatur sed officia architecto ipsa harum asperiores fugit fugiat officiis?';

const StyledSignedOut = styled.div`
  display: grid;
  height: 100%;
  
  >div:nth-child(2) {
    background-position: center;
  }

`;

const SignedOut: React.FC<Props> = (props) => {
  const { stateAuth, nav, localAuth } = props;

  if (localAuth && !stateAuth) {
    return <div>loading assets..</div>;
  };

  return !stateAuth ? (
    // FIRST SCROLLED VIEW
    <StyledSignedOut>
      <SOHeroContainer nav={nav} />
      {/* SECOND SCROLLED VIEW */}
      <div>
        <SODescriptionContainers imgRight="true" imgAlt="" imgSrc={`${sFImg}`} hText="compete" pText={fillerText} />
        <SODescriptionContainers imgAlt="" imgSrc={`${img1}`} hText="improvise" pText={fillerText} />
        <SODescriptionContainers last="true" imgRight="true" imgAlt="" imgSrc={`${img1}`} hText="experience" pText={fillerText} />
      </div>
      <div></div>
    </StyledSignedOut>
  ) : <Navigate replace to='/feed' />;
};

export default React.memo(SignedOut);