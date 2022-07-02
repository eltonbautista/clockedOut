import React, { useEffect, useRef, useState } from "react";
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
  // CONSTANTS, VARIABLES & STATES:
  const { stateAuth, localAuth } = props;
  const buttonSwitch = useRef(false);
  const [formErrorMessage, setFormErrorMessage] = useState<IData>();


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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log('hello');
    const formFields = createFields(e, "signUp");

    if (formFields) {
      if (formFields.emailValue.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/) === null) {
        setFormErrorMessage({
          email: "Please enter a valid format: example@domain.com",
          password: "",
          username: ""
        });
        return;
      } else if (formFields.usernameValue === "") {
        setFormErrorMessage({
          email: "",
          password: "",
          username: "Please enter a username that includes only letters."
        });
        return;
      } else if (formFields.passwordValue === "" || formFields.passwordValue.length < 6) {
        setFormErrorMessage({
          email: "",
          password: `Please enter a password of at least 6 characters. You are currently at ${formFields.passwordValue.length}`,
          username: ""
        });
        return;
      }
    }

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
        <StyledSUForm noValidate onSubmit={(e) => handleSubmit?.(e)} id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv errorMessage={formErrorMessage?.email} inputPattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" forIdentifier='email' hContent='Email' />
              <LPInputDiv errorMessage={formErrorMessage?.username} forIdentifier='username' hContent='Username' />
              <LPInputDiv errorMessage={formErrorMessage?.password} forIdentifier='password' hContent='Password' />

              <SOButtons className="su form-submit-button" type='submit' formCheck={true} >Create Account</SOButtons>
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
