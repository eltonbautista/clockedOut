import * as React from 'react';
import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import styled from 'styled-components';
import backgroundImage from '../Styles/assets/31.jpg';
import { IData, ILoginProps } from "../Helpers/interface";
import { signingIn } from '../firebase-config';
import { localLoginInfo } from '../Helpers/utils';
import { Navigate } from 'react-router-dom';
import Feed from './Feed';
export const StyledForm = styled.form`
  height: fit-content;
  padding: 50px;
  margin-top: 40%;
  background-color: black;
  font-size: clamp(16px, 3vh, 30px);
  font-family: ostrichSansHeavy;
  color: wheat;
  border-radius: 8%;
  display: grid;
  box-shadow: 0 0 2px #fff, 0 0 10px #fff, 0 0 20px #ff69fa, 0 0 20px #ff69fa,
  0 0 40px #ff69fa, 0 0 20px #ff69fa, 0 0 2px  inset #fff, 0 0 10px inset  #fff, 0 0 20px inset  #ff69fa, 0 0 20px inset  #ff69fa,
  0 0 40px inset  #ff69fa, 0 0 20px inset  #ff69fa;
  > div {
    justify-self: center;
  }
`;

export const StyledFormContainers = styled.div`
  background-color: red;
  font-family: ostrichSansHeavy;
  width: 100%;
`;

export const StyledLoginPage = styled.div`
  display: grid;
  justify-content: center;
  background-image: url(${backgroundImage});
  background-position: center 15%;
  background-size: cover;
  height: 100%;

  div[data-lp-inputs-container] {
    font-family: ostrichSansHeavy;
  }
`;

export default function Login(props: ILoginProps) {
  const { nav, stateAuth } = props;
  const { email, password, } = props.inputFields;

  if (localLoginInfo && !stateAuth) {
    return <div>loading assets..</div>;
  }

  return stateAuth ? <Navigate to="/feed" /> : (
    <StyledLoginPage>

      <StyledForm onSubmit={props.submitHandler} data-login-page data-lp-form>

        <div data-lp-main-container >
          <div>
            <h3>Welcome back!</h3>
            <p>Fun times are awaitin' ya!</p>
          </div>
          <div data-lp-inputs-container>
            <LPInputDiv data-testid='email-field' inputHandler={(e) => props.inputHandler?.(e, 'email')} forIdentifier='email' hContent="Email" />
            <LPInputDiv data-testid='password-field' inputHandler={(e) => props.inputHandler?.(e, 'password')} forIdentifier='password' hContent="Password" />
          </div>
          <div>
            <SOButtons type="submit" formCheck={true} bgColor="red" color="wheat" >Login</SOButtons>
            <SOButtons type='button' noStyle={true} onClick={() => nav?.('sign-up', { replace: true })} >
              <ButtonHeader>Don't have an account?</ButtonHeader>
            </SOButtons>
          </div>
        </div>

      </StyledForm>

    </StyledLoginPage>

  );
}