import React, { } from 'react';
import styled from 'styled-components';
import { IData } from '../Helpers/interface';
import { palette } from '../Helpers/utils';

interface IHeaderLabelProps {
  errorMessage?: string;
}

const StyledH5 = styled.h5<IHeaderLabelProps>`
  font-family: jostLight, Arial, Helvetica, sans-serif;
  color: ${palette.red};
  letter-spacing: 1px;
  width: 100%;
  text-align: start;
  justify-self: start;
  align-self: end;
  font-size: clamp(13px, 2vh, 18px);
  position: relative;
  margin-bottom: ${props => props.errorMessage && props.errorMessage.length > 35 ? "40px" : "15px"};
  > strong {
    font-size: 12px;
    display: block;
    position: absolute;
    transform: translate(-0.5%, -15%);
  }
`;

const StyledInput = styled.input`
  max-width: 15vw;
  font-family: grenze;
`;

const FormContainer = styled.div`
  display: grid;
  justify-items: center;
  max-width: 100%;
`;

const InputContainer = styled.div`
  max-width: 100%;
`;

export interface ILPInputDivProps {
  hContent?: string;
  forIdentifier?: "email" | "username" | "password";
  inputVal?: string;
  inputHandler?: (e: React.ChangeEvent<HTMLInputElement>, key: keyof IData | undefined) => void;
  inputPattern?: string | undefined;
  required?: boolean;

  errorMessage?: string;
}

export default function LPInputDiv(props: ILPInputDivProps) {
  const { hContent, forIdentifier, inputVal, inputHandler, inputPattern, required, errorMessage } = props;

  return (
    <FormContainer>
      <StyledH5 errorMessage={errorMessage}>
        {hContent}
        <strong>{errorMessage ? '*' + errorMessage : ''}</strong>
      </StyledH5>
      <InputContainer>
        <StyledInput value={inputVal} pattern={inputPattern} required={required} data-testid='input' onChange={(e) => inputHandler?.(e, forIdentifier)} type={forIdentifier === 'password' ? 'password' : 'text'}></StyledInput>
      </InputContainer>
    </FormContainer>
  );
}