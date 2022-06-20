import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IHidePostModal, INewPostModal } from "../Helpers/interface";
import { palette } from "../Helpers/utils";
import { CircularPicture } from "../Views/Feed";
import testpfp2 from "../Styles/assets/testpfp2.jpg";
const PostModal = styled.div`
  display: grid;
  position: absolute;
  background-color: ${palette.fwhite};
  @media screen and (max-height: 460px) 
  { top: 30px;
    height: fit-content;
    width: fit-content;
  }
  top: max(100px, calc(10%));
  z-index: 1;
  height: max(calc(20% + 200px), fit-content);
  width: min(500px, 100%);
  border-radius: 8px;

  /* Create a post text div */
  > div > div {
    display: grid;
    grid-template-columns: 1fr auto;
    text-align: start;
    padding: 10px 10px 10px 15px;
    font-size: clamp(16px, 3vh, 24px);
    border-bottom: 1px solid #8a83833f;
    align-items: start;
    > button {
      background: none;
      border: none;
      align-self: start;
      padding: 0;
      border-radius: 50%;
      font-family: ostrichSans;
      color: black;
    }
  }

  /* Post content container */
  > div > form > div {
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;

    /* pfp and span container */
    > div:first-of-type {
      display: grid;
      grid-template-columns: 0.2fr auto;
      justify-items: center;
      align-items: center;
      padding: 10px 0 10px 5px;

      > span {
        justify-self: start;
        font-size: clamp(18px, 2.2vh, 22px);
        font-weight: 900;
      }
    }
    /* button container */
    > div:last-of-type {
      display: grid;
      grid-auto-flow: column;
      justify-items: center;
      align-items: center;
      border-top: 1px solid #8a83833f;

      > button {
        background: none;
        border: none;
        font-size: clamp(16px, 2vh, 22px);
        padding: 5px 15px 3px 15px;
        height: 50%;
      }

      /* Post it button */
      > button:last-of-type {
        text-align: center;
        border-radius: 50px;
        background-color: ${palette.fpink};

        
      }
    }

    > textarea {
      border: none;
      padding: 10px;
      margin: 0 12px 0 12px;
      background-color: ${palette.fwhite};
      overflow: auto;
      outline: none;
      resize: none;
      box-shadow: none;

      font-size: clamp(18px, 2.2vh, 22px);
      color: black;
    }

  }


`;

const PostModalContainer = styled.div<INewPostModal>`
  visibility: ${props => props.showModal ? "visible" : "hidden"};
  display: grid;
  position: absolute;
  top: 0;
  /* background-color: blue; */
  justify-self: center;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  min-height: fit-content;
  > div[data-modal-background] {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.75);
    z-index: 1;
    }
`;


const NewPostModal: React.FC<INewPostModal> = (props: INewPostModal) => {
  const { newPostImage, newPostText, newPostVideo, showModal, stateSetters } = props;
  // Function used to hide PostModal, and allow scrolling. 
  const hidePostModalHandler = (e: IHidePostModal['event']) => {
    if (showModal && e.currentTarget) {
      stateSetters?.setShowModal(false);
      stateSetters?.setOverflowPost('auto');
    }
  };

  return (
    // Will be the PostModal's background (greyed out / a bit blurry)
    <PostModalContainer showModal={showModal} id="post-modal-container" >
      <div data-modal-background onClick={(e) => { hidePostModalHandler(e); }}></div>
      <PostModal >
        <div>
          {/* div on top of form area */}
          <div>Create a Post
            <button onClick={(e) => { hidePostModalHandler(e); }}>X</button>
          </div>
          <form id="new-post-form" onSubmit={(e) => { e.preventDefault(); }}>
            <div>
              <div>
                <CircularPicture zIndex="0" position="sticky" imgSrc={testpfp2} height="50px" width="50px" />
                <span>Robert Kugler</span>
              </div>
              <textarea placeholder="What would you like to talk about?"></textarea>
              <div>
                <button type="button">Add Image</button>
                <button type="button">Add Video</button>
                <button type="submit" form="new-post-form">Post It!</button>
              </div>
            </div>
          </form>
        </div>
        <div></div>
      </PostModal>
    </PostModalContainer>
  );
};

export default NewPostModal;