import * as React from 'react';
import styled from 'styled-components';
import { palette } from '../Helpers/utils';

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
  border: none;
  display: grid;
  align-content: center;
  background-color: #2c2626;
  color: ${props => props.formCheck ? '#ff69fa' : `${palette.red}`};
  font-size: ${props => props.formCheck ? 'clamp(10px, 1.6vw, 30px)' : 'clamp(10px, 1.6vw, 30px)'};
  width: ${props => props.formCheck ? '75%' : 'max(75%, 80px)'};
  height: ${props => props.formCheck ? '75%' : 'max(75%, 30px)'};
  padding: ${props => props.formCheck ? '8px' : 'min(3px, 2px)'};
  margin-top: ${props => props.formCheck ? '10px' : null};
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

  &:hover {
    color: pink;
    cursor: crosshair;
  }
`;

interface IButtonHeader {

}

const ButtonHeader = styled.h5`
  margin: 0;
  font-size: clamp(14px, 2vh, 18px);
  &:hover {
    text-decoration: underline;
    color: red;
    font-size: clamp(14px, 2vh, 18px);
  }
`;

export { SOButtons, ButtonHeader }; 