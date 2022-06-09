import * as React from 'react';
import styled from 'styled-components';
import { StyledFormContainers } from '../Views/Login';

const StyledH5 = styled.h5`
  font-family: ostrichSansHeavy;
  color: black;
  letter-spacing: 1px;
  background-color: red;
  width: 100%;
`;

export interface ILPInputDivProps {
  dataAttr?: string,
  hContent?: string,
}

const StyledInput = styled.input`
  margin-top: 5px;
  width: 100%;
`;

const TestContainer = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`;

const FooContainer = styled.div`
  width: 100%;
`;


export default function LPInputDiv(props: ILPInputDivProps) {
  const { hContent } = props;
  return (
    <TestContainer>
      <StyledH5>
        {hContent}
      </StyledH5>
      <FooContainer>
        <StyledInput type={'text'}></StyledInput>
      </FooContainer>

    </TestContainer>
  );
}