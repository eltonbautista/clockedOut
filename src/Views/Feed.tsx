import React from "react";
import styled from "styled-components";
import { IFeedProps } from "../Helpers/interface";
import { SOButtons, ButtonHeader } from "../Components/Buttons";

const StyledFeedContainer = styled.div`
  display: grid;
  grid-template-areas: "sidebar main aside";
`;

const StyledSidebar = styled.div`
  display: grid;
  grid-area: sidebar;

  > div:first-of-type {
    display: grid;
    justify-items: center;
  }
  > div:first-of-type > p {
    font-size: clamp(14px, 1.5vh, 18px);
    font-family: grenze;
  }

  >div:last-of-type {
    display: grid;
    
  }
`;





const Feed: React.FC<IFeedProps> = () => {
  return (
    <StyledFeedContainer id="feed-container">
      <div>

        <StyledSidebar id="feed-sidebar">

          <div className="feed-sidebar-upper">
            <div></div>
            <a href="asd.com">Username or User's name</a>
            <p>Small profile description about 50 words long</p>
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

        <main id="feed-main">
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
        </main>

        <aside id="feed-aside">
          {/* Some links, news, fake ads, etc. */}
        </aside>
      </div>
    </StyledFeedContainer>
  );
};

export default Feed;