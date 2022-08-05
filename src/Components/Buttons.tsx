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
  border: 2.4px ${palette.white} inset;
  box-shadow: ${props => props.noStyle ? null : "3px -3px 3px #302c2c, 8px 2.5px 10px #302c2c, -1px 4px 10px #302c2c"};
  border-radius: 100px;
  padding: min(8px, 1vh);

  background-color: #2c2828;
  color: ${palette.red};
  font-size: ${props => props.formCheck ? 'clamp(10px, 1.6vw, 30px)' : 'clamp(10px, 1.6vw, 30px)'};
  font-weight: 200;

  :active {
    transform: scale(0.98);
    box-shadow: 0 -2px 3px #302c2c, 0 5px 4px #302c2c, 0 5px 4px #302c2c;
  }
  ${props => props.noStyle ?
    `
      background: none;
      font-size: max(1.5vh, 14px);
      border: none;
      width: fit-content;
      height: fit-content;
      padding: 0;
    ` : null}
`;

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