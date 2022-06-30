import React, { useEffect, useState, useContext, ReactNode, useRef } from "react";
import styled from "styled-components";
import { IFeedProps, ICircularPictureProps, IBackgroundCanvas, IPostState, IModalControl, } from "../Helpers/interface";
import { SOButtons, ButtonHeader } from "../Components/Buttons";
// import testpfp from "../Styles/assets/testpfp.jpeg";
import { palette } from "../Helpers/utils";
import NewPostModal from "../Components/NewPostModal";
import { UserContext } from "../Helpers/contexts";
import Post from "../Components/Post";
import { downloadImage, getUserDoc, storage } from "../firebase-config";
import { getBlob, ref } from "firebase/storage";
import EditSidebarModal from "../Components/EditSidebarModal";

const StyledFeed = styled.div`
  display: grid;
  min-height: 100%;
  background-color: ${palette.fwhite};
  text-align: center;
  * {
    font-family: jostLight, Arial, Helvetica, sans-serif;
    font-weight: 300;
    letter-spacing: 0.3px;
    color: ${palette.black};
    text-decoration: none;
  }

`;

const StyledScaffoldContainer = styled.div`
  display: grid;
  grid-template-areas: "sidebar main aside";
  grid-template-columns: 0.2fr 0.5fr 0.25fr;
  max-width: 70.5%;
  min-width: 50%;
  justify-self: center;
  justify-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 30px;

`;

const StyledMain = styled.main`
  display: grid;
  grid-template-rows: 0.1fr auto;
  grid-area: main;
  border-radius: 8px;
  background-color: ${palette.fwhite};
  gap: 15px;
  min-height: 100vh;
  
`;

const StyledSharebox = styled.div`
  display: grid;
  border: 1px solid rgb(205, 199, 199);
  height: max(130px, 13vh);
  border-radius: 8px;
  background-color: ${palette.fpink};
  > div {
    display: grid;
    grid-template-columns: 0.1fr auto;
    justify-items: center;
    align-items: center;
    padding-left: 10px;
  }

  > div:first-of-type {
    border-bottom: 1px solid ${palette.red};
    margin-bottom: 10px;
  }

  > div:first-of-type > button {
    width: 80%;
    justify-self: start;
    margin-left: 10px;
    border: 1px solid ${palette.black};
    box-shadow: none;
    background-color: ${palette.fwhite};
    padding-left: 20px;

    color: ${palette.black};
    text-align: start;
  }


`;

const StyledFeedContent = styled.div`
  display: grid;
  background-color: ${palette.fwhite};
  border: 1px solid ${palette.fwhite};
  border-radius: 8px;
  gap: 10px;
`;

const StyledAside = styled.aside`
  display: grid;
  position: relative;
  grid-template-rows: 0.2fr 0.5fr;
  grid-area: aside;
  background-color: ${palette.fpink};
  border-radius: 8px;
  transform: translateX(15px);
  min-height: min(50%, 800px);
  gap: 10px;
  background-color: ${palette.fwhite};

  > div:first-of-type {
    background-color: ${palette.fpink};
    height: calc(100%);
    display: grid;
    grid-template-rows: 0.2fr auto;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid rgb(205, 199, 199);

    > p {
      line-height: 160%;
      align-self: center;
    }
  }

  > div:last-of-type {
    display: grid;
    position: sticky;
    height: fit-content;
    top: 0;
    justify-content: center;
    align-content: start;
    background-color: ${palette.fwhite};
  }

  .aside-links {
    display: grid;
    max-width: 300px;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    grid-template-rows: repeat(3, 1fr);
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      color: rgb(169, 159, 159);
      width: 90px;
      padding: 0;
      margin: 0;
      height: fit-content;
      align-self: center;
    }
  }

  button {
    color: ${palette.purple};
    width: 50%;
  }

`;

const StyledSidebar = styled.div`
  display: grid;
  grid-area: sidebar;
  grid-template-rows: 0.22fr 0.7fr;
  width: 90%;
  gap: 10px;

  > div {
    border-radius: 8px;
  }

  > div:first-of-type {
    display: grid;
    justify-items: center;
    gap: 10px;
    position: relative;
    grid-template-rows: 0.35fr 0.1fr 0.5fr;
    background-color: ${palette.fpink};
    border: 1px solid rgb(205, 199, 199);
  }



  > div:first-of-type > div:nth-child(3) {
    position: relative;
    display: grid;
    width: 100%;
    justify-items: center;
    padding: 0 10px 0 10px;
    border-bottom: 1px solid ${palette.red};
    padding-bottom: 5px;
  }

  > div:first-of-type > div:nth-child(3) > a {
    color: ${palette.black};
    letter-spacing: 0.3px;
    text-decoration: none;
    width: min(100%, 125px);
    justify-self: center;
    font-size: clamp(16px, 2vh, 20px);
  }

  ul {
    display: grid;
    align-items: center;
    list-style: none;
    justify-items: center;
    padding: 0 5px 0 5px;
    font-size: clamp(15px, 2.1vh, 17px);
    width: 100%;
    gap: 30px;
    grid-template-rows: 0.3fr 0.3fr 0.8fr;
    padding-top: 10px;
    height: 100%;
  }

  ul a {
    text-decoration: none;
  }

  ul > div {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    justify-content: space-evenly;
    align-items: end;
    gap: 20px;
    /* transform: translateY(20px); */
  }

  ul > div > li > a{
    text-overflow: ellipsis;
  }

  > div:last-of-type {
    display: grid;
    height: 10%;
    position: sticky;
    top: 15px;
    align-items: center;
    background-color: ${palette.fpink};
    border: 1px solid rgb(205, 199, 199);
  }

  > div:last-of-type > div {
    display: grid;
    width: 100%;
    justify-items: center;
    align-content: center;
    height: 100%;
  }

  > div:last-of-type > div > button {
    width: 100%;
  }

  > div:last-of-type > div > button > h5 {
    font-size: clamp(23px, 2vh, 26px);
    font-weight: 900;
    width: 100%;
  }

  > div:last-of-type > div:first-of-type {
    border-bottom: 1px solid ${palette.red};
  }

`;

const StyledSidebarEditBtn = styled.button`
  position: sticky;
  text-align: end;
  
  padding: 0;
  width: 100%;
  color: ${palette.fpink};
  background: none;
  border: none;

  > a {
    color: ${palette.fpink};
    width: 100%;
    display: block;
    padding: 2% 5% 0 0;
  }
`;

const StyledCircularDiv = styled.div<ICircularPictureProps>`
z-index: ${props => props.zIndex};
width: ${props => props.width};
height: ${props => props.height};
overflow: hidden;
justify-items: center;
position: ${props => props.position};
margin-top: ${props => props.marginTop};
border-radius: 50%;

`;

export const CircularPicture: React.FC<ICircularPictureProps> = (props) => {
  const { height, width, marginTop, zIndex, imgSrc, } = props;

  return (
    <StyledCircularDiv width={width} height={height} marginTop={marginTop} zIndex={zIndex}>
      <img src={imgSrc} alt="pfp" ></img>
    </StyledCircularDiv>
  );
};

const BackgroundCanvas = styled.div<IBackgroundCanvas>`
  ${props => props.sidebar ?
    `width: 100%; 
    height: 75px; 
    background-color: #000000cd; 
    position: absolute;
    border-radius: 8px 8px 0 0;
    ` :

    `width: ${props.width};
    height: ${props.height};
    background-color: ${props.backgroundColor};
    position: absolute;` }
`;
interface IStyledSidebarP {
  clicked?: boolean;
};

const StyledSidebarP = styled.p<IStyledSidebarP>`
  color: ${palette.black};
  font-weight: 100;
  font-size: clamp(14px, 2vh, 16px);
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  justify-self: center;

  :hover {
    cursor: pointer;
  }

  ${props => props.clicked ?
    `white-space: normal;

  text-overflow: clip;
  overflow: visible;
  height: fit-content;
  top: 100%;
  width: 100%;
  background-color: ${palette.fpink};
  // font-weight: 600
  ` : null}
`;

const mapList = (arrayToMap: IPostState[] | undefined, pfp?: string) => {
  if (!arrayToMap) {
    return;
  }
  if (arrayToMap.length > 0) {
    return arrayToMap.map((postObj: IPostState, index) => {
      return (
        <Post key={index} pfp={pfp} video={postObj['postVideo']} img={postObj['postImage']?.imageURL} text={postObj['postText']} />
      );
    });
  }
  return;
};

function testPreload(images: string[]) {
  const fillArr: HTMLImageElement[] = [];
  for (let i = 0; i < images.length; i += 1) {
    fillArr[i] = new Image();
    fillArr[i].src = images[i];
  }
  return fillArr;
};


const Feed: React.FC<IFeedProps> = () => {
  // VARIABLES, STATES & CONTEXT: 

  const [personalBio, setPersonalBio] = useState<boolean | undefined>(false);
  const [overflowPost, setOverflowPost] = useState<'auto' | 'hidden'>('auto');
  const [showModal, setShowModal] = useState<IModalControl>({
    newPostModal: false,
    editSidebarModal: false
  });
  const { postArray, loggedInData, artificialLoader, currentUserData, setCurrentUserData } = useContext(UserContext);
  const [asyncPostLoad, setAsyncPostLoad] = useState<ReactNode[] | undefined>();
  const [userPostImages, setUserPostImages] = useState<any>([]);
  const profilePictureRef = useRef('');
  // HOOKS:

  useEffect(() => {

    const asynCaller = async () => {
      // When user logs in, create a call to Firestore and retrieve user's data
      if (loggedInData && !currentUserData) {
        const data = await getUserDoc(loggedInData.uid);
        setCurrentUserData(data);
      }
      // Call for user's profile picture, process through preload to improve rendering performance
      if (loggedInData && loggedInData.photoURL && currentUserData) {
        const myPFP = URL.createObjectURL(await getBlob(ref(storage, currentUserData.profilePicture)));
        profilePictureRef.current = testPreload([myPFP])[0].src;
      }
    };
    asynCaller();
  }, [currentUserData, loggedInData, setCurrentUserData]);

  useEffect(() => {
    async function fetchPosts() {
      const objectArr: IPostState[] = [];
      const imageArray: any = [];

      try {
        if (postArray.length > 0 && loggedInData && currentUserData && currentUserData.posts.length > 0) {
          for await (const post of postArray) {
            if (post.postImage.imageName && post.postImage.imageName !== '') {
              imageArray.push(URL.createObjectURL(await downloadImage(post.postImage.imageName, loggedInData?.uid)));
            } else {
              imageArray.push('');
            }
          }
        }

        const preloadedImages = testPreload(imageArray);
        // Recreates my post objects so that imageURL is referencing the downloaded db images
        if (loggedInData && preloadedImages?.length > 0) {
          for (let i = 0; i < postArray.length; i++) {
            objectArr.push(
              {
                postText: postArray[i].postText,
                postImage: {
                  imageName: postArray[i].postImage.imageName,
                  imageURL: postArray[i].postImage.imageName !== '' && postArray[i].postImage.imageName ? preloadedImages[i].src : ''
                },
                postVideo: postArray[i].postVideo
              }
            );
          }
        }
        // Create mapped list of components
        const componentList = mapList(objectArr, profilePictureRef.current);
        if ((asyncPostLoad === undefined && postArray) || (postArray && asyncPostLoad!.length < postArray.length)) {
          // Create posts
          setAsyncPostLoad(componentList);
        }
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, [asyncPostLoad, currentUserData, loggedInData, postArray, setCurrentUserData]);

  // Used to change body overflow attribute
  useEffect(() => {
    document.body.style.overflow = overflowPost;
  }, [overflowPost]);

  if ((postArray.length > 0 && !asyncPostLoad)) {
    return <div>Loading assets...</div>;
  }

  if (artificialLoader < 1 || userPostImages === undefined) {
    return <div>Loading assets...</div>;
  }

  return (
    <StyledFeed id="feed-container" >
      <NewPostModal showModal={showModal} profilePicture={profilePictureRef} stateSetters={{ setOverflowPost, setShowModal }}></NewPostModal>
      <EditSidebarModal showModal={showModal} stateSetters={{ setOverflowPost, setShowModal }} />
      <StyledScaffoldContainer>

        <StyledSidebar id="feed-sidebar">

          <div className="feed-sidebar-upper">

            <BackgroundCanvas sidebar>
              <StyledSidebarEditBtn onClick={() => {
                setShowModal({
                  newPostModal: false,
                  editSidebarModal: true
                });
                setOverflowPost('hidden');
              }}><a href="#header">Edit Profile</a></StyledSidebarEditBtn>
            </BackgroundCanvas>

            <CircularPicture zIndex="0" marginTop="15%" imgSrc={profilePictureRef.current ? profilePictureRef.current : ''} height="85px" width="85px" />
            <div>
              <a target="_blank" rel="noreferrer" href={currentUserData ? currentUserData.sidebar.sidebarInfo.links.linkDisplayTwo : ' '}>{loggedInData?.displayName}</a>
              <StyledSidebarP clicked={personalBio} onClick={() => setPersonalBio(prevState => {
                return !prevState;
              })} >
                {currentUserData ? currentUserData.sidebar.sidebarInfo.personalBio : ''}
              </StyledSidebarP>
            </div>
            <ul>
              {/* These <li> will be dynamically generated depending on how many users want - up to 3 */}
              {/* allow users to add links and I can add the corresponding icons */}
              <li>
                <span>{currentUserData ? currentUserData.sidebar.sidebarInfo.games.gameOne : ' '}</span> ||{' '}
                <span>{currentUserData ? currentUserData.sidebar.sidebarInfo.games.userOne : ' '}</span>
              </li>
              <li>
                <span>{currentUserData ? currentUserData.sidebar.sidebarInfo.games.gameTwo : ' '}</span> ||{' '}
                <span>{currentUserData ? currentUserData.sidebar.sidebarInfo.games.userTwo : ' '}</span>
              </li>
              <div>
                <li><a target="_blank" rel="noreferrer" href={currentUserData ? currentUserData.sidebar.sidebarInfo.links.linkDisplayOne : ' '} >{currentUserData ? currentUserData.sidebar.sidebarInfo.links.linkOne : ' '}</a></li>
                <li><a target="_blank" rel="noreferrer" href={currentUserData ? currentUserData.sidebar.sidebarInfo.links.linkDisplayTwo : ' '} >{currentUserData ? currentUserData.sidebar.sidebarInfo.links.linkTwo : ' '}</a></li>
              </div>
            </ul>
          </div>

          <div className="feed-sidebar-lower">
            <div>
              {/* TODO: Links to Fireteam and Discover Pages */}
              <SOButtons type="button" noStyle={true}>
                <ButtonHeader>
                  Fireteam
                </ButtonHeader>
              </SOButtons>
            </div>
            <div>
              <SOButtons type="button" noStyle={true}>
                <ButtonHeader>
                  Discover
                </ButtonHeader>
              </SOButtons>
            </div>
          </div>

        </StyledSidebar>

        <StyledMain id="feed-main">
          <StyledSharebox id="feed-sharebox">

            <div>
              <CircularPicture zIndex="0" position="sticky" imgSrc={profilePictureRef.current ? profilePictureRef.current : ''} height="60px" width="60px" />
              {/* IMPORTANT: When user clicks this button it will create a <Post /> inside of the {children} prop in <StyledFeedContent id="feed-social-content"> */}
              <SOButtons onClick={() => {
                setShowModal({
                  newPostModal: true,
                  editSidebarModal: false
                });
                setOverflowPost('hidden');
              }}>
                <a href="#header">Write a Post</a>
              </SOButtons>
            </div>
            <div>
            </div>
          </StyledSharebox>

          <StyledFeedContent id="feed-social-content">
            {asyncPostLoad}
          </StyledFeedContent>
        </StyledMain>

        <StyledAside id="feed-aside">
          {/* Some links, news, fake ads, etc. */}
          <div>
            PLACEHOLDER
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias libero, voluptates eveniet corrupti id odio debitis? Velit aspernatur iusto repellendus quasi libero sunt, a nulla voluptatibus deleniti omnis culpa corrupti? Magni voluptates ullam mollitia recusandae repudiandae assumenda quidem ipsum, sapiente, est amet neque, tempora illum blanditiis officia asperiores corrupti ducimus?</p>
          </div>

          <div>
            <ul className="aside-links">
              <li>About</li>
              <li>Accessibility</li>
              <li>Help Center</li>
              <li>Privacy & Terms</li>
              <li>Ad Choices</li>
              <li>Advertising</li>
              <li>Business Services</li>
              <li>Contact Us</li>
              <li>More</li>
            </ul>
          </div>
        </StyledAside>

      </StyledScaffoldContainer>
    </StyledFeed>
  );
};

export default Feed;