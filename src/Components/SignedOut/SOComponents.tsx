import React from "react";
import styled from "styled-components";

interface Props {
  imgSrc?: string,
  imgAlt?: string,
  hText?: string,
  pText?: string
}

const SODescriptionContainers: React.FC<Props> = ({
  hText, imgAlt, imgSrc, pText
}) => {

  return (
    <div data-signed-out data-description-container>
      <div data-description-first>
        {/* can change position of img/description using css*/}
        <img src={imgSrc} alt={imgAlt} ></img>
        <div>
          <h2>{hText}</h2>
          <p>{pText}</p>
        </div>
      </div>
    </div>
  );
};

interface iSOButton {
  bgColor?: string,
  color?: string,
  size?: string,

}

const SOButtons = styled.button<iSOButton>`
      background-color: ${props => props.bgColor};
      color: ${props => props.color};
      font-size: ${props => props.size ? props.size : '16px'};
    `

export { SODescriptionContainers, SOButtons }