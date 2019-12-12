import React from 'react';
import styled from 'styled-components';
import { CloseCircle } from 'styled-icons/remix-line/CloseCircle';
import { Animate } from 'react-simple-animate';

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(16,24,32,.95);
  box-sizing: border-box;
  padding: 0 40px 40px;
  text-align: center;
  color: #fff;
  /* display: table; */
`;

const StyledGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
`;

const StyledGrid = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  background: none;
  border-radius: 0;
  box-shadow: none;
  max-height: 900px;
  max-width: 100%;
  overflow-y: scroll;

  &::-webkit-slider-thumb {
    background-color: #e1e1e1;
    background: #e1e1e1;
    color: #e1e1e1;
    border-radius: 10px;
  }
`;

const StyledImgContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 100%;
  object-fit: cover;
  transition: .2s ease-in-out;

  &:hover {
    transform: scale(1.01);
    opacity: .9;
  }
`;
StyledImg.displayName = 'styledimg';

const StyledNavWrapper = styled.div`
  vertical-align: middle;
  display: flex;
  flex-flow: row wrap;
  top: 0px;
  height: 80px;
  width: 100%;
`;

const StyledNav = styled.div`
  margin: auto;
  vertical-align: middle;
  color: #e1e1e1;
  font: 14px/16px 'Arial';
  letter-spacing: .2em;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  flex: 1;
`;
StyledNav.displayName = 'stylednav';

const StyledCounter = styled.span`
  padding-right: 8px;
  letter-spacing: .05em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  font-size: 11px;
  visibility: hidden;
`;

const StyledClosed = styled(CloseCircle)`
  padding: 8px;
  color: #e1e1e1;
  &:hover {
    color: #101820;
    background-color: #e1e1e1;
    opacity: .85;
  }
`;
StyledClosed.displayName = 'styledclosed';

const Multi = ({ imageUrls, name, handleClick, handleView }) => {
  return (
    <StyledContainer>
      <Animate
        play
        duration={0.3}
        start={{ transform: 'scale(0.5)', opacity: 0.5 }}
        end={{ transform: 'scale(1)', opacity: 1 }}
        easeType="cubic-bezier(0.645,0.045,0.355,1.000)"
      >
        <StyledNavWrapper>
          <StyledNav />
          <StyledNav>
            {name}
          </StyledNav>
          <StyledNav>
            <StyledCounter>
              0 of 0
              <button onClick={() => handleView('multi')}>Multi</button> |
            </StyledCounter>
            <StyledClosed size="22" onClick={() => handleView('main')}>close</StyledClosed>
          </StyledNav>
        </StyledNavWrapper>
        <StyledGridWrapper>
          <StyledGrid>
            {imageUrls.map((url, idx) => <StyledImgContainer key={idx}><StyledImg src={url} key={idx} onClick={() => handleClick(idx)} /></StyledImgContainer>)}
          </StyledGrid>
        </StyledGridWrapper>
      </Animate>
    </StyledContainer>
  );
};

export default Multi;
