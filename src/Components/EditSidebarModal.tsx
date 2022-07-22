import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { currentUserInfo, db, getUserDoc, storage, updateProfileDetails, writeUserData } from "../firebase-config";
import { UserContext } from "../Helpers/contexts";
import { IHidePostModal, ISideBarInfo, ISidebarModal } from "../Helpers/interface";
import { palette } from "../Helpers/utils";
import LPInputDiv from "./Forms";
import { CustomFileInput } from "./NewPostModal";

const ModalContainer = styled.div<ISidebarModal>`
  visibility: ${props => props.showModal?.editSidebarModal ? "visible" : "hidden"};
  display: grid;
  position: absolute;
  top: 0;
  justify-self: center;
  width: 100%;
  height: 100vh;
  justify-items: center;
  align-items: center;
  min-height: fit-content;
`;
const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.75);
  z-index: 1;
`;

const Modal = styled.div`
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


  > div {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 10px;
  }

  > div.header-div > button {
    background: none;
    border: none;
    position: absolute;
    justify-self: end;
    right: 5px;
    top: 5px;
  }

  > div:last-of-type > button {
    background: none;
    border: none;
  }

  > form > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
  }

    
  .top-div {
    display: grid;
    grid-template-areas: 
    "one two"
    "three three";
    button {
      position: relative;
      background: none;
      border: none;
      height: 60%;
      align-self: end;
      cursor: default;
      :hover {
        border: 2px solid ${palette.red};
        border-radius: 25px;
        background-color: ${palette.fpink};
      }
    > input {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
    }
    }
    > div:nth-child(1) {
      grid-area: one;
    }
    > div:nth-child(2) {
      grid-area: two;
    }
    >div:nth-child(3) {
      grid-area: three;
      display: grid;
    }
  }
  
`;

const DefaultModal: React.FC<ISidebarModal> = (props: ISidebarModal) => {
  const { showModal, stateSetters } = props;


  return (
    <ModalContainer>
      <ModalBackground></ModalBackground>
      <Modal>
        <div>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export const inputsInit: ISideBarInfo = {
  sidebarInfo: {
    personalBio: '',
    games: {
      gameOne: '',
      userOne: '',
      gameTwo: '',
      userTwo: '',
    },
    links: {
      linkOne: '',
      linkTwo: '',
      linkDisplayOne: '',
      linkDisplayTwo: '',
    },
  },
  userInfo: {
    displayName: '',
    photoURL: '',
  }
};


const EditSidebarModal: React.FC<ISidebarModal> = (props: ISidebarModal) => {
  const { showModal, stateSetters } = props;
  const { loggedInData, postArray, currentUserData, setCurrentUserData } = useContext(UserContext);
  const [editProfileInputs, setEditProfileInputs] = useState<ISideBarInfo>(inputsInit);
  const profilePictureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    if (loggedInData && currentUserData) {
      const { personalBio } = currentUserData.sidebar.sidebarInfo;
      const { displayName, photoURL } = currentUserData.sidebar.userInfo;
      const { gameOne, userOne, gameTwo, userTwo } = currentUserData.sidebar.sidebarInfo.games;
      const { linkDisplayOne, linkOne, linkDisplayTwo, linkTwo } = currentUserData.sidebar.sidebarInfo.links;

      const inputData = {
        sidebarInfo: {
          personalBio,
          games: {
            gameOne,
            userOne,
            gameTwo,
            userTwo,
          },
          links: {
            linkOne,
            linkTwo,
            linkDisplayOne,
            linkDisplayTwo,
          },
        },
        userInfo: {
          displayName,
          photoURL,
        }
      };

      setEditProfileInputs({ ...inputData });
    }
  }, [currentUserData, loggedInData]);

  const hidePostModalHandler = (e: IHidePostModal['event']) => {
    if (showModal && e.currentTarget) {
      stateSetters?.setShowModal({
        newPostModal: false,
        editSidebarModal: false
      });
      stateSetters?.setOverflowPost('auto');
    }
  };

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, inputFamily: string, inputName: string, inputSubFamily?: string) => {
    const newObj = { ...editProfileInputs };
    if (inputSubFamily) {
      newObj[inputFamily][inputSubFamily][inputName] = e.currentTarget.value;
      setEditProfileInputs({ ...newObj });
    } else if (!inputSubFamily) {
      newObj[inputFamily][inputName] = e.currentTarget.value;
      setEditProfileInputs({ ...newObj });
    }

  };

  const editProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loggedInData) {

      const userDocRef = doc(db, "userData", loggedInData.uid);
      const { userInfo, sidebarInfo } = editProfileInputs;
      const sidebarObj = {
        sidebarInfo,
        userInfo
      };
      // If there's no user data, then write one
      if (!currentUserData) {
        await writeUserData(loggedInData, [], sidebarObj);
      }
      // Logic for adding updating user data
      if (profilePictureRef.current && profilePictureRef.current.files !== null) {
        updateProfileDetails(loggedInData, profilePictureRef.current.files[0].name, userInfo.displayName);
        const profilePicturePath = loggedInData.uid + "/photoURL/" + profilePictureRef.current.files[0].name;
        await uploadBytes(ref(storage, profilePicturePath), profilePictureRef.current.files[0]);

        await updateDoc(userDocRef, {
          displayName: userInfo.displayName,
          sidebar: sidebarObj,
          profilePicture: loggedInData.uid + "/photoURL/" + profilePictureRef.current.files[0].name
        });
        const updatedData = await getUserDoc(loggedInData.uid);
        setCurrentUserData(updatedData);
      } else if (profilePictureRef.current === undefined || !profilePictureRef) {
        updateProfileDetails(loggedInData, userInfo.photoURL, userInfo.displayName);

        await updateDoc(userDocRef, {
          displayName: editProfileInputs.userInfo.displayName,
          sidebar: sidebarObj
        });
        const updatedData = await getUserDoc(loggedInData.uid);
        setCurrentUserData(updatedData);
      }

    }

  };

  const { personalBio } = editProfileInputs.sidebarInfo;
  const { displayName, photoURL } = editProfileInputs.userInfo;
  const { gameOne, userOne, gameTwo, userTwo } = editProfileInputs.sidebarInfo.games;
  const { linkDisplayOne, linkOne, linkDisplayTwo, linkTwo } = editProfileInputs.sidebarInfo.links;

  return (
    <ModalContainer showModal={showModal} >
      <ModalBackground onClick={(e) => { hidePostModalHandler(e); }} ></ModalBackground>
      <Modal>
        <div className="edit-profile header-div">
          <h3>Edit Profile</h3>
          <button onClick={(e) => { hidePostModalHandler(e); }} aria-label="Close modal">X</button>
        </div>
        <form id="edit-profile-form" onSubmit={((e) => {
          editProfileHandler(e);
        })}>
          <div className="edit-profile top-div">
            <LPInputDiv inputVal={displayName ? displayName : ''} inputHandler={(e) => {
              handleInputs(e, "userInfo", "displayName");
            }} hContent="Display Name"></LPInputDiv>
            <button type="button"><CustomFileInput ref={profilePictureRef} accept=".png, .jpg, .jpeg, .svg" type="file"></CustomFileInput>Change Profile Picture</button>
            <div>
              Bio
              <textarea value={personalBio} onChange={(e) => {
                handleInputs(e, "sidebarInfo", "personalBio");
              }}></textarea>
            </div>
          </div>
          <div>
            <LPInputDiv inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "gameOne", "games");
            }} hContent="Game One" inputVal={gameOne ? gameOne : ''} ></LPInputDiv>
            <LPInputDiv inputVal={userOne ? userOne : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "userOne", "games");
            }} hContent="IGN Game One"></LPInputDiv>
            <LPInputDiv inputVal={gameTwo ? gameTwo : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "gameTwo", "games");
            }} hContent="Game Two"></LPInputDiv>
            <LPInputDiv inputVal={userTwo ? userTwo : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "userTwo", "games");
            }} hContent="IGN Game Two"></LPInputDiv>


            <LPInputDiv inputVal={linkOne ? linkOne : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "linkOne", "links");
            }} hContent="Link Displayed Text One"></LPInputDiv>
            <LPInputDiv inputVal={linkTwo ? linkTwo : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "linkTwo", "links");
            }} hContent="Link Displayed Two"></LPInputDiv>
            <LPInputDiv inputVal={linkDisplayOne ? linkDisplayOne : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "linkDisplayOne", "links");
            }} hContent="Link One"></LPInputDiv>
            <LPInputDiv inputVal={linkDisplayTwo ? linkDisplayTwo : ''} inputHandler={(e) => {
              handleInputs(e, "sidebarInfo", "linkDisplayTwo", "links");
            }} hContent="Link Two"></LPInputDiv>
          </div>


        </form>
        <div>
          <button type="submit" form="edit-profile-form">Submit Changes</button>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export { DefaultModal };
export default EditSidebarModal;