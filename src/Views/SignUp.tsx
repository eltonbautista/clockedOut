import React, { createContext, useContext } from "react";
import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import { StyledLoginPage, StyledForm, StyledFormContainers } from './Login';
import styled from 'styled-components';
import { UserContext } from '../Helpers/Contexts';


const StyledSUForm = styled(StyledForm)`
  margin-top: 30%;
  padding: 35px;
`;

export interface ISignUpProps {
  nav?: Function,
  inputInfo: object,
}


export default function SignUp(props: ISignUpProps) {
  // const { nav, inputInfo } = props;
  console.log(props.inputInfo);
  const userInformation = useContext(UserContext);
  console.log(userInformation.userData);

  return (
    // TODO: body used for background? Or can keep the same background image for performance purposes
    <StyledLoginPage id='sign-up-body'>
      <div id='su-form-container'>
        <StyledSUForm id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv hContent='Email' />
              <LPInputDiv hContent='Username' />
              <LPInputDiv hContent='Password' />
              <SOButtons type='submit' formCheck={true} >Create Account</SOButtons>
              <SOButtons type='button' onClick={() => props.nav?.('login')} noStyle={true} >
                <ButtonHeader>
                  Already have an account?
                </ButtonHeader>
              </SOButtons>
            </div>
          </div>
        </StyledSUForm>
      </div>
    </StyledLoginPage>
  );
}
