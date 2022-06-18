import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import styled from 'styled-components';
import backgroundImage from '../Styles/assets/31.jpg';
import { ILoginProps } from "../Helpers/interface";
import { Navigate } from 'react-router-dom';
import { palette } from '../Helpers/utils';


export const StyledForm = styled.form`
  height: fit-content;
  padding: 50px;
  margin-top: 40%;
  background-color: black;
  font-size: clamp(16px, 3vh, 30px);
  color: wheat;
  border-radius: 10px;
  display: grid;
  text-align: center;

  > div {
    justify-self: center;
    display: grid;
    justify-items: center;
  };

  > div > div:last-of-type {
    margin-top: 7.5px;
  }

  button[data-form-submit] {
    margin-bottom: 10px;
  };
`;

export const StyledFormContainers = styled.div`
  background-color: red;
  width: 100%;
`;

export const StyledLoginPage = styled.div`
  display: grid;
  justify-content: center;
  background-color: ${palette.pink};
  height: 100%;


  div[data-lp-inputs-container] {
    font-family: jostLight, Arial, Helvetica, sans-serif;
    display: grid;
    gap: 7.5px;
  }
`;

export default function Login(props: ILoginProps) {
  const { nav, stateAuth, localAuth } = props;
  // const { email, password, } = props.inputFields;

  if (localAuth && !stateAuth) {
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
            <SOButtons data-form-submit type="submit" formCheck={true} bgColor="red" color="wheat" >Login</SOButtons>
            <SOButtons type='button' noStyle={true} onClick={() => nav?.('sign-up', { replace: true })} >
              <ButtonHeader>Don't have an account?</ButtonHeader>
            </SOButtons>
          </div>
        </div>

      </StyledForm>

    </StyledLoginPage>

  );
}