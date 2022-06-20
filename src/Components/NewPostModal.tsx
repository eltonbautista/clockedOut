import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { INewPostModal } from "../Helpers/interface";
import { CircularPicture } from "../Views/Feed";

const PostModal = styled.div`
  display: grid;
  position: absolute;
  background-color: aliceblue;
  margin-bottom: 400px;
  z-index: 2;
`;

const PostModalContainer = styled.div<INewPostModal>`
  visibility: ${props => props.showModal ? "visible" : "hidden"};
  display: grid;
  position: absolute;
  /* background-color: blue; */
  justify-self: center;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  > div[data-modal-background] {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.75);
    z-index: 1;
    }
`;


const NewPostModal: React.FC<INewPostModal> = (props: INewPostModal) => {
  const { newPostImage, newPostText, newPostVideo, showModal, stateSetters } = props;


  return (
    // Will be the PostModal's background (greyed out / a bit blurry)
    <PostModalContainer showModal={showModal} id="post-modal-container" >
      <div data-modal-background onClick={(e) => {
        if (showModal && e.currentTarget) {
          stateSetters?.setShowModal(false);
          stateSetters?.setOverflowPost('auto');
        }
      }}></div>
      <PostModal >
        <div>
          {/* div on top of form area */}
          <div>Create a Post</div>
          <form id="new-post-form" onSubmit={(e) => { e.preventDefault(); }}>
            <div>
              <div>This is going to be the user's profile and picture
                <CircularPicture></CircularPicture>
                <span>Robert Kugler</span>
              </div>
              <textarea></textarea>
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