import React from "react";
import styled from "styled-components";
import { SODescriptionContainers, SOHeroContainer } from "../Components/SignedOut/SOComponents";


interface Props {
  nav?: Function,
}

const StyledSignedOut = styled.div`
  display: grid;
  background-color: wheat;
  /* min-height: 100vh; */
  min-height: 100vh;
`;

const SignedOut: React.FC<Props> = (props) => {


  return (
    // FIRST SCROLLED VIEW
    <StyledSignedOut>
      <SOHeroContainer nav={props.nav} />
      {/* SECOND SCROLLED VIEW */}
      <div>
        <SODescriptionContainers imgAlt="" imgSrc="" hText="one" pText="" />
        <SODescriptionContainers imgAlt="" imgSrc="" hText="two" pText="" />
        <SODescriptionContainers imgAlt="" imgSrc="" hText="three" pText="" />
      </div>

    </StyledSignedOut>
  );
};

export default SignedOut;