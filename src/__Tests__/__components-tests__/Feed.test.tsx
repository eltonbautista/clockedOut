import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "../../Views/Feed";
import UserContextProvider from "../../Contexts/UserContext";
import testImg from "../../Styles/assets/zed.jpg";
import Post from "../../Components/Post";

describe('Tests for Feed component', () => {

  it('should render SignUp elements with appropriate props', () => {
    render(
      <UserContextProvider>
        <Feed />
      </UserContextProvider>);

    const postBtn = screen.getByRole('link', { name: 'Write a Post' });
    expect(postBtn).toBeInTheDocument();
  });

  it('should create a new post', () => {
    render(
      <UserContextProvider>
        <Feed />
      </UserContextProvider>);
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

  it('should create a new post with an image and text', () => {
    const mockPostText = 'This should render onto the page';

    render(
      <UserContextProvider>
        <Post text={mockPostText} img={testImg} />
      </UserContextProvider>);

    expect(screen.getByRole('img', { name: testImg })).toBeInTheDocument();
    expect(screen.getByText(mockPostText)).toBeInTheDocument();

  });


});
