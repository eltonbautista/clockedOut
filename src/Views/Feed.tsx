import React from "react";
import styled from "styled-components";
import { IFeedProps, ICircularPictureProps, IBackgroundCanvas } from "../Helpers/interface";
import { SOButtons, ButtonHeader } from "../Components/Buttons";
import testpfp from "../Styles/assets/testpfp.jpeg";
import testpfp1 from "../Styles/assets/testpfp1.jpg";
import testpfp2 from "../Styles/assets/testpfp2.jpg";
import { ButtonGroup } from "react-bootstrap";
import { palette } from "../Helpers/utils";

const StyledFeed = styled.div`
  display: grid;
  min-height: 100%;
  background-color: ${palette.black};

  * {
    font-family: grenzeMedium, sans-serif;
    font-weight: 300;
    letter-spacing: 0.3px;
    color: ${palette.black};
  }
`;

const StyledScaffoldContainer = styled.div`
  display: grid;
  grid-template-areas: "sidebar main aside";
  grid-template-columns: 0.2fr 0.6fr 0.2fr;
  max-width: 85vw;
  min-width: 80vw;
  justify-self: center;
  /* background: cyan; */
  /* min-height: 90%; */
`;

const StyledMain = styled.main`
  grid-area: main;
  display: grid;
  background-color: ${palette.black};
`;
const StyledAside = styled.aside`
  grid-area: aside;
  background-color: ${palette.red};

  button {
    color: ${palette.purple};
    width: 50%;
  }
`;
const StyledSidebar = styled.div`
  display: grid;
  grid-area: sidebar;
  background-color: ${palette.red};

  > div:first-of-type {
    display: grid;
    justify-items: center;
    position: relative;
    grid-template-rows: 0.35fr 0.1fr 0.5fr;
  }

  > div:first-of-type > div:nth-child(3) {
    position: relative;
    display: grid;
    width: 100%;
  }

  > div:first-of-type > div:nth-child(3) > a {
    color: ${palette.black};
    position: absolute;
    letter-spacing: 0.3px;
    text-decoration: none;
    width: 100px;
    justify-self: center;
    /* top: min(-80%, -45px); */
    top: -45px;
    font-size: clamp(16px, 2vh, 20px);
  }

  > div:first-of-type > div:nth-child(3) > p {
    color: ${palette.black};
    /* font-family: grenzeMedium, Arial, Helvetica, sans-serif; */
    font-weight: 100;
    font-size: clamp(16px, 2vh, 20px);
    position: absolute;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    justify-self: start;
    :hover {
      white-space: normal;
      text-overflow: clip;
      overflow: visible;
      height: fit-content;
      width: 100%;
      background-color: white;
    }
  }

  ul {
    display: grid;
    align-items: center;
    list-style: none;
    justify-items: center;
    padding: 0;
    font-size: clamp(16px, 2vh, 26px);
  }

  ul a {
    text-decoration: none;
  }

  >div:last-of-type {
    display: grid;
    height: 40%;
    align-items: center;
  }

  >div:last-of-type > div > button > h5 {
    /* letter-spacing: 1.5px; */
    font-size: clamp(23px, 2vh, 26px);
    font-family: ostrichSansHeavy;

    font-weight: 900;
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

const BackgroundCanvas = styled.div<IBackgroundCanvas>`
  ${props => props.sidebar ? `width: 100%; height: 17%; background-color: #000000cd; position: absolute; ` :
    `width: ${props.width};
    height: ${props.height};
    background-color: ${props.backgroundColor};
    position: absolute;` }
`;
// To create a bigger background canvas w/ pfp I put both elements into one div then style accordingly

const Feed: React.FC<IFeedProps> = () => {
  return (
    <StyledFeed id="feed-container">
      <StyledScaffoldContainer>

        <StyledSidebar id="feed-sidebar">

          <div className="feed-sidebar-upper">
            <BackgroundCanvas sidebar></BackgroundCanvas>
            <CircularPicture zIndex="0" marginTop="15%" imgSrc={testpfp2} height="max(50%, 80px)" width="max(30%, 80px)" />
            <div>
              <a href="asd.com">Robert Kugler</a>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus qui odio mollitia earum deserunt veritatis, necessitatibus saepe delectus sequi iure.</p>
            </div>
            <ul>
              {/* These <li> will be dynamically generated depending on how many users want - up to 3 */}
              {/* allow users to add links and I can add the corresponding icons */}
              <li>Valorant // waves#6666</li>
              <li>Bloodhunt // PsychToTech</li>
              <li><a href="test" >Steam</a></li>
              <li><a href="test" >Github</a></li>
              <li><a href="test" >Twitter</a></li>
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