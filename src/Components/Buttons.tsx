import * as React from 'react';
import styled from 'styled-components';

interface ISOButton {
  noStyle?: boolean,
  formCheck?: boolean,
  bgColor?: string,
  color?: string,
  fontSize?: string,
  width?: string,
  height?: string,
  padding?: string,
}

const SOButtons = styled.button<ISOButton>`
  background-color: ${props => props.formCheck ? 'red' : 'black'};
  color: ${props => props.formCheck ? 'wheat' : 'blue'};
  font-size: ${props => props.formCheck ? 'max(1.5vh, 16px)' : 'max(1.5vh, 14px)'};
  width: ${props => props.formCheck ? '100%' : 'max(100%, 120px)'};
  height: ${props => props.formCheck ? '100%' : 'max(100%, 100px)'};
  padding: ${props => props.formCheck ? '8px' : 'max(7px, 5px)'};
  ${props => props.noStyle ?
    `
      background: none;
      font-size: max(1.5vh, 14px);
      border: none;
      width: fit-content;
      height: fit-content;
      cursor: crosshair;
      padding: 0;
    ` : null}
`;

interface IButtonHeader {

}

const ButtonHeader = styled.h5`
  margin: 0;
  &:hover {
    text-decoration: underline;
    color: black;
  }
`;

export { SOButtons, ButtonHeader }; 