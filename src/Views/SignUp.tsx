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
  inputHandler?: React.ChangeEventHandler<HTMLInputElement>,
}


export default function SignUp(props: ISignUpProps) {
  // const { nav, inputInfo } = props;

  // const { userData, setUserData } = useContext<{ userData: object, setUserData: Function; }>(UserContext);
  // const userInformation: {
  //   email?: string,
  //   username?: string,
  //   password?: string,
  // } = userData;

  // const inputHandler = (e: any) => {
  //   const val = e.target.value;
  //   setUserData({ userData, ...val });
  // };
  type userInfo = {
    email: string,
    username: string,
    password: string,
  };
  const userInformation: {
    email?: string,
    username?: string,
    password?: string,
  } = props.inputInfo;

  return (
    // TODO: body used for background? Or can keep the same background image for performance purposes
    <StyledLoginPage id='sign-up-body'>
      <div id='su-form-container'>
        <StyledSUForm id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv inputHandler={props.inputHandler} hContent='Email' inputVal={userInformation.email} />
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
