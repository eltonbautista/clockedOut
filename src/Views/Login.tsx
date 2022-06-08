import * as React from 'react';
import LPInputDiv from '../Components/Forms';
import { SOButtons } from '../Components/Buttons';



export interface ILoginProps {
}

export default function Login(props: ILoginProps) {
  return (
    <div data-login-page data-lp-background  >
      <form data-login-page data-lp-form>

        <div data-lp-main-container >
          <div>
            <h3>Welcome back!</h3>
            <p>Fun times are awaitin' ya!</p>
          </div>
          <div data-lp-inputs-container>
            <LPInputDiv hContent="Email or Username" />
            <LPInputDiv hContent="Password" />
          </div>
          <div>
            <SOButtons bgColor="red" color="wheat" >Login</SOButtons>
            {/* TODO: add link to register page */}
            <h5>Don't have an account? Link:register </h5>
          </div>
        </div>

      </form>
    </div>

  );
}