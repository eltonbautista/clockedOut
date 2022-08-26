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
  display: grid;
  align-content: center;
  height: clamp(24px, 3vw, 50px);
  width: 90%;
  margin-top: ${props => props.formCheck ? '10px' : null};
  border-radius: 100px;
  border: none;
  padding: min(8px, 1vh);

  background-color: var(--bg-color-accent);
  color: var(--color-main);
  font-size: ${props => props.formCheck ? 'var(--font-size-lg)' : 'var(--font-size-lg)'};
  font-weight: 200;

  :active {
    transform: scale(0.98);
    box-shadow: 0 -2px 3px #302c2c, 0 5px 4px #302c2c, 0 5px 4px #302c2c;
  }
  ${props => props.noStyle ?
    `
      background: none;
      font-size: var(--font-size-lg);
      border: none;
      width: fit-content;
      height: fit-content;
      padding: 0;
    ` : null}
`;

const ButtonHeader = styled.h5`
  margin: 0;
  font-size: var(--font-size-sm);
  &:hover {
    text-decoration: underline;
    color: red;
    /* font-size: clamp(14px, 2vh, 18px); */
  }
`;

export { SOButtons, ButtonHeader }; 