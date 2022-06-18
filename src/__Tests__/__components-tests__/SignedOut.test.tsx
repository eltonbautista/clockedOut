import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import SignedOut from "../../Views/SignedOut";

import { SODescriptionContainers, } from "../../Components/SOComponents";
import { SOButtons } from "../../Components/Buttons";
import { BrowserRouter } from "react-router-dom";

describe('Tests for my SignedOut component', () => {
  it('Making sure SignedOut renders properly', () => {
    render(
      <BrowserRouter>
        <SignedOut />
      </BrowserRouter>
    );
    const text = screen.getByText(/create connections/i);

    expect(text).toBeInTheDocument();
  });

  it('SODescriptionContainers should render a div and img with correct properties', () => {
    render(<SODescriptionContainers hText="header" imgAlt="img alt" imgSrc="img src" pText="Paragraph" />);

    const descriptionH = screen.getByText('header');

    expect(descriptionH).toBeInTheDocument();
  });

  it('should render SOButtons with dynamic props', () => {
    render(<SOButtons >login</SOButtons>);

    const SOButton = screen.getByText(/login/i);
    expect(SOButton).toBeInTheDocument();
    expect(SOButton).toHaveStyle('color: rgb(250, 71, 83);');
    expect(SOButton).toHaveStyle('background-color: rgb(44, 38, 38);');
    expect(SOButton).toHaveStyle('font-size: max(1.5vh,16px)');

  });

});

