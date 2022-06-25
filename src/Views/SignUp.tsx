import React, { useContext, useEffect } from "react";
import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import { StyledLoginPage, StyledForm } from './Login';
import styled from 'styled-components';
import { UserContext } from '../Helpers/contexts';
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

  button[data-form-submit] {
    margin-bottom: 10px;
  }

  #sign-up-body {
  background-image: url(${backgroundImages[3].src});
  /* background-size: cover; */
  background-attachment: fixed;
  background-position: -50px -200px;
  }
`;
let buttonSwitch: boolean = false;

export default function SignUp(props: ISignUpProps) {
  const { stateAuth, localAuth, signUpData } = props;

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

    const formFields = createFields(e, "signUp");

    if (formFields !== undefined) {
      buttonSwitch = await createUserInformation(formFields!.emailValue, formFields!.passwordValue, formFields!.usernameValue);
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
              <LPInputDiv inputPattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" inputVal={props.inputFields.email} forIdentifier='email' hContent='Email' />
              <LPInputDiv inputVal={props.inputFields.username} forIdentifier='username' hContent='Username' />
              <LPInputDiv inputVal={props.inputFields.password} forIdentifier='password' hContent='Password' />

              <SOButtons data-form-submit disabled={buttonSwitch ? true : false} type='submit' formCheck={true} >Create Account</SOButtons>
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
