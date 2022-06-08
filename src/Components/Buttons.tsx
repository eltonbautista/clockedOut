import * as React from 'react';
import styled from 'styled-components';

interface ISOButton {
  formCheck?: boolean,
  bgColor?: string,
  color?: string,
  fontSize?: string,
  width?: string,
  height?: string,
  padding?: string,
}


// const SOButtons = styled.button<ISOButton>`
//   ${props => props.customStyle ? props.customStyle :
//     `background-color: ${props.bgColor ? props.bgColor : 'red'}
//      color: ${props.color ? props.color : 'wheat'};
//      font-size: ${props.fontSize ? props.fontSize : '16px'};
//      width: ${props.width ? props.width : 'fit-content'};
//      height: ${props.height ? props.height : 'fit-content'};
//      padding: ${props.padding ? props.padding : '7px'};
//     `} `

const SOButtons = styled.button<ISOButton>`
  background-color: ${props => props.formCheck ? 'red' : 'black'};
  color: ${props => props.formCheck ? 'wheat' : 'blue'};
  font-size: ${props => props.formCheck ? 'max(1.5vh, 16px)' : 'max(1.5vh, 14px)'};
  width: ${props => props.formCheck ? '100%' : 'max(100%, 120px)'};
  height: ${props => props.formCheck ? '100%' : 'max(100%, 100px)'};
  padding: ${props => props.formCheck ? '8px' : 'max(7px, 5px)'};
`;
export { SOButtons }; 