import * as React from 'react';
import styled from 'styled-components';

interface ISOButton {
  customStyle?: string,
  bgColor?: string,
  color?: string,
  fontSize?: string,
  width?: string,
  height?: string,
  padding?: string,
}


const SOButtons = styled.button<ISOButton>`
  ${props => props.customStyle ? props.customStyle :
    `background-color: ${props.bgColor};
     color: ${props.color};
     font-size: ${props.fontSize};
     width: ${props.width};
     height: ${props.height};
     padding: ${props.padding};
    `} `

export { SOButtons }; 