import LPInputDiv from '../Components/Forms';
import { SOButtons, ButtonHeader } from '../Components/Buttons';
import styled from 'styled-components';
import { ILoginProps } from "../Helpers/interface";
import { Navigate } from 'react-router-dom';
import { backgroundImages } from '../Helpers/utils';
import { IStyledLPProps } from '../Helpers/interface';
import { UserContext } from '../Helpers/contexts';
import { useContext } from 'react';
import { useEffect } from 'react';
import { signingIn } from '../firebase-config';


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

  .form-submit-button {
    margin-bottom: 10px;
  };
`;

export const StyledFormContainers = styled.div`
  background-color: red;
  width: 100%;
`;

export const StyledLoginPage = styled.div<IStyledLPProps>`
  display: grid;
  justify-content: center;
  background-image: ${props => props.bgImg === 'login' ? `url(${backgroundImages[2].src})` : `url(${backgroundImages[3].src})`};
  background-size: fill;
  background-attachment: fixed;
  background-position: ${props => props.bgImg === 'login' ? "-50px -200px;" : "center"};
  height: 100vh;


  .inputs-container {
    font-family: jostLight, Arial, Helvetica, sans-serif;
    display: grid;
    gap: 7.5px;
  }
  .demo-button {
    cursor: crosshair;
  }
`;

export default function Login(props: ILoginProps) {
  const { nav, stateAuth, localAuth } = props;
  const { loggedInData, setAllUsersData } = useContext(UserContext);

  const demoAccount = () => {
    signingIn("a@a.com", "123123");
  };

  useEffect(() => {
    if (!loggedInData) {
      setAllUsersData([]);
    }
  }, [loggedInData, setAllUsersData]);

  if (localAuth && !stateAuth) {
    return <div>loading assets..</div>;
  }

  return stateAuth ? <Navigate to="/feed" /> : (
    <StyledLoginPage bgImg='login'>

      <StyledForm onSubmit={props.submitHandler} data-login-page data-lp-form>

        <div data-lp-main-container >
          <div>
            <h3>Welcome back!</h3>
            <p>Fun times are awaitin' ya!</p>
          </div>
          <div className='lp inputs-container'>
            <LPInputDiv required data-testid='email-field' forIdentifier='email' hContent="Email" />
            <LPInputDiv required data-testid='password-field' forIdentifier='password' hContent="Password" />
          </div>
          <div>
            <SOButtons className='lp form-submit-button' type="submit" formCheck={true} bgColor="red" color="wheat" >Login</SOButtons>
            <ButtonHeader className='demo-button' onClick={() => {
              demoAccount();
            }}>CLICK ME FOR A DEMO!</ButtonHeader>
            <SOButtons type='button' noStyle={true} onClick={() => nav?.('sign-up', { replace: true })} >
              <ButtonHeader>Don't have an account?</ButtonHeader>
            </SOButtons>
          </div>
        </div>

      </StyledForm>

    </StyledLoginPage>

  );
}