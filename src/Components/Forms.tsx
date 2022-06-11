import React, { useContext } from 'react';
import styled from 'styled-components';
import { StyledFormContainers } from '../Views/Login';
import { UserContext } from '../Helpers/contexts';
import { IData } from '../Helpers/interface';


const StyledH5 = styled.h5`
  font-family: ostrichSansHeavy;
  color: black;
  letter-spacing: 1px;
  background-color: red;
  width: 100%;
`;


const StyledInput = styled.input`
  margin-top: 5px;
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
  forIdentifier: "email" | "username" | "password";
  inputVal?: string;
  inputHandler?: (e: any, key: keyof IData) => void;
}

export default function LPInputDiv(props: ILPInputDivProps) {
  const { hContent, forIdentifier, inputVal, inputHandler } = props;

  // const UserInformation = useContext(UserContext);

  return (
    <TestContainer>
      <StyledH5>
        {hContent}
      </StyledH5>
      <FooContainer>
        <StyledInput onChange={(e) => inputHandler?.(e, forIdentifier)} type={'text'}></StyledInput>
      </FooContainer>

    </TestContainer>
  );
}