import React, { useEffect, useState, useContext, ReactNode } from "react";
import styled from "styled-components";
import { IFeedProps, ICircularPictureProps, IBackgroundCanvas, IPostState, } from "../Helpers/interface";
import { SOButtons, ButtonHeader } from "../Components/Buttons";
import testpfp2 from "../Styles/assets/testpfp2.jpg";
import testpfp from "../Styles/assets/testpfp.jpeg";
import cat from "../Styles/assets/cat.png";
import { filterPosts, palette, toPostStateObjects } from "../Helpers/utils";
import NewPostModal from "../Components/NewPostModal";
import { UserContext } from "../Helpers/contexts";
import Post from "../Components/Post";
import { useCallback } from "react";
import { downloadImage, getUserDoc, storage, updateProfilePicture } from "../firebase-config";
import { getBlob, ref } from "firebase/storage";

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
  grid-template-columns: 0.2fr 0.6fr 0.2fr;
  max-width: 85%;
  min-width: 80%;
  justify-self: center;
  gap: 10px;
  padding-top: 30px;

`;

const StyledMain = styled.main`
  display: grid;
  grid-template-rows: 0.1fr auto;
  grid-area: main;
  border-radius: 8px;
  background-color: ${palette.fpink};
  gap: 15px;
  min-height: 100vh;
  
`;

const StyledSharebox = styled.div`
  display: grid;
  border: 1px solid ${palette.red};
  height: max(130px, 13vh);
  border-radius: 8px;

  > div {
    display: grid;
    grid-template-columns: 0.1fr auto;
    justify-items: center;
    align-items: center;
    padding-left: 10px;
  }

  > div:first-of-type {
    border-bottom: 1px solid ${palette.black};
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
  border: 1px solid ${palette.red};
  border-radius: 8px;
  gap: 10px;
`;


const StyledAside = styled.aside`
  grid-area: aside;
  background-color: ${palette.fpink};
  border-radius: 8px;

  button {
    color: ${palette.purple};
    width: 50%;
  }
`;

const StyledSidebar = styled.div`
  display: grid;
  grid-area: sidebar;
  width: 90%;
  height: 500px;
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
    padding: 0;
    font-size: clamp(16px, 2vh, 26px);
    width: 100%;
    gap: 20px;
    grid-template-rows: 0.3fr 0.3fr 0.8fr;
    padding-top: 10px;
  }

  ul a {
    text-decoration: none;
  }

  ul > div {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-content: space-evenly;
    /* width: fit-content; */
    align-items: end;
  }

  ul > div > li > a{
    text-overflow: ellipsis;
  }

  > div:last-of-type {
    display: grid;
    height: 100%;
    align-items: center;
    background-color: ${palette.fpink};
  }

  > div:last-of-type > div {
    display: grid;
    width: 100%;
    /* border-bottom: 1px solid black; */
    justify-items: center;
    align-content: center;
    height: 100%;
  }

  > div:last-of-type > div > button {
    width: 100%;
  }

  > div:last-of-type > div > button > h5 {
    /* letter-spacing: 1.5px; */
    font-size: clamp(23px, 2vh, 26px);
    font-weight: 900;
    width: 100%;
  }

  > div:last-of-type > div:first-of-type {
    border-bottom: 1px solid ${palette.red};
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
  font-size: clamp(16px, 2vh, 20px);
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  justify-self: center;

  :hover {
    color: white;
  }

  ${props => props.clicked ?
    `white-space: normal;

  text-overflow: clip;
  overflow: visible;
  height: fit-content;
  top: 100%;
  width: 100%;
  background-color: ${palette.red};
  font-weight: 600
  ` : null}
`;

const sidebarPContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus qui odio mollitia earum deserunt veritatis, necessitatibus saepe delectus sequi iure.";

// To create a bigger background canvas w/ pfp I put both elements into one div then style accordingly

const Feed: React.FC<IFeedProps> = (props: IFeedProps) => {
  // VARIABLES, STATES & CONTEXT: 

  const { localAuth } = props;
  const [personalBio, setPersonalBio] = useState<boolean | undefined>(false);
  const [overflowPost, setOverflowPost] = useState<'auto' | 'hidden'>('auto');
  const [showModal, setShowModal] = useState<boolean>(false);
  const { postArray, setPostArray, loggedInData, allUsersData, setAllUsersData } = useContext(UserContext);
  const [asyncPostLoad, setAsyncPostLoad] = useState<ReactNode[] | undefined>([]);
  // HOOKS:

  const addDbPostsToLocal = useCallback(async () => {
    // callback used for adding db posts to local so they can be rendered on load of the Feed view.
    if (loggedInData) {
      // Filter user data so there exists only one user data per user.
      const filteredUsersData = filterPosts(allUsersData);
      if (filteredUsersData) {
        const currentUserData = await getUserDoc(loggedInData.uid);
        console.log(currentUserData);
        if (currentUserData && postArray.length < currentUserData.posts.length && currentUserData.userID === loggedInData.uid) {
          const dbPostObjectsArray: IPostState[] = await toPostStateObjects(filteredUsersData, loggedInData.uid);
          if (dbPostObjectsArray !== undefined && dbPostObjectsArray.length > 0) {
            setPostArray([...postArray, ...dbPostObjectsArray]);
          }
        }
      }
    }

  }, [allUsersData, loggedInData, postArray, setPostArray]);


  useEffect(() => {
    // effect that invokes addDbPostsToLocal()
    async function invoke() {
      await addDbPostsToLocal();
    }
    invoke();
  }, [addDbPostsToLocal, loggedInData, setAllUsersData]);

  useEffect(() => {
    document.body.style.overflow = overflowPost;
  }, [overflowPost]);

  const mapList = (arrayToMap: IPostState[] | undefined) => {
    if (!arrayToMap) {
      return;
    }

    if (arrayToMap.length > 0) {
      return arrayToMap.map((postObj: IPostState, index) => {
        return (
          <Post key={index} video={postObj['postVideo']} img={postObj['postImage']?.imageURL} text={postObj['postText']} />
        );
      });
    }
    return;
  };

  const asyncArray = useCallback(async () => {
    // const newArray = async () => {
    const objectArr: IPostState[] = [];
    if (loggedInData) {
      for (let i = 0; i < postArray.length; i++) {
        objectArr.push(
          {
            postText: postArray[i].postText,
            postImage: {
              imageName: postArray[i].postImage.imageName,
              imageURL: URL.createObjectURL(await downloadImage(postArray[i].postImage.imageName, loggedInData?.uid))
            },
            postVideo: postArray[i].postVideo
          }
        );
      }
    }
    const componentList = mapList(objectArr);

    if ((asyncPostLoad === undefined && postArray) || (postArray && asyncPostLoad!.length < postArray.length)) {
      setAsyncPostLoad(componentList);
    }

    return objectArr;
  }, [asyncPostLoad, loggedInData, postArray]);

  useEffect(() => {
    asyncArray();
  }, [asyncArray]);

  if ((localAuth && !loggedInData)) {
    return <div>Loading assets...</div>;
  }

  return (
    <StyledFeed id="feed-container" >
      <NewPostModal showModal={showModal} stateSetters={{ setOverflowPost, setShowModal }}></NewPostModal>
      <StyledScaffoldContainer>

        <StyledSidebar id="feed-sidebar">

          <div className="feed-sidebar-upper">
            <BackgroundCanvas sidebar></BackgroundCanvas>
            <CircularPicture zIndex="0" marginTop="15%" imgSrc={loggedInData?.photoURL ? loggedInData.photoURL : testpfp2} height="85px" width="85px" />
            <div>
              <a href="asd.com">{loggedInData?.displayName}</a>
              <StyledSidebarP clicked={personalBio} onClick={(e) => setPersonalBio(prevState => {
                return !prevState;
              })} >
                {sidebarPContent}
              </StyledSidebarP>
            </div>
            <ul>
              {/* These <li> will be dynamically generated depending on how many users want - up to 3 */}
              {/* allow users to add links and I can add the corresponding icons */}
              <li>Valorant // waves#6666</li>
              <li>Bloodhunt // PsychToTech</li>
              <div>
                <li><a href="test" >Steam</a></li>
                <li><a href="test" >Github</a></li>
                <li><a href="test" >Twitter</a></li>
                <li><a href="test" >Something</a></li>
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
              <CircularPicture zIndex="0" position="sticky" imgSrc={loggedInData?.photoURL ? loggedInData.photoURL : cat} height="60px" width="60px" />
              {/* IMPORTANT: When user clicks this button it will create a <Post /> inside of the {children} prop in <StyledFeedContent id="feed-social-content"> */}
              <SOButtons onClick={(e) => {
                setShowModal(true);
                setOverflowPost('hidden');
              }}>
                <a href="#header">Write a Post</a>
              </SOButtons>
            </div>
            <div>
              <button>
                <span>img/svg</span>
                <span>Photo</span>
              </button>
              <button>
                <span>img/svg</span>
                <span>Video</span>
              </button>
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
          </div>
          {/* <div>
            <SOButtons>Placeholder</SOButtons>
            <SOButtons>Placeholder</SOButtons>
            <SOButtons>Placeholder</SOButtons>
          </div> */}
        </StyledAside>

      </StyledScaffoldContainer>
    </StyledFeed>
  );
};

export default Feed;