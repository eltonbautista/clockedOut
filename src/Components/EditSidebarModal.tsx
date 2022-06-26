import React from "react";
import styled from "styled-components";
import { IHidePostModal, ISidebarModal } from "../Helpers/interface";
import { palette } from "../Helpers/utils";
import LPInputDiv from "./Forms";

const ModalContainer = styled.div<ISidebarModal>`
  /* visibility: ${props => props.showModal ? "visible" : "hidden"}; */
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

  > div > button {
    background: none;
    border: none;
  }

  > form > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
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

  const hidePostModalHandler = (e: IHidePostModal['event']) => {
    if (showModal && e.currentTarget) {
      stateSetters?.setShowModal(false);
      stateSetters?.setOverflowPost('auto');
    }
  };

  return (
    <ModalContainer>
      <ModalBackground></ModalBackground>
      <Modal>
        <div>Create a Post
          <button onClick={(e) => { hidePostModalHandler(e); }}>X</button>
        </div>
        <form>
          <div>
            <LPInputDiv hContent="Game One" ></LPInputDiv>
            <LPInputDiv hContent="IGN Game One"></LPInputDiv>
            <LPInputDiv hContent="Game Two"></LPInputDiv>
            <LPInputDiv hContent="IGN Game Two"></LPInputDiv>
            <LPInputDiv hContent="Link One"></LPInputDiv>
            <LPInputDiv hContent="Link Two"></LPInputDiv>
            <LPInputDiv hContent="Link Three"></LPInputDiv>
            <LPInputDiv hContent="Link Four"></LPInputDiv>
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