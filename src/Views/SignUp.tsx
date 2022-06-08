import * as React from 'react';
import LPInputDiv from '../Components/Forms';
import { SOButtons } from '../Components/Buttons';


export interface ISignUpProps {
}

export default function SignUp(props: ISignUpProps) {
  return (
    // TODO: body used for background? Or can keep the same background image for performance purposes
    <div id='sign-up-body'>
      <div id='su-form-container'>
        <form id='su-form'>
          <div>
            <h3>Create an account</h3>
            <div>
              <LPInputDiv hContent='Email' />
              <LPInputDiv hContent='Username' />
              <LPInputDiv hContent='Password' />
              <SOButtons type='submit' formCheck={true} >Create Account</SOButtons>
              {/* TODO: <Link /> to Login page */}
              <h5>Already have an account?</h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
