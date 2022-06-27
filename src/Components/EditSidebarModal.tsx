import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import styled from "styled-components";
import UserContextProvider from "../Contexts/UserContext";
import { db, updateProfileDetails } from "../firebase-config";
import { UserContext } from "../Helpers/contexts";
import { IHidePostModal, ISidebarModal } from "../Helpers/interface";
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
    /* background-color: blue; */
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


const EditSidebarModal: React.FC<ISidebarModal> = (props: ISidebarModal) => {
  const { showModal, stateSetters } = props;
  const { loggedInData } = useContext(UserContext);

  const hidePostModalHandler = (e: IHidePostModal['event']) => {
    if (showModal && e.currentTarget) {
      stateSetters?.setShowModal({
        newPostModal: false,
        editSidebarModal: false
      });
      stateSetters?.setOverflowPost('auto');
    }
  };

  const editProfileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const userDocRef = doc(db, "userData", loggedInData!.uid);
    console.log(e);
    // updateProfileDetails()
    // await updateDoc(userDocRef, {
    //   // sidebar: 
    // });
  };

  return (
    <ModalContainer showModal={showModal} >
      <ModalBackground onClick={(e) => { hidePostModalHandler(e); }} ></ModalBackground>
      <Modal>
        <div className="edit-profile header-div">
          <h3>Edit Profile</h3>
          <button onClick={(e) => { hidePostModalHandler(e); }}>X</button>
        </div>
        <form onSubmit={((e) => {
          editProfileHandler(e);
        })}>
          <div className="edit-profile top-div">
            <LPInputDiv hContent="Display Name"></LPInputDiv>
            <button type="button"><CustomFileInput accept=".png, .jpg, .jpeg, .svg" type="file"></CustomFileInput>Change Profile Picture</button>            {/* <LPInputDiv hContent="Bio"></LPInputDiv> */}
            <div>
              Bio
              <textarea></textarea>
            </div>
          </div>
          <div>
            <LPInputDiv hContent="Game One" ></LPInputDiv>
            <LPInputDiv hContent="IGN Game One"></LPInputDiv>
            <LPInputDiv hContent="Game Two"></LPInputDiv>
            <LPInputDiv hContent="IGN Game Two"></LPInputDiv>
            <LPInputDiv hContent="Link One"></LPInputDiv>
            <LPInputDiv hContent="Link Two"></LPInputDiv>
            <LPInputDiv hContent="Link Displayed Text One"></LPInputDiv>
            <LPInputDiv hContent="Link Displayed Text Two"></LPInputDiv>
          </div>
        </form>
        <div>
          <button>Submit Changes</button>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export { DefaultModal };
export default EditSidebarModal;