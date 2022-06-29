import React, { useEffect, useRef } from "react";
import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import { StyledLoginPage, StyledForm } from './Login';
import styled from 'styled-components';
import { IData, ISignUpProps } from "../Helpers/interface";
import { createUserInformation } from "../firebase-config";
import { Navigate } from "react-router-dom";
import { backgroundImages, createFields } from "../Helpers/utils";

const StyledSUForm = styled(StyledForm)`
  margin-top: 30%;
  padding: 35px;
  > div > div {
    justify-self: center;
    display: grid;
    justify-items: center;
    gap: 7.5px;
  }

  .submit-form-button {
    margin-bottom: 10px;
  }

  #sign-up-body {
  background-image: url(${backgroundImages[3].src});
  /* background-size: cover; */
  background-attachment: fixed;
  background-position: -50px -200px;
  }
`;

export default function SignUp(props: ISignUpProps) {
  const { stateAuth, localAuth } = props;
  const buttonSwitch = useRef(false);

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    if (buttonSwitch.current === true) {
      inputs.forEach(i => {
        i.value = '';
      });
    }
  }, []);

  if (localAuth && !stateAuth) {
    return <div>loading assets..</div>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>, info: IData,) {
    e.preventDefault();
    const formFields = createFields(e, "signUp");
    if (formFields !== undefined) {
      // If successful resolves to true
      buttonSwitch.current = await createUserInformation(formFields.emailValue, formFields.passwordValue, formFields.usernameValue);
    }
    ;
  };

  return !stateAuth ? (
    // TODO: body used for background? Or can keep the same background image for performance purposes
    <StyledLoginPage id='sign-up-body'>
      <div id='su-form-container'>
        <StyledSUForm onSubmit={(e) => handleSubmit?.(e, props.inputFields)} id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv inputPattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" forIdentifier='email' hContent='Email' />
              <LPInputDiv forIdentifier='username' hContent='Username' />
              <LPInputDiv forIdentifier='password' hContent='Password' />

              <SOButtons className="su form-submit-button" disabled={buttonSwitch ? true : false} type='submit' formCheck={true} >Create Account</SOButtons>
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
