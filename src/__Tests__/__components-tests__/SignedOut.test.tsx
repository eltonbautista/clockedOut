import { getByText, render, screen } from "@testing-library/react";
import React from "react";
import SignedOut from "../../Views/SignedOut";

import { SODescriptionContainers, SOButtons } from "../../Components/SignedOut/SOComponents";

describe('Tests for my SignedOut component', () => {
  it('Making sure SignedOut renders properly', () => {
    render(<SignedOut />);
    const text = screen.getByText(/hello world/i);

    expect(text).toBeInTheDocument();

  })

});

describe('Tests for SODescriptionContainers component', () => {

  it('SODescriptionContainers should render a div and img with correct properties', () => {
    render(<SODescriptionContainers hText="header" imgAlt="img alt" imgSrc="img src" pText="Paragraph" />)
  })

  const descriptionH = screen.getByRole('header');
  const imgSrc = screen.getByRole('img');

  expect(descriptionH).toBeInTheDocument();
  expect(imgSrc).toStringContaining('img src')

});

