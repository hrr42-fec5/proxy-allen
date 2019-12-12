import React from 'react';
import styled from 'styled-components';
import { CloseCircle } from 'styled-icons/remix-line/CloseCircle';
import { Grid } from 'styled-icons/boxicons-solid/Grid';
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight';
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft';
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
  /* margin-top: auto;
  margin-bottom: auto; */
  /* display: table; */
`;

const StyledImgWrapper = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  /* flex-direction: column; */
  /* height: 100%;
  width: 100%; */
`;

const StyledImg = styled.img`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1400px
  max-height: 900px;
  object-fit: cover;
`;
StyledImg.displayName = 'styledimg';

const StyledButtonWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  background: none;
  border: 0;
`;

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

const StyledCounter = styled.span`
  padding-right: 8px;
  letter-spacing: .05em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  font-size: 11px;
`;
StyledCounter.displayName = 'styledcounter';

const StyledClosed = styled(CloseCircle)`
  padding: 8px;
  color: #e1e1e1;
  &:hover {
    color: #101820;
    background-color: #e1e1e1;
    opacity: .85;
  }
`;

const StyledMulti = styled(Grid)`
  padding: 8px;
  color: #e1e1e1;
  &:hover {
    color: #101820;
    background-color: #e1e1e1;
    opacity: .85;
  }
`;

const StyledLeft = styled(KeyboardArrowLeft)`
  padding: 5px;
  color: #e1e1e1;
  left: 60px;
  top: calc(50% - 20px);
  position: absolute;
  z-index: 2;

  &:hover {
    /* color: #101820; */
    background-color: #101820;
    opacity: .8;
    border-radius: 50%;
  }
`;

const StyledRight = styled(KeyboardArrowRight)`
  padding: 5px;
  color: #e1e1e1;
  right: 60px;
  top: calc(50% - 20px);
  position: absolute;
  z-index: 2;

  &:hover {
    /* color: #101820; */
    background-color: #101820;
    opacity: .8;
    border-radius: 50%;
  }
`;

const Single = ({ idx, total, handleView, url, handleClick, name }) =>  {
  const prev = idx === 0 ? total - 1 : idx - 1;
  const next = idx + 1 === total ? 0 : idx + 1;

  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 27:
        handleView('main');
        break;
      case 37:
        handleClick(prev);
        break;
      case 39:
        handleClick(next);
        break;
      default:
        break;
    }
  };

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
              {idx + 1} of {total}
            </StyledCounter>
            <StyledMulti size="20" onClick={() => handleView('multi')}>multi</StyledMulti>
            <StyledClosed size="22" onClick={() => handleView('main')} />
          </StyledNav>
        </StyledNavWrapper>
        <StyledImgWrapper>
          <StyledImg src={url} />
        </StyledImgWrapper>
      </Animate>
      <StyledButtonWrapper>
        <StyledLeft size="30" onClick={() => handleClick(prev)}>prev</StyledLeft>
        <StyledRight size="30" onClick={() => handleClick(next)}>next</StyledRight>
      </StyledButtonWrapper>
    </StyledContainer>
  );
};

export default Single;
