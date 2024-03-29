import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { IHidePostModal, INewPostModal, IPostState } from "../Helpers/interface";
import { palette, resetInputs } from "../Helpers/utils";
import { CircularPicture } from "../Views/Feed";
import { UserContext } from "../Helpers/contexts";
import { uploadImage, writeUserData, getUserDoc, db, downloadImage } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { inputsInit } from "./EditSidebarModal";

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
        
        height: 50%;
        padding: 5px 10px 5px 10px;
        position: relative;
        cursor: pointer;

        :hover {
          background-color: #e6d9d9;
          border-radius: 30px;
        }
      }

      /* Post it button */
      > button:last-of-type {
        text-align: center;
        border-radius: 50px;
        background-color: ${palette.fpink};
        padding: 5px 15px 3px 15px;
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
  visibility: ${props => props.showModal?.newPostModal ? "visible" : "hidden"};
  display: grid;
  position: absolute;
  top: 0;
  justify-self: center;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  min-height: fit-content;
  > .modal-background {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.75);
    z-index: 1;
    }

    input[type=file]::file-selector-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 25px;
    }
`;

export const CustomFileInput = styled.input`
  position: absolute;
  width: 100px;
  opacity: 0;
  right: 2px;
  bottom: 0.5px;
`;

const NewPostModal: React.FC<INewPostModal> = (props: INewPostModal) => {
  const { showModal, stateSetters, profilePicture } = props;
  const { setPostState, postArray, setPostArray, loggedInData, currentUserData, setCurrentUserData } = useContext(UserContext);
  const postState: IPostState = useContext(UserContext).postState;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const imageUploadRef = useRef<HTMLInputElement>(null);
  const videoUploadRef = useRef<HTMLInputElement>(null);

  const hidePostModalHandler = (e?: IHidePostModal['event']) => {
    // Function used to hide PostModal, and allow scrolling. 
    if (showModal && e && e.currentTarget) {
      stateSetters?.setShowModal({
        newPostModal: false,
        editSidebarModal: false
      });
      stateSetters?.setOverflowPost('auto');
    } else if (!e) {
      stateSetters?.setShowModal({
        newPostModal: false,
        editSidebarModal: false
      });
      stateSetters?.setOverflowPost('auto');
    }
  };

  const storeDataToDb = async (postState: IPostState) => {
    // A function used to add user data into firestore db;

    let userPostObjects: IPostState[] = [];
    userPostObjects.push(postState);
    try {
      // Make sure user is authenticated
      if (loggedInData && loggedInData.uid) {
        // If there exists data for the user, reevaluate userPostObjects then update Firestore
        if (currentUserData) {
          const userDocRef = doc(db, "userData", loggedInData.uid);
          userPostObjects = [...userPostObjects, ...currentUserData.posts];
          await updateDoc(userDocRef, {
            posts: userPostObjects
          });
          const updatedData = await getUserDoc(loggedInData.uid);
          setCurrentUserData(updatedData);
          // If no user data, then write some
        } else if (!currentUserData) {
          console.log('no userDocs yet');
          await writeUserData(loggedInData, userPostObjects, inputsInit);
          const data = await getUserDoc(loggedInData.uid);
          setCurrentUserData(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    hidePostModalHandler();
  };

  const newPostBtnHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    if (textAreaRef.current === null || imageUploadRef.current === null || videoUploadRef.current === null) {
      return;
    }
    // Create copy of postState to make changes to
    const postStateCopy = { ...postState };
    postStateCopy['postText'] = textAreaRef.current.value;

    // For the next two if clauses, postImage and postVideo will only update if there are actually files uploaded
    // This is the case because this is when I will save my files to Firebase db.

    if (imageUploadRef.current.files !== null && imageUploadRef.current.files.length > 0 && loggedInData !== undefined) {

      if (loggedInData) {
        await uploadImage(imageUploadRef.current.files[0].name, loggedInData?.uid, imageUploadRef.current.files[0]);
        const imgSrc = URL.createObjectURL(await downloadImage(imageUploadRef.current.files[0].name, loggedInData?.uid));
        postStateCopy['postImage'] = {
          imageURL: imgSrc,
          imageName: imageUploadRef.current.files[0].name
        };
      }
    }

    if (videoUploadRef.current.files !== null && videoUploadRef.current.files.length > 0) {
      const videoSrc = URL.createObjectURL(videoUploadRef.current.files[0]);
      postStateCopy['postVideo'] = videoSrc;
    }

    if (textAreaRef.current.value === '') {
      console.log('no mas');
      alert('Please add some text before posting');
      return;
    };

    const postArrayCopy = [postStateCopy, ...postArray];

    storeDataToDb(postStateCopy);

    // set new states, mainly for creating new posts locally - but this state is integrated into db post collection
    setPostState({ ...postStateCopy });
    setPostArray([...postArrayCopy]);

    // after necessary info is used, reset postState and inputs.
    setPostState({
      postText: '',
      postImage: '',
      postVideo: '',
    });
    resetInputs(textAreaRef, imageUploadRef, videoUploadRef);
    hidePostModalHandler(e);
  };

  return (
    <PostModalContainer showModal={showModal} id="post-modal-container" >
      <div className="modal-background" onClick={(e) => { hidePostModalHandler(e); }}></div>
      <PostModal >
        <div>
          <div>Create a Post
            <button aria-label="Close modal" onClick={(e) => { hidePostModalHandler(e); }}>X</button>
          </div>
          <form id="new-post-form" onSubmit={(e) => {
            e.preventDefault();
            newPostBtnHandler(e);
          }}>
            <div>
              <div>
                <CircularPicture zIndex="0" position="sticky" imgSrc={profilePicture ? profilePicture.current : ''} height="50px" width="50px" />
                <span>{currentUserData ? currentUserData.displayName : ''}</span>
              </div>
              <textarea placeholder="What would you like to talk about?" ref={textAreaRef} ></textarea>
              <div>
                <button type="button"><CustomFileInput ref={imageUploadRef} accept=".png, .jpg, .jpeg, .svg" type="file"></CustomFileInput>Add Image</button>
                <button type="button"><CustomFileInput ref={videoUploadRef} accept=".mp4" type="file"></CustomFileInput>Add Video</button>
                <button type="submit" form="new-post-form" >Post It!</button>
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