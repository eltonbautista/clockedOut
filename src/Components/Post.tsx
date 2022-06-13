import React from "react";
import styled from "styled-components";
import { IPostProps } from "../Helpers/interface";
import { ButtonHeader, SOButtons } from "./Buttons";

const StyledPost = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.5fr 0.1fr 0.2fr;
  > div {
    display: grid;
  }
`;

const StyledUserInfo = styled.div`
  grid-template-columns: 0.2fr 0.8fr;

  > div {
    
  }
`;
const StyledUserPost = styled.div`
  
`;
const StyledPostLikesComments = styled.div`
  
`;
const StyledLCS = styled.div`

`;
// Post is a dynamically generated component that is created when a user creates a new post.
const Post: React.FC<IPostProps> = (props) => {

  return (
    <StyledPost>

      <StyledUserInfo className="user-info">
        <img src="personal image" alt="pfp"></img>
        <div>
          <h3>User's name</h3>
          <p>User's @</p>
          <p>Most active game and timezone</p>
          <p>Time posted</p>
        </div>
      </StyledUserInfo>

      <StyledUserPost className="user-post">
        <p></p>
        {props.media ? <div>load media in here</div> : null}
      </StyledUserPost>

      <StyledPostLikesComments className="post-likes-and-comments">

        <span>Dynamic count of likes</span>
        <span>
          <SOButtons>
            <ButtonHeader>
              Dynamic count of comments,
              when user clicks this it will create display div that shows comments
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

export default Post;