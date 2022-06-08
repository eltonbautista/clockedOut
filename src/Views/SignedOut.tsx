import React from "react";
import styled from "styled-components";
import { SODescriptionContainers, SOHeroContainer } from "../Components/SignedOut/SOComponents";


interface Props {
  nav?: Function,
}

const SignedOut: React.FC<Props> = (props) => {


  return (
    // FIRST SCROLLED VIEW
    <div>
      <SOHeroContainer nav={props.nav} />
      {/* SECOND SCROLLED VIEW */}
      <div>
        <SODescriptionContainers hText="" imgAlt="" imgSrc="" pText="" />      <SODescriptionContainers hText="" imgAlt="" imgSrc="" pText="" />
        <SODescriptionContainers hText="" imgAlt="" imgSrc="" pText="" />
      </div>

    </div>
  );
};

export default SignedOut;