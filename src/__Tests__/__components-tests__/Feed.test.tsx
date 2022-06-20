import React from "react";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import App from "../../App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { IData, ILoginInput } from "../../Helpers/interface";
import Feed from "../../Views/Feed";

describe('Tests for Feed component', () => {

  it('should render SignUp elements with appropriate props', () => {
    render(<Feed />);

    const postBtn = screen.getByRole('link', { name: 'Write a Post' });
    expect(postBtn).toBeInTheDocument();
  });

  it('should create a new post', () => {
    render(<Feed />);
    const mockPostText = 'This should render onto the page';

    const postBtn = screen.getByRole('link', { name: 'Write a Post' });
    userEvent.click(postBtn);
    const postArea = screen.getByRole('textbox');
    userEvent.type(postArea, mockPostText);
    expect(postArea).toHaveValue(mockPostText);

    const createPostBtn = screen.getByRole('button', { name: 'Post It!' });
    userEvent.click(createPostBtn);
    expect(screen.getByText(mockPostText)).toBeInTheDocument();

  });


});
