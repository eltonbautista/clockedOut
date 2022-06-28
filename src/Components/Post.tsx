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
  /* min-height: 500px; */
  max-height: fit-content;

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
  /* background-color: green; */
  /* width: 100%; */
  height: fit-content;
  max-height: 600px;
  display: grid;
    /* grid-template-rows: 0.1 0.4fr auto; */

    > p {
      /* height: fit-content; */
      justify-self: start;
      padding: 10px 20px;
      /* margin: 10px; */
      /* background-color: aliceblue; */
      /* width: 100%; */
    }

  > div {
    width: 100%;
    display: block;
    min-height: 100px;
    height: 100%;
    max-height: 550px;
    /* position: relative; */
    margin: 0;
    padding: 0;
    /* height: clamp(300px, 50%, 350px); */
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
  /* background-color: burlywood; */
  grid-auto-flow: column;
  /* Hiding for now cuz ugly */
  visibility: hidden;
`;
const StyledLCS = styled.div`
  /* background-color: coral; */
  grid-auto-flow: column;
  /* Hiding for now cuz ugly */
  visibility: hidden;
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
            <span>User's @</span> |
            <span>Most active game and timezone</span> |
            <span>Time posted</span>
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
        <span>Likes: 1</span>
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
        <div className="post-comment-container">This will be conditionally displayed, it will contain comments
          <p>paragraph that has overflow: ellipses</p>
        </div>
      </StyledPostLikesComments>

      <StyledLCS className="like-comment-share">

        <SOButtons>
          <ButtonHeader>
            Like, has event that increases like count on post
          </ButtonHeader>
        </SOButtons>

        <SOButtons>
          <ButtonHeader>
            Comment, has event that lets user comment on post
            {/* Writing a comment conditionally renders comment container */}
          </ButtonHeader>
        </SOButtons>

        <SOButtons>
          <ButtonHeader>
            Share, has event that lets user share the post
          </ButtonHeader>
        </SOButtons>

      </StyledLCS>

    </StyledPost>
  );
};

export default React.memo(Post);