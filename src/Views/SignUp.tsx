import React, { createContext, useContext } from "react";
import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import { StyledLoginPage, StyledForm, StyledFormContainers } from './Login';
import styled from 'styled-components';
import { UserContext } from '../Helpers/contexts';
import { IData } from "../Helpers/interface";

const StyledSUForm = styled(StyledForm)`
  margin-top: 30%;
  padding: 35px;
`;

export interface ISignUpProps {
  nav?: Function,
  inputInfo: object,
  inputHandler?: (e: any, key: keyof IData) => void,
}


export default function SignUp(props: ISignUpProps) {

  return (
    // TODO: body used for background? Or can keep the same background image for performance purposes
    <StyledLoginPage id='sign-up-body'>
      <div id='su-form-container'>
        <StyledSUForm id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv inputHandler={(e) => props.inputHandler?.(e, 'email')} hContent='email' />
              <LPInputDiv inputHandler={(e) => props.inputHandler?.(e, 'username')} hContent='username' />
              <LPInputDiv inputHandler={(e) => props.inputHandler?.(e, 'password')} hContent='password' />
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
