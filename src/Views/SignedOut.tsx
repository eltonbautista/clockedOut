import React from "react"
import styled from "styled-components";
import { SODescriptionContainers, SOButtons, SOHeroContainer } from "../Components/SignedOut/SOComponents";


interface Props {

}

const SignedOut: React.FC<Props> = () => {


  return (
    // FIRST SCROLLED VIEW
    <div>

      <h1>clockedOut</h1>
      <SOHeroContainer />
      {/* SECOND SCROLLED VIEW */}
      <div>
        <SODescriptionContainers hText="" imgAlt="" imgSrc="" pText="" />      <SODescriptionContainers hText="" imgAlt="" imgSrc="" pText="" />
        <SODescriptionContainers hText="" imgAlt="" imgSrc="" pText="" />
      </div>

    </div>
  )
}

export default SignedOut;