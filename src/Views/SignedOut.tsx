import React from "react";
import styled from "styled-components";
import { SODescriptionContainers, SOHeroContainer } from "../Components/SignedOut/SOComponents";


interface Props {
  nav?: Function,
}

const fillerText = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias ab corporis beatae eveniet aliquam at ea sequi quasi minima saepe! Hic saepe aut ipsum aliquam eos delectus, quo ab dolor?';

const StyledSignedOut = styled.div`
  display: grid;
  background-color: wheat;
  height: 100%;
`;

const SignedOut: React.FC<Props> = (props) => {


  return (
    // FIRST SCROLLED VIEW
    <StyledSignedOut>
      <SOHeroContainer nav={props.nav} />
      {/* SECOND SCROLLED VIEW */}
      <div>
        <SODescriptionContainers imgAlt="" imgSrc="" hText="one" pText={fillerText} />
        <SODescriptionContainers imgAlt="" imgSrc="" hText="two" pText={fillerText} />
        <SODescriptionContainers imgAlt="" imgSrc="" hText="three" pText={fillerText} />
      </div>

    </StyledSignedOut>
  );
};

export default SignedOut;