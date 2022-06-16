import React, { useContext, useEffect } from "react";
import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import { StyledLoginPage, StyledForm } from './Login';
import styled from 'styled-components';
import { UserContext } from '../Helpers/contexts';
import { IData, ISignUpProps } from "../Helpers/interface";
import { createUserInformation } from "../firebase-config";
import { Navigate } from "react-router-dom";

const StyledSUForm = styled(StyledForm)`
  margin-top: 30%;
  padding: 35px;
`;
let buttonSwitch: boolean = false;

export default function SignUp(props: ISignUpProps) {
  const { stateAuth, localAuth } = props;
  const context = useContext(UserContext);

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    if (buttonSwitch === true) {
      inputs.forEach(i => {
        i.value = '';
      });
    }
    // buttonSwitch = false;
  }, []);

  if (localAuth && !stateAuth) {
    return <div>loading assets..</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, info: IData,) {
    e.preventDefault();
    buttonSwitch = await createUserInformation(info.email, info.password, info.username);
    context.setUserSignUpData({ ...info });
  };
  return !stateAuth ? (
    // TODO: body used for background? Or can keep the same background image for performance purposes
    <StyledLoginPage id='sign-up-body'>
      <div id='su-form-container'>
        <StyledSUForm onSubmit={(e) => handleSubmit?.(e, props.inputFields)} id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv inputPattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" inputVal={props.inputFields.email} inputHandler={(e) => props.inputHandler?.(e, 'email')} forIdentifier='email' hContent='Email' />
              <LPInputDiv inputVal={props.inputFields.username} inputHandler={(e) => props.inputHandler?.(e, 'username')} forIdentifier='username' hContent='Username' />
              <LPInputDiv inputVal={props.inputFields.password} inputHandler={(e) => props.inputHandler?.(e, 'password')} forIdentifier='password' hContent='Password' />

              <SOButtons disabled={buttonSwitch ? true : false} type='submit' formCheck={true} >Create Account</SOButtons>
              <SOButtons type='button' onClick={() => props.nav?.('/login', { replace: true })} noStyle={true} >
                <ButtonHeader>
                  Already have an account?
                </ButtonHeader>
              </SOButtons>
            </div>
          </div>
        </StyledSUForm>
      </div>
    </StyledLoginPage>
  ) : <Navigate to="/feed" replace />;
}
