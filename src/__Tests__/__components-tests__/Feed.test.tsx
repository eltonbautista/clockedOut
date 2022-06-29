/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Feed from "../../Views/Feed";
import UserContextProvider from "../../Contexts/UserContext";
import testImg from "../../Styles/assets/zed.jpg";
import Post from "../../Components/Post";
import { act } from "react-dom/test-utils";
import { IPostState } from "../../Helpers/interface";

describe('Tests for Feed component', () => {

  it('should create a new post with an image and text', async () => {
    const mockPostText = 'This should render onto the page';
    const postObj: IPostState = {
      postText: mockPostText,
      postImage: {
        imageName: testImg,
        imageURL: "wasd"
      }
    };
    render(
      <UserContextProvider>
        <Post text={mockPostText} img={postObj['postImage']['imageName']} />
      </UserContextProvider>);
    expect(screen.getByRole('img', { name: testImg })).toBeInTheDocument();
    expect(screen.getByText(mockPostText)).toBeInTheDocument();
  });

  it('should render SignUp elements with appropriate props', async () => {
    render(
      <UserContextProvider>
        <Feed />
      </UserContextProvider>);

    await waitFor(() => {
      screen.getByRole('link', { name: 'Write a Post' });
      expect(screen.getByRole('link', { name: 'Write a Post' })).toBeInTheDocument();
    }, { timeout: 1300 });

  });

  it('should create a new post', async () => {
    render(
      <UserContextProvider>
        <Feed />
      </UserContextProvider>);
    const mockPostText = 'This should render onto the page';

    act(async () => {

      await waitFor(() => {
        const postBtn = screen.getByRole('link', { name: 'Write a Post' });
        expect(postBtn).toBeInTheDocument();
      }, { timeout: 100 });

      userEvent.click(screen.getByRole('link', { name: 'Write a Post' }));
      const postArea = screen.getByRole('textbox');
      userEvent.type(postArea, mockPostText);
      expect(postArea).toHaveValue(mockPostText);

      const createPostBtn = screen.getByRole('button', { name: 'Post It!' });
      userEvent.click(createPostBtn);
      expect(screen.getByText(mockPostText)).toBeInTheDocument();
    });

  });

});
