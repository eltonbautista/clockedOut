import React from "react"
import styled from "styled-components";
import { SODescriptionContainers, SOButtons } from "../Components/SignedOut/SOComponents";


interface Props {

}

const StyledProjectName = styled.h1`
background-color: blue;
font-size: 16px;
`

const SignedOut: React.FC<Props> = () => {


  return (
    // FIRST SCROLLED VIEW
    <div>
      <h1>clockedOut</h1>
      <div data-signed-out data-sohero-background>
        <div data-signed-out data-sohero-body>
          <div data-sohero-text>
            <StyledProjectName>
              Hello World
            </StyledProjectName>
            <p>This is where my description will go</p>
          </div>
          <div data-sohero-button-container>
            <SOButtons size={'24px'} >Sign Up</SOButtons>
            <SOButtons color="white" bgColor="black" >Login</SOButtons>
          </div>
        </div>
        <div>
          <img src="" alt=""></img>
        </div>
      </div>
      {/* SECOND SCROLLED VIEW */}
      <SODescriptionContainers hText="header" />
      <SODescriptionContainers />
      <SODescriptionContainers />
    </div>
  )
}

export default SignedOut;