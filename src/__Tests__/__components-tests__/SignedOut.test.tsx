import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

import SignedOut from "../../Views/SignedOut";

import { SODescriptionContainers, SOButtons } from "../../Components/SignedOut/SOComponents";

describe('Tests for my SignedOut component', () => {
  it('Making sure SignedOut renders properly', () => {
    render(<SignedOut />);
    const text = screen.getByText(/hello world/i);

    expect(text).toBeInTheDocument();
  });

  it('SODescriptionContainers should render a div and img with correct properties', () => {
    render(<SODescriptionContainers hText="header" imgAlt="img alt" imgSrc="img src" pText="Paragraph" />)

    const descriptionH = screen.getByText('header');
    const imgSrc = screen.getByRole('img');

    expect(descriptionH).toBeInTheDocument();
    expect(imgSrc).toHaveAttribute('src', 'img src');
  });

  it('should render SOButtons with dynamic props', () => {
    render(<SOButtons bgColor="black" color="white" size="12px">login</SOButtons>)

    const SOButton = screen.getByText(/login/i);
    expect(SOButton).toBeInTheDocument();
    expect(SOButton).toHaveStyle('color: white');
    expect(SOButton).toHaveStyle('background-color: black');
    expect(SOButton).toHaveStyle('font-size: 12px');

  });

});

