import React, { useContext, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { IPostProps } from "../Helpers/interface";
import { ButtonHeader, SOButtons } from "./Buttons";
import { CircularPicture } from "../Views/Feed";
import testpfp2 from "../Styles/assets/testpfp2.jpg";
import { palette } from "../Helpers/utils";
import { UserContext } from "../Helpers/contexts";
import cat from "../Styles/assets/cat.png";
import { doc, updateDoc } from "firebase/firestore";
import { ref } from "firebase/database";
import { db, getUserDoc } from "../firebase-config";

interface ILikeButton {
  liked: boolean;
}

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
  padding: 15px 10px 5px;
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

  > span, div {
    width: 100px;
  }

  button {
    width: 100px;
    background-color: ${palette.fpink};
  }
`;
const StyledLCS = styled.div<ILikeButton>`
  grid-auto-flow: column;
  * {
    font-size: clamp(13px, 2vh, 16px);
    text-decoration: none;
    :hover {
      text-decoration: none;
      color: ${palette.black}
    }
  }
  > button {
    background-color: ${palette.fpink};
    width: 100px;
    :active {
      box-shadow: none;
      border: none;
    }
    :focus {
      border: none;
      box-shadow: none;
    }
  }
  .like-button {
    text-decoration: none;
    color: ${props => props.liked ? "blue" : `${palette.black}`};
  }
  
`;

// Post is a dynamically generated component that is created when a user creates a new post.
const Post: React.FC<IPostProps> = (props) => {
  const { pfp, video, img, postPosition } = props;
  const { loggedInData, currentUserData, postArray, setPostArray, setCurrentUserData } = useContext(UserContext);
  // Used to determine if like button should add a like or deduct a like.
  const liked = useRef<boolean>(false);
  // By using a ref value of my async data, which is retrieved when the view loads. I can use its value quickly.
  const instantLike = useRef(postArray[postPosition].postLikes);

  const likeButtonHandler = async (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    // Create a copy as to not mutate state
    const copiedPostArray = [...postArray];
    if (postPosition !== undefined && postPosition >= 0 && loggedInData) {
      // Reference db to rewrite
      const userDocRef = doc(db, "userData", loggedInData.uid);
      const copyPostObj = { ...postArray[postPosition] };

      // Mutate copiedPostObj's postLikes property 
      if (copyPostObj.postLikes !== undefined) {
        if (liked.current === false) {
          copyPostObj.postLikes += 1;
        } else if (liked.current === true) {
          copyPostObj.postLikes -= 1;
        }
        // update value of instantLike.current
        instantLike.current = copyPostObj.postLikes;
        // update liked value, this is to determine if a post component has been liked or not
        liked.current = !liked.current;
        // Make sure to replace old index with "new" index to reduce bugs
        copiedPostArray[postPosition] = copyPostObj;
        // immutably setPostArray with same data, only change is from the post's like property 
        setPostArray([...copiedPostArray]);

        // update user documents
        await updateDoc(userDocRef, {
          posts: copiedPostArray,
        });
        // immediately grab the updated data and setCurrentUserData so that db flow is correct
        const updatedData = await getUserDoc(loggedInData.uid);
        setCurrentUserData(updatedData);
      }
    }

  };

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
        <span>Likes: {currentUserData && currentUserData.posts ? instantLike.current : 0}</span>
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
          <p>overflow: ellipses</p>
        </div>
      </StyledPostLikesComments>

      <StyledLCS liked={liked.current} className="like-comment-share">

        <SOButtons>
          <ButtonHeader className="like-button" onClick={(e) => {
            likeButtonHandler(e);
          }}>
            {liked.current ? "Unlike" : "Like"}
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