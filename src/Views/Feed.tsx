import React from "react";
import styled from "styled-components";
import { IFeedProps, ICircularPictureProps } from "../Helpers/interface";
import { SOButtons, ButtonHeader } from "../Components/Buttons";
import testpfp from "../Styles/assets/testpfp.jpeg";
import testpfp1 from "../Styles/assets/testpfp1.jpg";
import testpfp2 from "../Styles/assets/testpfp2.jpg";


const StyledFeed = styled.div`
  display: grid;
  min-height: 100%;
`;

const StyledScaffoldContainer = styled.div`
  display: grid;
  grid-template-areas: "sidebar main aside";
  grid-template-columns: 0.2fr 0.6fr 0.2fr;
  max-width: 85vw;
  min-width: 80vw;
  justify-self: center;
  background: cyan;
  /* min-height: 90%; */
`;

const StyledMain = styled.main`
  grid-area: main;
  display: grid;
  background-color: purple;
`;
const StyledAside = styled.aside`
  grid-area: aside;
`;
const StyledSidebar = styled.div`
  display: grid;
  grid-area: sidebar;
  /* position: relative; */
  
  > div:first-of-type {
    display: grid;
    justify-items: center;
    position: relative;
    /* grid-template-rows: repeat(4, 1fr); */
  }

  > div:first-of-type > div:first-of-type {
    background-color: wheat;
    position: absolute;
    width: 100%;
    height: 15%;
  };

  /* > div:first-of-type > div:last-of-type {
    z-index: 1;
    position: absolute;
    width: min(30%, 80px);
    height: min(50%, 80px);
    overflow: hidden;
    justify-items: center;
    position: sticky;
    margin-top: 15%;
    border-radius: 50%;
  }; */

  > div:first-of-type > div:last-of-type > img{
    /* width: 100%; */
    /* height: 100%; */
    /* margin-left: 10px; */
    /* border-radius: 50%; */
  }

  > div:first-of-type > p {
    font-size: clamp(14px, 1.5vh, 18px);
    font-family: grenze;
  }

  >div:last-of-type {
    display: grid;
    
  }
`;

const StyledCircularDiv = styled.div<ICircularPictureProps>`
z-index: ${props => props.zIndex};
position: absolute;
width: ${props => props.width};
height: ${props => props.height};
overflow: hidden;
justify-items: center;
position: sticky;
margin-top: ${props => props.marginTop};
border-radius: 50%;
`;

const CircularPicture: React.FC<ICircularPictureProps> = (props) => {
  const { height, width, marginTop, zIndex, imgSrc, } = props;

  return (
    <StyledCircularDiv width={width} height={height} marginTop={marginTop} zIndex={zIndex}>
      <img src={imgSrc} alt="pfp" ></img>
    </StyledCircularDiv>
  );
};



const Feed: React.FC<IFeedProps> = () => {
  return (
    <StyledFeed id="feed-container">
      <StyledScaffoldContainer>

        <StyledSidebar id="feed-sidebar">

          <div className="feed-sidebar-upper">
            <div></div>
            <CircularPicture zIndex="0" marginTop="15%" imgSrc={testpfp2} height="min(50%, 80px)" width="min(30%, 80px)" />
            {/* <div>
              <img src={testpfp1} alt="pfp"></img>
            </div> */}

            <a href="asd.com">User's name</a>
            <p>Small profile description about 50 words long</p>
            <ul>
              {/* These <li> will be dynamically generated depending on how many users want - up to 3 */}
              <li>Valorant // waves#6666</li>
              <li>Bloodhunt // PsychToTech</li>
              <li>VSC // PsychToTech</li>
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
          <div id="feed-sharebox">

            <div>
              <a href="link to personal profile page">pfp</a>
              <button>
                <span>Write a post</span>
              </button>
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
          </div>

          <div id="feed-social-content">
            {/* Need to figure out how to make posts flow down in here */}
          </div>
        </StyledMain>

        <StyledAside id="feed-aside">
          {/* Some links, news, fake ads, etc. */}
          <div>
            PLACEHOLDER
          </div>
          <div>
            <SOButtons>Placeholder</SOButtons>
            <SOButtons>Placeholder</SOButtons>
            <SOButtons>Placeholder</SOButtons>
          </div>
        </StyledAside>

      </StyledScaffoldContainer>
    </StyledFeed>
  );
};

export default Feed;