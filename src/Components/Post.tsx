import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { IPostProps } from "../Helpers/interface";
import { ButtonHeader, SOButtons } from "./Buttons";
import { CircularPicture } from "../Views/Feed";
import testpfp2 from "../Styles/assets/testpfp2.jpg";
import { palette } from "../Helpers/utils";
import { UserContext } from "../Helpers/contexts";
import cat from "../Styles/assets/cat.png";

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: 0.2fr auto 0.1fr 0.2fr;
  max-height: fit-content;
  background-color: ${palette.fpink};
  border: 1px solid rgb(205, 199, 199);
  border-radius: 8px;

  > div {
    display: grid;
    justify-items: center;
  }

  button {
    background-color: ${palette.fwhite};
    box-shadow: none;
    border: none;
  }

`;

const StyledUserInfo = styled.div`
  grid-template-columns: 0.1fr auto;
  padding: 15px 15px 5px 15px;
  justify-items: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  /* background-color: aliceblue; */

  > div:last-of-type {
    display: grid;
    margin-left: 10px;
    padding-left: 20px;
    width: 100%;
    justify-items: start;
    align-items: center;
    gap: 2px;

  }

  > div:last-of-type > div {
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
  }
  
`;

const StyledUserPost = styled.div`

  height: fit-content;
  max-height: 600px;
  display: grid;

    > p {
      justify-self: start;
      padding: 10px 20px;
    }

  > div {
    width: 100%;
    display: block;
    min-height: 100px;
    height: 100%;
    max-height: 550px;
    margin: 0;
    padding: 0;
  }

  img {
    object-fit: cover;
    object-position: 0%;
    background-position: 100%;
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  video {

  }
`;
const StyledPostLikesComments = styled.div`
  justify-items: center;
  align-items: center;
  grid-auto-flow: column;
  border-bottom: 1px solid ${palette.red};
  button {
    background-color: ${palette.fpink};
  }
`;
const StyledLCS = styled.div`
  grid-auto-flow: column;
  > button {
    background-color: ${palette.fpink};
  }
`;

// Post is a dynamically generated component that is created when a user creates a new post.
const Post: React.FC<IPostProps> = (props) => {
  const { pfp, video, img } = props;
  const { loggedInData } = useContext(UserContext);
  return (
    <StyledPost className="user-post">

      <StyledUserInfo className="user-info">
        <CircularPicture zIndex="0" position="sticky" imgSrc={pfp ? pfp : cat} height="60px" width="60px" />
        <div>
          <h3>{loggedInData?.displayName}</h3>
          <div>
            <span>TBD</span> |
            <span>TBD Most played</span> |
            <span>TBD Time</span>
          </div>

        </div>
      </StyledUserInfo>

      <StyledUserPost className="user-post">
        <p>{props.text}</p>
        {img && !video ? <div><img src={img} alt={img}></img></div> : null}
        {!img && video ?
          <div>
            <video controls >
              <source src={video} ></source>
            </video>
          </div> : null}
      </StyledUserPost>

      <StyledPostLikesComments className="post-likes-and-comments">
        {/* Dynamic count of likes */}
        <span>Likes: 0</span>
        <span>
          <SOButtons>
            {/* Dynamic count of comments,
              when user clicks this it will create display div that shows comments */}
            <ButtonHeader>
              Comments
            </ButtonHeader>
          </SOButtons>
        </span>

        {/* A CONDITIONALLY RENDERED CONTAINER: */}
        <div className="post-comment-container">
          <p>paragraph that has overflow: ellipses</p>
        </div>
      </StyledPostLikesComments>

      <StyledLCS className="like-comment-share">

        <SOButtons>
          <ButtonHeader>
            Like
          </ButtonHeader>
        </SOButtons>

        <SOButtons>
          <ButtonHeader>
            Comment
            {/* Writing a comment conditionally renders comment container */}
          </ButtonHeader>
        </SOButtons>

        <SOButtons>
          <ButtonHeader>
            Share
          </ButtonHeader>
        </SOButtons>

      </StyledLCS>

    </StyledPost>
  );
};

export default React.memo(Post);