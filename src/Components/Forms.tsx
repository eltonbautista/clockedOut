import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { StyledFormContainers } from '../Views/Login';
import { UserContext } from '../Helpers/contexts';
import { IData } from '../Helpers/interface';
import { palette } from '../Helpers/utils';


const StyledH5 = styled.h5`
  font-family: jostLight, Arial, Helvetica, sans-serif;
  color: ${palette.red};
  letter-spacing: 1px;
  text-align: start;
  /* background-color: red; */
  width: 100%;
  font-size: clamp(18px, 2vh, 19px);
`;


const StyledInput = styled.input`
  width: 100%;
  font-family: grenze;
`;

const TestContainer = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`;

const FooContainer = styled.div`
  width: 100%;
`;

export interface ILPInputDivProps {
  hContent?: string;
  forIdentifier?: "email" | "username" | "password";
  inputVal?: string;
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof IData | undefined) => void;
  inputPattern?: string | undefined;
}

export default function LPInputDiv(props: ILPInputDivProps) {
  const { hContent, forIdentifier, inputVal, inputHandler, inputPattern } = props;

  // const UserInformation = useContext(UserContext);

  // TODO: value={inputVal} into <StyledInput />
  return (
    <TestContainer>
      <StyledH5>
        {hContent}
      </StyledH5>
      <FooContainer>
        <StyledInput pattern={inputPattern} required data-testid='input' onChange={(e) => inputHandler?.(e, forIdentifier)} type={forIdentifier === 'password' ? 'password' : 'text'}></StyledInput>
      </FooContainer>

    </TestContainer>
  );
}